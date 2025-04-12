"use client";

import { motion } from "framer-motion";
import { GradientButton } from "@/components/ui/gradient-button";

function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        color: `rgba(255,255,255,${0.03 + i * 0.01})`,
        width: 0.5 + i * 0.03,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full text-white/20"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.1 + path.id * 0.02}
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.3, 0.6, 0.3],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 10 + Math.random() * 5,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function BackgroundPaths({
    title = "Background Paths",
    children,
}: {
    title?: string;
    children?: React.ReactNode;
}) {
    const scrollToSensors = () => {
        const sensorsSection = document.getElementById('sensors');
        if (sensorsSection) {
            const viewportHeight = window.innerHeight;
            const rect = sensorsSection.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const targetPosition = scrollTop + rect.top - 80;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };

    const words = title.split(" ");

    return (
        <div className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-neutral-950">
            <div className="absolute inset-0">
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="max-w-4xl mx-auto py-12 sm:py-16 lg:py-20"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 
                    font-bold mb-6 sm:mb-8 md:mb-10 tracking-tighter px-4">
                        {words.map((word, i) => (
                            <span key={i} className="inline-block">
                                {word}{" "}
                            </span>
                        ))}
                    </h1>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4">
                        <GradientButton 
                            className="gradient-button w-full sm:w-auto min-w-[200px]"
                            href="/implementation"
                        >
                            <span className="flex items-center justify-center">
                                Implementation
                                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>
                            </span>
                        </GradientButton>
                        <GradientButton 
                            className="gradient-button gradient-button-variant w-full sm:w-auto min-w-[200px]"
                            onClick={scrollToSensors}
                        >
                            <span className="flex items-center justify-center">
                                Info
                                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>
                            </span>
                        </GradientButton>
                    </div>
                    {children}
                </motion.div>
            </div>
        </div>
    );
}