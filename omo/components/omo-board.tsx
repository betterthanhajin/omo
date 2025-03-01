import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import omoArrow from "@/public/omo-arrow.svg";
import omoArrowWhite from "@/public/arrow-white.svg";
import omoSearch from "@/public/omo-search.svg";
import { useRouter } from "next/navigation";
import { Book, BookAIcon, BookHeart } from "lucide-react";
import { omoState } from "@/lib/state/omo-state";

interface omoTitle {
  index?: string;
  title: string;
  contents: string;
}

interface OmoBoardProps {
  overFlow: boolean;
}

export function OmoBoard(overFlow: OmoBoardProps) {
  const [originalData, setOriginalData] = useState<omoTitle[]>([]);
  const [titledata, setTitleData] = useState<omoTitle[]>([]);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // useEffect에서 초기 데이터 설정 시 원본 데이터도 저장
  useEffect(() => {
    setOriginalData(omoState.omoDummyData);
    setTitleData(omoState.omoDummyData);
  }, []);

  useEffect(() => {
    if (overFlow.overFlow) {
      if (boardRef.current) boardRef.current.style.display = "block";
    } else {
      if (boardRef.current) boardRef.current.style.display = "none";
    }
  }, [overFlow]);

  const handleItemClick = (index: number) => {
    setHoverIndex(index);
    // URL 파라미터로 index 전달
    router.push(`../omo-board-detail?index=${index}`);
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;

    // 검색어가 비어있으면 원본 데이터 표시
    if (!searchValue.trim()) {
      setTitleData(originalData);
      return;
    }

    // 원본 데이터에서 필터링 (titledata가 아닌 originalData에서 검색)
    const filteredData = originalData.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    // 검색 결과 설정
    setTitleData(filteredData);
  };

  return (
    <>
      {overFlow && (
        <div className="w-full lg:h-full md:h-full h-auto rounded-md p-4">
          <h2 className="text-[#645555] font-bold text-xl p-2 flex items-center gap-2">
            <BookHeart />
            <span>OMO - 게시판</span>
          </h2>
          <div className="relative flex w-full items-center gap-4 p-2">
            <input
              type="text"
              className="w-full p-2 border bg-transparent border-[#c0c0c0] rounded-lg focus:outline-none"
              placeholder="검색..."
              onChange={handleSearch}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <Image src={omoSearch} alt="omo search" width="20" height="20" />
            </div>
          </div>

          {/* 카드 형태의 그리드 레이아웃으로 변경 */}
          <div className="grid grid-cols lg:grid-cols-4 sm:grid-cols-2 gap-4 p-2">
            {titledata.map((item, index) => (
              <div
                key={index}
                className="bg-[#ffdada] rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
                onMouseOver={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                onClick={() => handleItemClick(index)}
              >
                <div className="p-4 flex flex-col h-full">
                  <div className="flex-grow mb-2">
                    <h3 className="text-[#645555] font-medium">{item.title}</h3>
                    <p>
                      {item.contents.length > 100
                        ? item.contents.slice(0, 100) + "..."
                        : item.contents}
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {hoverIndex === index ? (
                      <Image
                        src={omoArrowWhite}
                        alt="omo arrow white"
                        width="15"
                        height="15"
                        className="bg-[#645555] rounded-full p-1"
                      />
                    ) : (
                      <Image
                        src={omoArrow}
                        alt="omo arrow"
                        width="15"
                        height="15"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
