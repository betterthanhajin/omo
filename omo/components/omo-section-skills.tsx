import Image from "next/image";
import omoLogo from "@/public/omo-logo.svg";
import { useState, useEffect, useRef, useMemo } from "react";

export default function OmoSectionsSkills() {
  const [direction, setDirection] = useState({ x: 1 });
  const stepSize = 50;
  const positionRef = useRef({ x: 0 });
  const [position, setPosition] = useState({ x: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [, setRender] = useState({});
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const skills = useMemo(
    () => [
      { index: 0, color: "#FFB3BA", name: "NODEJS" },
      { index: 1, color: "#e190f3", name: "REACT" },
      { index: 2, color: "#FFC0CB", name: "NEXTJS" },
      { index: 3, color: "#FF69B4", name: "TYPESCRIPT" },
    ],
    []
  );

  useEffect(() => {
    const movingCircle = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth / 2;
        const circleWidth = 250; // Fixed circle width
        const maxMove = (containerWidth - circleWidth) / 2;
        const nextX = stepSize * direction.x;

        if (nextX > containerWidth || nextX < 0) {
          setDirection((prev) => ({ x: prev.x * -1 }));
        }

        setPosition((prevPosition) => ({
          x: position.x + nextX,
        }));

        console.log("Position updated:", position.x); // 디버깅을 위한 로그
      }
    };

    const intervalId = setInterval(movingCircle, 2000);
    return () => clearInterval(intervalId);
  }, [direction]);

  const SkillCircle = ({
    index,
    color,
    skill,
  }: {
    index: number;
    color: string;
    skill: string;
  }) => {
    const isLeft = index % 2 === 0;
    return isLeft ? (
      <div
        className={`absolute flex justify-center items-center w-[250px] h-[250px] rounded-full transition-all duration-300 ease-in-out`}
        style={{
          left: position.x,
          transition: "ease-in-out 0.5s",
          backgroundColor: color,
          transform: hoveredIndex === index ? "scale(1.1)" : "scale(1)",
        }}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <span
          className={`text-[#ffddfb] font-semibold transition-all duration-300 ${
            hoveredIndex === index ? "text-white" : ""
          }`}
        >
          {skill}
        </span>
      </div>
    ) : (
      <div
        className={`absolute flex justify-center items-center w-[250px] h-[250px] rounded-full transition-all duration-300 ease-in-out`}
        style={{
          right: position.x,
          transition: "ease-in-out 0.5s",
          backgroundColor: color,
          transform: hoveredIndex === index ? "scale(1.1)" : "scale(1)",
        }}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <span
          className={`text-[#ffddfb] font-semibold transition-all duration-300 ${
            hoveredIndex === index ? "text-white" : ""
          }`}
        >
          {skill}
        </span>
      </div>
    );
  };

  return (
    <section>
      <div className="w-full h-[500px] relative" ref={containerRef}>
        <div className="flex relative h-[250px]">
          {skills.slice(0, 2).map((skill, index) => (
            <SkillCircle
              key={index}
              index={skill.index}
              color={skill.color}
              skill={skill.name}
            />
          ))}
        </div>
        <div
          className="flex justify-center absolute w-[200px] h-[200px] rounded-full bg-[#DEB4B4] z-50"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Image src={omoLogo} alt="omo logo" width="100" height="100" />
        </div>
        <div className="flex relative h-[250px]">
          {skills.slice(2, 4).map((skill, index) => (
            <SkillCircle
              key={index}
              index={skill.index}
              color={skill.color}
              skill={skill.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
