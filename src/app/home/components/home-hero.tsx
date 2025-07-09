"use client";

import { Box, Container, Group, Stack, Text, Title, Button, rem } from "@mantine/core";
import { IconArrowRight, IconCode, IconRocket } from "@/assets/icons";
import Link from "next/link";
import { useIsMobile } from "@/hooks";
import { useTheme } from "@/theme/use-theme";
import { homeHero } from "@/assets/images";
import { HERO_GRADIENT_OVERLAY } from "@/lib/constants";

const HomeHero = () => {
  const isMobile = useIsMobile();
  const { colors, mantineTheme } = useTheme();

  return (
    <Box
      style={{
        color: mantineTheme.white,
        position: "relative",
        overflow: "hidden",
        height: isMobile ? rem(650) : rem(600),
        maxWidth: "100%",
        width: "100%",
        marginTop: isMobile ? rem(40) : 0,
      }}
    >
      {/* Hero background image with overlay */}
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${homeHero.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.4)",
          zIndex: 1,
        }}
      />

      {/* Red gradient overlay */}
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: HERO_GRADIENT_OVERLAY,
          zIndex: 2,
        }}
      />
      <Container
        size="lg"
        style={{
          position: "relative",
          zIndex: 3,
          padding: isMobile ? `${rem(80)} ${rem(30)} ${rem(60)}` : `${rem(120)} 0 ${rem(80)}`,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: "100%",
          width: "100%",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <Stack align="center" gap="xl">
          <Text fw={600} size={isMobile ? "8px" : "lg"} tt="uppercase" ta="center" mt={isMobile ? 0 : 0} style={{ color: mantineTheme.white }}>
            Building Futures
          </Text>

          <Title
            order={1}
            style={{
              fontSize: isMobile ? rem(9) : rem(64),
              lineHeight: isMobile ? 1.3 : 1.1,
              textAlign: "center",
              maxWidth: isMobile ? "90%" : rem(900),
              margin: "0 auto",
              fontWeight: 800,
              wordBreak: "break-word",
              overflowWrap: "break-word",
              padding: isMobile ? "0 10px" : 0,
            }}
          >
            Launch Your Tech Career with Arodos
          </Title>

          <Text
            size={isMobile ? "xs" : "xl"}
            ta="center"
            maw={isMobile ? "100%" : 700}
            mx="auto"
            style={{ opacity: 0.9, fontSize: isMobile ? rem(9) : undefined }}
          >
            Join us in shaping a brighter future.
          </Text>

          <Group mt={isMobile ? "md" : "xl"} justify="center" wrap="wrap" gap={isMobile ? 8 : "xl"} w="100%" mb={isMobile ? rem(20) : 0}>
            <Button
              size={isMobile ? "xs" : "md"}
              component={Link}
              href="/courses"
              radius="xl"
              px={isMobile ? 8 : 24}
              variant="white"
              c={colors.primary}
              styles={{
                root: {
                  height: isMobile ? rem(24) : rem(48),
                  fontSize: isMobile ? rem(8) : rem(16),
                  minWidth: isMobile ? 0 : rem(160),
                  padding: isMobile ? "0 8px" : "0 24px",
                },
              }}
            >
              Explore Courses
            </Button>
            <Button
              variant="outline"
              size={isMobile ? "xs" : "md"}
              color={mantineTheme.white}
              radius="xl"
              px={isMobile ? 8 : 24}
              component="a"
              href="#why-us"
              styles={{
                root: {
                  height: isMobile ? rem(24) : rem(48),
                  fontSize: isMobile ? rem(8) : rem(16),
                  minWidth: isMobile ? 0 : rem(160),
                  padding: isMobile ? "0 8px" : "0 24px",
                },
              }}
            >
              Learn More
            </Button>
          </Group>

          {/* Decorative elements */}
          <Box
            style={{
              position: "absolute",
              right: "-5%",
              bottom: "-10%",
              opacity: 0.1,
              transform: "rotate(-15deg)",
              zIndex: -1,
            }}
          >
            <IconCode size={300} stroke={1.5} />
          </Box>

          <Box
            style={{
              position: "absolute",
              left: "-5%",
              top: "10%",
              opacity: 0.1,
              transform: "rotate(15deg)",
              zIndex: -1,
            }}
          >
            <IconRocket size={200} stroke={1.5} />
          </Box>
        </Stack>

        {/* Decorative elements */}
        <Box
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            opacity: 0.05,
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <IconCode size={400} />
        </Box>

        <Box
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            opacity: 0.05,
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <IconRocket size={300} />
        </Box>
      </Container>
    </Box>
  );
};

export default HomeHero;
