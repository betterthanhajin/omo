"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import omoLogo from "@/public/omo-logo.png";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { useMobileSizeCheck } from "@/lib/hook/use-mobile-size-check";
import { OmoSidebar } from "@/components/omo-sidebar"; // 사이드바 컴포넌트 임포트
import { useAutoThemeSwitching } from "@/lib/hook/use-auto-theme";
export function OmoHeader({
  handleSwitchToggle,
  conceptName,
  isRandomEnabled,
  isDarkMode,
  toggleTheme,
}: {
  handleSwitchToggle: (isRandomEnabled: boolean) => void;
  conceptName: string;
  isRandomEnabled: boolean;
  isDarkMode: boolean;
  toggleTheme: () => void;
}) {
  const [currentDate, setCurrentDate] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLSpanElement>(null);
  const isMobile = useMobileSizeCheck();
  const [currentTheme, setCurrentTheme] = useState("retro");
  const {
    autoSwitchEnabled,
    currentMode,
    currentInfo,
    toggleAutoSwitch,
    changeMode,
  } = useAutoThemeSwitching(false, "time", setCurrentTheme);

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

  // 사이드바 토글 함수
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // 테마에 따른 색상 설정
  const themeStyles = {
    backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
    textColor: isDarkMode ? "#e5e7eb" : "#645555",
  };

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

        /* 테마 아이콘 스타일 */
        .theme-icon {
          cursor: pointer;
          padding: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background-color 0.3s;
        }

        .theme-icon:hover {
          background-color: ${isDarkMode ? "#374151" : "#e5e7eb"};
        }
      `}</style>

      {/* 사이드바 컴포넌트 */}
      {isSidebarOpen && (
        <OmoSidebar
          isOpen={isSidebarOpen}
          onClose={() => setSidebarOpen(false)}
          isDarkMode={isDarkMode}
        />
      )}

      <header
        className={`fixed top-0 left-0 right-0 z-50 flex justify-between
         h-[60px] gap2 items-center p-2 w-full transition-colors duration-300 border-b`}
        style={{
          backgroundColor: themeStyles.backgroundColor,
          color: themeStyles.textColor,
        }}
        ref={headerRef}
      >
        <div className="flex items-center sm:gap-2">
          <MenuIcon
            onClick={() => {
              console.log("menu icon clicked");
              toggleSidebar();
            }}
            className="cursor-pointer"
          />
        </div>
        <div className="text-center flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image src={omoLogo} alt="omo logo" width="30" height="30" />

            <span
              className="ml-2 mr-2 font-bold text-md sm:text-xl transition-colors duration-300"
              style={{ color: themeStyles.textColor }}
            >
              {isMobile ? "오모시로이" : "오모시로이 블로그"}
            </span>
          </Link>
        </div>

        {/* 스위치들을 가로로 배치 */}
        <div className="flex items-center gap-4">
          {/* 테마 전환 아이콘 (해/달) */}
          <div className="theme-icon" onClick={toggleTheme}>
            {isDarkMode ? (
              // 달 아이콘 (다크 모드)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="#e5e7eb"
                stroke="#e5e7eb"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            ) : (
              // 해 아이콘 (라이트 모드)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="#f59e0b"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            )}
          </div>

          {/* 기존 랜덤 기능 스위치 */}
          <div>
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
          {/* <>
            <div className="text-xs">
              <div>
                <div className="flex gap-2">
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      value="time"
                      checked={currentMode === "time"}
                      onChange={() => changeMode("time")}
                    />
                    <span>시간대별</span>
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      value="weather"
                      checked={currentMode === "weather"}
                      onChange={() => changeMode("weather")}
                    />
                    <span>날씨별</span>
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      value="season"
                      checked={currentMode === "season"}
                      onChange={() => changeMode("season")}
                    />
                    <span>계절별</span>
                  </label>
                </div>

                {currentInfo && (
                  <div>
                    {currentMode === "time" && (
                      <p>현재 시간대: {currentInfo.period}</p>
                    )}
                    {currentMode === "weather" && (
                      <p>
                        현재 날씨: {currentInfo.condition}, 온도:{" "}
                        {currentInfo.temp}
                        °C
                      </p>
                    )}
                    {currentMode === "season" && (
                      <p>현재 계절: {currentInfo.season}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </> */}
        </div>
      </header>
    </>
  );
}
