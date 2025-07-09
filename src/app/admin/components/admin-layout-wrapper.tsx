"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

// This component determines whether to show the main site header/footer in admin pages
export default function AdminLayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";

  // For admin pages, we'll hide the main site header/footer
  // This is done by adding a CSS class to the body
  if (typeof document !== "undefined" && isAdminPage) {
    // Add a class to the body to hide the main site header/footer
    document.body.classList.add("admin-page");
    
    // Add additional class for login page
    if (isLoginPage) {
      document.body.classList.add("admin-login-page");
    } else {
      document.body.classList.remove("admin-login-page");
    }
  } else if (typeof document !== "undefined") {
    // Remove the class if not on admin pages
    document.body.classList.remove("admin-page");
    document.body.classList.remove("admin-login-page");
  }

  return <>{children}</>;
}
