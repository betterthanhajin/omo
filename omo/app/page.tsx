"use client";
import { useEffect, useState } from "react";
import { OmoHeader } from "@/components/omo-header";
import OmoSectionOne from "@/components/omo-section-one";
import OmoSection from "@/components/omo-section";
import OmoSectionTwo from "@/components/omo-section-two";
import OmoSectionThree from "@/components/omo-section-three";
import OmoSectionFour from "@/components/omo-section-four";
import OmoSectionFive from "@/components/omo-section-five";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 5;

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
      <OmoHeader />
      <main
        className="transition-transform flex"
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
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
    </>
  );
}
