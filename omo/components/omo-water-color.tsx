import React, { useState, useEffect, MouseEvent } from "react";
import { motion } from "framer-motion";

const colors = [
  "#FF9AA2",
  "#FFB7B2",
  "#FFDAC1",
  "#E2F0CB",
  "#B5EAD7",
  "#C7CEEA",
];

const WaterColorCircle = ({
  color,
  index,
  mousePosition,
}: {
  color: string;
  index: number;
  mousePosition: { x: number; y: number };
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const followMouse = () => {
      const delay = index * 100; // Each circle has a slightly different delay
      setTimeout(() => {
        setPosition({
          x: mousePosition.x + Math.sin(index) * 50, // Add some offset to prevent complete overlap
          y: mousePosition.y + Math.cos(index) * 50,
        });
      }, delay);
    };

    followMouse();
  }, [mousePosition, index]);

  return (
    <motion.div
      className="absolute w-64 h-64 rounded-full filter mix-blend-multiply pointer-events-none"
      style={{
        backgroundColor: color,
        filter: "url(#watercolor)",
        opacity: 0.7,
      }}
      animate={{
        x: position.x,
        y: position.y,
        scale: [1, 1.2, 1],
      }}
      transition={{
        type: "spring",
        stiffness: 50,
        damping: 20,
      }}
    />
  );
};

export default function OmoWaterColor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: MouseEvent) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  return (
    <div
      className="relative h-screen bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <filter id="watercolor" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01"
              numOctaves="5"
              seed="5"
            />
            <feDisplacementMap in="SourceGraphic" scale="50" />
            <feGaussianBlur stdDeviation="5" />
            <feComposite in="SourceGraphic" operator="atop" />
          </filter>
          <radialGradient
            id="spotlight"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor="white" stopOpacity="0.3" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {colors.map((color, index) => (
        <WaterColorCircle
          key={color}
          color={color}
          index={index}
          mousePosition={mousePosition}
        />
      ))}

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "url(#spotlight)" }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.7, 0.5, 0.7],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* <h2 className="absolute top-8 left-1/2 transform -translate-x-1/2 text-6xl font-serif text-gray-800 tracking-wide pointer-events-none">
        Watercolor
      </h2> */}
    </div>
  );
}
