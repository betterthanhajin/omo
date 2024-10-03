import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDragControls } from "framer-motion";

const popArtColors = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#FDCB6E",
  "#6C5CE7",
  "#E84393",
  "#74B9FF",
  "#55EFC4",
  "#FFA502",
  "#D980FA",
];

type AnimationType = "rotate" | "pulse" | "bounce" | "";

interface CampbellSoupCanProps {
  id: number;
  delay: number;
  animationType: AnimationType;
  backgroundColor: string;
  textColor: string;
  onDragEnd: (id: number, x: number, y: number) => void;
}

const CampbellSoupCan: React.FC<CampbellSoupCanProps> = ({
  id,
  delay,
  animationType,
  backgroundColor,
  textColor,
  onDragEnd,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const getAnimationClass = () => {
    switch (animationType) {
      case "rotate":
        return "animate-spin";
      case "pulse":
        return "animate-pulse";
      case "bounce":
        return "animate-bounce";
      default:
        return "";
    }
  };
  const controls = useDragControls();
  return (
    <motion.div
      drag
      dragControls={controls}
      onDragEnd={(event, info) => onDragEnd(id, info.point.x, info.point.y)}
    >
      <div
        className={`w-full h-full flex items-center justify-center ${
          isAnimating ? getAnimationClass() : ""
        }`}
        style={{ transition: "all 0.5s ease-in-out" }}
      >
        <div
          className="w-20 h-28 rounded-md flex flex-col items-center justify-center overflow-hidden border-2 border-gray-800"
          style={{ backgroundColor }}
        >
          <div className="bg-white p-1 rounded mb-1">
            <span className="text-xs font-bold" style={{ color: textColor }}>
              CAMPBELLS
            </span>
          </div>
          <div className="bg-white p-1 rounded">
            <span className="text-xs font-bold" style={{ color: textColor }}>
              SOUP
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
interface CanData {
  id: number;
  delay: number;
  animationType: AnimationType;
  backgroundColor: string;
  textColor: string;
}

export default function OmoKitsch() {
  const [cans, setCans] = useState<CanData[]>([]);
  const handleDragEnd = (id: number, x: number, y: number) => {
    setCans((prevCans) =>
      prevCans.map((can) =>
        can.id === id ? { ...can, position: { x, y } } : can
      )
    );
  };

  useEffect(() => {
    const animations: AnimationType[] = ["rotate", "pulse", "bounce", ""];
    const newCans: CanData[] = Array(32)
      .fill(null)
      .map((_, index) => ({
        id: index,
        delay: Math.random() * 5000,
        animationType:
          animations[Math.floor(Math.random() * animations.length)],
        backgroundColor:
          popArtColors[Math.floor(Math.random() * popArtColors.length)],
        textColor:
          popArtColors[Math.floor(Math.random() * popArtColors.length)],
      }));
    setCans(newCans);
  }, []);

  return (
    <div className="w-full h-full bg-gray-200 sm:overflow-hidden overflow-y-scroll scroll-width-none">
      <div className="grid sm:grid-cols-8 grid-cols-2 gap-8 p-16">
        {cans.map((can) => (
          <CampbellSoupCan
            id={can.id}
            key={can.id}
            delay={can.delay}
            animationType={can.animationType}
            backgroundColor={can.backgroundColor}
            onDragEnd={handleDragEnd}
            textColor={can.textColor}
          />
        ))}
      </div>
    </div>
  );
}
