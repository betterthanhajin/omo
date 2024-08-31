import Image from "next/image";
import omoLogo from "@/public/omo-logo.svg";
import { useState, useEffect, useRef } from "react";

export default function OmoSectionTwo() {
  const [direction, setDirection] = useState({ x: 1, y: 1 }); // 이동 방향
  const stepSize = 10; // 한 번에 이동할 픽셀 수
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isInitialRender, setIsInitialRender] = useState(true);
  const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#F7B731"];
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInitialRender) {
      setPosition({ x: 0, y: 0 });
      setIsInitialRender(false);
      return;
    }
    const movingCircle = () => {
      if (circleRef.current) {
        const circleRect = circleRef.current.getBoundingClientRect();

        let newX = position.x + stepSize * direction.x;
        let newY = position.y + stepSize * direction.y;
        let newDirectionX = direction.x;
        let newDirectionY = direction.y;

        // X 방향 경계 체크
        if (newX <= circleRect.left || newX >= circleRect.right) {
          newDirectionX *= -1; // 방향 전환
          newX = Math.max(circleRect.left, Math.min(newX, circleRect.right));
        }

        // Y 방향 경계 체크
        if (newY <= circleRect.top || newY >= circleRect.bottom) {
          newDirectionY *= -1; // 방향 전환
          newY = Math.max(circleRect.top, Math.min(newY, circleRect.bottom));
        }

        setPosition({ x: newX, y: newY });
        setDirection({ x: newDirectionX, y: newDirectionY });

        console.log("Circle moved to:", newX, newY);
      }
    };
    let intervalId: NodeJS.Timeout = setInterval(movingCircle, 2000);
    return () => clearInterval(intervalId);
  }, [position, direction, isInitialRender]);

  return (
    <>
      <section>
        <div className="w-full relative">
          <div className="flex relative h-[250px]">
            <div
              className="absolute flex justify-center items-center w-[250px] h-[250px] rounded-full"
              style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                transition: "all 2s ease",
                backgroundColor: colors[0],
              }}
              ref={circleRef}
            >
              <span className="text-[#645555] font-semibold">NODEJS</span>
            </div>
            <div
              className="absolute flex justify-center items-center w-[250px] h-[250px] rounded-full"
              style={{ right: 0, top: 0, backgroundColor: colors[1] }}
            >
              <span className="text-[#645555] font-semibold">REACT</span>
            </div>
          </div>
          <div
            className="flex justify-center absolute w-[200px] h-[200px] rounded-full bg-[#DEB4B4]"
            style={{ left: 165, top: 145, zIndex: 30 }}
          >
            <Image
              src={omoLogo}
              alt="omo logo"
              width="100"
              height="100"
            ></Image>
          </div>
          <div className="flex relative">
            <div
              className="flex justify-center items-center w-[250px] h-[250px] rounded-full"
              style={{ left: 0, bottom: 0, backgroundColor: colors[2] }}
            >
              <span className="text-[#645555] font-semibold">NEXTJS</span>
            </div>
            <div
              className="flex justify-center items-center w-[250px] h-[250px] rounded-full"
              style={{ right: 0, bottom: 0, backgroundColor: colors[3] }}
            >
              <span className="text-[#645555] font-semibold">TYPESCRIPT</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
