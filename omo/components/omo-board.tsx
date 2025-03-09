import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import omoArrow from "@/public/omo-arrow.svg";
import omoArrowWhite from "@/public/arrow-white.svg";
import omoSearch from "@/public/omo-search.svg";
import { useRouter } from "next/navigation";
import { Book, BookHeart, Calendar, MessageCircle, Eye } from "lucide-react";
import { omoState } from "@/lib/state/omo-state";

interface OmoTitle {
  index?: string;
  title: string;
  contents: string;
  // 게시판을 위한 추가 필드들 (실제 데이터에 맞게 조정 필요)
  date?: string;
  author?: string;
  views?: number;
  comments?: number;
}

interface OmoBoardProps {
  overFlow: boolean;
}

export function OmoBoard(overFlow: OmoBoardProps) {
  const [originalData, setOriginalData] = useState<OmoTitle[]>([]);
  const [titledata, setTitleData] = useState<OmoTitle[]>([]);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"card" | "list">("card"); // 기본값을 리스트 모드로 설정
  const boardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // 초기 데이터 로드
  useEffect(() => {
    // 샘플 데이터에 게시판 필드 추가 (실제 구현 시 이 부분 조정 필요)
    const enhancedData = omoState.omoDummyData.map((item, index) => ({
      ...item,
      date: new Date(Date.now() - index * 86400000).toLocaleDateString(),
      author: `사용자${index + 1}`,
      views: Math.floor(Math.random() * 100) + 10,
      comments: Math.floor(Math.random() * 20),
    }));

    setOriginalData(enhancedData);
    setTitleData(enhancedData);
  }, []);

  // 오버플로우 처리
  useEffect(() => {
    if (overFlow.overFlow) {
      if (boardRef.current) boardRef.current.style.display = "block";
    } else {
      if (boardRef.current) boardRef.current.style.display = "none";
    }
  }, [overFlow]);

  const handleItemClick = (index: number) => {
    setHoverIndex(index);
    router.push(`../omo-board-detail?index=${index}`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;

    if (!searchValue.trim()) {
      setTitleData(originalData);
      return;
    }

    const filteredData = originalData.filter(
      (item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.contents.toLowerCase().includes(searchValue.toLowerCase())
    );

    setTitleData(filteredData);
  };

  // 카드 뷰 렌더링
  const renderCardView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 p-2">
      {titledata.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
          onMouseOver={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
          onClick={() => handleItemClick(index)}
        >
          <div className="p-4 flex flex-col h-full">
            <div className="flex-grow">
              <h3 className="text-[#645555] font-semibold mb-2 text-lg">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {item.contents.length > 100
                  ? item.contents.slice(0, 100) + "..."
                  : item.contents}
              </p>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-500 mt-2 pt-2 border-t border-gray-100">
              <div className="flex items-center gap-1">
                <span>{item.author}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {item.date}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <Eye size={12} />
                  {item.views}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle size={12} />
                  {item.comments}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // 리스트 뷰 렌더링
  const renderListView = () => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 border-y border-gray-200">
            <th className="px-4 py-3 text-left font-medium text-gray-600 w-12">
              #
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">
              제목
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-600 w-24">
              작성자
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-600 w-28">
              날짜
            </th>
            <th className="px-4 py-3 text-center font-medium text-gray-600 w-16">
              조회
            </th>
            <th className="px-4 py-3 text-center font-medium text-gray-600 w-16">
              댓글
            </th>
          </tr>
        </thead>
        <tbody>
          {titledata.map((item, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
              onClick={() => handleItemClick(index)}
            >
              <td className="px-4 py-3 text-gray-500">{index + 1}</td>
              <td className="px-4 py-3 font-medium">{item.title}</td>
              <td className="px-4 py-3 text-gray-600 text-sm">{item.author}</td>
              <td className="px-4 py-3 text-gray-600 text-sm">{item.date}</td>
              <td className="px-4 py-3 text-gray-600 text-sm text-center">
                {item.views}
              </td>
              <td className="px-4 py-3 text-gray-600 text-sm text-center">
                {item.comments}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div
      ref={boardRef}
      className="w-full h-full bg-white rounded-lg shadow-sm p-4 mt-14"
    >
      <div className="pb-4 mb-4">
        <h2 className="text-[#645555] font-bold text-xl p-2 flex items-center gap-2">
          <BookHeart className="text-[#ff9999]" />
          <span>OMO - 게시판</span>
        </h2>
      </div>

      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              viewMode === "list"
                ? "bg-[#ffdada] text-[#645555]"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setViewMode("list")}
          >
            리스트 보기
          </button>
          <button
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              viewMode === "card"
                ? "bg-[#ffdada] text-[#645555]"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setViewMode("card")}
          >
            카드 보기
          </button>
        </div>

        <div className="relative w-64">
          <input
            type="text"
            className="w-full p-2 pl-9 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ff9999] focus:border-[#ff9999]"
            placeholder="검색..."
            onChange={handleSearch}
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Image src={omoSearch} alt="omo search" width="16" height="16" />
          </div>
        </div>
      </div>

      {/* 뷰 모드에 따라 다른 레이아웃 렌더링 */}
      {viewMode === "card" ? renderCardView() : renderListView()}

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-6">
        <nav className="flex items-center gap-1 bg-transparent">
          <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100">
            &laquo;
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md bg-[#ffdada] text-[#645555] font-medium">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100">
            3
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100">
            &raquo;
          </button>
        </nav>
      </div>
    </div>
  );
}
