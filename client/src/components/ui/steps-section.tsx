"use client";

import { FileImage, Scan, Boxes, GitMerge, LayoutPanelTop } from "lucide-react";
import { motion } from "framer-motion";
import { VerticalGeminiEffectDemo } from "./vertical-gemini-effect-demo";
import { ShapeLandingBackground } from "./shape-landing-hero";

export function StepsSection() {
  const steps = [
    {
      number: "01",
      title: "Preprocessing",
      description: "Loads image (.png) and LiDAR point cloud (.pcd) files. Reads calibration files and labels for object annotation.",
      icon: FileImage,
      color: "from-blue-500/20 to-purple-500/20"
    },
    {
      number: "02",
      title: "Object Detection (YOLOv8)",
      description: "Uses YOLOv8 for detecting objects in the image. Saves and displays the annotated image.",
      icon: Scan,
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      number: "03",
      title: "Point Cloud Processing (Open3D)",
      description: "Reads LiDAR .pcd file and extracts 3D points. Uses DBSCAN for point cloud clustering.",
      icon: Boxes,
      color: "from-pink-500/20 to-blue-500/20"
    },
    {
      number: "04",
      title: "Projection & Fusion",
      description: "Aligns LiDAR points with the image using calibration matrices. Retains only the LiDAR points inside detected bounding boxes.",
      icon: GitMerge,
      color: "from-blue-500/20 to-green-500/20"
    },
    {
      number: "05",
      title: "Visualization",
      description: "Displays the fused image with projected LiDAR data.",
      icon: LayoutPanelTop,
      color: "from-green-500/20 to-purple-500/20"
    }
  ];

  return (
    <section id="steps" className="relative w-full bg-neutral-950/50 py-12 sm:py-16 md:py-20 scroll-mt-20 overflow-hidden">
      <ShapeLandingBackground />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-8 sm:mb-12 md:mb-16"
        >
          Processing Pipeline
        </motion.h2>
        <div className="max-w-5xl mx-auto relative">
          <div className="flex flex-col gap-6 sm:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative group pl-12 sm:pl-16 md:pl-24"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100`}></div>
                <div className="relative bg-neutral-900/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/10">
                  <div className="absolute -left-6 sm:-left-8 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-neutral-800/50 flex items-center justify-center border border-white/5">
                    {<step.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white/70" />}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 sm:gap-4 mb-1 sm:mb-2">
                      <span className="text-lg sm:text-2xl font-bold text-white/30">STEP</span>
                      <span className="text-xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-1 sm:mb-2">{step.title}</h3>
                    <p className="text-sm sm:text-base text-gray-400">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <VerticalGeminiEffectDemo />
        </div>
      </div>
    </section>
  );
} 