import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useDragControls } from "framer-motion";

const popArtColors = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#FDCB6E",
  "#6C5CE7",
  "#E84393",
  "#74B9FF",
  "#55EFC4",
  "#FFA502",
  "#D980FA",
];

// 캔 패턴에 사용할 수 있는 스타일 옵션
const patternStyles = ["dotted", "striped", "zigzag", "none"];

// 효과음을 위한 소리 파일들 (실제 구현 시 경로 조정 필요)
const soundEffects = {
  drag: "/sounds/drag.mp3",
  click: "/sounds/click.mp3",
  pop: "/sounds/pop.mp3",
};

type AnimationType = "rotate" | "pulse" | "bounce" | "shake" | "flip" | "";
type PatternType = "dotted" | "striped" | "zigzag" | "none";

interface CampbellSoupCanProps {
  id: number;
  delay: number;
  animationType: AnimationType;
  backgroundColor: string;
  textColor: string;
  patternType: PatternType;
  canSize: "small" | "medium" | "large";
  label: string;
  isStacked: boolean;
  stackOrder: number;
  onDragEnd: (id: number, x: number, y: number) => void;
  onClick: (id: number) => void;
  onDoubleClick: (id: number) => void;
  position?: { x: number; y: number };
}

const CampbellSoupCan: React.FC<CampbellSoupCanProps> = ({
  id,
  delay,
  animationType,
  backgroundColor,
  textColor,
  patternType,
  canSize,
  label,
  isStacked,
  stackOrder,
  onDragEnd,
  onClick,
  onDoubleClick,
  position,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // 크기에 따른 스타일 설정
  const getSizeStyle = () => {
    switch (canSize) {
      case "small":
        return "w-16 h-24";
      case "large":
        return "w-24 h-32";
      default:
        return "w-20 h-28";
    }
  };

  // 패턴 스타일 적용
  const getPatternStyle = () => {
    switch (patternType) {
      case "dotted":
        return {
          backgroundImage: `radial-gradient(${textColor} 10%, transparent 10%)`,
          backgroundSize: "8px 8px",
        };
      case "striped":
        return {
          backgroundImage: `linear-gradient(45deg, ${textColor} 25%, transparent 25%, transparent 50%, ${textColor} 50%, ${textColor} 75%, transparent 75%, transparent)`,
          backgroundSize: "10px 10px",
        };
      case "zigzag":
        return {
          backgroundImage: `linear-gradient(135deg, ${textColor} 25%, transparent 25%), 
                           linear-gradient(225deg, ${textColor} 25%, transparent 25%), 
                           linear-gradient(315deg, ${textColor} 25%, transparent 25%), 
                           linear-gradient(45deg, ${textColor} 25%, transparent 25%)`,
          backgroundSize: "10px 10px",
        };
      default:
        return {};
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  // 흔들림 애니메이션을 위한 효과
  useEffect(() => {
    if (isShaking) {
      const timer = setTimeout(() => setIsShaking(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isShaking]);

  // 효과음 재생 함수
  const playSound = (type: "drag" | "click" | "pop") => {
    if (audioRef.current) {
      audioRef.current.src = soundEffects[type];
      audioRef.current
        .play()
        .catch((e) => console.error("Audio play failed:", e));
    }
  };

  const getAnimationClass = () => {
    if (isShaking) return "animate-shake";

    switch (animationType) {
      case "rotate":
        return "animate-spin";
      case "pulse":
        return "animate-pulse";
      case "bounce":
        return "animate-bounce";
      case "shake":
        return "animate-shake";
      case "flip":
        return "animate-flip";
      default:
        return "";
    }
  };

  const controls = useDragControls();

  const handleCanClick = () => {
    playSound("click");
    setIsShaking(true);
    onClick(id);
  };

  const handleCanDoubleClick = () => {
    playSound("pop");
    onDoubleClick(id);
  };

  const handleDragStart = () => {
    playSound("drag");
  };

  return (
    <motion.div
      drag
      dragControls={controls}
      onDragStart={handleDragStart}
      onDragEnd={(event, info) => onDragEnd(id, info.point.x, info.point.y)}
      dragMomentum={true}
      whileDrag={{ scale: 1.1, zIndex: 100 }}
      initial={position ? { x: position.x, y: position.y } : false}
      style={{
        zIndex: isHovered ? 50 : stackOrder,
        filter: isHovered ? "drop-shadow(0 0 8px rgba(0, 0, 0, 0.5))" : "none",
      }}
    >
      <div
        className={`${getSizeStyle()} flex items-center justify-center cursor-pointer ${
          isAnimating ? getAnimationClass() : ""
        } transition-all duration-300 transform ${
          isHovered ? "scale-110" : ""
        }`}
        onClick={handleCanClick}
        onDoubleClick={handleCanDoubleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`${getSizeStyle()} rounded-md flex flex-col items-center justify-center overflow-hidden border-2 border-gray-800 relative`}
          style={{
            backgroundColor,
            ...getPatternStyle(),
            transform: isStacked ? `rotate(${((id % 3) - 1) * 5}deg)` : "none",
          }}
        >
          {/* 상단 빨간 띠 */}
          <div className="absolute top-0 w-full h-2 bg-red-600" />

          {/* 캠벨 로고 */}
          <div className="bg-white p-1 rounded mb-1 relative">
            <span className="text-xs font-bold" style={{ color: textColor }}>
              CAMPBELLS
            </span>
          </div>

          {/* 스프 종류 (사용자 지정 라벨) */}
          <div className="bg-white p-1 rounded">
            <span className="text-xs font-bold" style={{ color: textColor }}>
              {label || "SOUP"}
            </span>
          </div>
        </div>
      </div>

      {/* 효과음을 위한 오디오 요소 */}
      <audio ref={audioRef} />
    </motion.div>
  );
};

interface CanData {
  id: number;
  delay: number;
  animationType: AnimationType;
  backgroundColor: string;
  textColor: string;
  patternType: PatternType;
  canSize: "small" | "medium" | "large";
  label: string;
  position?: { x: number; y: number };
  isStacked: boolean;
  stackOrder: number;
}

export default function OmoKitsch() {
  const [cans, setCans] = useState<CanData[]>([]);
  const [isGridView, setIsGridView] = useState(true);
  const [selectedCanIds, setSelectedCanIds] = useState<number[]>([]);
  const [stackedGroups, setStackedGroups] = useState<{
    [key: string]: number[];
  }>({});

  // 크기 조절을 위한 상태
  const [canCount, setCanCount] = useState(32);

  // 스프 라벨 옵션
  const soupLabels = [
    "TOMATO",
    "CHICKEN",
    "MUSHROOM",
    "VEGETABLE",
    "BEEF",
    "ONION",
    "POTATO",
    "CLAM",
    "BROCCOLI",
    "CELERY",
  ];

  const handleDragEnd = (id: number, x: number, y: number) => {
    setCans((prevCans) =>
      prevCans.map((can) =>
        can.id === id ? { ...can, position: { x, y }, isStacked: false } : can
      )
    );

    // 드래그 후 스택 그룹 업데이트
    updateStackGroups();
  };

  const handleCanClick = (id: number) => {
    // 선택 토글
    setSelectedCanIds((prev) =>
      prev.includes(id) ? prev.filter((canId) => canId !== id) : [...prev, id]
    );
  };

  const handleCanDoubleClick = (id: number) => {
    // 더블 클릭 시 애니메이션 변경
    setCans((prevCans) =>
      prevCans.map((can) =>
        can.id === id
          ? {
              ...can,
              animationType: getRandomAnimation(),
              backgroundColor: getRandomColor(),
              textColor: getRandomColor(),
            }
          : can
      )
    );
  };

  // 두 요소 사이의 거리 계산
  const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

  // 스택 그룹 업데이트 (가까운 캔들을 그룹화)
  const updateStackGroups = () => {
    const groups: { [key: string]: number[] } = {};
    const processedCans: number[] = [];

    cans.forEach((can: CanData) => {
      if (processedCans.includes(can.id) || !can.position) return;

      const group = [can.id];
      processedCans.push(can.id);

      cans.forEach((otherCan) => {
        if (
          can.id === otherCan.id ||
          processedCans.includes(otherCan.id) ||
          !otherCan.position
        )
          return;
        if (can.position && otherCan.position) {
          const distance = getDistance(
            can.position.x,
            can.position.y,
            otherCan.position.x,
            otherCan.position.y
          );

          if (distance < 50) {
            // 50px 내의 캔들을 같은 그룹으로 처리
            group.push(otherCan.id);
            processedCans.push(otherCan.id);
          }
        }
      });

      if (group.length > 1) {
        const groupKey = `group-${can.id}`;
        groups[groupKey] = group;
      }
    });

    setStackedGroups(groups);

    // 스택 그룹에 속한 캔들의 isStacked 상태 업데이트
    setCans((prevCans) =>
      prevCans.map((can) => {
        let isInStack = false;
        let stackPos = 0;

        Object.values(groups).forEach((group) => {
          const idx = group.indexOf(can.id);
          if (idx !== -1) {
            isInStack = true;
            stackPos = idx;
          }
        });

        return {
          ...can,
          isStacked: isInStack,
          stackOrder: isInStack ? stackPos : 0,
        };
      })
    );
  };

  // 랜덤 애니메이션 선택
  const getRandomAnimation = (): AnimationType => {
    const animations: AnimationType[] = [
      "rotate",
      "pulse",
      "bounce",
      "shake",
      "flip",
      "",
    ];
    return animations[Math.floor(Math.random() * animations.length)];
  };

  // 랜덤 색상 선택
  const getRandomColor = () => {
    return popArtColors[Math.floor(Math.random() * popArtColors.length)];
  };

  // 랜덤 패턴 선택
  const getRandomPattern = (): PatternType => {
    return patternStyles[
      Math.floor(Math.random() * patternStyles.length)
    ] as PatternType;
  };

  // 랜덤 캔 크기 선택
  const getRandomSize = () => {
    const sizes = ["small", "medium", "large"];
    return sizes[Math.floor(Math.random() * sizes.length)] as
      | "small"
      | "medium"
      | "large";
  };

  // 랜덤 스프 라벨 선택
  const getRandomLabel = () => {
    return soupLabels[Math.floor(Math.random() * soupLabels.length)];
  };

  // 캔 갯수 변경 핸들러
  const handleCanCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCanCount(Number(e.target.value));
  };

  // 전체 캔 삭제 및 리셋
  const resetCans = () => {
    generateCans(canCount);
  };

  // 선택한 캔들 삭제
  const deleteSelectedCans = () => {
    if (selectedCanIds.length === 0) return;

    setCans((prevCans) =>
      prevCans.filter((can) => !selectedCanIds.includes(can.id))
    );
    setSelectedCanIds([]);
  };

  // 선택한 캔들의 애니메이션 변경
  const changeSelectedAnimations = () => {
    if (selectedCanIds.length === 0) return;

    setCans((prevCans) =>
      prevCans.map((can) =>
        selectedCanIds.includes(can.id)
          ? { ...can, animationType: getRandomAnimation() }
          : can
      )
    );
  };

  // 캔 생성 함수
  const generateCans = (count: number) => {
    const animations: AnimationType[] = [
      "rotate",
      "pulse",
      "bounce",
      "shake",
      "flip",
      "",
    ];
    const newCans: CanData[] = Array(count)
      .fill(null)
      .map((_, index) => ({
        id: index,
        delay: Math.random() * 5000,
        animationType:
          animations[Math.floor(Math.random() * animations.length)],
        backgroundColor: getRandomColor(),
        textColor: getRandomColor(),
        patternType: getRandomPattern(),
        canSize: getRandomSize(),
        label: getRandomLabel(),
        isStacked: false,
        stackOrder: 0,
      }));
    setCans(newCans);
  };

  // 초기 캔 생성
  useEffect(() => {
    generateCans(canCount);
  }, []);

  // 뷰 전환 핸들러
  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  return (
    <div className="w-full h-full flex flex-col mt-20">
      {/* 컨트롤 패널 */}
      <div className="bg-gray-100 p-4 sticky top-0 z-50 flex flex-wrap gap-2 items-center justify-between border-b border-gray-300">
        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={toggleView}
            className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition"
          >
            {isGridView ? "자유 배치 모드" : "그리드 모드"}
          </button>

          <button
            onClick={resetCans}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
          >
            리셋
          </button>

          <button
            onClick={deleteSelectedCans}
            className={`px-3 py-1 rounded transition ${
              selectedCanIds.length > 0
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={selectedCanIds.length === 0}
          >
            선택 삭제 ({selectedCanIds.length})
          </button>

          <button
            onClick={changeSelectedAnimations}
            className={`px-3 py-1 rounded transition ${
              selectedCanIds.length > 0
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={selectedCanIds.length === 0}
          >
            애니메이션 변경
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="canCount" className="text-sm font-medium">
            캔 갯수:
          </label>
          <input
            id="canCount"
            type="range"
            min="1"
            max="100"
            value={canCount}
            onChange={handleCanCountChange}
            className="w-32"
          />
          <span className="text-sm font-medium">{canCount}</span>
          <button
            onClick={() => generateCans(canCount)}
            className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition"
          >
            적용
          </button>
        </div>
      </div>

      {/* 메인 캔버스 영역 */}
      <div className="w-full flex-grow sm:overflow-hidden overflow-y-scroll scroll-width-none mt-4 relative">
        {isGridView ? (
          <div className="grid sm:grid-cols-8 grid-cols-2 gap-8 p-8">
            {cans.map((can) => (
              <CampbellSoupCan
                key={can.id}
                id={can.id}
                delay={can.delay}
                animationType={can.animationType}
                backgroundColor={can.backgroundColor}
                textColor={can.textColor}
                patternType={can.patternType}
                canSize={can.canSize}
                label={can.label}
                isStacked={can.isStacked}
                stackOrder={can.stackOrder}
                onDragEnd={handleDragEnd}
                onClick={handleCanClick}
                onDoubleClick={handleCanDoubleClick}
              />
            ))}
          </div>
        ) : (
          <div className="w-full h-full p-8 relative">
            {cans.map((can) => (
              <CampbellSoupCan
                key={can.id}
                id={can.id}
                delay={can.delay}
                animationType={can.animationType}
                backgroundColor={can.backgroundColor}
                textColor={can.textColor}
                patternType={can.patternType}
                canSize={can.canSize}
                label={can.label}
                isStacked={can.isStacked}
                stackOrder={can.stackOrder}
                onDragEnd={handleDragEnd}
                onClick={handleCanClick}
                onDoubleClick={handleCanDoubleClick}
                position={can.position}
              />
            ))}
          </div>
        )}
      </div>

      {/* 도움말 모달 (실제 구현 시 토글 기능 추가) */}
      <div className="fixed bottom-4 right-4">
        <button
          className="bg-gray-800 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 transition"
          onClick={() =>
            alert(
              "캔 클릭: 선택/해제\n캔 더블클릭: 스타일 변경\n캔 드래그: 위치 이동\n가까운 캔들은 자동으로 스택됩니다."
            )
          }
        >
          ?
        </button>
      </div>
    </div>
  );
}
