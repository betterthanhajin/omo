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
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-2 bg-white w-full h-[100px] text-[#645555]">
        <div className="flex items-center gap-2">
          <Image src={omoLogo} alt="omo logo" width="70" height="70"></Image>
          <span className="font-semibold">
            LEE
            <br />
            HAJIN
          </span>
        </div>

        <div>
          <span className="font-bold text-5xl text-[#645555]">
            My Tech Blog
          </span>
        </div>
        <div>
          <span className="font-semibold block text-right">omoshiroi</span>
          <div className="flex justify-end">
            <label className="switch">
              <input type="checkbox" onChange={handleSwitchToggle} />
              <span className="slider round"></span>
            </label>
          </div>
          <span className="text-xs block text-right">switching concept!!</span>
          <div className="text-right text-sm">{currentDate}</div>
        </div>
      </header>
    </>
  );
}
