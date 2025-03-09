import { useState, useEffect } from "react";
import PostItBoard from "./omo-postIt";
export default function OmoSectionMain() {
  const [isSquareExpanded, setIsSquareExpanded] = useState(false);
  const [isCircleMoving, setIsCircleMoving] = useState(false);

  useEffect(() => {
    // Start square animation immediately
    setIsSquareExpanded(true);

    const timer2 = setTimeout(() => {
      setIsSquareExpanded(false);
    }, 3000);
    // // Start circle animation after 3 seconds (1s for square animation + 2s delay)
    const timer = setTimeout(() => {
      setIsCircleMoving(true);
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);
  return (
    <>
      <section className="mt-20 w-full h-full bg-[#d5f1e7] overflow-y-scroll scrollbar-none">
        <div>
          <PostItBoard />
        </div>
      </section>
    </>
  );
}
