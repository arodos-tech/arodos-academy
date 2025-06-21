"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";

// Navigation items configuration
export const navItems = [
  { label: "Home", link: "/home" },
  { label: "Programs", link: "/programs" },
  { label: "About", link: "/about" },
  { label: "Contact", link: "/contact" },
];

// Paths where header should not be shown
export const noHeaderPaths = ["/login", "/signup", "/404"];

export function useHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [opened, { toggle, close }] = useDisclosure(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Only run on client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Set active item based on current path
  useEffect(() => {
    if (!pathname) return;

    // Find the matching nav item based on the current path
    const matchingItem = navItems.find(item => {
      // Exact match
      if (item.link === pathname) return true;
      
      // Handle nested routes (e.g., /programs/123 should highlight Programs)
      if (pathname.startsWith(`${item.link}/`)) return true;
      
      // Special case for home
      if (item.link === "/home" && pathname === "/") return true;
      
      return false;
    });
    
    setActiveItem(matchingItem?.label || null);
  }, [pathname]);

  // Navigate to a route and close mobile menu
  const navigateTo = (path: string) => {
    router.push(path);
    close();
  };

  // Check if header should be shown
  const shouldShowHeader = mounted && !noHeaderPaths.includes(pathname || "");

  return {
    router,
    pathname,
    opened,
    toggle,
    close,
    activeItem,
    mounted,
    shouldShowHeader,
    navigateTo
  };
}
