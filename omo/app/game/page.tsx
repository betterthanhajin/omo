"use client";
import { OmoHeader } from "@/components/omo-header";
import React, { useState, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { useMediaQuery } from "react-responsive";
import { motion, AnimatePresence } from "framer-motion";
import OmoGuestbook from "@/components/omo-guest-book";

export default function Page() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRandomEnabled, setIsRandomEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const OmoRetro = dynamic(() => import("../../components/omo-retro"));
  const OmoWaterColor = dynamic(
    () => import("../../components/omo-water-color")
  );
  const OmoModern = dynamic(() => import("../../components/omo-modern"));
  const OmoSectionSkills = dynamic(
    () => import("../../components/omo-section-skills")
  );

  const OmoKitsch = dynamic(() => import("@/components/omo-kitsch"));
  const OmoRoadMap = dynamic(() => import("@/components/omo-roadmap"));
  const StarBackground = dynamic(
    () => import("@/components/omo-star-background")
  );

  const components = [OmoKitsch];
  let newIndex = 0;
  const CurrentComponent = useMemo(
    () => components[currentIndex],
    [currentIndex]
  );

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

  const handleSwitchToggle = useCallback((isEnabled: boolean) => {
    setIsRandomEnabled(isEnabled);
    if (isEnabled) {
      setCurrentIndex((prev) => (prev + 1) % components.length);
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <>
      <OmoHeader
        handleSwitchToggle={handleSwitchToggle}
        conceptName="블로그"
        isRandomEnabled={isRandomEnabled}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <main
        className={`min-h-screen flex-grow w-full h-full overflow-y-scroll scrollbar-none ${
          isDarkMode ? "dark" : "light"
        }`}
      >
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
}
