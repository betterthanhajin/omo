"use client";
import { Fragment, useEffect, useState, useRef } from "react";
import { OmoHeader } from "@/components/omo-header";
import OmoSectionOne from "@/components/omo-section-one";
import OmoSection from "@/components/omo-section";
import OmoSectionTwo from "@/components/omo-section-two";
import OmoSectionThree from "@/components/omo-section-three";
import OmoSectionFour from "@/components/omo-section-four";
import OmoSectionFive from "@/components/omo-section-five";
import { OmoBoard } from "@/components/omo-board";
import { OmoFooter } from "@/components/omo-footer";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const mainRef = useRef<HTMLHtmlElement>(null);
  const totalSlides = 5;

  useEffect(() => {
    if (currentSlide === totalSlides - 1) {
      document.body.style.overflowY = "scroll";
      document.documentElement.style.overflowY = "scroll";
      if (mainRef.current) {
        mainRef.current.style.position = "static";
      }
    } else {
      document.body.style.overflowY = "hidden";
      document.documentElement.style.overflowY = "hidden";
    }
  }, [currentSlide]);

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
      <div>
        <OmoHeader />
        <main
          className="transition-transform flex fixed top-[100px] left-0 h-full w-full"
          style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
          ref={mainRef}
        >
          <OmoSection backgroundColor="#FEA1A1">
            <OmoSectionOne />
          </OmoSection>
          <OmoSection backgroundColor="#FFBCBC">
            <OmoSectionTwo />
          </OmoSection>
          <OmoSection backgroundColor="#FEA1A1">
            <OmoSectionThree />
          </OmoSection>
          <OmoSection backgroundColor="#FFBCBC" block={{ display: "block" }}>
            <OmoSectionFour />
          </OmoSection>
          <OmoSection backgroundColor="#FEA1A1" block={{ display: "block" }}>
            <OmoSectionFive />
          </OmoSection>
        </main>
        <OmoBoard />
        <OmoFooter />
      </div>
    </>
  );
}
