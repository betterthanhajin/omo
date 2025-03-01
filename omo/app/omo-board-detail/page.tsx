"use client";
import React, { useState, useEffect } from "react";
import { Sticker, ArrowLeft } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { omoActions } from "@/lib/state/omo-state";

interface OmoContent {
  index: string;
  content: string;
}

function OmoBoardDetailContent() {
  const [contentData, setContentData] = useState<OmoContent[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    setSelectedIndex(searchParams.get("index") ?? "");
    const contentData: OmoContent[] = Array.from({ length: 10 }, (_, i) => ({
      index: String(i),
      content: `내용...............+ ${i}`,
    }));
    setContentData(contentData);
  }, [searchParams]);

  const handleGoBack = () => {
    // This will navigate back while preserving history
    router.back();
    // TODO: 되돌아길경우 omo-retro가 렌더링안되게 하기
    omoActions.setShowThemeRandering(false);
  };

  return (
    <div className="bg-[#ffdada] rounded-md w-full h-full">
      <div className="p-4">
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>돌아가기</span>
        </button>
      </div>

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
