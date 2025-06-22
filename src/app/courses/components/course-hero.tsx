"use client";

import { Box, Container, Text, Title, rem, Stack, Flex, Group, ThemeIcon } from "@mantine/core";
import { useIsMobile } from "@/hooks";
import { IconBook, IconCertificate, IconRocket } from "@/assets/icons";
import { courseHero } from "@/assets/images";
import { HERO_GRADIENT_OVERLAY } from "@/lib/constants";

const CourseHero = () => {
  const isMobile = useIsMobile();

  return (
    <Box
      c="white"
      style={{
        position: "relative",
        overflow: "hidden",
        height: rem(600),
        maxWidth: "100%",
        width: "100%",
        overflowX: "hidden",
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
          backgroundImage: `url(${courseHero.src})`,
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
          padding: isMobile ? `${rem(80)} ${rem(10)} ${rem(40)}` : `${rem(120)} 0 ${rem(80)}`,
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
        <Flex direction={{ base: "column", md: "row" }} align="center" gap="xl">
          <Box style={{ flex: 1 }}>
            <Stack gap="md">
              <Text
                fw={700}
                size="lg"
                tt="uppercase"
                style={{
                  background: "var(--mantine-color-primary-5)",
                  display: "inline-block",
                  width: "fit-content",
                  padding: "4px 16px",
                  borderRadius: "20px",
                  color: "white",
                }}
              >
                OUR COURSES
              </Text>

              <Title
                order={1}
                style={{
                  fontSize: isMobile ? rem(32) : rem(64),
                  fontWeight: 800,
                  textShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
                  lineHeight: 1.2,
                }}
              >
                Explore All Our Courses
              </Title>

              <Text size={isMobile ? "md" : "xl"} style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.15)" }}>
                Find the perfect course to advance your career and skills in today's competitive job market.
              </Text>

              {/* Feature highlights */}
              <Group mt="md" gap="xl">
                {[
                  { icon: IconBook, text: "Quality Learning" },
                  { icon: IconCertificate, text: "Certification" },
                  { icon: IconRocket, text: "Career Growth" },
                ].map((feature, i) => (
                  <Group key={i} gap="xs" align="center">
                    <ThemeIcon variant="filled" color="var(--mantine-color-primary-5)" size="md" radius="xl">
                      <feature.icon size={16} />
                    </ThemeIcon>
                    <Text fw={600} c="white">
                      {feature.text}
                    </Text>
                  </Group>
                ))}
              </Group>
            </Stack>
          </Box>

          {/* Empty right column for layout balance */}
          <Box style={{ flex: 1 }} />
        </Flex>
      </Container>
    </Box>
  );
};

export default CourseHero;
