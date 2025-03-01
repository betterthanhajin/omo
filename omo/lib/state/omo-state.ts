import { proxy, useSnapshot } from "valtio";

/**
 * IVR = Interactive Voice Response
 */
export const omoState = proxy({
  /**
   * 랜덤테마 랜더링 할지 여부
   */
  showThemeRandering: true,
});

export const omoActions = {
  setShowThemeRandering: (showThemeRandering: boolean) => {
    omoState.showThemeRandering = showThemeRandering;
  },
};

export const useIvrChatState = () => useSnapshot(omoState);
