"use client";

import Link from "next/link";
import {
  Box,
  Container,
  Group,
  Burger,
  Drawer,
  Stack,
  Text,
  Button,
  rem,
  UnstyledButton,
  Divider,
  Image,
} from "@mantine/core";
import { logoLight, logoDark } from "@/assets/images";

// Import custom hook with header logic
import { useHeader, navItems } from "./use-header";
import { useIsMobile } from "@/hooks";
import { useTheme } from "@/theme/use-theme";
import ThemeToggle from "@/theme/theme-toggle";

const HEADER_HEIGHT = rem(80);
const MOBILE_HEADER_HEIGHT = rem(60);

const Header = () => {
  const { opened, toggle, close, activeItem, shouldShowHeader, navigateTo } = useHeader();
  const { toggleTheme, themeMode, colors } = useTheme();
  const isMobile = useIsMobile();

  // Don't render header on certain paths
  if (!shouldShowHeader) {
    return null;
  }

  const headerStyles = {
    backgroundColor: colors.background,
    borderBottom: `1px solid ${colors.border}`,
    color: colors.textPrimary,
  };

  const items = navItems.map((item) => (
    <UnstyledButton
      key={item.label}
      component={Link}
      href={item.link}
      onClick={close}
      style={{
        fontWeight: 500,
        fontSize: rem(16),
        color: activeItem === item.label ? colors.primary : colors.textPrimary,
        borderBottom: activeItem === item.label ? `2px solid ${colors.primary}` : "none",
        padding: `${rem(8)} ${rem(12)}`,
        transition: "all 0.2s ease",
        "&:hover": {
          color: colors.primaryHover,
        },
      }}
    >
      {item.label}
    </UnstyledButton>
  ));

  return (
    <Box
      style={{
        height: isMobile ? MOBILE_HEADER_HEIGHT : HEADER_HEIGHT,
        borderBottom: `1px solid ${colors.border}`,
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: colors.background,
      }}
    >
      <Container size="lg" h="100%" px={isMobile ? "xs" : "md"}>
        <Group justify="space-between" h="100%" wrap="nowrap">
          <Link href="/home" passHref>
            <UnstyledButton>
              <Image 
                src={themeMode === 'dark' ? logoLight.src : logoDark.src} 
                alt="Arodos Academy" 
                height={isMobile ? 25 : 35} 
                width="auto" 
                fit="contain" 
              />
            </UnstyledButton>
          </Link>

          <Group gap="lg" visibleFrom="md">
            {items}
          </Group>

          <Group visibleFrom="md">
            <ThemeToggle />
            <Button onClick={() => navigateTo("/contact#reg-form")} size={isMobile ? "sm" : "md"}>
              Apply Now
            </Button>
          </Group>

          <Group hiddenFrom="md" gap={4} wrap="nowrap">
            <ThemeToggle />
            <Burger opened={opened} onClick={toggle} size="sm" />
          </Group>
        </Group>
      </Container>

      {/* Mobile drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="md"
        title={
          <Group justify="space-between" style={{ width: "100%" }}>
            <Image src={themeMode === 'dark' ? logoLight.src : logoDark.src} alt="Arodos Academy" height={25} fit="contain" />
            <Burger opened={opened} onClick={close} size="sm" aria-label="Close menu" />
          </Group>
        }
        hiddenFrom="md"
        zIndex={1000}
      >
        <Stack gap="xl" style={{ flex: 1 }}>
          {items}
          <Group>
            <Button fullWidth size="lg" onClick={() => navigateTo("/contact#reg-form")}>
              Apply Now
            </Button>
          </Group>
        </Stack>
      </Drawer>
    </Box>
  );
};

export default Header;
