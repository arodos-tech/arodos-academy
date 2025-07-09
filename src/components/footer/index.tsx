"use client";

import { Box, Container, Text, Anchor, rem, Image, UnstyledButton, Flex, Stack } from "@mantine/core";
import Link from "next/link";
import { logoLight, logoDark } from "@/assets/images";
import { useTheme } from "@/theme/use-theme";

const links = [
  { link: "/", label: "Home" },
  { link: "/courses", label: "Courses" },
  { link: "/about", label: "About" },
  { link: "/contact", label: "Contact" },
];

export default function Footer() {
  const { colors, themeMode } = useTheme();
  
  return (
    <Box component="footer" py="xl" style={{ borderTop: `1px solid ${colors.border}` }}>
      <Container size="lg">
        {/* Top section with logo and navigation */}
        <Flex
          direction={{ base: "column", sm: "row" }}
          justify="space-between"
          align={{ base: "center", sm: "center" }}
          w="100%"
          mb={rem(40)}
          gap={rem(20)}
        >
          {/* Logo on the left */}
          <Box style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Link href="/home" passHref>
              <UnstyledButton>
                <Image 
                  src={themeMode === 'dark' ? logoLight.src : logoDark.src} 
                  alt="Arodos Academy" 
                  height={40} 
                  fit="contain" 
                />
              </UnstyledButton>
            </Link>
            <Text c="dimmed" size="sm">
              A unit of Arodos Technologies
            </Text>
          </Box>

          {/* Navigation on the right */}
          <Stack gap={rem(15)} justify="flex-end">
            <Flex
              direction={{ base: "column", sm: "row" }}
              gap={{ base: rem(15), sm: rem(30) }}
              justify="flex-end"
              align="center"
            >
              {links.map((link) => (
                <Anchor
                  key={link.link}
                  component={Link}
                  href={link.link}
                  c="dimmed"
                  size="sm"
                  style={{
                    textDecoration: "none",
                    fontWeight: 500,
                    "&:hover": { color: colors.primary },
                  }}
                >
                  {link.label}
                </Anchor>
              ))}
            </Flex>
          </Stack>
        </Flex>

        {/* Copyright at the bottom */}
        <Box ta="center" pt={rem(20)} style={{ borderTop: `1px solid ${colors.border}` }}>
          <Text c="dimmed" size="sm">
            © 2025 Arodos Academy. All rights reserved.
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
