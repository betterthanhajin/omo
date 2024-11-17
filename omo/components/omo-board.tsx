import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import omoArrow from "@/public/omo-arrow.svg";
import omoArrowWhite from "@/public/arrow-white.svg";
import omoSearch from "@/public/omo-search.svg";
import { Sticker } from "lucide-react";

interface omoTitle {
  title: string;
}

interface omoContent {
  content: string;
}

interface OmoBoardProps {
  overFlow: boolean;
}

export function OmoBoard(overFlow: OmoBoardProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [titledata, setTitleData] = useState<omoTitle[]>([]);
  const [contentData, setContentData] = useState<omoContent[]>([]);
  const boardRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    console.log("overFlowprops", overFlow.overFlow);
    if (overFlow.overFlow) {
      if (boardRef.current) boardRef.current.style.display = "flex";
    } else {
      console.log("****displaynone****");
      if (boardRef.current) boardRef.current.style.display = "none";
    }
  }, [overFlow]);

  return (
    <>
      {overFlow && (
        <div className="flex min-h-40 h-full w-full" ref={boardRef}>
          <div className="w-1/2 bg-[#e2e2e2]">
            <div className="flex w-full items-center bg-white p-2">
              <input type="text" className="w-full p-2" placeholder="검색..." />
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
                  className="flex gap-2 p-3 text-[#645555] hover:bg-[#645555] hover:text-white"
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
                  {hoverIndex === index ? (
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
          <div className="bg-[#febcbc] rounded-md w-1/2">
            {contentData.map((item, index) => (
              <div
                key={index}
                className="w-1/2 p-8"
                style={{ display: hoverIndex === index ? "block" : "none" }}
              >
                {item.content}
              </div>
            ))}
            {hoverIndex === null && (
              <>
                <div className="p-8 flex flex-col justify-center items-center w-full h-full">
                  <Sticker size={50} />
                  <p className="text-center">블로그 글을 선택해주세요!</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
