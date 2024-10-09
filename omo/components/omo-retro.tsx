import React, { useState } from "react";
import { motion } from "framer-motion";

export default function OmoRetro() {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative h-full bg-gradient-to-br bg-pink-400 overflow-x-hidden">
      {/* Disco ball */}
      {/* <motion.div
        className="absolute top-10 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(211,211,211,0.8) 100%)",
          boxShadow: "0 0 20px 10px rgba(255,255,255,0.5)",
        }}
        animate={{
          rotateY: isPlaying ? 360 : 0,
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(20)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-full h-full rounded-full"
            style={{
              background: `linear-gradient(${
                index * 18
              }deg, transparent 0%, ${getRandomColor()} 50%, transparent 100%)`,
              opacity: 0.7,
            }}
            animate={{
              opacity: isPlaying ? [0.7, 1, 0.7] : 0.7,
            }}
            transition={{
              duration: 0.5 + Math.random(),
              repeat: Infinity,
              delay: Math.random() * 0.5,
            }}
          />
        ))}
        {[...Array(50)].map((_, index) => (
          <motion.div
            key={`sparkle-${index}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: isPlaying ? [1, 1.5, 1] : 1,
              opacity: isPlaying ? [0.5, 1, 0.5] : 0.5,
            }}
            transition={{
              duration: 0.3 + Math.random() * 0.5,
              repeat: Infinity,
              delay: Math.random() * 0.5,
            }}
          />
        ))}
      </motion.div> */}
      {/* Home floor */}
      <div className="absolute bottom-0 left-0 right-0 h-full grid grid-cols-8 grid-rows-8">
        {[...Array(128)].map((_, index) => (
          <motion.div
            key={index}
            className="bg-white"
            style={{
              backgroundColor: getRandomColor(),
            }}
            animate={{
              opacity: isPlaying ? [0.2, 1, 0.2] : 0.2,
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: Math.random() * 0.5,
            }}
          />
        ))}
      </div>
      {/* Album title */}
      {/* <motion.h2
        className="absolute top-4 left-4 text-6xl font-bold text-white"
        style={{ fontFamily: "'Brush Script MT', cursive" }}
        animate={{
          y: isPlaying ? [0, -10, 0] : 0,
        }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        Get Up
      </motion.h2> */}
      {/* Play button */}
      {/* <motion.button
        className="absolute bottom-4 right-4 px-6 py-2 bg-yellow-400 text-purple-800 rounded-full font-bold text-xl"
        onClick={togglePlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isPlaying ? "Pause" : "Play"}
      </motion.button> */}
      {/* NewJeans members (stylized) */}
      {/* {["Minji", "Hanni", "Danielle", "Haerin", "Hyein"].map(
        (member, index) => (
          <motion.div
            key={member}
            className="absolute w-16 h-16 bg-transparent rounded-full flex items-center justify-center"
            style={{
              top: `${20 + index * 15}%`,
              left: `${10 + index * 20}%`,
            }}
            animate={{
              y: isPlaying ? [0, -20, 0] : 0,
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: index * 0.1,
            }}
          >
            <svg
              width="186"
              height="191"
              viewBox="0 0 186 191"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse
                cx="125.5"
                cy="48.5"
                rx="26.5"
                ry="48.5"
                fill="#FEBCBC"
              />
              <ellipse cx="66.5" cy="48.5" rx="26.5" ry="48.5" fill="#FEBCBC" />
              <ellipse cx="93" cy="128" rx="93" ry="63" fill="#FEBCBC" />
              <path
                d="M61.3864 136.412C59.0947 136.412 57.125 135.943 55.4773 135.006C53.839 134.059 52.5748 132.742 51.6847 131.057C50.804 129.362 50.3636 127.397 50.3636 125.162C50.3636 122.918 50.804 120.953 51.6847 119.267C52.5748 117.572 53.839 116.256 55.4773 115.318C57.125 114.371 59.0947 113.898 61.3864 113.898C63.678 113.898 65.643 114.371 67.2812 115.318C68.929 116.256 70.1932 117.572 71.0739 119.267C71.964 120.953 72.4091 122.918 72.4091 125.162C72.4091 127.397 71.964 129.362 71.0739 131.057C70.1932 132.742 68.929 134.059 67.2812 135.006C65.643 135.943 63.678 136.412 61.3864 136.412ZM61.429 131.17C62.2623 131.17 62.9678 130.915 63.5455 130.403C64.1231 129.892 64.5634 129.182 64.8665 128.273C65.179 127.364 65.3352 126.312 65.3352 125.119C65.3352 123.907 65.179 122.847 64.8665 121.938C64.5634 121.028 64.1231 120.318 63.5455 119.807C62.9678 119.295 62.2623 119.04 61.429 119.04C60.5672 119.04 59.8381 119.295 59.2415 119.807C58.6544 120.318 58.2045 121.028 57.892 121.938C57.589 122.847 57.4375 123.907 57.4375 125.119C57.4375 126.312 57.589 127.364 57.892 128.273C58.2045 129.182 58.6544 129.892 59.2415 130.403C59.8381 130.915 60.5672 131.17 61.429 131.17ZM75.9673 136V114.182H82.5724V118.188H82.8139C83.2685 116.862 84.0355 115.815 85.1151 115.048C86.1946 114.281 87.4825 113.898 88.9787 113.898C90.4938 113.898 91.7912 114.286 92.8707 115.062C93.9503 115.839 94.6368 116.881 94.9304 118.188H95.1577C95.5649 116.89 96.3603 115.853 97.544 115.077C98.7277 114.291 100.125 113.898 101.734 113.898C103.799 113.898 105.475 114.561 106.763 115.886C108.051 117.203 108.695 119.011 108.695 121.312V136H101.749V122.903C101.749 121.814 101.469 120.986 100.911 120.418C100.352 119.84 99.6274 119.551 98.7372 119.551C97.7808 119.551 97.0279 119.864 96.4787 120.489C95.9389 121.104 95.669 121.933 95.669 122.974V136H88.9929V122.832C88.9929 121.819 88.7183 121.019 88.169 120.432C87.6198 119.845 86.8954 119.551 85.9957 119.551C85.3897 119.551 84.8546 119.698 84.3906 119.991C83.9266 120.276 83.562 120.683 83.2969 121.213C83.0412 121.743 82.9134 122.368 82.9134 123.088V136H75.9673ZM123.183 136.412C120.892 136.412 118.922 135.943 117.274 135.006C115.636 134.059 114.372 132.742 113.482 131.057C112.601 129.362 112.161 127.397 112.161 125.162C112.161 122.918 112.601 120.953 113.482 119.267C114.372 117.572 115.636 116.256 117.274 115.318C118.922 114.371 120.892 113.898 123.183 113.898C125.475 113.898 127.44 114.371 129.078 115.318C130.726 116.256 131.99 117.572 132.871 119.267C133.761 120.953 134.206 122.918 134.206 125.162C134.206 127.397 133.761 129.362 132.871 131.057C131.99 132.742 130.726 134.059 129.078 135.006C127.44 135.943 125.475 136.412 123.183 136.412ZM123.226 131.17C124.059 131.17 124.765 130.915 125.342 130.403C125.92 129.892 126.36 129.182 126.663 128.273C126.976 127.364 127.132 126.312 127.132 125.119C127.132 123.907 126.976 122.847 126.663 121.938C126.36 121.028 125.92 120.318 125.342 119.807C124.765 119.295 124.059 119.04 123.226 119.04C122.364 119.04 121.635 119.295 121.038 119.807C120.451 120.318 120.001 121.028 119.689 121.938C119.386 122.847 119.234 123.907 119.234 125.119C119.234 126.312 119.386 127.364 119.689 128.273C120.001 129.182 120.451 129.892 121.038 130.403C121.635 130.915 122.364 131.17 123.226 131.17Z"
                fill="white"
              />
              <circle cx="44.6995" cy="64.4427" r="5.44271" fill="#FFBC39" />
              <circle cx="37.4427" cy="70.0504" r="5.44271" fill="#FFBC39" />
              <circle cx="40.0814" cy="77.3072" r="5.44271" fill="#FFBC39" />
              <circle cx="50.307" cy="76.6475" r="5.44271" fill="#FFBC39" />
              <circle cx="52.2865" cy="69.7205" r="5.44271" fill="#FFBC39" />
              <circle cx="45.0295" cy="71.3698" r="4.12326" fill="#FFFA8B" />
            </svg>
          </motion.div>
        )
      )} */}
    </div>
  );
}

function getRandomColor() {
  const colors = [
    "rgba(255, 107, 107, 0.5)",
    "rgba(78, 205, 196, 0.5)",
    "rgba(69, 183, 209, 0.5)",
    "rgba(253, 203, 110, 0.5)",
    "rgba(108, 92, 231, 0.5)",
    "rgba(85, 230, 193, 0.5)",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
