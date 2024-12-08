"use client";
import React, { useState, useEffect } from "react";
import { Sticker } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface omoContent {
  content: string;
}

export default function OmoBoardDetail() {
  const [contentData, setContentData] = useState<omoContent[]>([]);
  const searchParams = useSearchParams();
  const selectedIndex = searchParams.get("index");

  useEffect(() => {
    const contentData: omoContent[] = Array.from({ length: 10 }, (_, i) => ({
      content: `내용...............+ ${i}`,
    }));
    setContentData(contentData);
  }, []);

  const selectedContent =
    selectedIndex !== null ? contentData[parseInt(selectedIndex)] : null;

  return (
    <div className="bg-[#ff8a8a] rounded-md w-full">
      {selectedContent ? (
        <div className="w-full p-8">{selectedContent.content}</div>
      ) : (
        <div className="p-8 flex flex-col justify-center items-center w-full h-full">
          <Sticker size={50} />
          <p className="text-center">블로그 글을 선택해주세요!</p>
        </div>
      )}
    </div>
  );
}
