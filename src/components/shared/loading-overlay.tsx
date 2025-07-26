"use client";

import { Box, Center, Loader, Portal } from "@mantine/core";
import { useEffect, useState } from "react";

import { useTheme } from "@/theme/use-theme";

// Global state to control the loading overlay
let showLoadingOverlayCallback: ((show: boolean) => void) | null = null;

export function showLoadingOverlay(show: boolean) {
  if (showLoadingOverlayCallback) {
    showLoadingOverlayCallback(show);
  }
}

export default function LoadingOverlay() {
  const [visible, setVisible] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    showLoadingOverlayCallback = (show: boolean) => {
      setVisible(show);
    };

    return () => {
      showLoadingOverlayCallback = null;
    };
  }, []);

  if (!visible) return null;

  return (
    <Portal>
      <Box
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 9999,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backdropFilter: "blur(3px)",
        }}
      >
        <Center>
          <Loader size="xl" color={colors?.primary || "var(--mantine-color-primary-6)"} />
        </Center>
      </Box>
    </Portal>
  );
}
