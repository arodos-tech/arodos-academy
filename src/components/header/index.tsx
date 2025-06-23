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
import { logo } from "@/assets/images";

// Import custom hook with header logic
import { useHeader, navItems } from "./use-header";
import ThemeToggle from "@/theme/theme-toggle";
import { useIsMobile } from "@/hooks";

const HEADER_HEIGHT = rem(80);
const MOBILE_HEADER_HEIGHT = rem(60);

const Header = () => {
  const { opened, toggle, close, activeItem, shouldShowHeader, navigateTo } = useHeader();
  const isMobile = useIsMobile();

  // Don't render header on certain paths
  if (!shouldShowHeader) {
    return null;
  }

  const items = navItems.map((item) => (
    <UnstyledButton
      key={item.label}
      component={Link}
      href={item.link}
      onClick={close}
      style={{
        fontWeight: 500,
        fontSize: rem(16),
        color: activeItem === item.label ? "var(--mantine-color-primary-5)" : undefined,
        borderBottom: activeItem === item.label ? "2px solid var(--mantine-color-primary-5)" : "none",
        padding: `${rem(8)} ${rem(12)}`,
        transition: "all 0.2s ease",
        "&:hover": {
          color: "var(--mantine-color-primary-5)",
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
        borderBottom: `1px solid var(--mantine-color-gray-2)`,
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: "var(--mantine-color-white)",
      }}
    >
      <Container size="lg" h="100%">
        <Group justify="space-between" h="100%">
          <Link href="/home" passHref>
            <UnstyledButton>
              <Image src={logo.src} alt="Arodos Academy" height={isMobile ? 25 : 35} width="auto" fit="contain" />
            </UnstyledButton>
          </Link>

          <Group gap="lg" visibleFrom="md">
            {items}
          </Group>

          <Group visibleFrom="md">
            {/* <ThemeToggle /> */}
            <Button onClick={() => navigateTo("/contact#reg-form")} size={isMobile ? "sm" : "md"}>
              Apply Now
            </Button>
          </Group>

          <Group hiddenFrom="md" gap={4}>
            {/* <ThemeToggle /> */}
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
          <Group>
            <Image src={logo.src} alt="Arodos Academy" height={25} fit="contain" />
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
