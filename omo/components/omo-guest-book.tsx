"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BrickBackground from "./brick-background";

// 진짜 벽돌 같은 배경을 위한 컴포넌트
const BrickWall = () => {
  // 벽돌 색상 정의 - 더 벽돌스러운 색상으로 변경
  const brickColors = [
    "#c1272d", // 벽돌색 1
    "#d4574c", // 벽돌색 2
    "#b55b52", // 벽돌색 3
    "#a74b45", // 벽돌색 4
    "#9e4238", // 벽돌색 5
    "#8d3e2f", // 벽돌색 6
  ];

  const [brickColor, setbrickColor] = useState(brickColors[0]);

  // 모르타르(벽돌 사이 시멘트) 색상
  const mortarColor = "#e8e8e0";

  useEffect(() => {
    // 랜덤 색상 선택
    const colorIndex = Math.floor(Math.random() * brickColors.length);
    setbrickColor(brickColors[colorIndex]);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* 벽돌 패턴 백그라운드 */}
      <div
        className="w-full h-full"
        style={{
          backgroundColor: mortarColor,
          backgroundImage: `
            repeating-linear-gradient(
              to right,
              transparent,
              transparent 60px,
              ${mortarColor} 60px,
              ${mortarColor} 64px
            ),
            repeating-linear-gradient(
              to bottom,
              transparent,
              transparent 25px,
              ${mortarColor} 25px,
              ${mortarColor} 29px
            )
          `,
          position: "relative",
        }}
      >
        {/* 개별 벽돌 생성 */}
        {Array.from({ length: 80 }).map((_, index) => {
          // 행과 열 계산
          const row = Math.floor(index / 10);
          const col = index % 10;

          // 각 행이 오프셋되도록 설정 (벽돌 패턴)
          const offsetX = row % 2 === 0 ? 0 : 30;

          // 벽돌에 텍스처 효과 추가
          const textureGradient = `
            linear-gradient(
              to bottom right,
              rgba(255, 255, 255, 0.05) 0%,
              rgba(0, 0, 0, 0.05) 20%,
              rgba(0, 0, 0, 0.1) 60%,
              rgba(0, 0, 0, 0.2) 100%
            ),
            ${brickColor}
          `;

          return (
            <div
              key={`brick-${row}-${col}`}
              style={{
                position: "absolute",
                left: `${col * 120 + offsetX}px`,
                top: `${row * 29}px`,
                width: "60px",
                height: "25px",
                backgroundColor: brickColor,
                backgroundImage: textureGradient,
                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.2)",
                borderRadius: "1px",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

interface PostData {
  id: string;
  content: string;
  backgroundColor?: string;
  textColor?: string;
  rotation?: number;
}

const PostIt = ({
  id,
  content,
  updateContent,
  rotation = 0,
}: {
  id: string;
  content: string;
  updateContent: (id: string, newContent: string) => void;
  rotation?: number;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(content);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    updateContent(id, text);
  };

  // 포스트잇 색상 배열
  const postItColors = [
    {
      bg: "linear-gradient(135deg, #fff9c4 0%, #fff59d 100%)",
      shadow: "rgba(0,0,0,0.15)",
    },
    {
      bg: "linear-gradient(135deg, #ffccbc 0%, #ffab91 100%)",
      shadow: "rgba(0,0,0,0.15)",
    },
    {
      bg: "linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 100%)",
      shadow: "rgba(0,0,0,0.15)",
    },
    {
      bg: "linear-gradient(135deg, #bbdefb 0%, #90caf9 100%)",
      shadow: "rgba(0,0,0,0.15)",
    },
    {
      bg: "linear-gradient(135deg, #e1bee7 0%, #ce93d8 100%)",
      shadow: "rgba(0,0,0,0.15)",
    },
  ];

  // ID를 기반으로 일관된 색상 선택
  const colorIndex = parseInt(id.replace("postit-", "")) % postItColors.length;
  const postItColor = postItColors[colorIndex];

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: rotation + 2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ rotate: rotation }}
      className="h-48 p-4 m-2 shadow-md rounded-sm cursor-move"
      style={{
        boxShadow: `3px 3px 8px ${postItColor.shadow}`,
        background: postItColor.bg,
        transformOrigin: "center",
      }}
      onClick={handleClick}
      drag
      dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
    >
      {isEditing ? (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
          className="w-full h-full bg-transparent resize-none focus:outline-none font-handwriting text-gray-800"
          style={{
            lineHeight: "1.5",
            fontSize: "16px",
          }}
          autoFocus
        />
      ) : (
        <p
          className="font-handwriting text-gray-800 break-words overflow-hidden"
          style={{
            lineHeight: "1.5",
            fontSize: "16px",
          }}
        >
          {content}
        </p>
      )}
      <div className="absolute bottom-2 right-2 w-6 h-6 bg-gray-200 bg-opacity-40 rounded-full cursor-grabbing"></div>
    </motion.div>
  );
};

const PostItBoard = () => {
  const [postIts, setPostIts] = useState<PostData[]>([
    { id: "postit-1", content: "첫 번째 메모", rotation: -2 },
    { id: "postit-2", content: "두 번째 메모", rotation: 1 },
    { id: "postit-3", content: "세 번째 메모", rotation: -1 },
    { id: "postit-4", content: "네 번째 메모", rotation: 2 },
    { id: "postit-5", content: "다섯번째 메모", rotation: -3 },
    { id: "postit-6", content: "여섯번째 메모", rotation: 0 },
    { id: "postit-7", content: "일곱번째 메모", rotation: -1 },
    { id: "postit-8", content: "여덟번째 메모", rotation: 1 },
    { id: "postit-9", content: "아홉번째 메모", rotation: -3 },
    { id: "postit-10", content: "열번째 메모", rotation: 0 },
    { id: "postit-11", content: "열한번째 메모", rotation: -1 },
    { id: "postit-12", content: "열두번째 메모", rotation: 1 },
  ]);

  const [newPostContent, setNewPostContent] = useState("");

  const updateContent = (id: string, newContent: string) => {
    setPostIts(
      postIts.map((postIt) =>
        postIt.id === id ? { ...postIt, content: newContent } : postIt
      )
    );
  };

  const addNewPost = () => {
    if (newPostContent.trim() !== "") {
      const newId = `postit-${postIts.length + 1}`;
      const newRotation = Math.floor(Math.random() * 6) - 3; // -3부터 3까지의 랜덤 회전
      setPostIts([
        ...postIts,
        {
          id: newId,
          content: newPostContent,
          rotation: newRotation,
        },
      ]);
      setNewPostContent("");
    }
  };

  return (
    <div className="relative min-h-screen mt-14">
      {/* 컬러풀한 벽돌 배경 */}
      <BrickWall />

      {/* 새 포스트잇 추가 폼 */}
      <div className="sticky top-0 z-10 p-4 bg-white bg-opacity-80 backdrop-blur-md shadow-md">
        <h2 className="text-xl font-bold mb-2 text-gray-800">방명록</h2>
        <div className="flex">
          <input
            type="text"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="새 메모 작성하기..."
            className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={addNewPost}
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition"
          >
            추가
          </button>
        </div>
      </div>

      {/* 포스트잇 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {postIts.map((postIt) => (
          <PostIt
            key={postIt.id}
            id={postIt.id}
            content={postIt.content}
            updateContent={updateContent}
            rotation={postIt.rotation}
          />
        ))}
      </div>
    </div>
  );
};

const OmoGuestbook = () => {
  return (
    <section className="w-full min-h-screen overflow-hidden relative">
      <BrickBackground />
      <PostItBoard />
    </section>
  );
};

export default OmoGuestbook;
