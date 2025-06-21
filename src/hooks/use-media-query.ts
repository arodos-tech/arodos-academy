"use client";

import { useEffect, useState } from "react";
import { useMantineTheme } from "@mantine/core";

export function useIsMobile() {
  const theme = useMantineTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileView = window.innerWidth < Number(theme.breakpoints.sm);
      setIsMobile(isMobileView);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, [theme.breakpoints.sm]);

  return isMobile;
}
