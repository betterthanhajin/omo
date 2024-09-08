import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import omoLogo from "@/public/omo-logo.svg";
import omoHeart from "@/public/omo-heart.svg";

interface OmoFooterProps {
  overFlow: boolean;
}

export function OmoFooter({ overFlow }: OmoFooterProps) {
  const [currentDate, setCurrentDate] = useState("");
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

  // useEffect(() => {
  //   console.log("overFlowpropsfooter", overFlow.overFlow);
  //   if (overFlow.overFlow) {
  //     if (footerRef.current) footerRef.current.style.display = "block";
  //   } else {
  //     console.log("****footerdisplaynone****");
  //     if (footerRef.current) footerRef.current.style.display = "none";
  //   }
  // }, [overFlow]);

  // * ${overFlow ? "block" : "hidden"}
  return (
    <footer
      className={`fixed bottom-0 left-0 right-0 bg-[#645555] w-full p-2 
        `}
      ref={footerRef}
    >
      <div className="flex justify-center gap-4 sm:gap-8 items-center">
        <Image
          src={omoHeart}
          alt="omo heart"
          width="30"
          height="30"
          className="sm:w-[40px] sm:h-[40px]"
        />
        <Image
          src={omoLogo}
          alt="omo logo"
          width="30"
          height="30"
          className="sm:w-[40px] sm:h-[40px]"
        />
        <Image
          src={omoHeart}
          alt="omo heart"
          width="30"
          height="30"
          className="sm:w-[40px] sm:h-[40px]"
        />
      </div>
    </footer>
  );
}
