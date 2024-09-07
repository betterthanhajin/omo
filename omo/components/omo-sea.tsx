import { useEffect, useState } from "react";
import { Sun, Cloud, Waves, Bird } from "lucide-react";

export default function OmoSea() {
  const [sunPosition, setSunPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSunPosition((prev) => (prev + 1) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-200 to-blue-500 p-6 rounded-lg shadow-md overflow-hidden h-96 relative">
      <h2 className="text-2xl font-bold mb-4 text-white">Sea</h2>
      <div className="absolute inset-x-0 bottom-0 h-1/2">
        <div className="absolute inset-x-0 bottom-0 h-full bg-blue-600 opacity-50"></div>
        <Waves className="w-full h-16 text-blue-400 animate-pulse absolute bottom-0" />
        <Waves className="w-full h-12 text-blue-300 animate-pulse absolute bottom-4" />
      </div>
      <div
        className={`absolute left-1/2 w-20 h-20 rounded-full bg-gradient-to-r from-yellow-300 to-orange-500`}
        style={{ bottom: `${sunPosition}%`, transform: "translateX(-50%)" }}
      ></div>
    </div>
  );
}
