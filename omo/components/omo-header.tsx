import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import omoLogo from "@/public/omo-logo.png";
import Link from "next/link";

export function OmoHeader({
  handleSwitchToggle,
  conceptName,
  isRandomEnabled,
}: {
  handleSwitchToggle: (isRandomEnabled: boolean) => void;
  conceptName: string;
  isRandomEnabled: boolean;
}) {
  const [currentDate, setCurrentDate] = useState("");
  const headerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString());
    // 헤더의 높이를 CSS 변수로 설정
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight;
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
      <header
        className="fixed top-0 left-0 right-0 z-50 flex justify-center h-[60px] sm:gap-12 gap-0 items-center p-2 sm:px-6 w-full text-[#645555]"
        ref={headerRef}
      >
        <div className="flex items-center sm:gap-2">
          <Link href="/">
            <Image src={omoLogo} alt="omo logo" width="60" height="60" />
          </Link>
        </div>
        <div className="text-center flex items-center">
          <span className="ml-2 mr-2 font-bold text-[1rem] sm:text-xl text-[#645555]">
            오모시로이 블로그
          </span>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-end">
            <label className="switch">
              <input
                type="checkbox"
                checked={isRandomEnabled}
                onChange={() => handleSwitchToggle(!isRandomEnabled)}
              />
              <span
                className={`slider round ${
                  isRandomEnabled ? "bg-pink-400" : "bg-gray-400"
                }`}
                ref={sliderRef}
              ></span>
            </label>
          </div>
          {/* <div className="text-[10px] sm:text-xs whitespace-nowrap flex justify-center mt-[0.1rem]">
            {isRandomEnabled ? "switch on !" : "switch off !"}
          </div> */}
        </div>
      </header>
    </>
  );
}
