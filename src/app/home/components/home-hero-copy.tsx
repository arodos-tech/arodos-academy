"use client";

import { Box, Container, Stack, Text, Title, Button, rem, useMantineTheme } from "@mantine/core";
import { IconCode, IconRocket } from "@/assets/icons";
import Link from "next/link";
import { useIsMobile } from "@/hooks";
import { useTheme } from "@/theme/use-theme";
import { homeHero } from "@/assets/images";
import { HERO_GRADIENT_OVERLAY } from "@/lib/constants";
import { useEffect, useState } from "react";

// Screen size breakpoints
const SCREEN_XS = 400; // Extra small screens like iPhone SE
const SCREEN_SM = 576; // Small mobile screens
const SCREEN_MD = 768; // Medium screens (larger phones, small tablets)

const HomeHero = () => {
  const isMobile = useIsMobile();
  const { colors, mantineTheme } = useTheme();
  const [screenSize, setScreenSize] = useState({
    isXs: false,
    isSm: false,
    isMd: false
  });

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setScreenSize({
        isXs: width < SCREEN_XS,
        isSm: width >= SCREEN_XS && width < SCREEN_SM,
        isMd: width >= SCREEN_SM && width < SCREEN_MD
      });
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // Helper function to get responsive values based on screen size
  const getResponsiveValue = (xs, sm, md, desktop) => {
    if (screenSize.isXs) return xs;
    if (screenSize.isSm) return sm;
    if (screenSize.isMd) return md;
    return desktop;
  };

  return (
    <Box
      style={{
        color: mantineTheme.white,
        position: "relative",
        overflow: "hidden",
        height: "auto",
        minHeight: getResponsiveValue(rem(450), rem(480), rem(500), rem(500)),
        width: "100%",
        marginTop: 0,
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
          padding: getResponsiveValue(
            `${rem(30)} ${rem(15)}`, // xs
            `${rem(35)} ${rem(20)}`, // sm
            `${rem(40)} ${rem(25)}`, // md
            rem(80) // desktop
          ),
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <Stack
          align="center"
          justify="center"
          gap={isMobile ? "md" : "xl"}
          w="100%"
          style={{ maxWidth: isMobile ? "100%" : rem(900) }}
        >
          <Text 
            fw={600} 
            size={getResponsiveValue("xs", "xs", "sm", "lg")} 
            tt="uppercase" 
            ta="center" 
            style={{ color: mantineTheme.white }}>
            Building Futures
          </Text>

          <Title
            order={1}
            style={{
              fontSize: getResponsiveValue(rem(20), rem(24), rem(32), rem(64)),
              lineHeight: 1.2,
              textAlign: "center",
              fontWeight: 800,
              padding: 0,
              maxWidth: getResponsiveValue("90%", "90%", "95%", "100%"),
            }}
          >
            Launch Your Tech Career with Arodos
          </Title>

          <Text
            size={getResponsiveValue("xs", "xs", "sm", "xl")}
            ta="center"
            style={{
              opacity: 0.9,
              maxWidth: getResponsiveValue("90%", "85%", "80%", "70%"),
              margin: "0 auto",
              lineHeight: 1.4,
              width: getResponsiveValue("240px", "280px", "auto", "auto"),
            }}
          >
            Join us in shaping a brighter future.
          </Text>

          <Stack
            mt={getResponsiveValue("sm", "sm", "md", "xl")}
            gap={getResponsiveValue("xs", "xs", "sm", "md")}
            style={{
              width: isMobile ? "100%" : "auto",
              maxWidth: getResponsiveValue(rem(200), rem(220), rem(280), "auto"),
            }}
          >
            <Button
              component={Link}
              href="/courses"
              radius="xl"
              variant="white"
              c={colors.primary}
              fullWidth={isMobile}
              size={getResponsiveValue("xs", "xs", "sm", "md")}
              styles={{
                root: {
                  fontSize: getResponsiveValue(rem(10), rem(11), rem(12), rem(16)),
                  height: getResponsiveValue(rem(30), rem(32), rem(36), undefined),
                },
              }}
            >
              Explore Courses
            </Button>

            <Button
              variant="outline"
              color={mantineTheme.white}
              radius="xl"
              component="a"
              href="#why-us"
              fullWidth={isMobile}
              size={getResponsiveValue("xs", "xs", "sm", "md")}
              styles={{
                root: {
                  fontSize: getResponsiveValue(rem(10), rem(11), rem(12), rem(16)),
                  height: getResponsiveValue(rem(30), rem(32), rem(36), undefined),
                },
              }}
            >
              Learn More
            </Button>
          </Stack>
        </Stack>

        {/* Decorative elements - reduced size for mobile */}
        <Box
          style={{
            position: "absolute",
            right: "-5%",
            bottom: "-10%",
            opacity: 0.1,
            transform: "rotate(-15deg)",
            zIndex: -1,
            display: isMobile ? "none" : "block",
          }}
        >
          <IconCode size={isMobile ? 150 : 300} stroke={1.5} />
        </Box>

        <Box
          style={{
            position: "absolute",
            left: "-5%",
            top: "10%",
            opacity: 0.1,
            transform: "rotate(15deg)",
            zIndex: -1,
            display: isMobile ? "none" : "block",
          }}
        >
          <IconRocket size={isMobile ? 100 : 200} stroke={1.5} />
        </Box>

        <Box
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            opacity: 0.05,
            pointerEvents: "none",
            zIndex: 1,
            display: isMobile ? "none" : "block",
          }}
        >
          <IconCode size={isMobile ? 200 : 400} />
        </Box>

        <Box
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            opacity: 0.05,
            pointerEvents: "none",
            zIndex: 1,
            display: isMobile ? "none" : "block",
          }}
        >
          <IconRocket size={isMobile ? 150 : 300} />
        </Box>
      </Container>
    </Box>
  );
};

export default HomeHero;
