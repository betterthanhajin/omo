import React, { useEffect, useState } from "react";

const WarholFish = ({ color }: { color: string }) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M36 20C36 28.8366 28.8366 36 20 36C11.1634 36 4 28.8366 4 20C4 11.1634 11.1634 4 20 4C28.8366 4 36 11.1634 36 20Z"
      fill={color}
    />
    <path
      d="M28 16C28 18.2091 26.2091 20 24 20C21.7909 20 20 18.2091 20 16C20 13.7909 21.7909 12 24 12C26.2091 12 28 13.7909 28 16Z"
      fill="white"
    />
    <path d="M10 20L20 15V25L10 20Z" fill="white" />
  </svg>
);

const WarholWave = ({ color }: { color: string }) => (
  <svg
    width="100%"
    height="40"
    viewBox="0 0 100 40"
    preserveAspectRatio="none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 20C25 20 25 0 50 0C75 0 75 20 100 20V40H0V20Z" fill={color} />
  </svg>
);

export default function OmoSea() {
  const [time, setTime] = useState(0);
  const [fishPositions, setFishPositions] = useState([{ x: 0, y: 0 }]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => (prev + 1) % 400);
      setFishPositions(
        Array.from({ length: 4 }, () => ({
          x: Math.random() * 100,
          y: 30 + Math.random() * 40,
        }))
      );
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const isNight = time > 200;
  const colorSchemes = [
    {
      sky: "from-pink-400 to-blue-500",
      sea: "blue-300",
      fish: ["#FF69B4", "#00CED1", "#FF6347", "#32CD32"],
    },
    {
      sky: "from-yellow-300 to-red-500",
      sea: "red-300",
      fish: ["#4B0082", "#00FF00", "#FF1493", "#1E90FF"],
    },
    {
      sky: "from-green-300 to-purple-500",
      sea: "purple-300",
      fish: ["#FFD700", "#FF4500", "#00FFFF", "#FF69B4"],
    },
    {
      sky: "from-indigo-400 to-pink-500",
      sea: "pink-300",
      fish: ["#00FA9A", "#FF69B4", "#4169E1", "#FFD700"],
    },
  ];

  const scheme = colorSchemes[Math.floor(time / 100)];

  return (
    <div
      className={`bg-gradient-to-b ${scheme.sky} p-6 h-full rounded-lg shadow-md overflow-hidden relative`}
    >
      {/* Sun/Moon */}
      <div
        className={`absolute left-1/2 w-24 h-24 rounded-full bg-yellow-400 shadow-lg`}
        style={{
          bottom: `${Math.abs((time % 200) - 100)}%`,
          transform: "translateX(-50%)",
          transition: "all 0.3s ease-in-out",
          filter: "contrast(150%) brightness(120%)",
        }}
      />

      {/* Sea */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden">
        <div
          className={`absolute inset-x-0 bottom-0 h-full bg-${scheme.sea} opacity-80`}
        ></div>
        <WarholWave color={`rgba(255,255,255,0.3)`} />
        <WarholWave color={`rgba(255,255,255,0.2)`} />
      </div>

      {/* Fish */}
      {fishPositions.map((pos, index) => (
        <div
          key={index}
          className="absolute transition-all duration-1000 ease-in-out"
          style={{ left: `${pos.x}%`, bottom: `${pos.y}%` }}
        >
          <WarholFish color={scheme.fish[index]} />
        </div>
      ))}
    </div>
  );
}
