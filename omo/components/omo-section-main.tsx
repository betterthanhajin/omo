import { useState, useEffect } from "react";
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
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);
  return (
    <>
      <section className="bg-[#FEA1A1] w-full h-full">
        <div>
          <div>
            <div
              className={
                isSquareExpanded
                  ? "w-full h-screen bg-[#EFEFEF] p-4 m-0"
                  : "w-[360px] h-[280px] bg-[#EFEFEF] p-4 m-0"
              }
              style={{ transition: "all 3s ease-in-out" }}
            >
              <h2 className="text-5xl text-[#645555]">
                omoshiroi
                <br />
                my-tech
                <br />
                blog
              </h2>
            </div>
            <div
              className={
                isSquareExpanded
                  ? "hidden"
                  : "block w-28 h-28 rounded-full bg-gray-200"
              }
            ></div>
          </div>

          <div
            className={
              isCircleMoving
                ? "block translate-x-96 w-[360px] h-[360px] rounded-full bg-gray-300"
                : "hidden -translate-x-0 w-[360px] h-[360px] rounded-full bg-gray-300"
            }
            style={{ transition: "all 0.5s ease" }}
          ></div>
        </div>
      </section>
    </>
  );
}
