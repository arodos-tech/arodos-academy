"use client";

import { AppShell, MantineProvider } from "@mantine/core";
import LoadingOverlay, { showLoadingOverlay } from "@/components/shared/loading-overlay";
import { usePathname, useRouter } from "next/navigation";

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

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
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

  // Handle navigation events and clean up admin classes
  useEffect(() => {
    // Create event listeners for navigation
    const handleRouteChangeStart = () => {
      showLoadingOverlay(true);
    };

    const handleRouteChangeComplete = () => {
      // Clean up admin-related classes when navigating away from admin pages
      if (!isAdminPath(pathname || "")) {
        document.body.classList.remove("admin-page");
        document.body.classList.remove("admin-login-page");
      }

      // Add a small delay to ensure content is loaded
      setTimeout(() => {
        showLoadingOverlay(false);
      }, 300);
    };

    // Call once on initial load to ensure proper state
    handleRouteChangeComplete();

    // Use a MutationObserver to detect navigation changes
    // This is a workaround since Next.js App Router doesn't expose navigation events directly
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          // Check if the URL has changed
          const currentPath = window.location.pathname;
          if (currentPath !== pathname) {
            handleRouteChangeComplete();
          }
        }
      }
    });

    // Start observing changes to the body element
    observer.observe(document.body, { childList: true, subtree: true });

    // Clean up
    return () => {
      observer.disconnect();
    };
  }, [pathname]);

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
                      minHeight: "calc(100vh - 80px)", // Ensure main content takes at least full viewport height minus header
                    },
                  }
                : {
                    main: {
                      minHeight: "calc(100vh - 80px)", // Ensure main content takes at least full viewport height minus header
                    },
                  }
            }
          >
            <Header isAdmin={isAdmin} />
            {children}
            {!isAdmin && <Footer />}
          </AppShell>
          <LoadingOverlay />
        </ThemeProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}
