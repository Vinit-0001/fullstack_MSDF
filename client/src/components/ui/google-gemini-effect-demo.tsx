"use client";
import { useScroll, useTransform } from "framer-motion";
import React from "react";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";

export function GoogleGeminiEffectDemo() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Faster animations with wider range and quicker progression
  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.2], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.2], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.2], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.2], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.2], [0, 1.2]);

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none"
      ref={ref}
    >
      <GoogleGeminiEffect
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
        className="scale-150"
      />
    </div>
  );
} 