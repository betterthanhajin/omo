import React, { useState, useEffect, useRef } from "react";

interface CirclePosition {
  left: number;
  top: number;
  transition: string;
  backgroundColor: string;
  size?: number;
  opacity?: number;
  scale?: number;
  border?: string;
  boxShadow?: string;
  zIndex?: number;
}

// Skills data management
const frontendSkills = ["Internet", "HTML", "CSS", "JavaScript"];
const backendSkills = [
  "Java",
  "JavaScript",
  "Vue.js",
  "Spring Boot",
  "Spring MVC",
];

// Additional skill data - expandable
const dbSkills = ["MySQL", "MongoDB", "PostgreSQL"];
const devopsSkills = ["Git", "Docker", "AWS", "CI/CD"];
const extraSkills = ["TypeScript", "React", "Node.js", "GraphQL"];

const SkillsRoadmap = () => {
  // Modern color palette definition
  const modernColors = [
    "#3498db", // Blue
    "#2ecc71", // Green
    "#f1c40f", // Yellow
    "#e74c3c", // Red
    "#9b59b6", // Purple
    "#1abc9c", // Turquoise
    "#e67e22", // Orange
    "#34495e", // Navy
    "#16a085", // Emerald
    "#8e44ad", // Violet
    "#d35400", // Pumpkin
    "#27ae60", // Nephritis
  ];

  // Random color selection function
  const getRandomColor = () => {
    return modernColors[Math.floor(Math.random() * modernColors.length)];
  };

  // Random size generation function (70px ~ 120px)
  const getRandomSize = () => {
    return Math.floor(Math.random() * 50) + 70;
  };

  // First circle state management
  const [circlesPositions, setCirclesPositions] = useState<CirclePosition[]>(
    []
  );
  // Second circle state management
  const [circles2Positions, setCircles2Positions] = useState<CirclePosition[]>(
    []
  );
  // Rotation animation state
  const [rotation, setRotation] = useState(0);
  // Display mode
  const [displayMode, setDisplayMode] = useState<
    "default" | "category" | "level" | "timeline"
  >("default");
  // Center circle color
  const [centerColor, setCenterColor] = useState("#6366f1");
  // Glow effect
  const [glowEffect, setGlowEffect] = useState(false);
  // Tooltip display state
  const [showTooltip, setShowTooltip] = useState(false);
  // Selected skill
  const [selectedSkill, setSelectedSkill] = useState<{
    name: string;
    description: string;
  } | null>(null);

  // Refs setup
  const leftContainerRef = useRef<HTMLDivElement>(null);
  const rightContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const centerCircleRef = useRef<HTMLDivElement>(null);

  // Initial position setup
  useEffect(() => {
    if (leftContainerRef.current && rightContainerRef.current) {
      const leftRect = leftContainerRef.current.getBoundingClientRect();
      const rightRect = rightContainerRef.current.getBoundingClientRect();

      // Left circles initial position setup
      setCirclesPositions(
        frontendSkills.map(() => ({
          left: Math.floor(Math.random() * (leftRect.width - 120)),
          top: Math.floor(Math.random() * (leftRect.height - 120)),
          transition: "1s ease-out",
          backgroundColor: getRandomColor(),
          size: getRandomSize(),
          opacity: 0.9,
          zIndex: 10,
        }))
      );

      // Right circles initial position setup
      setCircles2Positions(
        backendSkills.map(() => ({
          left: Math.floor(Math.random() * (rightRect.width - 120)),
          top: Math.floor(Math.random() * (rightRect.height - 120)),
          transition: "1s ease-out",
          backgroundColor: getRandomColor(),
          size: getRandomSize(),
          opacity: 0.9,
          zIndex: 10,
        }))
      );
    }
  }, []);

  // Rotation animation
  useEffect(() => {
    const rotateAnimation = () => {
      setRotation((prev) => (prev + 0.5) % 360);
    };

    const rotationId = setInterval(rotateAnimation, 20);
    return () => clearInterval(rotationId);
  }, []);

  // Timer setup to move circles to random positions
  useEffect(() => {
    if (displayMode !== "default") return; // Stop auto movement in other modes

    const moveCirclesRandomly = () => {
      if (leftContainerRef.current && rightContainerRef.current) {
        const leftRect = leftContainerRef.current.getBoundingClientRect();
        const rightRect = rightContainerRef.current.getBoundingClientRect();

        // Randomly move one of the left circles
        setCirclesPositions((prev) => {
          const newPositions = [...prev];
          const randomIndex = Math.floor(Math.random() * newPositions.length);
          if (newPositions[randomIndex]) {
            newPositions[randomIndex] = {
              ...newPositions[randomIndex],
              left: Math.floor(Math.random() * (leftRect.width - 120)),
              top: Math.floor(Math.random() * (leftRect.height - 120)),
              transition: `${Math.random() * 2 + 1}s ease-in-out`,
              backgroundColor: getRandomColor(),
              opacity: glowEffect ? 0.85 : 0.9,
              scale: Math.random() * 0.2 + 0.9,
              boxShadow: glowEffect
                ? `0 0 25px ${getRandomColor()}80`
                : undefined,
            };
          }
          return newPositions;
        });

        // Randomly move one of the right circles
        setCircles2Positions((prev) => {
          const newPositions = [...prev];
          const randomIndex = Math.floor(Math.random() * newPositions.length);
          if (newPositions[randomIndex]) {
            newPositions[randomIndex] = {
              ...newPositions[randomIndex],
              left: Math.floor(Math.random() * (rightRect.width - 120)),
              top: Math.floor(Math.random() * (rightRect.height - 120)),
              transition: `${Math.random() * 2 + 1}s ease-in-out`,
              backgroundColor: getRandomColor(),
              opacity: glowEffect ? 0.85 : 0.9,
              scale: Math.random() * 0.2 + 0.9,
              boxShadow: glowEffect
                ? `0 0 25px ${getRandomColor()}80`
                : undefined,
            };
          }
          return newPositions;
        });
      }
    };

    // Move random circles every 0.8 seconds
    const intervalId = setInterval(moveCirclesRandomly, 800);

    return () => clearInterval(intervalId);
  }, [displayMode, glowEffect]);

  // Left container mouse over handler
  const handleLeftContainerMouseOver = () => {
    if (displayMode !== "default") return; // Don't work in other modes

    if (leftContainerRef.current) {
      const rect = leftContainerRef.current.getBoundingClientRect();
      const centerX = Math.floor(rect.width / 2);
      const centerY = Math.floor(rect.height / 2);

      // Gather all circles to the center
      setCirclesPositions((prev) =>
        prev.map((circle) => ({
          ...circle,
          left: centerX - (circle.size || 80) / 2,
          top: centerY - (circle.size || 80) / 2,
          transition: "1s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
          opacity: 1,
          scale: 1.1,
          boxShadow: `0 8px 30px rgba(0, 0, 0, 0.2)`,
          zIndex: 20,
        }))
      );
    }
  };

  // Left container mouse out handler
  const handleLeftContainerMouseOut = () => {
    if (displayMode !== "default") return; // Don't work in other modes

    if (leftContainerRef.current) {
      const rect = leftContainerRef.current.getBoundingClientRect();

      // Move circles to random positions with new colors
      setCirclesPositions((prev) =>
        prev.map((circle) => ({
          ...circle,
          left: Math.floor(Math.random() * (rect.width - 120)),
          top: Math.floor(Math.random() * (rect.height - 120)),
          transition: "1.25s",
          backgroundColor: getRandomColor(),
          border: "none",
          opacity: 0.9,
          scale: 1,
          boxShadow: undefined,
          zIndex: 10,
        }))
      );
    }
  };

  // Right container mouse over handler
  const handleRightContainerMouseOver = () => {
    if (displayMode !== "default") return; // Don't work in other modes

    if (rightContainerRef.current) {
      // Arrange in a grid pattern
      const rect = rightContainerRef.current.getBoundingClientRect();
      const columns = Math.ceil(Math.sqrt(backendSkills.length));
      const cellWidth = rect.width / columns;
      const cellHeight = rect.height / columns;

      setCircles2Positions((prev) =>
        prev.map((circle, index) => {
          const row = Math.floor(index / columns);
          const col = index % columns;
          return {
            ...circle,
            left: col * cellWidth + cellWidth / 2 - (circle.size || 80) / 2,
            top: row * cellHeight + cellHeight / 2 - (circle.size || 80) / 2,
            transition: "1.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
            opacity: 1,
            scale: 1.1,
            boxShadow: `0 8px 30px rgba(0, 0, 0, 0.2)`,
            zIndex: 20,
          };
        })
      );
    }
  };

  // Right container mouse out handler
  const handleRightContainerMouseOut = () => {
    if (displayMode !== "default") return; // Don't work in other modes

    if (rightContainerRef.current) {
      const rect = rightContainerRef.current.getBoundingClientRect();

      // Move circles sequentially to random positions (for animation effect)
      setCircles2Positions((prev) => {
        const newPositions = [...prev];

        newPositions.forEach((_, index) => {
          newPositions[index] = {
            ...newPositions[index],
            left: Math.floor(Math.random() * (rect.width - 120)),
            top: Math.floor(Math.random() * (rect.height - 120)),
            transition: "1.25s",
            backgroundColor: getRandomColor(),
            opacity: 0.9,
            scale: 1,
            boxShadow: undefined,
            zIndex: 10,
          };
        });

        return newPositions;
      });
    }
  };

  // Arrange by category (new feature)
  const arrangeByCategory = () => {
    setDisplayMode("category");
    setSelectedSkill(null);

    if (leftContainerRef.current && rightContainerRef.current) {
      const leftRect = leftContainerRef.current.getBoundingClientRect();
      const rightRect = rightContainerRef.current.getBoundingClientRect();

      // Arrange left circles by category (all frontend, so horizontally equidistant)
      setCirclesPositions(
        frontendSkills.map((_, index) => {
          const posX =
            (leftRect.width / (frontendSkills.length + 1)) * (index + 1);
          const posY = leftRect.height / 2;

          return {
            left: posX - getRandomSize() / 2,
            top: posY - getRandomSize() / 2,
            transition: "1.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
            backgroundColor: modernColors[0], // Frontend color
            size: getRandomSize(),
            opacity: 1,
            scale: 1.1,
            border: "3px solid white",
            boxShadow: `0 10px 25px rgba(52, 152, 219, 0.4)`,
            zIndex: 20,
          };
        })
      );

      // Arrange right circles into 2 groups (backend, Vue.js)
      const backendOnly = backendSkills.filter((skill) => skill !== "Vue.js");
      const frontendExtra = ["Vue.js"];

      setCircles2Positions([
        // Backend skills (top)
        ...backendOnly.map((_, index) => {
          const posX =
            (rightRect.width / (backendOnly.length + 1)) * (index + 1);
          const posY = rightRect.height / 3;

          return {
            left: posX - getRandomSize() / 2,
            top: posY - getRandomSize() / 2,
            transition: "1.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
            backgroundColor: modernColors[1], // Backend color
            size: getRandomSize(),
            opacity: 1,
            scale: 1.1,
            border: "3px solid white",
            boxShadow: `0 10px 25px rgba(46, 204, 113, 0.4)`,
            zIndex: 20,
          };
        }),
        // Vue.js separately placed at the bottom
        ...frontendExtra.map((_, index) => {
          const posX = rightRect.width / 2;
          const posY = (rightRect.height * 2) / 3;

          return {
            left: posX - getRandomSize() / 2,
            top: posY - getRandomSize() / 2,
            transition: "1.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
            backgroundColor: modernColors[0], // Frontend color
            size: getRandomSize(),
            opacity: 1,
            scale: 1.1,
            border: "3px solid white",
            boxShadow: `0 10px 25px rgba(52, 152, 219, 0.4)`,
            zIndex: 20,
          };
        }),
      ]);
    }
  };

  // Arrange by level (based on virtual levels, new feature)
  const arrangeByLevel = () => {
    setDisplayMode("level");
    setSelectedSkill(null);

    // Virtual level settings per skill (in a real project, use actual level data)
    const frontendLevels = {
      Internet: 5,
      HTML: 5,
      CSS: 4,
      JavaScript: 4,
    };

    const backendLevels = {
      Java: 4,
      JavaScript: 4,
      "Vue.js": 3,
      "Spring Boot": 4,
      "Spring MVC": 3,
    };

    if (leftContainerRef.current && rightContainerRef.current) {
      const leftRect = leftContainerRef.current.getBoundingClientRect();
      const rightRect = rightContainerRef.current.getBoundingClientRect();

      // Arrange left circles by level (higher levels at the top)
      setCirclesPositions(
        frontendSkills.map((skill, index) => {
          const level =
            frontendLevels[skill as keyof typeof frontendLevels] || 3;
          const size = 70 + level * 10; // Size based on level
          const posX =
            (leftRect.width / (frontendSkills.length + 1)) * (index + 1);
          const posY = (leftRect.height / 6) * (6 - level); // Higher level = higher position

          // Border color based on level
          const borderColor =
            level >= 5
              ? "#f1c40f" // Gold
              : level >= 4
              ? "#bdc3c7" // Silver
              : level >= 3
              ? "#e67e22" // Bronze
              : "white";

          return {
            left: posX - size / 2,
            top: posY - size / 2,
            transition: "1.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
            backgroundColor: getRandomColor(),
            size: size,
            opacity: 1,
            scale: 1,
            border: `3px solid ${borderColor}`,
            boxShadow: `0 10px 20px rgba(0, 0, 0, 0.1)`,
            zIndex: 20 + level,
          };
        })
      );

      // Arrange right circles by level
      setCircles2Positions(
        backendSkills.map((skill, index) => {
          const level = backendLevels[skill as keyof typeof backendLevels] || 3;
          const size = 70 + level * 10; // Size based on level
          const posX =
            (rightRect.width / (backendSkills.length + 1)) * (index + 1);
          const posY = (rightRect.height / 6) * (6 - level); // Higher level = higher position

          // Border color based on level
          const borderColor =
            level >= 5
              ? "#f1c40f" // Gold
              : level >= 4
              ? "#bdc3c7" // Silver
              : level >= 3
              ? "#e67e22" // Bronze
              : "white";

          return {
            left: posX - size / 2,
            top: posY - size / 2,
            transition: "1.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
            backgroundColor: getRandomColor(),
            size: size,
            opacity: 1,
            scale: 1,
            border: `3px solid ${borderColor}`,
            boxShadow: `0 10px 20px rgba(0, 0, 0, 0.1)`,
            zIndex: 20 + level,
          };
        })
      );
    }
  };

  // Arrange by timeline (based on virtual years, new feature)
  const arrangeByTimeline = () => {
    setDisplayMode("timeline");
    setSelectedSkill(null);

    // Virtual learning year settings per skill (in a real project, use actual data)
    const frontendYears = {
      Internet: 3,
      HTML: 2.5,
      CSS: 2,
      JavaScript: 1.5,
    };

    const backendYears = {
      Java: 2,
      JavaScript: 1.5,
      "Vue.js": 1,
      "Spring Boot": 1.5,
      "Spring MVC": 1,
    };

    if (leftContainerRef.current && rightContainerRef.current) {
      const leftRect = leftContainerRef.current.getBoundingClientRect();
      const rightRect = rightContainerRef.current.getBoundingClientRect();

      // Find max/min years
      const allYears = [
        ...Object.values(frontendYears),
        ...Object.values(backendYears),
      ];
      const maxYear = Math.max(...allYears);
      const minYear = Math.min(...allYears);
      const yearRange = maxYear - minYear;

      // Arrange left circles in timeline order
      setCirclesPositions(
        frontendSkills.map((skill, index) => {
          const year = frontendYears[skill as keyof typeof frontendYears] || 1;
          const posX =
            (leftRect.width / (frontendSkills.length + 1)) * (index + 1);
          // Vertical position based on year (more recent skills at the top)
          const posY =
            leftRect.height -
            ((year - minYear) / yearRange) * (leftRect.height - 120);

          return {
            left: posX - getRandomSize() / 2,
            top: posY - getRandomSize() / 2,
            transition: "1.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
            backgroundColor: getRandomColor(),
            size: getRandomSize(),
            opacity: 1,
            scale: 1,
            boxShadow: `0 0 30px ${getRandomColor()}60`,
            zIndex: 20,
          };
        })
      );

      // Arrange right circles in timeline order
      setCircles2Positions(
        backendSkills.map((skill, index) => {
          const year = backendYears[skill as keyof typeof backendYears] || 1;
          const posX =
            (rightRect.width / (backendSkills.length + 1)) * (index + 1);
          // Vertical position based on year (more recent skills at the top)
          const posY =
            rightRect.height -
            ((year - minYear) / yearRange) * (rightRect.height - 120);

          return {
            left: posX - getRandomSize() / 2,
            top: posY - getRandomSize() / 2,
            transition: "1.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
            backgroundColor: getRandomColor(),
            size: getRandomSize(),
            opacity: 1,
            scale: 1,
            boxShadow: `0 0 30px ${getRandomColor()}60`,
            zIndex: 20,
          };
        })
      );
    }
  };

  // Reset to default mode
  const resetToDefault = () => {
    setDisplayMode("default");
    setSelectedSkill(null);
    setCenterColor("#6366f1");

    if (leftContainerRef.current && rightContainerRef.current) {
      const leftRect = leftContainerRef.current.getBoundingClientRect();
      const rightRect = rightContainerRef.current.getBoundingClientRect();

      // Reset left circles to random positions
      setCirclesPositions((prev) =>
        prev.map((circle) => ({
          ...circle,
          left: Math.floor(Math.random() * (leftRect.width - 120)),
          top: Math.floor(Math.random() * (leftRect.height - 120)),
          transition: "1s ease-out",
          backgroundColor: getRandomColor(),
          size: getRandomSize(),
          opacity: 0.9,
          scale: 1,
          border: undefined,
          boxShadow: undefined,
          zIndex: 10,
        }))
      );

      // Reset right circles to random positions
      setCircles2Positions((prev) =>
        prev.map((circle) => ({
          ...circle,
          left: Math.floor(Math.random() * (rightRect.width - 120)),
          top: Math.floor(Math.random() * (rightRect.height - 120)),
          transition: "1s ease-out",
          backgroundColor: getRandomColor(),
          size: getRandomSize(),
          opacity: 0.9,
          scale: 1,
          border: undefined,
          boxShadow: undefined,
          zIndex: 10,
        }))
      );
    }
  };

  // Circle click handler (new feature)
  const handleCircleClick = (side: "left" | "right", index: number) => {
    const skillName =
      side === "left" ? frontendSkills[index] : backendSkills[index];

    // Skill descriptions (in a real project, replace with database or more detailed data)
    const descriptions: Record<string, string> = {
      Internet: "Knowledge of basic web infrastructure and how the web works",
      HTML: "Markup language for defining the structure of web pages",
      CSS: "Style sheet language for visual presentation of web pages",
      JavaScript: "Programming language that adds interactivity to web pages",
      Java: "Object-oriented programming language used for backend development",
      "Vue.js": "Progressive JavaScript framework for building user interfaces",
      "Spring Boot": "Java-based framework for building web applications",
      "Spring MVC": "Spring module implementing the MVC architectural pattern",
    };

    setSelectedSkill({
      name: skillName,
      description: descriptions[skillName] || "Newly acquired technology",
    });
    setShowTooltip(true);

    // Highlight the selected circle
    if (side === "left") {
      setCirclesPositions((prev) =>
        prev.map((circle, i) => ({
          ...circle,
          scale: i === index ? 1.3 : 0.8,
          opacity: i === index ? 1 : 0.6,
          boxShadow:
            i === index ? `0 0 35px ${circle.backgroundColor}` : undefined,
          zIndex: i === index ? 30 : 10,
        }))
      );
    } else {
      setCircles2Positions((prev) =>
        prev.map((circle, i) => ({
          ...circle,
          scale: i === index ? 1.3 : 0.8,
          opacity: i === index ? 1 : 0.6,
          boxShadow:
            i === index ? `0 0 35px ${circle.backgroundColor}` : undefined,
          zIndex: i === index ? 30 : 10,
        }))
      );
    }
  };

  // Center circle click handler (change mode)
  const handleCenterClick = () => {
    // Cycle through modes
    if (displayMode === "default") {
      arrangeByCategory();
      setCenterColor("#3498db"); // Category mode color
    } else if (displayMode === "category") {
      arrangeByLevel();
      setCenterColor("#2ecc71"); // Level mode color
    } else if (displayMode === "level") {
      arrangeByTimeline();
      setCenterColor("#9b59b6"); // Timeline mode color
    } else {
      resetToDefault();
      setCenterColor("#6366f1"); // Default color
    }
  };

  // Toggle effect mode (lighting effect)
  const toggleEffect = () => {
    setGlowEffect(!glowEffect);
  };

  // Scroll to section function
  const scrollToSection = (index: number) => {
    const sections = document.getElementsByTagName("section");
    if (sections[index]) {
      window.scrollTo({
        top: sections[index].offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      className="mt-16 w-full h-full overflow-y-scroll bg-gradient-to-b from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-950"
      ref={containerRef}
    >
      {/* Top control panel */}
      <div className="w-full flex justify-center gap-4 mb-6 p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg mx-auto">
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            displayMode === "default"
              ? "bg-indigo-500 text-white hover:bg-indigo-600"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          }`}
          onClick={resetToDefault}
        >
          Default Mode
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            displayMode === "category"
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          }`}
          onClick={arrangeByCategory}
        >
          By Category
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            displayMode === "level"
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          }`}
          onClick={arrangeByLevel}
        >
          By Level
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            displayMode === "timeline"
              ? "bg-purple-500 text-white hover:bg-purple-600"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          }`}
          onClick={arrangeByTimeline}
        >
          Timeline
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            glowEffect
              ? "bg-orange-500 text-white hover:bg-orange-600"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          }`}
          onClick={toggleEffect}
        >
          {glowEffect ? "Glow Off" : "Glow On"}
        </button>
      </div>

      {/* Legend for category display */}
      {displayMode === "category" && (
        <div className="flex justify-center gap-8 mb-6">
          <div className="flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-md shadow-sm">
            <div
              className="w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: modernColors[0] }}
            ></div>
            <span className="text-sm font-medium text-white">Frontend</span>
          </div>
          <div className="flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-md shadow-sm">
            <div
              className="w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: modernColors[1] }}
            ></div>
            <span className="text-sm font-medium text-white">Backend</span>
          </div>
        </div>
      )}

      {/* Legend for level display */}
      {displayMode === "level" && (
        <div className="flex justify-center gap-8 mb-6">
          <div className="flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-md shadow-sm">
            <div className="w-4 h-4 border-2 border-yellow-400 mr-2"></div>
            <span className="text-sm font-medium">Level 5</span>
          </div>
          <div className="flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-md shadow-sm">
            <div className="w-4 h-4 border-2 border-gray-400 mr-2"></div>
            <span className="text-sm font-medium">Level 4</span>
          </div>
          <div className="flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-md shadow-sm">
            <div className="w-4 h-4 border-2 border-orange-500 mr-2"></div>
            <span className="text-sm font-medium">Level 3</span>
          </div>
        </div>
      )}

      {/* Timeline markers */}
      {displayMode === "timeline" && (
        <div className="relative w-full h-8 mb-6 px-10 max-w-4xl mx-auto">
          <div className="absolute top-0 left-0 w-full flex justify-between px-10">
            <span className="text-sm font-medium bg-white dark:bg-gray-800 px-3 py-1 rounded-md shadow-sm">
              Recently Acquired
            </span>
            <span className="text-sm font-medium bg-white dark:bg-gray-800 px-3 py-1 rounded-md shadow-sm">
              Learning Period
            </span>
            <span className="text-sm font-medium bg-white dark:bg-gray-800 px-3 py-1 rounded-md shadow-sm">
              Long-term Experience
            </span>
          </div>
        </div>
      )}

      {/* Main content area */}
      <div className="relative max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8">
        <section className="flex flex-col md:flex-row">
          {/* Left container */}
          <div
            className="relative w-full md:w-1/2 h-[400px] md:h-[600px]"
            ref={leftContainerRef}
            onMouseOver={handleLeftContainerMouseOver}
            onMouseOut={handleLeftContainerMouseOut}
          >
            {frontendSkills.map((skill, i) => (
              <div
                key={i}
                className="absolute rounded-full flex items-center justify-center text-white font-medium shadow-lg hover:scale-110 cursor-pointer transition-transform"
                style={{
                  ...circlesPositions[i],
                  width: circlesPositions[i]?.size || 80,
                  height: circlesPositions[i]?.size || 80,
                  transform: `scale(${circlesPositions[i]?.scale || 1})`,
                }}
                onClick={() => handleCircleClick("left", i)}
              >
                <span className="text-sm text-center font-semibold px-2">
                  {skill}
                </span>
              </div>
            ))}
          </div>

          {/* Right container */}
          <div
            className="relative w-full md:w-1/2 h-[400px] md:h-[600px]"
            ref={rightContainerRef}
            onMouseOver={handleRightContainerMouseOver}
            onMouseOut={handleRightContainerMouseOut}
          >
            {backendSkills.map((skill, i) => (
              <div
                key={i}
                className="absolute rounded-full flex items-center justify-center text-white font-medium shadow-lg hover:scale-110 cursor-pointer transition-transform"
                style={{
                  ...circles2Positions[i],
                  width: circles2Positions[i]?.size || 80,
                  height: circles2Positions[i]?.size || 80,
                  transform: `scale(${circles2Positions[i]?.scale || 1})`,
                }}
                onClick={() => handleCircleClick("right", i)}
              >
                <span className="text-sm text-center font-semibold px-2">
                  {skill}
                </span>
              </div>
            ))}
          </div>

          {/* Central rotating circle - fixed position */}
          <div
            ref={centerCircleRef}
            className="absolute shadow-xl rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:scale-105 transition-transform"
            style={{
              width: 180,
              height: 180,
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              backgroundColor: centerColor,
              zIndex: 30,
              boxShadow: "0 0 40px rgba(0, 0, 0, 0.15)",
              transition: "transform 0.05s linear, background-color 0.5s ease",
            }}
            onClick={handleCenterClick}
          >
            <div
              className="text-center"
              style={{ transform: `rotate(-${rotation}deg)` }}
            >
              <div className="text-xl font-bold">My Skills</div>
              <div className="text-lg">Roadmap</div>
              <div className="text-xs mt-2 opacity-80">
                {displayMode === "default"
                  ? "Click to change mode"
                  : displayMode === "category"
                  ? "Category View"
                  : displayMode === "level"
                  ? "Level View"
                  : "Timeline View"}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Skill info tooltip */}
      {selectedSkill && showTooltip && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 p-5 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 w-80 max-w-full">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            {selectedSkill.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            {selectedSkill.description}
          </p>
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-full w-6 h-6 flex items-center justify-center"
            onClick={() => {
              setShowTooltip(false);
              setSelectedSkill(null);
              // Remove selection effects
              setCirclesPositions((prev) =>
                prev.map((circle) => ({
                  ...circle,
                  scale: 1,
                  opacity: 0.9,
                  boxShadow: undefined,
                }))
              );
              setCircles2Positions((prev) =>
                prev.map((circle) => ({
                  ...circle,
                  scale: 1,
                  opacity: 0.9,
                  boxShadow: undefined,
                }))
              );
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Navigation bar */}
      <ul className="w-full flex flex-wrap justify-center gap-3 mt-6 pb-6 mb-6 max-w-4xl mx-auto">
        {frontendSkills.concat(backendSkills).map((skill, i) => (
          <li key={i}>
            <button
              className="px-4 py-2 text-sm rounded-full bg-white hover:bg-gray-50 shadow-sm border border-gray-200 transition-colors dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700"
              onClick={() => scrollToSection(i)}
            >
              {skill}
            </button>
          </li>
        ))}
      </ul>

      {/* Extended skills area */}
      <div className="mt-12 p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Additional Skill Areas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Database skills */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
              </svg>
              Database
            </h3>
            <ul className="space-y-2">
              {dbSkills.map((skill, index) => (
                <li
                  key={index}
                  className="flex items-center text-gray-700 dark:text-gray-300"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* DevOps skills */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-4 text-green-600 dark:text-green-400 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                />
              </svg>
              DevOps
            </h3>
            <ul className="space-y-2">
              {devopsSkills.map((skill, index) => (
                <li
                  key={index}
                  className="flex items-center text-gray-700 dark:text-gray-300"
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Additional frameworks/libraries */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-4 text-purple-600 dark:text-purple-400 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
              </svg>
              Additional Technologies
            </h3>
            <ul className="space-y-2">
              {extraSkills.map((skill, index) => (
                <li
                  key={index}
                  className="flex items-center text-gray-700 dark:text-gray-300"
                >
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 py-6 text-center text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
        <p className="text-sm">
          Interactive Skills Roadmap • Updated {new Date().getFullYear()}
        </p>
      </footer>
    </section>
  );
};

export default SkillsRoadmap;
