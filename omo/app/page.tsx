"use client";
import { Fragment, useEffect, useState, useRef } from "react";
import { OmoHeader } from "@/components/omo-header";
import OmoSectionOne from "@/components/omo-section-main";
import OmoSection from "@/components/omo-section";
import OmoSectionTwo from "@/components/omo-section-skills";
import OmoSectionThree from "@/components/omo-section-three";
import OmoSectionFour from "@/components/omo-section-four";
import OmoSectionFive from "@/components/omo-section-five";
import { OmoBoard } from "@/components/omo-board";
import { OmoFooter } from "@/components/omo-footer";
import OmoRetro from "../components/omo-retro";
import OmoModern from "../components/omo-modern";
import OmoWaterColor from "../components/omo-water-color";
import OmoSectionSkills from "../components/omo-section-skills";
import OmoSectionMain from "../components/omo-section-main";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [overFlow, setOverFlow] = useState(false);
  const mainRef = useRef<HTMLHtmlElement>(null);
  const totalSlides = 5;
  const components = [
    OmoRetro,
    OmoWaterColor,
    OmoModern,
    OmoSectionSkills,
    OmoSectionMain,
  ];
  const [currentComponentIndex, setCurrentComponentIndex] = useState(-1);

  const CurrentComponent =
    currentComponentIndex !== -1 ? components[currentComponentIndex] : null;

  const handleSwitchToggle = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * components.length);
    } while (newIndex === currentComponentIndex);
    setCurrentComponentIndex(newIndex);
  };

  // useEffect(() => {
  //   if (currentSlide === totalSlides - 1) {
  //     document.body.style.overflowY = "scroll";
  //     document.documentElement.style.overflowY = "scroll";
  //     if (mainRef.current) {
  //       mainRef.current.style.position = "static";
  //     }
  //     setOverFlow(true);
  //   } else {
  //     document.body.style.overflowY = "hidden";
  //     document.documentElement.style.overflowY = "hidden";
  //     console.log("currentSlide***", currentSlide);
  //     if (mainRef.current) {
  //       mainRef.current.style.position = "fixed";
  //       mainRef.current.style.top = "100px";
  //     }
  //     setOverFlow(false);
  //   }
  // }, [currentSlide]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
      } else {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener("wheel", handleWheel);

    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX > touchEndX) {
        setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
      } else {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <>
      <OmoHeader handleSwitchToggle={handleSwitchToggle} />
      <main
        className="h-full w-full p-4 mt-[100px]"
        // style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
        ref={mainRef}
      >
        {CurrentComponent && <CurrentComponent />}
      </main>
      {/* <OmoBoard overFlow={overFlow} /> */}
      <OmoFooter overFlow={overFlow} />
    </>
  );
}
