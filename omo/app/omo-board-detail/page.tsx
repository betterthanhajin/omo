"use client";
import React, { useState, useEffect } from "react";
import { Sticker, ArrowLeft } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { omoActions, omoState } from "@/lib/state/omo-state";

interface OmoContent {
  index: string;
  title: string;
  contents: string;
}

function OmoBoardDetailContent() {
  const [contentData, setContentData] = useState<OmoContent[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    setSelectedIndex(searchParams.get("index") ?? "");
    setContentData(omoState.omoDummyData);
  }, [searchParams]);

  const handleGoBack = () => {
    // This will navigate back while preserving history
    router.back();
    // TODO: 되돌아길경우 omo-retro가 렌더링안되게 하기
    omoActions.setShowThemeRandering(false);
  };

  return (
    <div className="bg-[#ffdada] w-full h-full overflow-hidden">
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
            <div className="w-full h-full p-8" key={content.index}>
              <h2>{content.title}</h2>
              <div key={content.index}>{content.contents}</div>
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
