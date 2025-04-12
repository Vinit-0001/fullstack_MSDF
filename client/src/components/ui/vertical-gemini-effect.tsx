"use client";

import { motion, MotionValue } from "framer-motion";

export const VerticalGeminiEffect = ({
  pathLengths,
}: {
  pathLengths: MotionValue<number>[];
}) => {
  return (
    <div className="absolute inset-0 w-px">
      <svg
        viewBox="0 0 2 400"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        <motion.path
          d="M1 0L1 400"
          stroke="url(#pulse-1)"
          strokeWidth={0.4}
          strokeLinecap="round"
          style={{
            pathLength: pathLengths[0],
          }}
        />
        <motion.path
          d="M1 0L1 400"
          stroke="url(#pulse-2)"
          strokeWidth={0.4}
          strokeLinecap="round"
          style={{
            pathLength: pathLengths[1],
          }}
        />
        <motion.path
          d="M1 0L1 400"
          stroke="url(#pulse-3)"
          strokeWidth={0.4}
          strokeLinecap="round"
          style={{
            pathLength: pathLengths[2],
          }}
        />
        <defs>
          <linearGradient
            id="pulse-1"
            gradientUnits="userSpaceOnUse"
            x1="1"
            y1="0"
            x2="1"
            y2="400"
          >
            <stop stopColor="#8B5CF6" />
            <stop offset="0.5" stopColor="#EC4899" />
            <stop offset="1" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient
            id="pulse-2"
            gradientUnits="userSpaceOnUse"
            x1="1"
            y1="0"
            x2="1"
            y2="400"
          >
            <stop stopColor="#6EE7B7" />
            <stop offset="0.5" stopColor="#3B82F6" />
            <stop offset="1" stopColor="#6EE7B7" />
          </linearGradient>
          <linearGradient
            id="pulse-3"
            gradientUnits="userSpaceOnUse"
            x1="1"
            y1="0"
            x2="1"
            y2="400"
          >
            <stop stopColor="#F43F5E" />
            <stop offset="0.5" stopColor="#F59E0B" />
            <stop offset="1" stopColor="#F43F5E" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}; 