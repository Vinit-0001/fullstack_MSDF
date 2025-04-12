'use client';

import { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import { motion } from 'framer-motion';

interface FileUploadProps {
  onUploadComplete: (result: any) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadComplete }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append(file.name, file.originFileObj as File);
    });

    setUploading(true);

    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/process', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const result = await response.json();
      message.success('Upload successful');
      onUploadComplete(result);
    } catch (error) {
      message.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const uploadProps = {
    onRemove: (file: UploadFile) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file: UploadFile) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Upload
          {...uploadProps}
          accept=".pcd"
          maxCount={1}
          className="block w-full"
          listType="picture"
        >
          <Button 
            icon={<UploadOutlined />}
            className="w-full bg-blue-500/10 border-blue-500/20 text-blue-400 hover:text-blue-300 hover:border-blue-400/30"
          >
            Select PCD File
          </Button>
        </Upload>

        <Upload
          {...uploadProps}
          accept="image/*"
          maxCount={1}
          className="block w-full"
          listType="picture"
        >
          <Button 
            icon={<UploadOutlined />}
            className="w-full bg-purple-500/10 border-purple-500/20 text-purple-400 hover:text-purple-300 hover:border-purple-400/30"
          >
            Select Image
          </Button>
        </Upload>

        <Upload
          {...uploadProps}
          accept=".txt,.json,.yaml,.yml"
          maxCount={1}
          className="block w-full"
          listType="picture"
        >
          <Button 
            icon={<UploadOutlined />}
            className="w-full bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:text-emerald-300 hover:border-emerald-400/30"
          >
            Select Calibration File
          </Button>
        </Upload>
      </div>

      <div className="flex justify-center mt-6">
        <Button
          type="primary"
          onClick={handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          className="bg-blue-500 hover:bg-blue-600 border-none text-white min-w-[200px]"
        >
          {uploading ? 'Processing...' : 'Process Files'}
        </Button>
      </div>
    </motion.div>
  );
};

export default FileUpload; 