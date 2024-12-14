"use client";
import React, { useState, useEffect } from "react";
import { Sticker } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface OmoContent {
  index: string;
  content: string;
}

function OmoBoardDetailContent() {
  const [contentData, setContentData] = useState<OmoContent[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    setSelectedIndex(searchParams.get("index") ?? "");
    const contentData: OmoContent[] = Array.from({ length: 10 }, (_, i) => ({
      index: String(i),
      content: `내용...............+ ${i}`,
    }));
    setContentData(contentData);
  }, [searchParams]);

  return (
    <div className="bg-[#ffdada] rounded-md w-full h-full">
      {contentData.map(
        (content) =>
          content.index === selectedIndex && (
            <div key={content.index} className="w-full h-full p-8">
              {content.content}
            </div>
          )
      )}
      {contentData.length === 0 && (
        <div className="p-8 flex flex-col justify-center items-center w-full h-full">
          <Sticker size={50} />
          <p className="text-center">블로그 글을 선택해주세요!</p>
        </div>
      )}
    </div>
  );
}

export default function OmoBoardDetail() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <OmoBoardDetailContent />
    </React.Suspense>
  );
}
