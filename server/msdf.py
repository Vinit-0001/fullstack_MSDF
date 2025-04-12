import numpy as np
import cv2
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import glob
import pandas as pd
from ultralytics import YOLO

# Initialize YOLO model
model = YOLO('yolov8n.pt')

def read_single_label(label_filename):
    """Reads the label file for a single image and extracts 3D object data."""
    with open(label_filename, 'r') as file:
        lines = [line.rstrip() for line in file]
        objects = [Object3d(line) for line in lines if line.split(" ")[0] != "DontCare"]
    return objects

class Object3d(object):
    """Represents a single 3D object detected in a scene."""
    def __init__(self, label_file_line):
        data = label_file_line.split(" ")
        data[1:] = [float(x) for x in data[1:]]

        # Extract 3D bounding box information
        self.h = data[8]  # Box height
        self.w = data[9]  # Box width
        self.l = data[10]  # Box length (in meters)
        self.t = (data[11], data[12], data[13])  # Location (x, y, z) in camera coordinates
        self.ry = data[14]  # Yaw angle (around Y-axis in camera coordinates) [-pi..pi]

        # Initialize 2D and 3D bounding box placeholders
        self.xmin = 0
        self.xmax = 0
        self.ymin = 0
        self.ymax = 0
        self.bbox2d = np.zeros(shape=(2, 2))
        self.bbox3d = np.zeros(shape=(4, 2))
        self.category = data[0]  # Object category
        self.confidence = 1.0  # Default confidence

class LiDAR2Camera(object):
    def __init__(self, calib_file):
        self.P = np.reshape(self.read_calib_file(calib_file)["P2"], [3,4])

    def read_calib_file(self, filepath):
        """ Read in a calibration file and parse into a dictionary."""
        data = {}
        with open(filepath, "r") as f:
            for line in f.readlines():
                line = line.rstrip()
                if len(line) == 0:
                    continue
                key, value = line.split(":", 1)
                try:
                    data[key] = np.array([float(x) for x in value.split()])
                except ValueError:
                    pass
        return data

    def project_to_image(self, pts_3d):
        """ Project 3d points to image plane."""
        n = pts_3d.shape[0]
        pts_3d_extend = np.hstack((pts_3d, np.ones((n, 1))))
        pts_2d = np.dot(pts_3d_extend, np.transpose(self.P))
        pts_2d[:, 0] /= pts_2d[:, 2]
        pts_2d[:, 1] /= pts_2d[:, 2]
        return pts_2d[:, 0:2]

    def roty(self, t):
        """ Rotation about the y-axis."""
        c = np.cos(t)
        s = np.sin(t)
        return np.array([[c, 0, s], [0, 1, 0], [-s, 0, c]])

    def compute_box_3d(self, obj):
        """ Projects the 3d bounding box into the image plane."""
        R = self.roty(obj.ry)
        l = obj.l
        w = obj.w
        h = obj.h

        x_corners = [l / 2, l / 2, -l / 2, -l / 2, l / 2, l / 2, -l / 2, -l / 2]
        y_corners = [0, 0, 0, 0, -h, -h, -h, -h]
        z_corners = [w / 2, -w / 2, -w / 2, w / 2, w / 2, -w / 2, -w / 2, w / 2]

        corners_3d = np.dot(R, np.vstack([x_corners, y_corners, z_corners]))
        corners_3d[0, :] = corners_3d[0, :] + obj.t[0]
        corners_3d[1, :] = corners_3d[1, :] + obj.t[1]
        corners_3d[2, :] = corners_3d[2, :] + obj.t[2]

        if np.any(corners_3d[2, :] < 0.1):
            return None

        corners_2d = self.project_to_image(np.transpose(corners_3d))
        return corners_2d

    def draw_projected_box3d(self, image, qs, color=(255, 0, 0), thickness=2):
        """ Draw 3d bounding box in image."""
        qs = qs.astype(np.int32)
        for k in range(0, 4):
            i, j = k, (k + 1) % 4
            cv2.line(image, (qs[i, 0], qs[i, 1]), (qs[j, 0], qs[j, 1]), color, thickness)
            i, j = k + 4, (k + 1) % 4 + 4
            cv2.line(image, (qs[i, 0], qs[i, 1]), (qs[j, 0], qs[j, 1]), color, thickness)
            i, j = k, k + 4
            cv2.line(image, (qs[i, 0], qs[i, 1]), (qs[j, 0], qs[j, 1]), color, thickness)
        return image

    def project_8p_to_4p(self, pts_2d):
        x0 = np.min(pts_2d[:, 0])
        x1 = np.max(pts_2d[:, 0])
        y0 = np.min(pts_2d[:, 1])
        y1 = np.max(pts_2d[:, 1])
        x0 = max(0, x0)
        y0 = max(0, y0)
        return np.array([x0, y0, x1, y1])

    def draw_projected_box2d(self, image, qs, color=(255,0,0), thickness=2):
        return cv2.rectangle(image, (int(qs[0]), int(qs[1])), (int(qs[2]), int(qs[3])), color, thickness)

    def get_image_with_bboxes(self, img, objects):
        img2 = np.copy(img)
        img3 = np.copy(img)
        for obj in objects:
            boxes = self.compute_box_3d(obj)
            if boxes is not None:
                obj.bbox3d = boxes
                obj.bbox2d = self.project_8p_to_4p(boxes)
                img2 = self.draw_projected_box2d(img2, obj.bbox2d)
                img3 = self.draw_projected_box3d(img3, obj.bbox3d)
        return img2, img3

def run_obstacle_detection(img):
    """Detect objects and draw bounding boxes using YOLOv8."""
    results = model(img)
    annotated_frame = results[0].plot()
    pred_bboxes = []
    for box in results[0].boxes:
        x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())
        conf = box.conf[0]
        cls_id = int(box.cls[0])
        pred_bboxes.append((x1, y1, x2, y2, cls_id, conf))
    return annotated_frame, pred_bboxes

def box_iou(box1, box2):
    """Computer Intersection Over Union cost"""
    xA = max(box1[0], box2[0])
    yA = max(box1[1], box2[1])
    xB = min(box1[2], box2[2])
    yB = min(box1[3], box2[3])

    inter_area = max(0, xB - xA + 1) * max(0, yB - yA + 1)
    box1_area = (box1[2] - box1[0] + 1) * (box1[3] - box1[1] + 1)
    box2_area = (box2[2] - box2[0] + 1) * (box2[3] - box2[1] + 1)
    union_area = (box1_area + box2_area) - inter_area

    iou = inter_area/float(union_area)
    return iou

def build_fused_object(pred_bboxes, lidar_objects, points, image):
    """Build fused objects from YOLO and LiDAR detections"""
    fused_objects = []
    
    # Add LiDAR objects
    for obj in lidar_objects:
        fused_objects.append(obj)
    
    # Add YOLO detections
    for bbox in pred_bboxes:
        x1, y1, x2, y2, cls_id, conf = bbox
        obj = Object3d(f"YOLO {cls_id} 0 0 0 0 0 0 0 0 0 0 0 0 0")
        obj.bbox2d = np.array([[x1, y1], [x2, y2]])
        obj.confidence = float(conf)
        obj.category = f"YOLO_{cls_id}"
        fused_objects.append(obj)
    
    return fused_objects
