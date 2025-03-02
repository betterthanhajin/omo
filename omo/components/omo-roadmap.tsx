import React, { useState, useEffect, useRef } from "react";

interface CirclePosition {
  left: number;
  top: number;
  transition: string;
  backgroundColor: string;
  size?: number;
}

const SkillsRoadmap = () => {
  // 팝 컬러 팔레트 정의
  const popColors = [
    "#FF6B6B", // 산호색
    "#4ECDC4", // 터콰이즈
    "#FFE66D", // 노랑
    "#FF8C42", // 오렌지
    "#6A0572", // 자주색
    "#1B9CFC", // 파랑
    "#55E6C1", // 민트
    "#FFA8A8", // 핑크
    "#7D5FFF", // 보라
    "#00D2FC", // 하늘색
    "#FF9FF3", // 라이트 핑크
    "#00CCFF", // 밝은 파랑
  ];

  // 랜덤 색상 선택 함수
  const getRandomColor = () => {
    return popColors[Math.floor(Math.random() * popColors.length)];
  };

  // 랜덤 크기 생성 함수 (60px ~ 120px)
  const getRandomSize = () => {
    return Math.floor(Math.random() * 60) + 60;
  };

  // 스킬 데이터 관리
  const frontendSkills = ["인터넷", "HTML", "CSS", "JAVASCRIPT"];
  const backendSkills = [
    "Java",
    "Javascript",
    "Vue JS",
    "Spring boot",
    "Spring MVC",
  ];

  // 첫 번째 원 상태 관리
  const [circlesPositions, setCirclesPositions] = useState<CirclePosition[]>(
    []
  );
  // 두 번째 원 상태 관리
  const [circles2Positions, setCircles2Positions] = useState<CirclePosition[]>(
    []
  );
  // 회전 애니메이션 상태
  const [rotation, setRotation] = useState(0);

  // ref 설정
  const leftContainerRef = useRef<HTMLDivElement>(null);
  const rightContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 초기 위치 설정
  useEffect(() => {
    if (leftContainerRef.current && rightContainerRef.current) {
      const leftRect = leftContainerRef.current.getBoundingClientRect();
      const rightRect = rightContainerRef.current.getBoundingClientRect();

      // 왼쪽 원들의 초기 위치 설정
      setCirclesPositions(
        frontendSkills.map(() => ({
          left: Math.floor(Math.random() * (leftRect.width - 100)),
          top: Math.floor(Math.random() * (leftRect.height - 100)),
          transition: "1s ease-out",
          backgroundColor: getRandomColor(),
          size: getRandomSize(),
        }))
      );

      // 오른쪽 원들의 초기 위치 설정
      setCircles2Positions(
        backendSkills.map(() => ({
          left: Math.floor(Math.random() * (rightRect.width - 100)),
          top: Math.floor(Math.random() * (rightRect.height - 100)),
          transition: "1s ease-out",
          backgroundColor: getRandomColor(),
          size: getRandomSize(),
        }))
      );
    }
  }, []);

  // 회전 애니메이션
  useEffect(() => {
    const rotateAnimation = () => {
      setRotation((prev) => (prev + 1) % 360);
    };

    const rotationId = setInterval(rotateAnimation, 20);
    return () => clearInterval(rotationId);
  }, []);

  // 원을 랜덤 위치로 이동시키는 타이머 설정
  useEffect(() => {
    const moveCirclesRandomly = () => {
      if (leftContainerRef.current && rightContainerRef.current) {
        const leftRect = leftContainerRef.current.getBoundingClientRect();
        const rightRect = rightContainerRef.current.getBoundingClientRect();

        // 왼쪽 원들 중 랜덤하게 하나 이동
        setCirclesPositions((prev) => {
          const newPositions = [...prev];
          const randomIndex = Math.floor(Math.random() * newPositions.length);
          if (newPositions[randomIndex]) {
            newPositions[randomIndex] = {
              ...newPositions[randomIndex],
              left: Math.floor(Math.random() * (leftRect.width - 100)),
              top: Math.floor(Math.random() * (leftRect.height - 100)),
              transition: `${Math.random() * 2 + 1}s ease-in-out`,
              backgroundColor: getRandomColor(),
            };
          }
          return newPositions;
        });

        // 오른쪽 원들 중 랜덤하게 하나 이동
        setCircles2Positions((prev) => {
          const newPositions = [...prev];
          const randomIndex = Math.floor(Math.random() * newPositions.length);
          if (newPositions[randomIndex]) {
            newPositions[randomIndex] = {
              ...newPositions[randomIndex],
              left: Math.floor(Math.random() * (rightRect.width - 100)),
              top: Math.floor(Math.random() * (rightRect.height - 100)),
              transition: `${Math.random() * 2 + 1}s ease-in-out`,
              backgroundColor: getRandomColor(),
            };
          }
          return newPositions;
        });
      }
    };

    // 매 0.8초마다 랜덤 원 이동
    const intervalId = setInterval(moveCirclesRandomly, 800);

    return () => clearInterval(intervalId);
  }, []);

  // 왼쪽 컨테이너 마우스오버 핸들러
  const handleLeftContainerMouseOver = () => {
    if (leftContainerRef.current) {
      const rect = leftContainerRef.current.getBoundingClientRect();
      const centerX = Math.floor(rect.width / 2);
      const centerY = Math.floor(rect.height / 2);

      // 모든 원을 중앙으로 모으기
      setCirclesPositions((prev) =>
        prev.map((circle) => ({
          ...circle,
          left: centerX - (circle.size || 80) / 2,
          top: centerY - (circle.size || 80) / 2,
          transition: "1s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
        }))
      );
    }
  };

  // 왼쪽 컨테이너 마우스아웃 핸들러
  const handleLeftContainerMouseOut = () => {
    if (leftContainerRef.current) {
      const rect = leftContainerRef.current.getBoundingClientRect();

      // 원들을 랜덤한 위치로 이동하고 새로운 색상 적용
      setCirclesPositions((prev) =>
        prev.map((circle) => ({
          ...circle,
          left: Math.floor(Math.random() * (rect.width - 100)),
          top: Math.floor(Math.random() * (rect.height - 100)),
          transition: "1.25s",
          backgroundColor: getRandomColor(),
          border: "none",
        }))
      );
    }
  };

  // 오른쪽 컨테이너 마우스오버 핸들러
  const handleRightContainerMouseOver = () => {
    if (rightContainerRef.current) {
      // 격자 패턴으로 배치
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
          };
        })
      );
    }
  };

  // 오른쪽 컨테이너 마우스아웃 핸들러
  const handleRightContainerMouseOut = () => {
    if (rightContainerRef.current) {
      const rect = rightContainerRef.current.getBoundingClientRect();

      // 원들을 순차적으로 랜덤한 위치로 이동 (애니메이션 효과를 위해)
      const newPositions = [...circles2Positions];
      const randomIndex = Math.floor(Math.random() * newPositions.length);

      newPositions[randomIndex] = {
        ...newPositions[randomIndex],
        left: Math.floor(Math.random() * (rect.width - 100)),
        top: Math.floor(Math.random() * (rect.height - 100)),
        transition: "1.25s",
        backgroundColor: getRandomColor(),
      };

      setCircles2Positions(newPositions);
    }
  };

  // 스크롤 이동 함수
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
      className="mt-20 w-full h-full overflow-y-scroll scrollbar-none"
      ref={containerRef}
    >
      {/* 상단 네비게이션 바 */}
      <ul className="relative w-full md:w-[50%] h-[10%] border-b-[#dcaa71] border-b-4 mt-4">
        {frontendSkills.map((skill, i) => (
          <li key={i}>
            <button
              className="points"
              onClick={() => scrollToSection(i)}
              style={{
                position: "absolute",
                top: 70,
                left: `${i * 100}px`,
                zIndex: 100,
              }}
            >
              <span className="text-xs w-8 inline-block mt-4">{skill}</span>
            </button>
          </li>
        ))}
      </ul>

      {/* 메인 컨텐츠 영역 */}
      <div className="relative">
        <section className="flex flex-col md:flex-row">
          {/* 왼쪽 컨테이너 */}
          <div
            className="relative w-full md:w-1/2 h-[400px] md:h-[800px]"
            ref={leftContainerRef}
            onMouseOver={handleLeftContainerMouseOver}
            onMouseOut={handleLeftContainerMouseOut}
          >
            {frontendSkills.map((skill, i) => (
              <div
                key={i}
                className="absolute rounded-full flex items-center justify-center text-white font-medium shadow-lg hover:scale-110 cursor-pointer"
                style={{
                  ...circlesPositions[i],
                  width: circlesPositions[i]?.size || 80,
                  height: circlesPositions[i]?.size || 80,
                  zIndex: 10,
                }}
              >
                <span className="text-xs text-center">{skill}</span>
              </div>
            ))}
          </div>

          {/* 오른쪽 컨테이너 */}
          <div
            className="relative w-full md:w-1/2 h-[400px] md:h-[800px]"
            ref={rightContainerRef}
            onMouseOver={handleRightContainerMouseOver}
            onMouseOut={handleRightContainerMouseOut}
          >
            {backendSkills.map((skill, i) => (
              <div
                key={i}
                className="absolute rounded-full flex items-center justify-center text-white font-medium shadow-lg hover:scale-110 cursor-pointer"
                style={{
                  ...circles2Positions[i],
                  width: circles2Positions[i]?.size || 80,
                  height: circles2Positions[i]?.size || 80,
                  position: "absolute",
                  zIndex: 10,
                }}
              >
                <span className="text-xs text-center">{skill}</span>
              </div>
            ))}
          </div>

          {/* 중앙 회전 원 - 절대 위치로 고정 */}
          <div
            className="absolute shadow-xl bg-[#dcaa71] rounded-full flex items-center justify-center text-white font-bold"
            style={{
              width: 220,
              height: 220,
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              zIndex: 20,
              transition: "transform 0.05s linear",
            }}
          >
            <div
              className="text-center"
              style={{ transform: `rotate(-${rotation}deg)` }}
            >
              <div>my skills</div>
              <div>road map</div>
            </div>
          </div>
        </section>
      </div>

      {/* 하단 네비게이션 바 */}
      <ul className="w-full h-[10%] border-b-[#dcaa71] border-b-4">
        {frontendSkills.map((skill, i) => (
          <li
            key={i}
            style={{
              position: "absolute",
              bottom: 0,
              display: "inline-block",
            }}
          >
            <button
              className="points"
              onClick={() => scrollToSection(i)}
              style={{
                position: "absolute",
                right: `${i * -100}px`,
              }}
            >
              <span className="text-xs w-8 inline-block">{skill}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SkillsRoadmap;
