from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
import cv2
from ultralytics import YOLO
import tempfile
import os
import base64
import open3d as o3d
from msdf import (
    read_single_label, Object3d, LiDAR2Camera,
    run_obstacle_detection, build_fused_object
)

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize YOLO model
model = YOLO('yolov8n.pt')

def read_pcd_file(file_path):
    """Read PCD file and return points as numpy array"""
    try:
        pcd = o3d.io.read_point_cloud(file_path)
        if pcd.is_empty():
            print("Warning: Empty point cloud loaded")
            return np.array([])
            
        points = np.asarray(pcd.points)
        if len(points) == 0:
            print("Warning: No points in point cloud")
            return np.array([])
            
        # Remove any NaN or infinite values
        points = points[~np.isnan(points).any(axis=1)]
        points = points[~np.isinf(points).any(axis=1)]
        
        return points
    except Exception as e:
        print(f"Error reading PCD file: {str(e)}")
        return np.array([])

def calculate_distance(obj):
    """Calculate the distance to the object using 3D position information"""
    try:
        if hasattr(obj, 't'):
            # Use the 3D position (x, y, z) from LiDAR
            x, y, z = obj.t
            distance = np.sqrt(x**2 + y**2 + z**2)
            return float(distance)
        else:
            return float('inf')
    except Exception as e:
        print(f"Error calculating distance: {str(e)}")
        return float('inf')

def build_fused_object(pred_bboxes, lidar_objects, points, image):
    """Build fused objects from YOLO and LiDAR detections"""
    fused_objects = []
    
    try:
        # Add LiDAR objects
        for obj in lidar_objects:
            if not hasattr(obj, 'bbox2d'):
                print("Warning: Object missing bbox2d attribute")
                continue
                
            # Ensure bbox2d is in correct format
            if isinstance(obj.bbox2d, np.ndarray):
                if obj.bbox2d.shape == (2, 2):
                    obj.bbox2d = obj.bbox2d.reshape(-1)  # Convert to [x1,y1,x2,y2]
                elif obj.bbox2d.shape != (4,):
                    print(f"Warning: Unexpected bbox2d shape: {obj.bbox2d.shape}")
                    continue
            else:
                print("Warning: bbox2d is not a numpy array")
                continue
                
            fused_objects.append(obj)
        
        # Add YOLO detections
        for bbox in pred_bboxes:
            try:
                x1, y1, x2, y2, cls_id, conf = bbox
                # Ensure coordinates are valid numbers
                x1, y1, x2, y2 = [float(coord) for coord in [x1, y1, x2, y2]]
                obj = Object3d(f"YOLO {cls_id} 0 0 0 0 0 0 0 0 0 0 0 0 0")
                # Store bbox2d as [x1,y1,x2,y2]
                obj.bbox2d = np.array([x1, y1, x2, y2])
                obj.confidence = float(conf)
                obj.category = f"YOLO_{cls_id}"
                fused_objects.append(obj)
            except Exception as e:
                print(f"Error processing YOLO detection: {str(e)}")
                continue
        
        return fused_objects
    except Exception as e:
        print(f"Error in build_fused_object: {str(e)}")
        return []

def safe_float(value):
    """Convert a value to a safe float for JSON serialization"""
    try:
        if isinstance(value, (int, float)):
            # Handle infinity and NaN
            if not np.isfinite(value):
                return 0.0
            # Ensure the value is within JSON-compliant range
            if abs(value) > 1e308:  # JSON max value
                return 1e308 if value > 0 else -1e308
            return float(value)
        elif isinstance(value, np.ndarray):
            return [safe_float(x) for x in value.reshape(-1)]
        elif isinstance(value, list):
            return [safe_float(x) for x in value]
        else:
            return float(value)
    except (ValueError, TypeError):
        return 0.0

@app.post("/process")
async def process_files(
    image: UploadFile = File(...),
    pcd: UploadFile = File(...),
    label: UploadFile = File(...),
    calib: UploadFile = File(...)
):
    # Create temporary files
    temp_files = []
    try:
        # Save uploaded files
        tmp_image = tempfile.NamedTemporaryFile(delete=False, suffix='.png')
        temp_files.append(tmp_image.name)
        tmp_image.write(await image.read())
        tmp_image.close()

        tmp_pcd = tempfile.NamedTemporaryFile(delete=False, suffix='.pcd')
        temp_files.append(tmp_pcd.name)
        tmp_pcd.write(await pcd.read())
        tmp_pcd.close()

        tmp_label = tempfile.NamedTemporaryFile(delete=False, suffix='.txt')
        temp_files.append(tmp_label.name)
        tmp_label.write(await label.read())
        tmp_label.close()

        tmp_calib = tempfile.NamedTemporaryFile(delete=False, suffix='.txt')
        temp_files.append(tmp_calib.name)
        tmp_calib.write(await calib.read())
        tmp_calib.close()
        
        # Process the files
        try:
            # Read image
            image_data = cv2.cvtColor(cv2.imread(tmp_image.name), cv2.COLOR_BGR2RGB)
            if image_data is None:
                raise ValueError("Failed to read image file")
            
            # Read point cloud
            points = read_pcd_file(tmp_pcd.name)
            if len(points) == 0:
                print("Warning: No points in point cloud")
            
            # Read labels
            list_of_3d_objects = read_single_label(tmp_label.name)
            if not list_of_3d_objects:
                print("Warning: No 3D objects found in label file")
            
            # Initialize LiDAR to Camera converter
            lidar2cam = LiDAR2Camera(tmp_calib.name)
            
            # Get 2D and 3D bounding boxes
            lidar_2d, lidar_3d = lidar2cam.get_image_with_bboxes(image_data, list_of_3d_objects)
            
            # Run YOLO detection
            res, pred_bboxes = run_obstacle_detection(lidar_2d)
            
            # Build fused objects
            fused_objects = build_fused_object(pred_bboxes, list_of_3d_objects, points, image_data)
            
            # Add distance information and draw on image
            for obj in fused_objects:
                try:
                    # Only process objects that have LiDAR data (t attribute)
                    if not hasattr(obj, 't'):
                        continue
                        
                    distance = calculate_distance(obj)
                    obj.distance = distance
                    
                    # Draw labels on image
                    x1, y1 = int(obj.bbox2d[0]), int(obj.bbox2d[1])
                    x2, y2 = int(obj.bbox2d[2]), int(obj.bbox2d[3])
                    
                    # Draw only distance at the bottom
                    label_text = f"{distance:.1f}m"
                    # Calculate text size to ensure it fits
                    (text_width, text_height), _ = cv2.getTextSize(label_text, cv2.FONT_HERSHEY_SIMPLEX, 0.5, 2)
                    # Position text at bottom center of bounding box
                    text_x = x1 + (x2 - x1 - text_width) // 2
                    text_y = y2 + text_height + 5
                    cv2.putText(res, label_text, (text_x, text_y),
                               cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
                except Exception as e:
                    print(f"Error processing object: {str(e)}")
                    continue
            
            # Convert images to base64 for sending to frontend
            _, img_buffer = cv2.imencode('.png', cv2.cvtColor(res, cv2.COLOR_RGB2BGR))
            if img_buffer is None:
                raise ValueError("Failed to encode image")
                
            img_base64 = base64.b64encode(img_buffer).decode('utf-8')
            
            # Prepare response data with proper JSON serialization
            response_data = {
                "status": "success",
                "processed_image": img_base64,
                "fused_objects": []
            }
            
            for obj in fused_objects:
                try:
                    # Ensure all values are JSON serializable
                    obj_data = {
                        "bbox2d": safe_float(obj.bbox2d),
                        "bbox3d": safe_float(obj.bbox3d) if hasattr(obj, 'bbox3d') else [],
                        "category": str(obj.category),
                        "confidence": safe_float(obj.confidence),
                        "distance": safe_float(obj.distance) if hasattr(obj, 'distance') else 0.0,
                        "position": safe_float(obj.t) if hasattr(obj, 't') else [0.0, 0.0, 0.0]
                    }
                    response_data["fused_objects"].append(obj_data)
                except Exception as e:
                    print(f"Error serializing object: {str(e)}")
                    continue
            
            return response_data
            
        except Exception as e:
            return {"status": "error", "message": str(e)}
            
    finally:
        # Clean up temporary files
        for file_path in temp_files:
            try:
                if os.path.exists(file_path):
                    os.unlink(file_path)
            except Exception as e:
                print(f"Error deleting temporary file {file_path}: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000) 