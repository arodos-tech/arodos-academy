"use client";

import { Box, Container, Stack, Text, Title, Flex, rem, Group, ThemeIcon } from "@mantine/core";
import { coursesHero } from "@/assets/images";
import { IconBook, IconCertificate, IconRocket } from "@/assets/icons";

const Hero = () => {
  return (
    <Box
      py={80}
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundImage: `url(${coursesHero.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      c="var(--mantine-color-white)"
    >
      {/* Dark overlay */}
      <Box
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, rgba(139, 48, 51, 0.85) 0%, rgba(204, 0, 0, 0.3) 100%)",
        }}
      />

      <Container size="lg" style={{ position: "relative", zIndex: 1 }}>
        <Flex direction={{ base: "column", md: "row" }} align="center" gap="xl">
          <Box style={{ flex: 1 }}>
            <Stack gap="md">
              <Text
                fw={700}
                size="lg"
                tt="uppercase"
                style={{
                  background: "var(--mantine-color-primary-6)",
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
                  fontSize: rem(48),
                  fontWeight: 800,
                  textShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
                  lineHeight: 1.2,
                }}
              >
                Explore All Our Courses
              </Title>

              <Text size="xl" style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.15)" }}>
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
                    <ThemeIcon variant="filled" color="var(--mantine-color-primary-6)" size="md" radius="xl">
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

export default Hero;
