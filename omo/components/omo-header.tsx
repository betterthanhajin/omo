import { useState, useEffect } from "react";
import Image from "next/image";
import omoLogo from "@/public/omo-logo.svg";

export function OmoHeader({
  handleSwitchToggle,
}: {
  handleSwitchToggle: () => void;
}) {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString());

    // 헤더의 높이를 CSS 변수로 설정
    const header = document.querySelector("header");
    if (header) {
      const height = header.offsetHeight;
      document.documentElement.style.setProperty(
        "--header-height",
        `${height}px`
      );
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-2 sm:px-6 py-2 bg-[#FEA1A1] w-full text-[#645555]">
      <div className="flex items-center gap-1 sm:gap-2">
        <Image
          src={omoLogo}
          alt="omo logo"
          width="40"
          height="40"
          className="sm:w-[70px] sm:h-[70px]"
        />
        <span className="font-semibold text-xs sm:text-base">
          LEE
          <br />
          HAJIN
        </span>
      </div>

      <div className="text-center">
        <span className="font-bold text-xl sm:text-5xl text-[#645555]">
          My Tech Blog
        </span>
      </div>

      <div className="flex flex-col items-end">
        <span className="font-semibold text-xs sm:text-base">omoshiroi</span>
        <div className="flex justify-end">
          <label className="switch">
            <input type="checkbox" onChange={handleSwitchToggle} />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="text-[10px] sm:text-xs whitespace-nowrap">
          switching concept!!
        </div>
        <div className="text-[10px] sm:text-sm">{currentDate}</div>
      </div>
    </header>
  );
}
