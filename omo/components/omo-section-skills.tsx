import Image from "next/image";
import omoLogo from "@/public/omo-logo.svg";
import { useState, useEffect, useRef } from "react";

export default function OmoSectionTwo() {
  const [direction, setDirection] = useState({ x: 1, y: 1 }); // 이동 방향
  const stepSize = 50; // 한 번에 이동할 픽셀 수
  const [position, setPosition] = useState({ x: 0 });
  const [isInitialRender, setIsInitialRender] = useState(true);
  const colors = [
    "#FFB3BA", // 연한 분홍색
    "#e190f3", // 복숭아색
    "#FFC0CB", // 분홍색
    "#FF69B4", // 진한 분홍색
  ];
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInitialRender) {
      setPosition({ x: 0 });
      setIsInitialRender(false);
      return;
    }
    const movingCircle = () => {
      if (circleRef.current && containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const circleWidth = circleRef.current.offsetWidth;
        const nextX = position.x + stepSize * direction.x;
        if (nextX > containerWidth || nextX < 0) {
          setDirection((prev) => ({ ...prev, x: prev.x * -1 }));
        }

        setPosition({
          x: position.x + stepSize * direction.x,
        });
      }
    };
    let intervalId: NodeJS.Timeout = setInterval(movingCircle, 2000);
    return () => clearInterval(intervalId);
  }, [position, direction, isInitialRender]);

  return (
    <>
      <section>
        <div className="w-full h-[500px] relative" ref={containerRef}>
          <div className="flex relative h-[250px]">
            <div
              className="absolute flex justify-center items-center w-[250px] h-[250px] rounded-full"
              style={{
                left: `${position.x}px`,
                transition: "all 0.5s ease-in-out",
                backgroundColor: colors[0],
              }}
              ref={circleRef}
            >
              <span className="text-[#ffddfb] font-semibold">NODEJS</span>
            </div>
            <div
              className="absolute flex justify-center items-center w-[250px] h-[250px] rounded-full"
              style={{
                right: `${position.x}px`,
                transition: "all 0.5s ease-in-out",
                backgroundColor: colors[1],
              }}
              ref={circleRef}
            >
              <span className="text-[#ffddfb] font-semibold">REACT</span>
            </div>
          </div>
          <div
            className="flex justify-center absolute w-[200px] h-[200px] rounded-full bg-[#DEB4B4] z-50"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Image
              src={omoLogo}
              alt="omo logo"
              width="100"
              height="100"
            ></Image>
          </div>
          <div className="flex relative  h-[250px]">
            <div
              className="absolute flex justify-center items-center w-[250px] h-[250px] rounded-full"
              style={{
                left: `${position.x}px`,
                transition: "all 0.5s ease-in-out",
                backgroundColor: colors[2],
              }}
              ref={circleRef}
            >
              <span className="text-[#ffddfb] font-semibold">NEXTJS</span>
            </div>
            <div
              className="absolute flex justify-center items-center w-[250px] h-[250px] rounded-full"
              style={{
                right: `${position.x}px`,
                transition: "all 0.5s ease-in-out",
                backgroundColor: colors[3],
              }}
              ref={circleRef}
            >
              <span className="text-[#ffddfb] font-semibold">TYPESCRIPT</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
