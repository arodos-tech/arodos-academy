"use client";

import { AppShell, MantineProvider } from "@mantine/core";

import Footer from "@/components/footer";
// Components
import Header from "@/components/header";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { ThemeProvider } from "@/theme/theme-provider";
import { isAdminPath } from "@/components/header/use-header";
// Theme
import { theme } from "@/theme/theme";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = isAdminPath(pathname || "");

  // Add theme transition class to body
  useEffect(() => {
    // Add the transition class to enable smooth transitions
    document.body.classList.add("theme-transition");

    // Handle theme change events to temporarily disable transitions during rapid changes
    const handleThemeChange = () => {
      // Remove transitions temporarily
      document.body.classList.remove("theme-transition");

      // Re-enable transitions after a short delay
      setTimeout(() => {
        document.body.classList.add("theme-transition");
      }, 50);
    };

    // Listen for custom theme change events
    window.addEventListener("themechange", handleThemeChange);

    // Clean up on unmount
    return () => {
      document.body.classList.remove("theme-transition");
      window.removeEventListener("themechange", handleThemeChange);
    };
  }, []);

  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <ModalsProvider>
        <Notifications position="top-right" />
        <ThemeProvider>
          <AppShell
            header={{ height: 80 }}
            padding={isAdmin ? 0 : "md"}
            styles={
              isAdmin
                ? {
                    main: {
                      paddingTop: 80, // Match header height exactly with no gap
                    },
                  }
                : undefined
            }
          >
            <Header isAdmin={isAdmin} />
            {children}
            {!isAdmin && <Footer />}
          </AppShell>
        </ThemeProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}
