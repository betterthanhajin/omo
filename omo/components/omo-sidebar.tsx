"use client";
import { X } from "lucide-react";
import Link from "next/link";

export function OmoSidebar({
  isOpen,
  onClose,
  isDarkMode,
}: {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}) {
  // 테마에 따른 색상 설정
  const themeStyles = {
    sidebarBg: isDarkMode ? "#111827" : "#f3f4f6",
    sidebarText: isDarkMode ? "#e5e7eb" : "#1f2937",
    sidebarHover: isDarkMode ? "#374151" : "#e5e7eb",
  };

  return (
    <>
      <style jsx>{`
        /* 사이드바 스타일 */
        .sidebar {
          position: fixed;
          top: 0;
          left: ${isOpen ? "0" : "-300px"};
          width: 250px;
          height: 100vh;
          background-color: ${themeStyles.sidebarBg};
          transition: left 0.3s ease;
          z-index: 100;
          box-shadow: ${isOpen ? "0 0 10px rgba(0,0,0,0.2)" : "none"};
          padding-top: 60px;
        }

        .sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 60;
          display: ${isOpen ? "block" : "none"};
        }

        .sidebar-item {
          padding: 15px 20px;
          display: block;
          color: ${themeStyles.sidebarText};
          transition: background-color 0.2s;
          font-weight: 500;
        }

        .sidebar-item:hover {
          background-color: ${themeStyles.sidebarHover};
        }

        .sidebar-close {
          position: absolute;
          top: 15px;
          right: 15px;
          cursor: pointer;
          color: ${themeStyles.sidebarText};
        }
      `}</style>

      {/* 사이드바 오버레이 */}
      <div className="sidebar-overlay" onClick={onClose}></div>

      {/* 사이드바 */}
      <div className="sidebar p-4">
        <div className="sidebar-close" onClick={onClose}>
          <X size={24} />
        </div>
        <Link
          href="/board"
          className="sidebar-item block p-2"
          onClick={onClose}
        >
          omo-board
        </Link>
        <Link
          href="/guestbook"
          className="sidebar-item block p-2"
          onClick={onClose}
        >
          omo-guestbook
        </Link>
        <Link href="/game" className="sidebar-item block p-2" onClick={onClose}>
          omo-game
        </Link>
        <Link
          href="/road-map"
          className="sidebar-item block p-2"
          onClick={onClose}
        >
          omo-roadmap
        </Link>
        <Link
          href="/space"
          className="sidebar-item block p-2"
          onClick={onClose}
        >
          omo-space
        </Link>
      </div>
    </>
  );
}
