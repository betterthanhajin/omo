import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function OmoModern() {
  const [isHovered, setIsHovered] = useState(false);
  const [currentColor, setCurrentColor] = useState("#FF3366");

  useEffect(() => {
    const colors = ["#FF3366", "#33CCFF", "#FFCC00", "#66FF99"];
    let colorIndex = 0;

    const intervalId = setInterval(() => {
      colorIndex = (colorIndex + 1) % colors.length;
      setCurrentColor(colors[colorIndex]);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-blue-900 opacity-50" />

      {/* Cyber lines */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {[...Array(20)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute h-px bg-cyan-400"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 100}%`,
              top: `${index * 5}%`,
            }}
            animate={{
              scaleX: [0, 1, 1, 0],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Main circular element */}
      <motion.div
        className="relative w-96 h-96"
        animate={{
          rotate: isHovered ? 360 : 0,
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.8 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: currentColor }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute inset-4 rounded-full bg-black flex items-center justify-center"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* <span className="text-white text-4xl font-bold">OMO</span> */}
        </motion.div>
      </motion.div>

      {/* Title */}
      <motion.h1
        className="absolute text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        MY SYNK DIVE
      </motion.h1>
    </div>
  );
}
