import { useEffect, useState } from "react";

export default function OmoKitsch() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-pink-200 via-purple-100 to-yellow-200 p-6 rounded-lg shadow-md overflow-hidden">
      <h2
        className="text-2xl font-bold mb-4 text-center"
        style={{ fontFamily: "Comic Sans MS, cursive" }}
      >
        Kitsch
      </h2>
      <div className="flex justify-center items-center space-x-4">
        <div
          className="w-24 h-24 bg-yellow-300 rounded-full flex items-center justify-center animate-bounce"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <span className="text-4xl">😎</span>
        </div>
        <div className="w-24 h-24 bg-green-300 rounded-full flex items-center justify-center animate-pulse">
          <span className="text-4xl">🌈</span>
        </div>
        <div className="w-24 h-24 bg-blue-300 rounded-full flex items-center justify-center animate-spin">
          <span className="text-4xl">🦄</span>
        </div>
      </div>
    </div>
  );
}
