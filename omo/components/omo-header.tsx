import { useState, useEffect } from "react";
import Image from "next/image";
import omoLogo from "@/public/omo-logo.svg";

const RedHearts = ({ className }: { className?: string }) => (
  <div className={className}>
    <svg
      width="82"
      height="62"
      viewBox="0 0 142 127"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="90.4976"
        cy="63.3438"
        rx="29.5"
        ry="56"
        transform="rotate(25.6223 90.4976 63.3438)"
        fill="#FD5353"
      />
      <ellipse
        cx="49.1822"
        cy="63.0937"
        rx="29.5"
        ry="56"
        transform="rotate(-23.21 49.1822 63.0937)"
        fill="#FD5353"
      />
    </svg>
  </div>
);

export function OmoHeader({
  handleSwitchToggle,
  conceptName,
}: {
  handleSwitchToggle: () => void;
  conceptName: string;
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
    <>
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 4s linear infinite;
        }
      `}</style>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-2 sm:px-6 pt-2 bg-[#FEA1A1] w-full text-[#645555]">
        <div className="flex items-center gap-1 sm:gap-2">
          <Image
            src={omoLogo}
            alt="omo logo"
            width="40"
            height="40"
            className="sm:w-[70px] sm:h-[70px]"
          />
          <span className="font-semibold text-xs sm:text-base">
            OMO
            <br />
            Tech Blog
          </span>
        </div>

        <div className="text-center flex items-center">
          <div className="space-x-2 sm:flex hidden">
            {[...Array(3)].map((_, i) => (
              <RedHearts key={i} className="animate-spin" />
            ))}
          </div>
          <span className="font-bold text-xl sm:text-5xl text-[#645555]">
            Hajin Tech Blog
          </span>
          <div className="space-x-2 sm:flex hidden">
            {[...Array(3)].map((_, i) => (
              <RedHearts key={i} className="animate-spin" />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="font-semibold text-xs sm:text-2xl">
            <span>{conceptName ?? "kitcsh"}</span>
          </div>
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
    </>
  );
}
