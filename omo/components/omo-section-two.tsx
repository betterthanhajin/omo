import Image from "next/image";
import omoLogo from "@/public/omo-logo.svg";
import { useState, useEffect } from "react";

export default function OmoSectionTwo() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#F7B731"];
  useEffect(() => {
    const moveCircle = () => {
      const newX = Math.random() * 100; // 0% to 100%
      const newY = Math.random() * 100; // 0% to 100%
      setPosition({ x: newX, y: newY });
    };

    moveCircle(); // Initial position
    const interval = setInterval(moveCircle, 2000); // Move every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section>
        <div className="w-full h-full relative">
          <div className="flex">
            <div
              className="absolute flex justify-center items-center w-[250px] h-[250px] rounded-full bg-[#E7E7E7]"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                transition: "all 2s ease",
              }}
            >
              <span className="text-[#645555] font-semibold">NODEJS</span>
            </div>
            <div className="absolute flex justify-center items-center w-[250px] h-[250px] rounded-full bg-[#E7E7E7]">
              <span className="text-[#645555] font-semibold">REACT</span>
            </div>
          </div>
          <div className="flex justify-center absolute top-[150px] left-[160px] w-[180px] h-[180px] rounded-full bg-[#DEB4B4]">
            <Image
              src={omoLogo}
              alt="omo logo"
              width="100"
              height="100"
            ></Image>
          </div>
          <div className="flex relative">
            <div className="flex justify-center items-center w-[250px] h-[250px] rounded-full bg-[#E7E7E7]">
              <span className="text-[#645555] font-semibold">NEXTJS</span>
            </div>
            <div className="flex justify-center items-center w-[250px] h-[250px] rounded-full bg-[#E7E7E7]">
              <span className="text-[#645555] font-semibold">TYPESCRIPT</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
