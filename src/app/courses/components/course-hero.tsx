"use client";

import { Box, Container, Group, rem, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import { IconBook, IconCertificate, IconRocket } from "@/assets/icons";
import { courseHero } from "@/assets/images";
import { HERO_GRADIENT_OVERLAY } from "@/lib/constants";
import { useTheme } from "@/theme/use-theme";

const CourseHero = () => {
  const { mantineTheme } = useTheme();
  const isMdOrSmaller = useMediaQuery(`(max-width: ${rem(992)})`);
  const isSmOrSmaller = useMediaQuery(`(max-width: ${rem(768)})`);
  const isXs = useMediaQuery(`(max-width: ${rem(576)})`);

  const getResponsiveValue = (xs, sm, md, lg) => {
    if (isXs) return xs;
    if (isSmOrSmaller) return sm;
    if (isMdOrSmaller) return md;
    return lg;
  };

  return (
    <Box
      c="white"
      style={{
        position: "relative",
        overflow: "hidden",
        height: "auto",
        minHeight: getResponsiveValue(rem(450), rem(500), rem(550), rem(550)),
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
          backgroundImage: `url(${courseHero.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.4)",
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
          alignItems: isMdOrSmaller ? "center" : "flex-start",
          textAlign: isMdOrSmaller ? "center" : "left",
        }}
      >
        <Stack
          gap="md"
          style={{ maxWidth: rem(700) }}
          align={isMdOrSmaller ? "center" : "flex-start"}
        >
          <Text
            fw={700}
            tt="uppercase"
            style={{
              background: mantineTheme.colors.primary[5],
              display: "inline-block",
              width: "fit-content",
              padding: `${rem(4)} ${rem(12)}`,
              borderRadius: rem(20),
              fontSize: getResponsiveValue(rem(12), rem(13), rem(14), rem(14)),
            }}
          >
            OUR COURSES
          </Text>

          <Title
            order={1}
            style={{
              fontSize: getResponsiveValue(rem(28), rem(36), rem(44), rem(52)),
              fontWeight: 800,
              lineHeight: 1.2,
            }}
          >
            Explore Our Courses
          </Title>

          <Text
            style={{
              fontSize: getResponsiveValue(rem(16), rem(17), rem(18), rem(18)),
              lineHeight: 1.6,
              opacity: 0.9,
              maxWidth: rem(600),
            }}
          >
            Find the perfect course to advance your career and skills in today's
            competitive job market.
          </Text>

          <Group
            mt="md"
            gap="xl"
            style={{ justifyContent: isMdOrSmaller ? "center" : "flex-start" }}
          >
            {[
              { icon: IconBook, text: "Quality Learning" },
              { icon: IconCertificate, text: "Certification" },
              { icon: IconRocket, text: "Career Growth" },
            ].map((feature, i) => (
              <Group key={i} gap="sm" align="center">
                <ThemeIcon
                  variant="filled"
                  color={mantineTheme.colors.primary[5]}
                  size={getResponsiveValue("md", "md", "lg", "lg")}
                  radius="xl"
                >
                  <feature.icon
                    size={getResponsiveValue(14, 16, 18, 18)}
                  />
                </ThemeIcon>
                <Text fw={600} c="white" size={getResponsiveValue("sm", "md", "md", "md")}>
                  {feature.text}
                </Text>
              </Group>
            ))}
          </Group>
        </Stack>
      </Container>
    </Box>
  );
};

export default CourseHero;
