import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import omoArrow from "@/public/omo-arrow.svg";
import omoArrowWhite from "@/public/arrow-white.svg";
import omoSearch from "@/public/omo-search.svg";
import { useRouter } from "next/navigation";

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
  const [originalData, setOriginalData] = useState<omoTitle[]>([]);
  const [titledata, setTitleData] = useState<omoTitle[]>([]);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // TODO : 더미 데이터를 생성

  const dummy = [
    {
      title: "안녕하세요",
    },
    {
      title: "반갑습니다",
    },
    {
      title: "props를 통해 컴포넌트에게 값 전달하기",
    },
    {
      title: "react hook을 잘 사용하는법",
    },
    {
      title: "nextjs next/router 사용법",
    },
    {
      title: "redux를 사용하는 이유",
    },
  ];

  // useEffect에서 초기 데이터 설정 시 원본 데이터도 저장
  useEffect(() => {
    setOriginalData(dummy);
    setTitleData(dummy);
  }, []);

  useEffect(() => {
    if (overFlow.overFlow) {
      if (boardRef.current) boardRef.current.style.display = "flex";
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
        <div className="flex min-h-40 h-full w-full" ref={boardRef}>
          <div className="w-full bg-[#e2e2e2]">
            <div className="flex w-full items-center gap-4 bg-white p-2 border-t border-[#c0c0c0]">
              <input
                type="text"
                className="w-full p-2"
                placeholder="검색..."
                onChange={handleSearch}
              />
              <Image src={omoSearch} alt="omo search" width="20" height="20" />
            </div>

            <ul>
              {titledata.map((item, index) => (
                <li
                  key={index}
                  className="flex gap-2 p-4 text-[#645555] hover:bg-[#645555] border-b-[0.5px] border-[#645555] hover:text-white"
                  onMouseOver={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  onClick={() => handleItemClick(index)}
                >
                  <div>{item.title}</div>
                  {hoverIndex === index ? (
                    <Image
                      src={omoArrowWhite}
                      alt="omo arrow white"
                      width="10"
                      height="10"
                    />
                  ) : (
                    <Image
                      src={omoArrow}
                      alt="omo arrow"
                      width="10"
                      height="10"
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
