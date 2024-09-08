import React, { useState, useEffect, MouseEvent } from "react";
import { motion } from "framer-motion";

// 모네의 작품에서 영감을 받은 색상 팔레트
const colors = [
  "#FF9AA2",
  "#FFB7B2",
  "#FFDAC1",
  "#E2F0CB",
  "#B5EAD7",
  "#C7CEEA",
];

const BrushStroke = ({
  color,
  index,
  mousePosition,
}: {
  color: string;
  index: number;
  mousePosition: { x: number; y: number };
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const followMouse = () => {
      const delay = index * 50;
      setTimeout(() => {
        setPosition({
          x: mousePosition.x + Math.sin(index) * 30,
          y: mousePosition.y + Math.cos(index) * 30,
        });
        setRotation(Math.random() * 360); // 랜덤한 회전 각도
      }, delay);
    };

    followMouse();
  }, [mousePosition, index]);

  return (
    <motion.div
      className="absolute w-32 h-32 rounded-full mix-blend-multiply pointer-events-none"
      style={{
        backgroundColor: color,
        filter: "url(#watercolor)",
        opacity: 0.7,
      }}
      animate={{
        x: position.x,
        y: position.y,
        rotate: rotation,
        scale: [1, 1.1, 1],
      }}
      transition={{
        type: "spring",
        stiffness: 60,
        damping: 15,
      }}
    />
  );
};

export default function ImpressionistWaterColor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);

  const handleMouseMove = (event: MouseEvent) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="relative h-screen bg-gradient-to-br from-blue-100 to-yellow-100 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <filter id="watercolor" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01"
              numOctaves="3"
              seed="5"
            />
            <feDisplacementMap in="SourceGraphic" scale="30" />
            <feGaussianBlur stdDeviation="3" />
            <feComposite in="SourceGraphic" operator="atop" />
          </filter>
          <radialGradient
            id="sunlight"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor="yellow" stopOpacity="0.3" />
            <stop offset="100%" stopColor="orange" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {colors.map((color, index) => (
        <BrushStroke
          key={color}
          color={color}
          index={index}
          mousePosition={mousePosition}
        />
      ))}

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "url(#sunlight)" }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.7, 0.5],
          x: Math.sin(time * 0.1) * 50,
          y: Math.cos(time * 0.1) * 50,
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-0 bg-blue-400 mix-blend-overlay pointer-events-none"
        animate={{
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* <h2 className="absolute top-8 left-1/2 transform -translate-x-1/2 text-6xl font-serif text-gray-800 tracking-wide pointer-events-none opacity-70">
        Impressions
      </h2> */}
    </div>
  );
}
