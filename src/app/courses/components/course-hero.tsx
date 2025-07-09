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
        height: isMobile ? rem(600) : rem(600),
        maxWidth: "100%",
        width: "100%",
        overflowX: "hidden",
        marginTop: isMobile ? rem(20) : 0,
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
        size="md"
        style={{
          position: "relative",
          zIndex: 3,
          padding: isMobile ? `${rem(60)} ${rem(30)} ${rem(60)}` : `${rem(120)} 0 ${rem(80)}`,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: "100%",
          width: "100%",
          boxSizing: "border-box",
          overflow: "hidden",
          margin: "0 auto",
        }}
      >
        <Flex direction={{ base: "column", md: "row" }} align="center" gap="xl">
          <Box style={{ flex: 1 }}>
            <Stack gap="md" style={{ width: isMobile ? "100%" : "auto" }}>
              <Text
                fw={700}
                size={isMobile ? "10px" : "lg"}
                tt="uppercase"
                style={{
                  background: "var(--mantine-color-primary-5)",
                  display: "inline-block",
                  width: "fit-content",
                  padding: isMobile ? "3px 12px" : "4px 16px",
                  borderRadius: "20px",
                  color: "white",
                  margin: "0 auto",
                }}
              >
                OUR COURSES
              </Text>

              <Title
                order={1}
                style={{
                  fontSize: isMobile ? rem(10) : rem(64),
                  fontWeight: 800,
                  textShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
                  lineHeight: isMobile ? 1.3 : 1.2,
                  maxWidth: isMobile ? "90%" : "100%",
                  margin: isMobile ? "0 auto" : 0,
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  padding: isMobile ? "0 10px" : 0,
                }}
              >
                Explore Our Courses
              </Title>

              <Text
                style={{
                  fontSize: isMobile ? rem(8) : rem(18),
                  lineHeight: 1.6,
                  opacity: 0.9,
                  maxWidth: isMobile ? "90%" : rem(600),
                  margin: isMobile ? "0 auto" : 0,
                  padding: isMobile ? "0 10px" : 0,
                }}
              >
                {isMobile
                  ? "Advance your career with our specialized courses."
                  : "Find the perfect course to advance your career and skills in today's competitive job market."}
              </Text>

              {/* Feature highlights */}
              <Group
                mt={isMobile ? "md" : "md"}
                gap={isMobile ? "xl" : "xl"}
                style={{
                  justifyContent: isMobile ? "center" : "flex-start",
                  flexWrap: "wrap",
                  width: "100%",
                }}
              >
                {[
                  { icon: IconBook, text: "Quality Learning" },
                  { icon: IconCertificate, text: "Certification" },
                  { icon: IconRocket, text: "Career Growth" },
                ].map((feature, i) => (
                  <Group
                    key={i}
                    gap={isMobile ? "xs" : "sm"}
                    align="center"
                    style={{
                      marginRight: isMobile ? 0 : rem(10),
                      width: isMobile ? "auto" : "auto",
                    }}
                  >
                    <ThemeIcon
                      variant="filled"
                      color="var(--mantine-color-primary-5)"
                      size={isMobile ? "sm" : "md"}
                      radius="xl"
                    >
                      <feature.icon size={isMobile ? 12 : 16} />
                    </ThemeIcon>
                    <Text fw={600} c="white" size={isMobile ? "xs" : "md"}>
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
