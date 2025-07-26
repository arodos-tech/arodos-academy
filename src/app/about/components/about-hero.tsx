"use client";

import { Box, Container, Stack, Text, Title, rem } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useTheme } from "@/theme/use-theme";
import { aboutHero } from "@/assets/images";
import { HERO_GRADIENT_OVERLAY } from "@/lib/constants";

const AboutHero = () => {
  const { colors, mantineTheme } = useTheme();
  const isMdOrSmaller = useMediaQuery(`(max-width: ${rem(992)})`);
  const isSmOrSmaller = useMediaQuery(`(max-width: ${rem(768)})`);
  const isXs = useMediaQuery(`(max-width: ${rem(576)})`);

  const getResponsiveValue = (xs: any, sm: any, md: any, lg: any) => {
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
      {/* Hero background image with overlay */}
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${aboutHero.src})`,
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
          padding: getResponsiveValue(`${rem(40)} ${rem(20)}`, `${rem(50)} ${rem(25)}`, rem(60), rem(80)),
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Stack align="center" justify="center" gap={getResponsiveValue("xs", "sm", "md", "lg")}>
          <Text
            fw={600}
            tt="uppercase"
            style={{
              fontSize: getResponsiveValue(rem(14), rem(15), rem(16), rem(18)),
              textAlign: "center",
            }}
          >
            ABOUT ARODOS ACADEMY
          </Text>
          <Title
            order={1}
            style={{
              fontSize: getResponsiveValue(rem(32), rem(40), rem(50), rem(64)),
              lineHeight: 1.1,
              fontWeight: 800,
              textAlign: "center",
              maxWidth: rem(900),
            }}
          >
            Welcome to Arodos Academy
          </Title>
          <Text
            size={getResponsiveValue("xs", "sm", "md", "xl")}
            ta="center"
            maw={getResponsiveValue(280, 400, 600, 800)}
            mx="auto"
            mt={getResponsiveValue("sm", "md", "lg", "xl")}
            style={{
              opacity: 0.9,
              lineHeight: getResponsiveValue(1.3, 1.4, 1.5, 1.6),
            }}
          >
            {getResponsiveValue(
              <>
                A branch of{" "}
                <Text
                  component="a"
                  href="https://arodos.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  span
                  style={{ color: mantineTheme.white, textDecoration: "underline" }}
                  fw={600}
                >
                  Arodos Technologies
                </Text>
                , bridging theory and practice.
              </>,
              <>
                Founded with a vision to transform tech education, Arodos Academy, a branch of{" "}
                <Text
                  component="a"
                  href="https://arodos.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  span
                  style={{ color: mantineTheme.white, textDecoration: "underline" }}
                  fw={600}
                >
                  Arodos Technologies
                </Text>
                , bridges the gap between theoretical knowledge and practical industry skills.
              </>,
              <>
                Founded with a vision to transform tech education, Arodos Academy, a branch of{" "}
                <Text
                  component="a"
                  href="https://arodos.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  span
                  style={{ color: mantineTheme.white, textDecoration: "underline" }}
                  fw={600}
                >
                  Arodos Technologies
                </Text>
                , bridges the gap between theoretical knowledge and practical industry skills.
              </>,
              <>
                Founded with a vision to transform tech education, Arodos Academy, a branch of{" "}
                <Text
                  component="a"
                  href="https://arodos.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  span
                  style={{ color: mantineTheme.white, textDecoration: "underline" }}
                  fw={600}
                >
                  Arodos Technologies
                </Text>
                , bridges the gap between theoretical knowledge and practical industry skills.
              </>
            )}
          </Text>
        </Stack>
      </Container>
    </Box>
  );
};

export default AboutHero;
