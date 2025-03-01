import React, { useState } from "react";
import { motion } from "framer-motion";
import { OmoBoard } from "./omo-board";
import { omoState } from "@/lib/state/omo-state";

export default function OmoRetro() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {!isHovered && omoState.showThemeRandering ? (
        <div
          className="relative h-full bg-gradient-to-br bg-pink-400 overflow-x-hidden"
          style={{
            transition: "background-color 0.5s ease-in-out",
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 h-full grid grid-cols-8 grid-rows-8">
            {[...Array(128)].map((_, index) => (
              <motion.div
                key={index}
                className="bg-white"
                style={{
                  backgroundColor: getRandomColor(),
                }}
                animate={{
                  opacity: isPlaying ? [0.2, 1, 0.2] : 0.2,
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: Math.random() * 0.5,
                }}
                onHoverStart={() => {
                  setIsHovered(true);
                }}
                onTouchStart={() => {
                  setIsHovered(true);
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <OmoBoard overFlow={true} />
      )}
    </>
  );
}

function getRandomColor() {
  const colors = [
    "rgba(255, 107, 107, 0.5)",
    "rgba(78, 205, 196, 0.5)",
    "rgba(69, 183, 209, 0.5)",
    "rgba(253, 203, 110, 0.5)",
    "rgba(108, 92, 231, 0.5)",
    "rgba(85, 230, 193, 0.5)",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
