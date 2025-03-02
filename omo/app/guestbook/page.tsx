"use client";
import OmoPostIt from "@/components/omo-postIt";
import { OmoHeader } from "@/components/omo-header";
import OmoRetro from "@/components/omo-retro";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { OmoFooter } from "@/components/omo-footer";
import { useMediaQuery } from "react-responsive";
import { motion, AnimatePresence } from "framer-motion";

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
  const OmoSectionMain = dynamic(
    () => import("../../components/omo-section-main")
  );
  const OmoKitsch = dynamic(() => import("@/components/omo-kitsch"));
  const OmoRoadMap = dynamic(() => import("@/components/omo-roadmap"));
  const StarBackground = dynamic(
    () => import("@/components/omo-star-background")
  );

  const components = [
    OmoRetro,
    // OmoWaterColor,
    // OmoModern,
    // OmoSectionSkills,
    OmoSectionMain,
    OmoKitsch,
    OmoRoadMap,
    StarBackground,
  ];
  let newIndex = 0;
  const CurrentComponent = useMemo(
    () => components[currentIndex],
    [currentIndex]
  );

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
      <OmoPostIt />
    </>
  );
}
