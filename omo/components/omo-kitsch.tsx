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

interface CampbellSoupCanProps {
  id: number;
  backgroundColor: string;
  textColor: string;
  position: { x: number; y: number };
  onDragEnd: (id: number, x: number, y: number) => void;
  isAnimating: boolean;
}

const CampbellSoupCan: React.FC<CampbellSoupCanProps> = ({
  id,
  backgroundColor,
  textColor,
  position,
  onDragEnd,
  isAnimating,
}) => {
  const controls = useDragControls();

  return (
    <motion.div
      drag
      dragControls={controls}
      dragMomentum={false}
      onDragEnd={(event, info) => onDragEnd(id, info.point.x, info.point.y)}
      initial={position}
      animate={isAnimating ? { rotate: [0, 360], scale: [1, 1.1, 1] } : {}}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute top-0 cursor-move"
      style={{ width: 80, height: 112 }}
    >
      <div
        className="w-full h-full rounded-md flex flex-col items-center justify-center overflow-hidden border-2 border-gray-800"
        style={{ backgroundColor }}
      >
        <div className="bg-white p-1 rounded mb-1">
          <span className="text-xs font-bold" style={{ color: textColor }}>
            CAMPBELL'S
          </span>
        </div>
        <div className="bg-white p-1 rounded">
          <span className="text-xs font-bold" style={{ color: textColor }}>
            SOUP
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default function EnhancedOmoKitsch() {
  const [cans, setCans] = useState<
    Array<{
      id: number;
      backgroundColor: string;
      textColor: string;
      position: { x: number; y: number };
    }>
  >([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const newCans = Array(32)
      .fill(null)
      .map((_, index) => ({
        id: index,
        backgroundColor:
          popArtColors[Math.floor(Math.random() * popArtColors.length)],
        textColor:
          popArtColors[Math.floor(Math.random() * popArtColors.length)],
        position: {
          x: window.innerWidth - 100,
          y: window.innerHeight - 140,
        },
      }));
    setCans(newCans);
  }, []);

  const handleDragEnd = (id: number, x: number, y: number) => {
    setCans((prevCans) =>
      prevCans.map((can) =>
        can.id === id ? { ...can, position: { x, y } } : can
      )
    );
  };

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setIsAnimating((prev) => !prev);
    }, 5000);

    return () => clearInterval(animationInterval);
  }, []);

  return (
    <div className="w-full h-screen bg-gray-200 relative overflow-hidden">
      {cans.map((can) => (
        <CampbellSoupCan
          key={can.id}
          {...can}
          onDragEnd={handleDragEnd}
          isAnimating={isAnimating}
        />
      ))}
    </div>
  );
}
