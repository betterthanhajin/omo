import OmoGuestbook from "@/components/omo-guest-book";
import OmoKitsch from "@/components/omo-kitsch";
import OmoRetro from "@/components/omo-retro";
import OmoRoadMap from "@/components/omo-roadmap";
import StarBackground from "@/components/omo-star-background";
import { proxy, useSnapshot } from "valtio";

/**
 * IVR = Interactive Voice Response
 */
export const omoState = proxy({
  /**
   * 랜덤테마 랜더링 할지 여부
   */
  showThemeRandering: true,

  currentComponents: [
    OmoRetro,
    OmoGuestbook,
    OmoKitsch,
    OmoRoadMap,
    StarBackground,
  ],

  omoDummyData: [
    {
      index: "0",
      title: "안녕하세요",
      contents:
        "반갑습니다. 이 게시판에 처음 방문하셨나요? 환영합니다! 여기서 다양한 개발 관련 주제에 대해 이야기를 나눌 수 있어요.",
    },
    {
      index: "1",
      title: "반갑습니다",
      contents:
        "안녕하세요! 이 커뮤니티에 가입하게 되어 기쁩니다. 앞으로 많은 정보 공유와 소통을 기대합니다.",
    },
    {
      index: "2",
      title: "props를 통해 컴포넌트에게 값 전달하기",
      contents:
        "React에서 props는 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 방법입니다. 단방향 데이터 흐름을 유지하여 애플리케이션의 예측 가능성을 높이고 디버깅을 용이하게 만듭니다. 이 글에서는 props의 기본 사용법부터 고급 패턴까지 살펴봅니다.",
    },
    {
      index: "3",
      title: "react hook을 잘 사용하는법",
      contents:
        "React Hooks는 함수형 컴포넌트에서 상태 관리와 라이프사이클 기능을 사용할 수 있게 해주는 기능입니다. useState, useEffect, useContext, useReducer 등 다양한 훅을 적절히 활용하면 코드를 더 간결하고 재사용 가능하게 만들 수 있습니다. 이 글에서는 각 훅의 사용 사례와 주의사항을 알아봅니다.",
    },
    {
      index: "4",
      title: "nextjs next/router 사용법",
      contents:
        "Next.js의 라우팅 시스템은 파일 기반 라우팅과 프로그래밍 방식 라우팅을 모두 지원합니다. next/router를 사용하면 사용자를 다른 페이지로 이동시키거나, 현재 경로 매개변수를 가져오거나, 라우팅 이벤트를 처리할 수 있습니다. 이 글에서는 next/router의 주요 기능과 사용 패턴을 자세히 알아봅니다.",
    },
    {
      index: "5",
      title: "redux를 사용하는 이유",
      contents:
        "Redux는 JavaScript 애플리케이션의 상태 관리 라이브러리로, 예측 가능한 상태 컨테이너를 제공합니다. 중앙 집중식 스토어, 불변성, 순수 함수 등의 개념을 통해 복잡한 상태 관리를 단순화합니다. 특히 대규모 애플리케이션에서 상태 관리의 복잡성을 줄이고, 디버깅과 테스트를 용이하게 만드는 장점이 있습니다.",
    },
  ],
});

export const omoActions = {
  setShowThemeRandering: (showThemeRandering: boolean) => {
    omoState.showThemeRandering = showThemeRandering;
  },
};

export const useIvrChatState = () => useSnapshot(omoState);
