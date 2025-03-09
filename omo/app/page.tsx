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
const StarBackground = dynamic(
  () => import("@/components/omo-star-background")
);

const OmoGuestbook = dynamic(() => import("@/components/omo-guest-book"));

const components = [
  OmoRetro,
  OmoGuestbook,
  OmoKitsch,
  OmoRoadMap,
  StarBackground,
];
// * , "main", "kitsch" , "skills", "main"
const concepts = ["omo - 01", "omo - 02", "omo - 03", "omo - 04", "omo - 05"];

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
      setCurrentIndex((prev) => (prev + 1) % components.length);
    }
  }, []);

  const [isDarkMode, setIsDarkMode] = useState(false);

  // 테마 전환 핸들러
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // 테마 변경 시 body 스타일 업데이트
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      document.body.style.backgroundColor = "#111827";
      document.body.style.color = "black";
    } else {
      document.body.classList.remove("dark-mode");
      document.body.style.backgroundColor = "#ffffff";
      document.body.style.color = "#1f2937";
    }
  }, [isDarkMode]);

  // 로컬 스토리지에서 테마 설정 불러오기
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  // 테마 설정 저장하기
  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

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
};

export default React.memo(OptimizedHomeComponent);
