"use client"

import { GoogleGeminiEffectDemo } from "@/components/ui/google-gemini-effect-demo"
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { motion } from "framer-motion"
import { ArrowRight, Code2, Database, GitBranch, LineChart, Settings, Upload, FileType, Image, Database as DatasetIcon, LayoutPanelTop, Boxes, GitMerge } from "lucide-react"
import { useState, useRef } from "react"
import { toast } from "sonner"

// File State Interface
interface FileState {
  pcd: File | null;
  image: File | null;
  calibration: File | null;
  labels: File | null;
}

interface ProcessingResult {
  status: string;
  processed_image: string;
  fused_objects: {
    bbox2d: number[];
    bbox3d: number[];
    category: string;
    confidence: number;
    distance: number;
    position: number[];
  }[];
}

// Main Implementation Page Component
export default function ImplementationPage() {
  // File State Management
  const [files, setFiles] = useState<FileState>({
    pcd: null,
    image: null,
    calibration: null,
    labels: null
  });

  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<ProcessingResult | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);

  const processingStatusRef = useRef<HTMLDivElement>(null);

  // File Change Handler
  const handleFileChange = (type: 'pcd' | 'image' | 'calibration' | 'labels', e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFiles(prev => ({
        ...prev,
        [type]: e.target.files![0]
      }));
    }
  };

  // Process Files Handler
  const handleProcessFiles = async () => {
    if (!files.pcd || !files.image || !files.calibration || !files.labels) {
      toast.error('Please upload all required files');
      return;
    }

    setProcessing(true);
    
    // Scroll to processing status
    if (processingStatusRef.current) {
      processingStatusRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    const formData = new FormData();
    formData.append('pcd', files.pcd);
    formData.append('image', files.image);
    formData.append('calib', files.calibration);
    formData.append('label', files.labels);

    try {
      const response = await fetch('http://localhost:8000/process', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Processing failed');
      }

      const data: ProcessingResult = await response.json();
      setResults(data);
      setProcessedImage(`data:image/png;base64,${data.processed_image}`);
      toast.success('Processing completed successfully');
    } catch (error) {
      console.error('Processing error:', error);
      toast.error('Processing failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        <div className="relative min-h-[80vh] flex items-center">
          <GoogleGeminiEffectDemo />
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-6">
                Implementation Details
              </h1>
              <p className="text-lg sm:text-xl text-center text-white/60 max-w-3xl mx-auto">
                Dive deep into our advanced processing pipeline and technical implementation
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="relative w-full py-20">
        {/* Animated Background */}
        <AnimatedGradientBackground
          Breathing={true}
          startingGap={150}
          gradientColors={[
            "rgba(0, 0, 0, 0.95)",
            "rgba(41, 121, 255, 0.05)",
            "rgba(61, 90, 254, 0.08)",
            "rgba(255, 128, 171, 0.05)",
            "rgba(0, 230, 118, 0.08)"
          ]}
          gradientStops={[0, 45, 65, 85, 100]}
          animationSpeed={0.01}
          breathingRange={8}
          topOffset={0}
          containerClassName="opacity-100"
        />
        
        {/* Feature Cards Container */}
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Architecture Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative bg-neutral-900/40 backdrop-blur-xl rounded-3xl p-6 border border-white/10"
            >
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} />
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-blue-500/10">
                  <GitBranch className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">System Architecture</h3>
                  <p className="text-white/60">
                    Modular design with microservices architecture for scalability and maintainability
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Data Processing Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative bg-neutral-900/40 backdrop-blur-xl rounded-3xl p-6 border border-white/10"
            >
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} />
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-purple-500/10">
                  <Database className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Data Processing</h3>
                  <p className="text-white/60">
                    Advanced algorithms for real-time data processing and analysis
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Code Integration Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative bg-neutral-900/40 backdrop-blur-xl rounded-3xl p-6 border border-white/10"
            >
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} />
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-green-500/10">
                  <Code2 className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Code Integration</h3>
                  <p className="text-white/60">
                    Seamless integration with existing systems and third-party services
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Performance Metrics Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative bg-neutral-900/40 backdrop-blur-xl rounded-3xl p-6 border border-white/10"
            >
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} />
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-rose-500/10">
                  <LineChart className="w-6 h-6 text-rose-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Performance Metrics</h3>
                  <p className="text-white/60">
                    Comprehensive monitoring and optimization of system performance
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Technical Specifications Section */}
          <div className="mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative bg-neutral-900/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10"
            >
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} />
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-indigo-500/10">
                  <Settings className="w-6 h-6 text-indigo-400" />
                </div>
                <h2 className="text-3xl font-bold text-white">Technical Specifications</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Core Features List */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Core Features</h3>
                  <ul className="space-y-3 text-white/60">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4" />
                      Real-time data processing
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4" />
                      Advanced error handling
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4" />
                      Automated testing suite
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4" />
                      Continuous integration
                    </li>
                  </ul>
                </div>
                {/* Technologies List */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Technologies</h3>
                  <ul className="space-y-3 text-white/60">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4" />
                      Next.js & React
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4" />
                      TypeScript
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4" />
                      TailwindCSS
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4" />
                      Framer Motion
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          {/* File Upload Section */}
          <section className="relative w-full py-20">
            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative bg-neutral-900/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10"
              >
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} />
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-2xl bg-blue-500/10">
                    <Upload className="w-6 h-6 text-blue-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Upload Files</h2>
                </div>

                {/* File Upload Cards Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* PCD File Upload Card */}
                  <div className="relative group">
                    <input
                      type="file"
                      accept=".pcd"
                      onChange={(e) => handleFileChange('pcd', e)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    />
                    <div className="relative bg-neutral-800/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10 transition-all duration-300 group-hover:border-blue-500/50">
                      <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} />
                      <div className="flex flex-col items-center text-center gap-4">
                        <div className="p-4 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                          <FileType className="w-8 h-8 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">LIDAR Data (.pcd)</h3>
                          <p className="text-sm text-white/60">Upload your point cloud data file</p>
                        </div>
                        {files.pcd && (
                          <p className="text-sm text-emerald-400 mt-2">
                            Selected: {files.pcd.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Image File Upload Card */}
                  <div className="relative group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange('image', e)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    />
                    <div className="relative bg-neutral-800/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10 transition-all duration-300 group-hover:border-purple-500/50">
                      <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} />
                      <div className="flex flex-col items-center text-center gap-4">
                        <div className="p-4 rounded-xl bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                          <Image className="w-8 h-8 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">Image File</h3>
                          <p className="text-sm text-white/60">Upload your image file</p>
                        </div>
                        {files.image && (
                          <p className="text-sm text-emerald-400 mt-2">
                            Selected: {files.image.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Calibration File Upload Card */}
                  <div className="relative group">
                    <input
                      type="file"
                      accept=".txt,.json,.yaml,.yml"
                      onChange={(e) => handleFileChange('calibration', e)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    />
                    <div className="relative bg-neutral-800/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10 transition-all duration-300 group-hover:border-emerald-500/50">
                      <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} />
                      <div className="flex flex-col items-center text-center gap-4">
                        <div className="p-4 rounded-xl bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                          <DatasetIcon className="w-8 h-8 text-emerald-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">Calibration Data</h3>
                          <p className="text-sm text-white/60">Upload calibration matrices file</p>
                        </div>
                        {files.calibration && (
                          <p className="text-sm text-emerald-400 mt-2">
                            Selected: {files.calibration.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Labels File Upload Card */}
                  <div className="relative group">
                    <input
                      type="file"
                      accept=".txt"
                      onChange={(e) => handleFileChange('labels', e)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    />
                    <div className="relative bg-neutral-800/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10 transition-all duration-300 group-hover:border-amber-500/50">
                      <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} />
                      <div className="flex flex-col items-center text-center gap-4">
                        <div className="p-4 rounded-xl bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors">
                          <FileType className="w-8 h-8 text-amber-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">Labels File</h3>
                          <p className="text-sm text-white/60">Upload labels file (.txt)</p>
                        </div>
                        {files.labels && (
                          <p className="text-sm text-emerald-400 mt-2">
                            Selected: {files.labels.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Process Button Section */}
                <div className="mt-8 flex justify-center">
                  <button
                    className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!files.pcd || !files.image || !files.calibration || !files.labels || processing}
                    onClick={handleProcessFiles}
                  >
                    {processing ? 'Processing...' : 'Process Files'}
                  </button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Output Section */}
          <section className="relative w-full py-10 sm:py-16 md:py-20">
            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative bg-neutral-900/40 backdrop-blur-xl rounded-3xl p-4 sm:p-6 md:p-8 border border-white/10"
              >
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} />
                
                {/* Processing Status Card */}
                <div ref={processingStatusRef} className="relative bg-neutral-800/40 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10 mb-6">
                  <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} />
                  <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
                    <div className="p-3 sm:p-4 rounded-xl bg-blue-500/10">
                      <Settings className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">Processing Status</h3>
                      <p className="text-xs sm:text-sm text-white/60">File Upload & Processing</p>
                    </div>
                    <div className="w-full space-y-2">
                      <div className="flex items-center justify-between bg-neutral-700/30 rounded-lg p-2 text-xs sm:text-sm">
                        <span className="text-white">LIDAR Data</span>
                        <span className={files.pcd ? "text-emerald-400" : "text-rose-400"}>
                          {files.pcd ? "Uploaded" : "Pending"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between bg-neutral-700/30 rounded-lg p-2 text-xs sm:text-sm">
                        <span className="text-white">Image File</span>
                        <span className={files.image ? "text-emerald-400" : "text-rose-400"}>
                          {files.image ? "Uploaded" : "Pending"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between bg-neutral-700/30 rounded-lg p-2 text-xs sm:text-sm">
                        <span className="text-white">Calibration Data</span>
                        <span className={files.calibration ? "text-emerald-400" : "text-rose-400"}>
                          {files.calibration ? "Uploaded" : "Pending"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between bg-neutral-700/30 rounded-lg p-2 text-xs sm:text-sm">
                        <span className="text-white">Labels File</span>
                        <span className={files.labels ? "text-emerald-400" : "text-rose-400"}>
                          {files.labels ? "Uploaded" : "Pending"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between bg-neutral-700/30 rounded-lg p-2 text-xs sm:text-sm">
                        <span className="text-white">Processing Status</span>
                        <span className={processing ? "text-amber-400" : results ? "text-emerald-400" : "text-rose-400"}>
                          {processing ? "Processing..." : results ? "Completed" : "Ready to Process"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image Comparison Card */}
                <div className="relative bg-neutral-800/40 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10 mb-6">
                  <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} />
                  <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
                    <div className="p-3 sm:p-4 rounded-xl bg-indigo-500/10">
                      <Image className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">Image Comparison</h3>
                      <p className="text-xs sm:text-sm text-white/60">Original vs Processed</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-full">
                      <div className="aspect-video bg-neutral-700/30 rounded-lg flex items-center justify-center">
                        {files.image ? (
                          <img 
                            src={URL.createObjectURL(files.image)} 
                            alt="Original" 
                            className="w-full h-full object-contain rounded-lg"
                          />
                        ) : (
                          <span className="text-white/40 text-xs sm:text-sm">Original</span>
                        )}
                      </div>
                      <div className="aspect-video bg-neutral-700/30 rounded-lg flex items-center justify-center">
                        {processedImage ? (
                          <img 
                            src={processedImage} 
                            alt="Processed" 
                            className="w-full h-full object-contain rounded-lg"
                          />
                        ) : (
                          <span className="text-white/40 text-xs sm:text-sm">Processed</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Object Detection Card */}
                <div className="relative bg-neutral-800/40 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10">
                  <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} />
                  <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
                    <div className="p-3 sm:p-4 rounded-xl bg-purple-500/10">
                      <Boxes className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">Object Detection</h3>
                      <p className="text-xs sm:text-sm text-white/60">Detected Objects</p>
                    </div>
                    <div className="w-full space-y-2">
                      {results?.fused_objects.map((obj, index) => (
                        <div key={index} className="flex items-center justify-between bg-neutral-700/30 rounded-lg p-2 text-xs sm:text-sm">
                          <span className="text-white">{obj.category}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-emerald-400">{(obj.confidence * 100).toFixed(1)}%</span>
                            <span className="text-blue-400">{obj.distance.toFixed(1)}m</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
} 