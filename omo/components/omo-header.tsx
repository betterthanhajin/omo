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
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-2 bg-[#FEA1A1] w-full text-[#645555]">
      <div className="flex items-center gap-2 mb-2 sm:mb-0">
        <Image
          src={omoLogo}
          alt="omo logo"
          width="50"
          height="50"
          className="sm:w-[70px] sm:h-[70px]"
        />
        <span className="font-semibold text-sm sm:text-base">
          LEE
          <br />
          HAJIN
        </span>
      </div>

      <div className="mb-2 sm:mb-0 text-center sm:text-left">
        <span className="font-bold text-3xl sm:text-5xl text-[#645555]">
          My Tech Blog
        </span>
      </div>

      <div className="flex flex-col items-center sm:items-end">
        <span className="font-semibold block text-center sm:text-right text-sm sm:text-base">
          omoshiroi
        </span>
        <div className="flex justify-center sm:justify-end">
          <label className="switch">
            <input type="checkbox" onChange={handleSwitchToggle} />
            <span className="slider round"></span>
          </label>
        </div>
        <span className="text-xs block text-center sm:text-right">
          switching concept!!
        </span>
        <div className="text-center sm:text-right text-xs sm:text-sm">
          {currentDate}
        </div>
      </div>
    </header>
  );
}
