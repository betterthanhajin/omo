import Image from "next/image";
import omoLogo from "@/public/omo-logo.svg";
import { useState, useEffect, useRef, useMemo } from "react";

export default function OmoSectionsSkills() {
  const [direction, setDirection] = useState({ x: 1 });
  const stepSize = 50;
  const [position, setPosition] = useState({ x: 0 });
  const [isInitialRender, setIsInitialRender] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const skills = useMemo(
    () => [
      { color: "#FFB3BA", name: "NODEJS" },
      { color: "#e190f3", name: "REACT" },
      { color: "#FFC0CB", name: "NEXTJS" },
      { color: "#FF69B4", name: "TYPESCRIPT" },
    ],
    []
  );

  const SkillCircle = ({
    index,
    color,
    skill,
  }: {
    index: number;
    color: string;
    skill: string;
  }) => {
    const isRight = index % 2 === 1;
    const basePosition = isRight ? "0px" : "calc(100% - 250px)";

    return (
      <div
        className={`absolute flex justify-center items-center w-[250px] h-[250px] rounded-full transition-all duration-300 ease-in-out`}
        style={{
          left: `calc(${basePosition} + ${
            isRight ? position.x : -position.x
          }px)`,
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

  useEffect(() => {
    if (isInitialRender) {
      setPosition({ x: 0 });
      setIsInitialRender(false);
      return;
    }

    const movingCircle = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const circleWidth = 250; // Fixed circle width
        const nextX = position.x + stepSize * direction.x;

        if (nextX > 500 || nextX < 0) {
          setDirection((prev) => ({ x: prev.x * -1 }));
        }

        setPosition(() => ({
          x: nextX,
        }));
      }
    };

    const intervalId = setInterval(movingCircle, 2000);
    return () => clearInterval(intervalId);
  }, [position, direction, isInitialRender]);

  return (
    <section>
      <div className="w-full h-[500px] relative" ref={containerRef}>
        <div className="flex relative h-[250px]">
          {skills.slice(0, 2).map((skill, index) => (
            <SkillCircle
              key={index}
              index={index}
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
              key={index + 2}
              index={index + 2}
              color={skill.color}
              skill={skill.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
