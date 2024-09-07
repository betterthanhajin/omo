import { motion } from "framer-motion";

export default function OmoRetro() {
  return (
    <div className="relative h-96 bg-yellow-200 rounded-lg overflow-hidden">
      <motion.div
        className="absolute top-1/3 left-1/4 w-48 h-48 bg-orange-500 rounded-full"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-teal-500 rounded-full"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <h2
        className="absolute top-4 left-4 text-4xl font-bold text-orange-600"
        style={{ fontFamily: "'Courier New', monospace" }}
      >
        Retro
      </h2>
    </div>
  );
}
