"use client";

import { ActionIcon, Tooltip } from "@mantine/core";
import { IconSun, IconMoon } from "@/assets/icons";
import { useTheme } from "@/theme/use-theme";

const ThemeToggle = () => {
  const { themeMode, toggleTheme } = useTheme();

  return (
    <Tooltip label={themeMode === "light" ? "Switch to dark mode" : "Switch to light mode"}>
      <ActionIcon
        onClick={toggleTheme}
        variant="light"
        size="lg"
        radius="md"
        aria-label="Toggle color scheme"
        className="themeToggleIcon"
      >
        {themeMode === "light" ? <IconMoon size={20} stroke={1.5} /> : <IconSun size={20} stroke={1.5} />}
      </ActionIcon>
    </Tooltip>
  );
};

export default ThemeToggle;
