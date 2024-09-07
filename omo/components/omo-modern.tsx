import { motion } from "framer-motion";

export default function OmoModern() {
  return (
    <div className="relative h-96 bg-gray-900 rounded-lg overflow-hidden">
      <motion.div
        className="absolute top-1/2 left-1/2 w-40 h-40 bg-white"
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1.2, 1, 1],
          borderRadius: ["0%", "0%", "50%", "50%", "0%"],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <h2 className="absolute top-4 left-4 text-4xl font-light text-white">
        Modern
      </h2>
    </div>
  );
}
