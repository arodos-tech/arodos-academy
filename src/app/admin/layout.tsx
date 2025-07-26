"use client";

import {
  ActionIcon,
  AppShell,
  Box,
  Burger,
  Button,
  Divider,
  Group,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconDashboard, IconLogout, IconUsers, IconX } from "@/assets/icons";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import AdminLayoutWrapper from "./components/admin-layout-wrapper";
import Link from "next/link";
import { store } from "@/services/store";
import { useDisclosure } from "@mantine/hooks";
import { useTheme } from "@/theme/use-theme";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useMantineTheme();
  const { colors } = useTheme();

  // Use the store directly - this will automatically subscribe to changes
  const auth = store.auth();

  // Mobile navbar state
  const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] = useDisclosure(false);

  // Check if current path is login page
  const isLoginPage = pathname === "/admin/login";

  // Get page title based on pathname
  const getPageTitle = () => {
    if (pathname === "/admin") return "Admin Dashboard";
    if (pathname === "/admin/applications") return "Applications";
    return "Admin Panel";
  };

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
      ) : !auth?.isLoggedIn || !auth?.isAdmin ? null : ( // If not logged in, don't render anything until redirect happens
        // Admin layout with navbar only (header is handled by the main layout)
        <AppShell
          padding={0}
          navbar={{
            width: 250,
            breakpoint: "sm",
            collapsed: { mobile: !mobileOpened },
          }}
          styles={{
            main: {
              paddingTop: 0,
              paddingBottom: 0,
            },
          }}
        >
          {/* Burger menu for mobile view */}
          <Group p="xs" hiddenFrom="sm">
            <Burger opened={mobileOpened} onClick={toggleMobile} size="sm" />
          </Group>

          <AppShell.Navbar p="md">
            <AppShell.Section>
              <Group justify="space-between" mb="md">
                <Text size="xl" fw={700}>
                  Admin Panel
                </Text>
                {/* Close button for mobile view */}
                <ActionIcon
                  variant="subtle"
                  radius="xl"
                  onClick={closeMobile}
                  hiddenFrom="sm"
                  aria-label="Close sidebar"
                >
                  <IconX size={18} />
                </ActionIcon>
              </Group>
              <Stack gap="xs">
                <Link href="/admin" style={{ textDecoration: "none" }}>
                  <Button
                    variant="subtle"
                    fullWidth
                    leftSection={<IconDashboard size={16} />}
                    justify="left"
                    onClick={closeMobile}
                  >
                    Dashboard
                  </Button>
                </Link>
                <Link href="/admin/applications" style={{ textDecoration: "none" }}>
                  <Button
                    variant="subtle"
                    fullWidth
                    leftSection={<IconUsers size={16} />}
                    justify="left"
                    onClick={closeMobile}
                  >
                    Applications
                  </Button>
                </Link>
              </Stack>
            </AppShell.Section>
          </AppShell.Navbar>

          <AppShell.Main>
            <Box className="admin-content">
              <Title order={1} className="admin-page-title">
                {getPageTitle()}
              </Title>
              <div className="admin-page-content">{children}</div>
            </Box>
          </AppShell.Main>
        </AppShell>
      )}
    </AdminLayoutWrapper>
  );
}
