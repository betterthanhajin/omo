import Image from "next/image";
import omoLogo from "@/public/omo-logo.svg";
import { useState, useEffect, useRef, useMemo } from "react";

export default function OmoSectionSkills() {
  const [direction, setDirection] = useState({ x: 1 });
  const stepSize = 50;
  const positionRef = useRef({ x: 0 });
  const [position, setPosition] = useState({ x: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [isInitialRender, setIsInitialRender] = useState(true);
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
          x: nextX,
        });
      }
    };
    let intervalId: NodeJS.Timeout = setInterval(movingCircle, 2000);
    return () => clearInterval(intervalId);
  }, [position, direction, isInitialRender]);
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
          left: `${position.x}px`,
          transition: "all 0.5s ease-in-out",
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
          right: `${position.x}px`,
          transition: "all 0.5s ease-in-out",
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
