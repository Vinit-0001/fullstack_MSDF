"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ResultViewerProps {
  imageFile: string;
  detections: any[];
  projectedPoints: any[];
}

const ResultViewer: React.FC<ResultViewerProps> = ({
  imageFile,
  detections,
  projectedPoints
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 space-y-6"
    >
      <h3 className="text-2xl font-semibold text-white">Processing Results</h3>
      
      {/* Result Image */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10">
        <Image
          src={imageFile}
          alt="Processing Result"
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
      </div>

      {/* Detection Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-neutral-900/40 backdrop-blur-xl rounded-xl p-6 border border-white/10">
          <h4 className="text-lg font-medium text-white mb-4">Detections</h4>
          <div className="space-y-2">
            {detections.map((detection, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm text-white/60"
              >
                <span>{detection.label}</span>
                <span>{Math.round(detection.confidence * 100)}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-neutral-900/40 backdrop-blur-xl rounded-xl p-6 border border-white/10">
          <h4 className="text-lg font-medium text-white mb-4">Point Cloud Data</h4>
          <div className="space-y-2">
            {projectedPoints.map((point, index) => (
              <div
                key={index}
                className="text-sm text-white/60"
              >
                Point {index + 1}: ({point.x.toFixed(2)}, {point.y.toFixed(2)}, {point.z.toFixed(2)})
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultViewer; 