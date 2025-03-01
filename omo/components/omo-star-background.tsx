// components/StarBackground.js
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const StarBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;
    const ctx = (canvas as HTMLCanvasElement).getContext("2d");
    let animationFrameId: any;
    let stars: any[] = [];

    // 캔버스 크기 설정
    const setCanvasSize = () => {
      (canvas as HTMLCanvasElement).width = window.innerWidth;
      (canvas as HTMLCanvasElement).height = window.innerHeight;
    };

    // 별 생성 함수
    const createStars = () => {
      stars = [];
      const starCount = Math.floor(
        ((canvas as HTMLCanvasElement).width *
          (canvas as HTMLCanvasElement).height) /
          3000
      );

      for (let i = 0; i < starCount; i++) {
        const x = Math.random() * (canvas as HTMLCanvasElement).width;
        const y = Math.random() * (canvas as HTMLCanvasElement).height;
        const radius = Math.random() * 1.5 + 0.5;
        const opacity = Math.random() * 0.8 + 0.2;
        const blinking = Math.random() > 0.7; // 깜빡이는 별은 30%
        const blinkSpeed = Math.random() * 0.02 + 0.01;
        const blinkDirection = Math.random() > 0.5 ? 1 : -1;

        stars.push({
          x,
          y,
          radius,
          opacity,
          originalOpacity: opacity,
          blinking,
          blinkSpeed,
          blinkDirection,
          hue: Math.random() * 60 + 200, // 푸른색 ~ 보라색 계열
        });
      }
    };

    // 별 그리기 함수
    const drawStars = () => {
      (ctx as CanvasRenderingContext2D).clearRect(
        0,
        0,
        (canvas as HTMLCanvasElement).width,
        (canvas as HTMLCanvasElement).height
      );

      stars.forEach((star) => {
        // 깜빡임 효과
        if (star.blinking) {
          star.opacity += star.blinkSpeed * star.blinkDirection;

          if (
            star.opacity > star.originalOpacity + 0.3 ||
            star.opacity < star.originalOpacity - 0.3
          ) {
            star.blinkDirection *= -1;
          }
        }

        // 별 그리기
        (ctx as CanvasRenderingContext2D).beginPath();
        (ctx as CanvasRenderingContext2D).arc(
          star.x,
          star.y,
          star.radius,
          0,
          Math.PI * 2
        );
        (
          ctx as CanvasRenderingContext2D
        ).fillStyle = `hsla(${star.hue}, 100%, 80%, ${star.opacity})`;

        // 큰 별은 빛남 효과 추가
        if (star.radius > 1.2) {
          (ctx as CanvasRenderingContext2D).shadowBlur = star.radius * 5;
          (
            ctx as CanvasRenderingContext2D
          ).shadowColor = `hsla(${star.hue}, 100%, 70%, ${star.opacity})`;
        } else {
          (ctx as CanvasRenderingContext2D).shadowBlur = 0;
        }

        (ctx as CanvasRenderingContext2D).fill();
      });

      // 별똥별 효과 (랜덤하게)
      if (Math.random() < 0.01) {
        // 1% 확률로 별똥별 생성
        createShootingStar();
      }

      animationFrameId = requestAnimationFrame(drawStars);
    };

    // 별똥별 생성 및 애니메이션
    const createShootingStar = () => {
      const start = {
        x: Math.random() * (canvas as HTMLCanvasElement).width,
        y: 0,
      };

      const length = Math.random() * 100 + 50;
      const angle = Math.PI / 4 + (Math.random() * Math.PI) / 4; // 45도 ~ 90도 각도

      const end = {
        x: start.x + Math.cos(angle) * length,
        y: start.y + Math.sin(angle) * length,
      };

      const shootingStar = {
        start,
        end,
        progress: 0,
        speed: Math.random() * 0.02 + 0.01,
        width: Math.random() * 2 + 1,
      };

      const animateShootingStar = () => {
        shootingStar.progress += shootingStar.speed;

        if (shootingStar.progress < 1) {
          const currentX = start.x + (end.x - start.x) * shootingStar.progress;
          const currentY = start.y + (end.y - start.y) * shootingStar.progress;

          // 별똥별 그리기
          (ctx as CanvasRenderingContext2D).beginPath();
          (ctx as CanvasRenderingContext2D).moveTo(currentX, currentY);
          (ctx as CanvasRenderingContext2D).lineTo(
            currentX -
              Math.cos(angle) *
                (shootingStar.width * 10 * (1 - shootingStar.progress)),
            currentY -
              Math.sin(angle) *
                (shootingStar.width * 10 * (1 - shootingStar.progress))
          );

          const gradient = (
            ctx as CanvasRenderingContext2D
          ).createLinearGradient(
            currentX,
            currentY,
            currentX - Math.cos(angle) * (shootingStar.width * 10),
            currentY - Math.sin(angle) * (shootingStar.width * 10)
          );

          gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
          gradient.addColorStop(1, "rgba(80, 180, 255, 0)");

          (ctx as CanvasRenderingContext2D).strokeStyle = gradient;
          (ctx as CanvasRenderingContext2D).lineWidth = shootingStar.width;
          (ctx as CanvasRenderingContext2D).stroke();

          requestAnimationFrame(animateShootingStar);
        }
      };

      animateShootingStar();
    };

    // 이벤트 리스너 설정
    window.addEventListener("resize", () => {
      setCanvasSize();
      createStars();
    });

    // 마우스 움직임에 따라 별들이 미세하게 반응
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      stars.forEach((star) => {
        // 마우스와의 거리 계산
        const dx = mouseX - star.x;
        const dy = mouseY - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 일정 거리 내의 별들만 반응
        if (distance < 100) {
          const angle = Math.atan2(dy, dx);
          const repelForce = (100 - distance) / 1000;

          // 마우스 반대 방향으로 약간 이동
          star.x -= Math.cos(angle) * repelForce;
          star.y -= Math.sin(angle) * repelForce;
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 초기화 및 애니메이션 시작
    setCanvasSize();
    createStars();
    drawStars();

    // 클린업 함수
    return () => {
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <StyledCanvas ref={canvasRef} />;
};

const StyledCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  background: linear-gradient(135deg, #2b154b 0%, #2b154b 100%);
`;

export default StarBackground;
