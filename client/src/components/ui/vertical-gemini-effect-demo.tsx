"use client";

import { useScroll, useTransform } from "framer-motion";
import React from "react";
import { VerticalGeminiEffect } from "./vertical-gemini-effect";

export function VerticalGeminiEffectDemo() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);

  return (
    <div
      className="absolute left-6 sm:left-8 md:left-12 inset-y-0 w-px pointer-events-none opacity-50"
      ref={ref}
    >
      <VerticalGeminiEffect
        pathLengths={[pathLengthFirst, pathLengthSecond, pathLengthThird]}
      />
    </div>
  );
} 