import { useState, useEffect } from "react";
import Image from "next/image";
import omoArrow from "@/public/omo-arrow.svg";
import omoArrowWhite from "@/public/arrow-white.svg";
import omoSearch from "@/public/omo-search.svg";

interface omoTitle {
  title: string;
}

interface omoContent {
  content: string;
}

export function OmoBoard() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [titledata, setTitleData] = useState<omoTitle[]>([]);
  const [contentData, setContentData] = useState<omoContent[]>([]);

  useEffect(() => {
    const dummyData: omoTitle[] = Array.from({ length: 10 }, (_, i) => ({
      title: `props 를 통해 컴포넌트에게 값 전달하기`,
    }));

    const contentData: omoContent[] = Array.from({ length: 10 }, (_, i) => ({
      content: `내용...............ㅁ루ㅏㅇ나룽ㄴ미ㅜㄴ이ㅏㅊㅁ나ㅣ + ${i}`,
    }));

    setTitleData(dummyData);
    setContentData(contentData);
  }, []);

  return (
    <>
      <div className="flex min-h-40 h-full w-full">
        <div className="w-1/2 bg-[#EBEAEA]">
          <div className="flex w-full bg-white p-2">
            <input type="text" className="w-full p-1" placeholder="검색....." />
            <Image
              src={omoSearch}
              alt="omo search"
              width="20"
              height="20"
            ></Image>
          </div>

          <ul>
            {titledata.map((item, index) => (
              <li
                key={index}
                className="flex gap-2 p-2 text-[#645555] hover:bg-[#645555] hover:text-white"
                onMouseOver={() => {
                  setHoverIndex(index);
                }}
                onMouseLeave={() => {
                  setHoverIndex(null);
                }}
                onClick={() => {
                  setHoverIndex(index);
                }}
              >
                <div>{item.title}</div>
                {hoverIndex === index ? ( // Check if the current item is being hovered
                  <Image
                    src={omoArrowWhite}
                    alt="omo arrow white"
                    width="10"
                    height="10"
                  ></Image>
                ) : (
                  <Image
                    src={omoArrow}
                    alt="omo arrow"
                    width="10"
                    height="10"
                  ></Image>
                )}
              </li>
            ))}
          </ul>
        </div>
        {contentData.map((item, index) => (
          <div
            key={index}
            className="w-1/2 p-8"
            style={{ display: hoverIndex === index ? "block" : "none" }}
          >
            {item.content}
          </div>
        ))}
      </div>
    </>
  );
}
