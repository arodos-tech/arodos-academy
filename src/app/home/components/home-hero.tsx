"use client";

import { Box, Button, Container, Group, rem, Stack, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";

import { IconCode, IconRocket } from "@/assets/icons";
import { homeHero } from "@/assets/images";
import { HERO_GRADIENT_OVERLAY } from "@/lib/constants";
import { useTheme } from "@/theme/use-theme";

const HomeHero = () => {
  const { colors, mantineTheme } = useTheme();
  const isMdOrSmaller = useMediaQuery(`(max-width: ${rem(992)})`); // md breakpoint
  const isSmOrSmaller = useMediaQuery(`(max-width: ${rem(768)})`); // sm breakpoint
  const isXs = useMediaQuery(`(max-width: ${rem(576)})`); // xs breakpoint

  const getResponsiveValue = (xs, sm, md, lg) => {
    if (isXs) return xs;
    if (isSmOrSmaller) return sm;
    if (isMdOrSmaller) return md;
    return lg;
  };

  return (
    <Box
      style={{
        color: mantineTheme.white,
        position: "relative",
        overflow: "hidden",
        height: "auto",
        minHeight: getResponsiveValue(rem(500), rem(550), rem(600), rem(600)),
        width: "100%",
      }}
    >
      {/* Background Image */}
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
          zIndex: 1,
        }}
      />

      {/* Gradient Overlay */}
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
            `${rem(40)} ${rem(20)}`,
            `${rem(50)} ${rem(25)}`,
            rem(60),
            rem(80)
          ),
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Stack
          align="center"
          justify="center"
          gap="md"
          w="100%"
          style={{ maxWidth: rem(900) }}
        >
          <Text
            fw={600}
            tt="uppercase"
            style={{
              fontSize: getResponsiveValue(rem(14), rem(15), rem(16), rem(18)),
              color: mantineTheme.white,
            }}
          >
            Building Futures
          </Text>

          <Title
            order={1}
            style={{
              fontSize: getResponsiveValue(rem(32), rem(40), rem(50), rem(64)),
              lineHeight: 1.1,
              fontWeight: 800,
              color: mantineTheme.white,
            }}
          >
            Launch Your Tech Career with Arodos
          </Title>

          <Text
            size={getResponsiveValue("md", "lg", "lg", "xl")}
            style={{
              opacity: 0.9,
              maxWidth: rem(650),
              margin: `${rem(10)} auto 0`,
              lineHeight: 1.5,
              color: mantineTheme.white,
            }}
          >
            High-quality, affordable courses designed to get you job-ready. Join
            us and start building your future in tech today.
          </Text>

          {isMdOrSmaller ? (
            <Stack
              mt="xl"
              gap="sm"
              style={{ width: "100%", maxWidth: rem(320) }}
            >
              <Button
                component={Link}
                href="/courses"
                radius="xl"
                variant="white"
                c={colors.primary}
                fullWidth
                size={getResponsiveValue("sm", "md", "md", "lg")}
              >
                Explore Courses
              </Button>
              <Button
                variant="outline"
                color="white"
                radius="xl"
                component="a"
                href="#why-us"
                fullWidth
                size={getResponsiveValue("sm", "md", "md", "lg")}
              >
                Learn More
              </Button>
            </Stack>
          ) : (
            <Group mt="xl" gap="md" justify="center">
              <Button
                component={Link}
                href="/courses"
                radius="xl"
                variant="white"
                c={colors.primary}
                size="lg"
                styles={{ root: { height: rem(54), paddingLeft: rem(35), paddingRight: rem(35) } }}
              >
                Explore Courses
              </Button>
              <Button
                variant="outline"
                color="white"
                radius="xl"
                component="a"
                href="#why-us"
                size="lg"
                styles={{ root: { height: rem(54), paddingLeft: rem(35), paddingRight: rem(35) } }}
              >
                Learn More
              </Button>
            </Group>
          )}
        </Stack>

        {/* Decorative Icons (Hidden on Mobile) */}
        {!isMdOrSmaller && (
          <>
            <Box
              style={{
                position: "absolute",
                right: "-5%",
                bottom: "-10%",
                opacity: 0.08,
                transform: "rotate(-15deg)",
              }}
            >
              <IconCode size={300} stroke={1} />
            </Box>
            <Box
              style={{
                position: "absolute",
                left: "-5%",
                top: "10%",
                opacity: 0.08,
                transform: "rotate(15deg)",
              }}
            >
              <IconRocket size={200} stroke={1} />
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default HomeHero;
