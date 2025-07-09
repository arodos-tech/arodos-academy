"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AppShell, Text, Group, Button, Divider, Stack, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDashboard, IconUsers, IconLogout } from "@/assets/icons";
import { store } from "@/services/store";
import Link from "next/link";
import AdminLayoutWrapper from "./components/admin-layout-wrapper";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  // Use the store directly - this will automatically subscribe to changes
  const auth = store.auth();
  
  // Mobile navbar state
  const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] = useDisclosure(false);
  
  // Check if current path is login page
  const isLoginPage = pathname === "/admin/login";

  // Check if user is logged in and is admin
  useEffect(() => {
    if (!isLoginPage && (!auth?.isLoggedIn || !auth?.isAdmin)) {
      router.push("/admin/login");
    }
  }, [auth?.isLoggedIn, auth?.isAdmin, router, isLoginPage]);

  const handleLogout = () => {
    store.auth.set({
      user: {},
      token: "",
      isLoggedIn: false,
      isAdmin: false,
      forcePasswordReset: false,
      forceLogout: false,
      lastLogin: null,
      // persist property is handled by the store internally
    });
    router.push("/admin/login");
  };

  return (
    <AdminLayoutWrapper>
      {isLoginPage ? (
        // For login page, just render the children without admin layout
        <>{children}</>
      ) : !auth?.isLoggedIn || !auth?.isAdmin ? (
        // If not logged in, don't render anything until redirect happens
        null
      ) : (
        // Admin layout with header and navbar
        <AppShell
          padding="md"
          header={{ height: 60 }}
          navbar={{
            width: 250,
            breakpoint: "sm",
            collapsed: { mobile: !mobileOpened },
          }}
        >
          <AppShell.Header p="xs">
            <Group justify="space-between" style={{ height: "100%" }}>
              <Group>
                <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                <Text size="xl" fw={700}>
                  Admin Dashboard
                </Text>
              </Group>
              <Button variant="subtle" color="red" leftSection={<IconLogout size={16} />} onClick={handleLogout}>
                Logout
              </Button>
            </Group>
          </AppShell.Header>

          <AppShell.Navbar p="md" onClick={closeMobile}>
            <AppShell.Section>
              <Stack gap="xs">
                <Link href="/admin" style={{ textDecoration: "none" }}>
                  <Button variant="subtle" fullWidth leftSection={<IconDashboard size={16} />} justify="left">
                    Dashboard
                  </Button>
                </Link>
                <Link href="/admin/applications" style={{ textDecoration: "none" }}>
                  <Button variant="subtle" fullWidth leftSection={<IconUsers size={16} />} justify="left">
                    Applications
                  </Button>
                </Link>
              </Stack>
            </AppShell.Section>
            <Divider my="sm" />
            <AppShell.Section>
              <Text size="xs" c="dimmed">
                Admin Panel v1.0
              </Text>
            </AppShell.Section>
          </AppShell.Navbar>

          <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
      )}
    </AdminLayoutWrapper>
  );
}
