"use client"

import { BackgroundPaths } from "@/components/ui/background-paths"
import { FeaturesSection } from "@/components/ui/features-section"
import { NavBarDemo } from "@/components/ui/nav-bar-demo"
import { GoogleGeminiEffectDemo } from "@/components/ui/google-gemini-effect-demo"
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { StepsSection } from "@/components/ui/steps-section"
import Image from "next/image"
import pcdFile from "@/assets/pcd_file.png"
import thermalOutput from "@/assets/thermal_output.png"

export default function Home() {
  return (
        <main className="min-h-screen">
            <NavBarDemo />
            <BackgroundPaths title="Welcome to MSDF" />
            
            {/* Sensors Section with Animation */}
            <section className="relative w-full bg-neutral-950 overflow-hidden">
                <div id="sensors" className="relative min-h-[60vh] flex items-center">
                    <GoogleGeminiEffectDemo />
                    <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-6">
                            Sensors
                        </h2>
                        <p className="text-lg sm:text-xl text-center text-white/60 max-w-3xl mx-auto">
                            Advanced sensing technologies for precise environmental mapping and thermal analysis
                        </p>
                    </div>
                </div>
            </section>

            {/* Features Section with Sensor Cards */}
            <FeaturesSection />

            {/* Sensor Details Section */}
            <div id="sensor-details" className="relative w-full min-h-screen bg-neutral-950 py-20 scroll-mt-20 overflow-hidden">
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
                <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-white">Sensor Details</h2>
                    <div className="w-full">
                        <div className="flex flex-col gap-8">
                            <div id="lidar-card" className="relative bg-neutral-900/40 backdrop-blur-xl rounded-3xl p-6 border border-white/10 scroll-mt-32 hover:bg-neutral-900/50 transition-colors">
                                <GlowingEffect
                                    spread={40}
                                    glow={true}
                                    disabled={false}
                                    proximity={64}
                                    inactiveZone={0.01}
                                    borderWidth={2}
                                />
                                <div className="flex flex-col lg:flex-row gap-6 items-start">
                                    <div className="flex-1 min-w-[300px]">
                                        <h3 className="text-2xl font-bold text-white mb-4">LIDAR Technology</h3>
                                        <p className="text-gray-400 flex flex-col gap-2">
                                            <span>• High-precision 3D mapping capabilities with advanced environmental scanning</span>
                                            <span>• Millimeter-level measurement accuracy</span>
                                            <span>• Comprehensive point cloud data generation</span>
                                            <span>• Perfect for precise measurement applications</span>
                                        </p>
        </div>
                                    <div className="relative w-full lg:w-[500px] aspect-[16/9] rounded-lg overflow-hidden">
          <Image
                                            src={pcdFile}
                                            alt="PCD File Visualization"
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 500px"
                                            className="object-cover rounded-lg"
                                            loading="lazy"
                                            quality={85}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div id="thermal-card" className="relative bg-neutral-900/40 backdrop-blur-xl rounded-3xl p-6 border border-white/10 scroll-mt-32 hover:bg-neutral-900/50 transition-colors">
                                <GlowingEffect
                                    spread={40}
                                    glow={true}
                                    disabled={false}
                                    proximity={64}
                                    inactiveZone={0.01}
                                    borderWidth={2}
                                />
                                <div className="flex flex-col lg:flex-row gap-6 items-start">
                                    <div className="flex-1 min-w-[300px]">
                                        <h3 className="text-2xl font-bold text-white mb-4">Thermal Imaging System</h3>
                                        <p className="text-gray-400 flex flex-col gap-2">
                                            <span>• State-of-the-art thermal imaging technology for accurate temperature detection and heat mapping</span>
                                            <span>• Ideal for surveillance, monitoring, and safety applications</span>
                                            <span>• Real-time temperature analysis and visualization</span>
                                            <span>• Advanced heat pattern recognition capabilities</span>
                                        </p>
                                    </div>
                                    <div className="relative w-full lg:w-[500px] aspect-[16/9] rounded-lg overflow-hidden">
          <Image
                                            src={thermalOutput}
                                            alt="Thermal Imaging Output"
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 500px"
                                            className="object-cover rounded-lg"
                                            loading="lazy"
                                            quality={85}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    </div>

            {/* Implementation Steps Section */}
            <StepsSection />
        </main>
    )
}
