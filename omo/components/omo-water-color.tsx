import { motion } from "framer-motion";

export default function OmoWaterColor() {
  return (
    <div className="relative h-96 bg-blue-50 rounded-lg overflow-hidden">
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <filter id="watercolor" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01"
              numOctaves="5"
            />
            <feDisplacementMap in="SourceGraphic" scale="30" />
          </filter>
        </defs>
      </svg>
      <motion.div
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-200 rounded-full filter"
        style={{ filter: "url(#watercolor)" }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <h2 className="absolute top-4 left-4 text-4xl font-serif text-blue-600">
        Watercolor
      </h2>
    </div>
  );
}
