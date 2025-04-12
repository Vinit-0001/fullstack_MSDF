# Multi-Sensor Data Fusion (MSDF) Project

A comprehensive system for processing and fusing data from multiple sensors (LIDAR and Camera) to detect and analyze objects in 3D space.

## 🚀 Features

- **Multi-Sensor Integration**: Seamlessly combines LIDAR point cloud data with camera images
- **3D Object Detection**: Advanced detection of objects in 3D space
- **Distance Calculation**: Accurate distance measurements to detected objects
- **Real-time Processing**: Efficient processing pipeline for sensor data
- **Modern UI**: Beautiful and intuitive user interface with real-time status updates
- **File Management**: Support for multiple file types (PCD, Images, Calibration data, Labels)

## 🛠️ Tech Stack

### Backend
- **FastAPI**: High-performance Python web framework
- **Open3D**: 3D data processing library
- **NumPy**: Numerical computing
- **OpenCV**: Image processing
- **Python 3.8+**: Core programming language

### Frontend
- **Next.js**: React framework for production
- **TypeScript**: Type-safe JavaScript
- **TailwindCSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Sonner**: Toast notifications

## 📋 Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn
- Git

## 🚀 Installation

### Backend Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd msdf
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install backend dependencies:
```bash
cd backend
pip install -r requirements.txt
```

4. Start the backend server:
```bash
uvicorn main:app --reload
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd client
```

2. Install frontend dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## 📁 Project Structure

```
msdf/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── utils/
│       ├── point_cloud.py
│       ├── image_processing.py
│       └── object_detection.py
├── client/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── lib/
│   ├── public/
│   └── package.json
└── README.md
```

## 🎯 Usage

1. **Upload Files**:
   - LIDAR Data (.pcd)
   - Image File
   - Calibration Data
   - Labels File

2. **Process Data**:
   - Click "Process Files" button
   - Wait for processing to complete
   - View results in the output section

3. **View Results**:
   - Image Comparison: Original vs Processed
   - Object Detection: Categories, confidence scores, and distances
   - Processing Status: Real-time updates

## 🔧 API Endpoints

- `POST /process`: Process uploaded files
  - Accepts: PCD file, Image file, Calibration data, Labels file
  - Returns: Processed image and object detection results

## 🎨 UI Components

1. **File Upload Section**
   - Drag and drop interface
   - File type validation
   - Upload progress indicators

2. **Processing Status**
   - Real-time status updates
   - File upload status
   - Processing progress

3. **Output Section**
   - Image comparison
   - Object detection results
   - Distance measurements

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Open3D team for the amazing 3D processing library
- FastAPI team for the high-performance web framework
- Next.js team for the React framework
- All contributors and maintainers

## 📞 Contact

For any queries or support, please contact:
- Email:sanketsutar.dev@gmail.com

---

Made by Sanket Sutar 