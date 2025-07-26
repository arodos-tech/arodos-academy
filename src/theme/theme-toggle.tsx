"use client";

import { IconMoon, IconSun } from "@/assets/icons";
import { useCallback, useState } from "react";

import { ActionIcon } from "@mantine/core";
import { useTheme } from "@/theme/use-theme";

const ThemeToggle = () => {
  const { themeMode, toggleTheme } = useTheme();
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = useCallback(() => {
    if (isToggling) return;

    setIsToggling(true);

    // Temporarily remove transition class from body before toggling
    document.body.classList.remove("theme-transition");

    // Toggle theme after a short delay to allow CSS transitions to be disabled
    setTimeout(() => {
      toggleTheme();

      // Re-enable transitions after theme change has been applied
      setTimeout(() => {
        document.body.classList.add("theme-transition");
        setIsToggling(false);
      }, 100);
    }, 10);
  }, [isToggling, toggleTheme]);

  return (
    <ActionIcon
      onClick={handleToggle}
      variant="light"
      size="lg"
      radius="md"
      aria-label="Toggle color scheme"
      className="themeToggleIcon"
      disabled={isToggling}
      style={{
        transition: "transform 0.2s ease, opacity 0.2s ease",
        opacity: isToggling ? 0.7 : 1,
        transform: isToggling ? "scale(0.95)" : "scale(1)",
      }}
    >
      {themeMode === "light" ? <IconMoon size={20} stroke={1.5} /> : <IconSun size={20} stroke={1.5} />}
    </ActionIcon>
  );
};

export default ThemeToggle;
