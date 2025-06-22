"use client";

import { Box, Container, Text, Anchor, rem, Image, UnstyledButton, Flex } from "@mantine/core";
import Link from "next/link";
import { logo } from "@/assets/images";

const links = [
  { link: "/", label: "Home" },
  { link: "/courses", label: "Courses" },
  { link: "/about", label: "About" },
  { link: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <Box component="footer" py="xl" style={{ borderTop: "1px solid var(--mantine-color-gray-3)" }}>
      <Container size="lg">
        {/* Top section with logo and navigation */}
        <Flex justify="space-between" align="center" w="100%" mb={rem(40)}>
          {/* Logo on the left */}
          <Box style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Link href="/home" passHref>
              <UnstyledButton>
                <Image src={logo.src} alt="Arodos Academy" height={40} fit="contain" />
              </UnstyledButton>
            </Link>
            <Text c="dimmed" size="sm">
              A unit of Arodos Technologies
            </Text>
          </Box>

          {/* Navigation on the right */}
          <Flex gap={rem(30)} justify="flex-end">
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
                  "&:hover": { color: "var(--mantine-color-primary-5)" },
                }}
              >
                {link.label}
              </Anchor>
            ))}
          </Flex>
        </Flex>

        {/* Copyright at the bottom */}
        <Box ta="center" pt={rem(20)} style={{ borderTop: "1px solid var(--mantine-color-gray-2)" }}>
          <Text c="dimmed" size="sm">
            © 2025 Arodos Academy. All rights reserved.
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
