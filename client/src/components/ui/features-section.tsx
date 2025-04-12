"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import lidarImage from "@/assets/lidar-sensor.png";
import thermalImage from "@/assets/thermal-imagery.png";
import { Button } from "@/components/ui/button";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export function FeaturesSection() {
    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const rect = section.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const targetPosition = scrollTop + rect.top - 80;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="relative w-full bg-neutral-950 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {/* First Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                        <div className="relative bg-neutral-900/50 backdrop-blur-xl rounded-3xl p-6 border border-white/10 h-full">
                            <GlowingEffect
                                spread={40}
                                glow={true}
                                disabled={false}
                                proximity={64}
                                inactiveZone={0.01}
                                borderWidth={2}
                            />
                            <div className="aspect-[4/3] mb-4 overflow-hidden rounded-xl bg-neutral-900/50 backdrop-blur-xl relative">
                                <div className="absolute inset-0 flex items-center justify-center p-6">
                                    <Image 
                                        src={lidarImage}
                                        alt="Ouster LIDAR Sensor"
                                        fill
                                        className="object-contain hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 768px) 80vw, 40vw"
                                        priority
                                    />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">LIDAR</h3>
                            <p className="text-gray-400 text-sm line-clamp-2 mb-4">High-resolution 3D scanning for precise environmental mapping and object detection</p>
                            <Button 
                                variant="outline" 
                                className="w-full hover:bg-blue-500/20"
                                onClick={() => scrollToSection('lidar-card')}
                            >
                                More Info
                            </Button>
                        </div>
                    </motion.div>

                    {/* Second Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                        <div className="relative bg-neutral-900/50 backdrop-blur-xl rounded-3xl p-6 border border-white/10 h-full">
                            <GlowingEffect
                                spread={40}
                                glow={true}
                                disabled={false}
                                proximity={64}
                                inactiveZone={0.01}
                                borderWidth={2}
                            />
                            <div className="aspect-[4/3] mb-4 overflow-hidden rounded-xl bg-neutral-900/50 backdrop-blur-xl relative">
                                <div className="absolute inset-0 flex items-center justify-center p-6">
                                    <Image 
                                        src={thermalImage}
                                        alt="Thermal Imagery Sensor"
                                        fill
                                        className="object-contain hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 768px) 80vw, 40vw"
                                        priority
                                    />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Thermal Imagery</h3>
                            <p className="text-gray-400 text-sm line-clamp-2 mb-4">Advanced thermal sensing for temperature-based detection and monitoring</p>
                            <Button 
                                variant="outline" 
                                className="w-full hover:bg-purple-500/20"
                                onClick={() => scrollToSection('thermal-card')}
                            >
                                More Info
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}