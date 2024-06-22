import { useState, useEffect } from "react";
import Image from "next/image";
import omoLogo from "@/public/omo-logo.svg";
import omoHeart from "@/public/omo-heart.svg";

export function OmoFooter() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString());
  }, []);
  return (
    <footer className="bg-[#645555] w-full h-full p-2">
      <div className="flex justify-center gap-8 items-center">
        <Image src={omoHeart} alt="omo heart" width="40" height="40"></Image>
        <Image src={omoLogo} alt="omo logo" width="40" height="40"></Image>
        <Image src={omoHeart} alt="omo heart" width="40" height="40"></Image>
      </div>
    </footer>
  );
}
