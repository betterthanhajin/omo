import Image from "next/image";
import omoLogo from "@/public/omo-logo.svg";
import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

export default function OmoSectionSkills() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const bubbleControls = useAnimation();
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);

  const skills = [
    { index: 0, color: "#FFD1DC", name: "NODEJS", icon: "🌙" },
    { index: 1, color: "#FFA7B6", name: "REACT", icon: "⭐" },
    { index: 2, color: "#FF85A1", name: "NEXTJS", icon: "🌈" },
    { index: 3, color: "#FF6B8B", name: "TYPESCRIPT", icon: "💖" },
  ];

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const { left, top } = containerRef.current.getBoundingClientRect();
        setMousePosition({ x: event.clientX - left, y: event.clientY - top });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    bubbleControls.start({
      x: mousePosition.x,
      y: mousePosition.y,
      transition: { type: "spring", damping: 3 },
    });
  }, [mousePosition, bubbleControls]);

  useEffect(() => {
    const moveCircles = () => {
      circleRefs.current.forEach((circle) => {
        if (circle) {
          const randomX = Math.floor(Math.random() * 180) + 100;
          const randomY = Math.floor(Math.random() * 480) + 200;
          circle.style.left = `${randomX}px`;
          circle.style.top = `${randomY}px`;
          circle.style.transition = "1.25s";
        }
      });
    };

    const interval = setInterval(moveCircles, 2000);
    return () => clearInterval(interval);
  }, []);

  const BubbleEffect = () => (
    <motion.div
      className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-blue-200 to-blue-300 opacity-50 pointer-events-none"
      style={{ filter: "blur(20px)" }}
      animate={bubbleControls}
    />
  );

  const SkillBubble = ({
    color,
    skill,
    icon,
    index,
  }: {
    color: string;
    skill: string;
    icon: string;
    index: number;
  }) => {
    const bubbleVariants = {
      hover: { scale: 1.1, rotate: 5, transition: { duration: 0.3 } },
      tap: { scale: 0.95, rotate: -5, transition: { duration: 0.3 } },
    };

    return (
      <motion.div
        className="relative flex flex-col justify-center items-center w-32 h-32 rounded-full cursor-pointer"
        style={{ backgroundColor: color }}
        variants={bubbleVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <motion.span
          className="text-3xl mb-1"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {icon}
        </motion.span>
        <span className="text-white font-bold text-sm">{skill}</span>
      </motion.div>
    );
  };

  const CircleEffect = ({ className }: { className: string }) => {
    return (
      <div
        ref={(el) => {
          if (el) circleRefs.current.push(el);
        }}
        className={`absolute w-4 h-4 rounded-full ${className}`}
        style={{
          left: `${Math.random() * 180 + 100}px`,
          top: `${Math.random() * 480 + 200}px`,
          transition: "1.25s",
        }}
      />
    );
  };

  return (
    <section
      ref={containerRef}
      className="relative bg-gradient-to-b from-blue-200 to-blue-400 p-10 min-h-screen flex flex-col justify-center items-center overflow-hidden"
    >
      <BubbleEffect />
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          className="flex justify-center items-center mb-16"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={omoLogo}
            alt="omo logo"
            width={120}
            height={120}
            className="bg-white rounded-full shadow-lg"
          />
        </motion.div>
        <motion.div
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {skills.map((skill) => (
            <SkillBubble
              key={skill.index}
              color={skill.color}
              skill={skill.name}
              icon={skill.icon}
              index={skill.index}
            />
          ))}
        </motion.div>
      </div>
      <div className="circleGroup absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <CircleEffect
            key={`circle0-${i}`}
            className="bg-blue-300 opacity-50"
          />
        ))}
      </div>
      <div className="circleGroup2 absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <CircleEffect
            key={`circle1-${i}`}
            className="bg-pink-300 opacity-50"
          />
        ))}
      </div>
      <div
        className="absolute inset-0 bg-blue-300 opacity-20 z-0"
        style={{ filter: "url(#water)" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          height="0"
          width="0"
        >
          <defs>
            <filter id="water">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.01"
                numOctaves="3"
                result="noise"
                seed="1"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="20"
                xChannelSelector="R"
                yChannelSelector="B"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </section>
  );
}
