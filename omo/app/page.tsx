"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { OmoHeader } from "@/components/omo-header";
import { OmoFooter } from "@/components/omo-footer";
import { useMediaQuery } from "react-responsive";
import { motion, AnimatePresence } from "framer-motion";

// Dynamic imports for code splitting
const OmoRetro = dynamic(() => import("../components/omo-retro"));
const OmoWaterColor = dynamic(() => import("../components/omo-water-color"));
const OmoModern = dynamic(() => import("../components/omo-modern"));
const OmoSectionSkills = dynamic(
  () => import("../components/omo-section-skills")
);
const OmoSectionMain = dynamic(() => import("../components/omo-section-main"));
const OmoKitsch = dynamic(() => import("@/components/omo-kitsch"));
const OmoRoadMap = dynamic(() => import("@/components/omo-roadmap"));

const components = [
  OmoRetro,
  // OmoWaterColor,
  // OmoModern,
  // OmoSectionSkills,
  OmoSectionMain,
  OmoKitsch,
  OmoRoadMap,
];
// * , "main", "kitsch" , "skills", "main"
const concepts = ["omo - 01", "omo - 02", "omo - 03", "omo - 04"];

const pageVariants = {
  initial: { opacity: 0, x: "-100%" },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: "100%" },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

const OptimizedHomeComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRandomEnabled, setIsRandomEnabled] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const CurrentComponent = useMemo(
    () => components[currentIndex],
    [currentIndex]
  );
  let newIndex = 0;
  const handleSwitchToggle = useCallback((isEnabled: boolean) => {
    setIsRandomEnabled(isEnabled);
    if (isEnabled) {
      setCurrentIndex(newIndex);
      newIndex++;
      if (newIndex === components.length) {
        newIndex = 0;
      }
    }
  }, []);

  const handleSwipe = useCallback(
    (direction: string) => {
      if (isRandomEnabled) {
        const newIndex = Math.floor(Math.random() * components.length);
        setCurrentIndex(newIndex);
      } else {
        if (direction === "left") {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % components.length);
        } else if (direction === "right") {
          setCurrentIndex(
            (prevIndex) =>
              (prevIndex - 1 + components.length) % components.length
          );
        }
      }
    },
    [isRandomEnabled]
  );

  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].clientX;
      if (touchStartX - touchEndX > 50) {
        handleSwipe("left");
      } else if (touchEndX - touchStartX > 50) {
        handleSwipe("right");
      }
    };

    if (isMobile) {
      window.addEventListener("touchstart", handleTouchStart);
      window.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (isMobile) {
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [isMobile, handleSwipe]);

  return (
    <>
      {" "}
      <OmoHeader
        handleSwitchToggle={handleSwitchToggle}
        conceptName={concepts[currentIndex]}
        isRandomEnabled={isRandomEnabled}
      />
      <main className="absolute top-24 flex-grow w-full h-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="w-full h-full"
          >
            <CurrentComponent />
          </motion.div>
        </AnimatePresence>
      </main>
    </>
  );
};

export default React.memo(OptimizedHomeComponent);

// LayeredHomeComponent.tsx
// "use client";
// import React, { useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import dynamic from "next/dynamic";
// import { OmoHeader } from "@/components/omo-header";
// import { OmoFooter } from "@/components/omo-footer";
// import { useLayerSystem, Layer } from "@/lib/layerSystem";

// // Dynamic imports for code splitting
// const OmoRetro = dynamic(() => import("../components/omo-retro"));
// const OmoWaterColor = dynamic(() => import("../components/omo-water-color"));
// const OmoModern = dynamic(() => import("../components/omo-modern"));
// const OmoSectionSkills = dynamic(
//   () => import("../components/omo-section-skills")
// );
// const OmoSectionMain = dynamic(() => import("../components/omo-section-main"));
// const OmoKitsch = dynamic(() => import("@/components/omo-kitsch"));

// const components = [
//   OmoRetro,
//   OmoWaterColor,
//   OmoModern,
//   OmoSectionSkills,
//   OmoSectionMain,
//   OmoKitsch,
// ];
// const concepts = ["retro", "watercolor", "modern", "skills", "main", "kitsch"];

// const blendModes = [
//   "normal",
//   "multiply",
//   "screen",
//   "overlay",
//   "darken",
//   "lighten",
//   "color-dodge",
//   "color-burn",
//   "hard-light",
//   "soft-light",
//   "difference",
//   "exclusion",
// ];

// const LayeredHomeComponent: React.FC = () => {
//   const { layers, activeLayerId, updateLayer, setActiveLayer } =
//     useLayerSystem(components);

//   const handleSwitchToggle = useCallback(
//     (isEnabled: boolean) => {
//       if (isEnabled) {
//         const newActiveId = Math.floor(Math.random() * components.length);
//         setActiveLayer(newActiveId);
//         layers.forEach((layer) => {
//           updateLayer(layer.id, { visible: layer.id === newActiveId });
//         });
//       }
//     },
//     [layers, setActiveLayer, updateLayer]
//   );

//   return (
//     <div className="flex flex-col min-h-screen">
//       <OmoHeader
//         handleSwitchToggle={handleSwitchToggle}
//         conceptName={activeLayerId !== null ? concepts[activeLayerId] : ""}
//         isRandomEnabled={false}
//       />
//       <main className="flex-grow w-full overflow-hidden relative">
//         <AnimatePresence>
//           {layers.map((layer) => (
//             <motion.div
//               key={layer.id}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: layer.visible ? layer.opacity : 0 }}
//               exit={{ opacity: 0 }}
//               style={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 width: "100%",
//                 height: "100%",
//                 zIndex: layer.zIndex,
//                 mixBlendMode: layer.blendMode as any,
//               }}
//             >
//               <layer.Component />
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </main>
//       <OmoFooter />
//       <LayerControlPanel
//         layers={layers}
//         activeLayerId={activeLayerId}
//         onLayerChange={updateLayer}
//         onActiveLayerChange={setActiveLayer}
//       />
//     </div>
//   );
// };

// interface LayerControlPanelProps {
//   layers: Layer[];
//   activeLayerId: number | null;
//   onLayerChange: (id: number, changes: Partial<Layer>) => void;
//   onActiveLayerChange: (id: number | null) => void;
// }

// const LayerControlPanel: React.FC<LayerControlPanelProps> = ({
//   layers,
//   activeLayerId,
//   onLayerChange,
//   onActiveLayerChange,
// }) => {
//   return (
//     <div className="bg-gray-100 p-4 border-t border-gray-300">
//       <h3 className="text-lg font-bold mb-2">Layers</h3>
//       {layers.map((layer) => (
//         <div key={layer.id} className="flex items-center mb-2">
//           <input
//             type="checkbox"
//             checked={layer.visible}
//             onChange={(e) =>
//               onLayerChange(layer.id, { visible: e.target.checked })
//             }
//             className="mr-2"
//           />
//           <button
//             onClick={() => onActiveLayerChange(layer.id)}
//             className={`mr-2 px-2 py-1 rounded ${
//               activeLayerId === layer.id
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-200"
//             }`}
//           >
//             {concepts[layer.id]}
//           </button>
//           <input
//             type="range"
//             min="0"
//             max="1"
//             step="0.1"
//             value={layer.opacity}
//             onChange={(e) =>
//               onLayerChange(layer.id, { opacity: parseFloat(e.target.value) })
//             }
//             className="mr-2"
//           />
//           <select
//             value={layer.blendMode}
//             onChange={(e) =>
//               onLayerChange(layer.id, { blendMode: e.target.value })
//             }
//             className="mr-2"
//           >
//             {blendModes.map((mode) => (
//               <option key={mode} value={mode}>
//                 {mode}
//               </option>
//             ))}
//           </select>
//           <input
//             type="number"
//             value={layer.zIndex}
//             onChange={(e) =>
//               onLayerChange(layer.id, { zIndex: parseInt(e.target.value, 10) })
//             }
//             className="w-16"
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default LayeredHomeComponent;
