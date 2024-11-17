"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { OmoHeader } from "@/components/omo-header";
import { OmoFooter } from "@/components/omo-footer";
import { useMediaQuery } from "react-responsive";
import { motion, AnimatePresence } from "framer-motion";

// Dynamic imports for code splitting
const OmoRetro = dynamic(() => import("../components/omo-retro"));
const OmoWaterColor = dynamic(() => import("../components/omo-water-color"));
const OmoModern = dynamic(() => import("../components/omo-modern"));
const OmoSectionSkills = dynamic(
  () => import("../components/omo-section-skills")
);
const OmoSectionMain = dynamic(() => import("../components/omo-section-main"));
const OmoKitsch = dynamic(() => import("@/components/omo-kitsch"));
const OmoRoadMap = dynamic(() => import("@/components/omo-roadmap"));

const components = [
  OmoRetro,
  // OmoWaterColor,
  // OmoModern,
  // OmoSectionSkills,
  OmoSectionMain,
  OmoKitsch,
  OmoRoadMap,
];
// * , "main", "kitsch" , "skills", "main"
const concepts = ["omo - 01", "omo - 02", "omo - 03", "omo - 04"];

const pageVariants = {
  initial: { opacity: 0, x: "-100%" },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: "100%" },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

const OptimizedHomeComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRandomEnabled, setIsRandomEnabled] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const CurrentComponent = useMemo(
    () => components[currentIndex],
    [currentIndex]
  );
  let newIndex = 0;
  const handleSwitchToggle = useCallback((isEnabled: boolean) => {
    setIsRandomEnabled(isEnabled);
    if (isEnabled) {
      setCurrentIndex(newIndex);
      newIndex++;
      if (newIndex === components.length) {
        newIndex = 0;
      }
    }
  }, []);

  const handleSwipe = useCallback(
    (direction: string) => {
      if (isRandomEnabled) {
        const newIndex = Math.floor(Math.random() * components.length);
        setCurrentIndex(newIndex);
      } else {
        if (direction === "left") {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % components.length);
        } else if (direction === "right") {
          setCurrentIndex(
            (prevIndex) =>
              (prevIndex - 1 + components.length) % components.length
          );
        }
      }
    },
    [isRandomEnabled]
  );

  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].clientX;
      if (touchStartX - touchEndX > 50) {
        handleSwipe("left");
      } else if (touchEndX - touchStartX > 50) {
        handleSwipe("right");
      }
    };

    if (isMobile) {
      window.addEventListener("touchstart", handleTouchStart);
      window.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (isMobile) {
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [isMobile, handleSwipe]);

  return (
    <>
      {" "}
      <OmoHeader
        handleSwitchToggle={handleSwitchToggle}
        conceptName={concepts[currentIndex]}
        isRandomEnabled={isRandomEnabled}
      />
      <main className="absolute top-16 flex-grow w-full h-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="w-full h-full"
          >
            <CurrentComponent />
          </motion.div>
        </AnimatePresence>
      </main>
    </>
  );
};

export default React.memo(OptimizedHomeComponent);
