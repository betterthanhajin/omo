import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import omoLogo from "@/public/omo-logo.svg";
import omoHeart from "@/public/omo-heart.svg";

interface OmoFooterProps {
  overFlow: boolean;
}

export function OmoFooter(overFlow: OmoFooterProps) {
  const [currentDate, setCurrentDate] = useState("");
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString());
  }, []);
  useEffect(() => {
    console.log("overFlowpropsfooter", overFlow.overFlow);
    if (overFlow.overFlow) {
      if (footerRef.current) footerRef.current.style.display = "block";
    } else {
      console.log("****footerdisplaynone****");
      if (footerRef.current) footerRef.current.style.display = "none";
    }
  }, [overFlow]);
  return (
    <footer className="bg-[#645555] w-full h-full p-2" ref={footerRef}>
      <div className="flex justify-center gap-8 items-center">
        <Image src={omoHeart} alt="omo heart" width="40" height="40"></Image>
        <Image src={omoLogo} alt="omo logo" width="40" height="40"></Image>
        <Image src={omoHeart} alt="omo heart" width="40" height="40"></Image>
      </div>
    </footer>
  );
}
