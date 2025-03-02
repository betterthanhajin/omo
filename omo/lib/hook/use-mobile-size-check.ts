import { useState, useLayoutEffect } from "react";
import { useMediaQuery } from "react-responsive";

const MOBILE_BREAKPOINT = "768px";

export const useMobileSizeCheck = (): boolean => {
  const [isMounted, setIsMounted] = useState(false);

  const isMobileQuery = useMediaQuery({
    query: `(max-width: ${MOBILE_BREAKPOINT})`,
  });

  useLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return true;
  return isMobileQuery;
};
