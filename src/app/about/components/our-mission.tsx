"use client";

import { Box, Container, Grid, Stack, Text, Title, rem } from "@mantine/core";
import { useTheme } from "@/theme/use-theme";
import { IconRocket, IconCode, IconCertificate, IconBulb, IconSchool } from "@/assets/icons";
import { useIsMobile } from "@/hooks";

const OurMission = () => {
  const isMobile = useIsMobile();
  const { colors, mantineTheme, themeMode } = useTheme();

  return (
    <Box py={isMobile ? 60 : 120} style={{ width: "100%", maxWidth: "100%", overflowX: "hidden" }}>
      <Container size="lg" style={{ width: "100%", maxWidth: "100%", boxSizing: "border-box" }}>
        <Grid gutter={isMobile ? 30 : 60} align="center">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Box
              style={{
                position: "relative",
                height: "100%",
                minHeight: isMobile ? rem(300) : rem(350),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  themeMode === "dark"
                    ? `linear-gradient(135deg, ${mantineTheme.colors.dark[7]} 0%, ${mantineTheme.colors.dark[5]} 100%)`
                    : `linear-gradient(135deg, ${mantineTheme.colors.primary[0]} 0%, ${mantineTheme.colors.gray[0]} 100%)`,
                borderRadius: rem(12),
                boxShadow: themeMode === "dark" ? "0 20px 40px rgba(0,0,0,0.4)" : "0 20px 40px rgba(0, 0, 0, 0.05)",
                border: themeMode === "dark" ? `2px solid ${mantineTheme.colors.dark[4]}` : "5px solid white",
                padding: isMobile ? rem(15) : rem(20),
                overflow: "hidden",
                maxWidth: "100%",
                boxSizing: "border-box",
              }}
            >
              {/* Main icon */}
              <Box
                style={{
                  position: "relative",
                  zIndex: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: rem(20),
                }}
              >
                <Box
                  style={{
                    width: rem(120),
                    height: rem(120),
                    borderRadius: "50%",
                    backgroundColor:
                      themeMode === "dark" ? mantineTheme.colors.primary[8] : mantineTheme.colors.primary[1],
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 10px 20px rgba(255, 0, 0, 0.1)",
                  }}
                >
                  <IconRocket
                    size={60}
                    color={themeMode === "dark" ? mantineTheme.colors.primary[2] : mantineTheme.colors.primary[6]}
                  />
                </Box>
                <Text
                  style={{ color: colors.textSecondary }}
                  fw={600}
                  size="md"
                  ta="center"
                  c="var(--mantine-color-primary-6)"
                >
                  Launching Tech Careers
                </Text>
              </Box>

              {/* Decorative elements */}
              <Box
                style={{
                  position: "absolute",
                  top: "10%",
                  left: "10%",
                  opacity: 0.2,
                  transform: "rotate(-15deg)",
                  maxWidth: "30%",
                  maxHeight: "30%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconCode
                  size={isMobile ? 60 : 80}
                  color={themeMode === "dark" ? mantineTheme.colors.primary[2] : mantineTheme.colors.primary[5]}
                />
              </Box>

              <Box
                style={{
                  position: "absolute",
                  bottom: "15%",
                  right: "10%",
                  opacity: 0.2,
                  transform: "rotate(15deg)",
                  maxWidth: "30%",
                  maxHeight: "30%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconCertificate
                  size={isMobile ? 50 : 70}
                  color={themeMode === "dark" ? mantineTheme.colors.primary[2] : mantineTheme.colors.primary[5]}
                />
              </Box>

              <Box
                style={{
                  position: "absolute",
                  bottom: "10%",
                  left: "15%",
                  opacity: 0.2,
                  maxWidth: "25%",
                  maxHeight: "25%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconBulb
                  size={isMobile ? 40 : 60}
                  color={themeMode === "dark" ? mantineTheme.colors.primary[2] : mantineTheme.colors.primary[5]}
                />
              </Box>

              <Box
                style={{
                  position: "absolute",
                  top: "15%",
                  right: "15%",
                  opacity: 0.2,
                  maxWidth: "25%",
                  maxHeight: "25%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconSchool
                  size={isMobile ? 40 : 60}
                  color={themeMode === "dark" ? mantineTheme.colors.primary[2] : mantineTheme.colors.primary[5]}
                />
              </Box>
            </Box>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="md">
              <Text
                style={{ color: colors.textSecondary }}
                c="var(--mantine-color-primary-5)"
                fw={700}
                size="lg"
                tt="uppercase"
              >
                OUR MISSION
              </Text>
              <Title
                order={2}
                style={{
                  fontSize: isMobile ? rem(24) : rem(36),
                  lineHeight: 1.2,
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  maxWidth: "100%",
                  olor: colors.textPrimary,
                }}
              >
                Bridging the Gap Between Education and Industry
              </Title>
              <Text
                style={{ color: colors.textSecondary, maxWidth: "100%", overflowWrap: "break-word" }}
                size={isMobile ? "md" : "lg"}
                lh={1.8}
                mt="md"
                // style={{  }}
              >
                At Arodos Academy, our mission is to transform tech education by providing hands-on, industry-relevant
                training that prepares students for real-world challenges. We believe in learning by doing, guided by
                industry experts who bring their practical experience to the classroom.
              </Text>
              <Text
                style={{ color: colors.textSecondary, maxWidth: "100%", overflowWrap: "break-word" }}
                size={isMobile ? "md" : "lg"}
                // c="dimmed"
                lh={1.8}
                mt="xs"
              >
                As a specialized branch of{" "}
                <Text
                  style={{ color: colors.textSecondary }}
                  component="a"
                  href="https://arodos.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  span
                  fw={500}
                  c="var(--mantine-color-primary-5)"
                >
                  Arodos Technologies
                </Text>
                , we leverage the expertise and resources of one of India's leading software companies to deliver
                world-class tech education. This powerful partnership enables us to stay at the cutting edge of industry
                trends and provide our students with unparalleled learning opportunities and career connections.
              </Text>
              {/* <Text style={{ color: colors.textSecondary }} size="lg" c="dimmed" lh={1.8} mt="xs">
                We are committed to making quality tech education accessible to all, regardless of their background or previous experience. Our goal is to empower individuals with the skills, knowledge, and confidence they need to thrive in the ever-evolving tech industry.
              </Text> */}
              <Box
                mt="xl"
                style={{
                  padding: isMobile ? "15px" : "20px",
                  borderLeft: `4px solid ${
                    themeMode === "dark" ? mantineTheme.colors.primary[5] : mantineTheme.colors.primary[5]
                  }`,
                  backgroundColor: themeMode === "dark" ? mantineTheme.colors.dark[6] : mantineTheme.colors.primary[0],
                  maxWidth: "100%",
                  boxSizing: "border-box",
                  overflowWrap: "break-word",
                }}
              >
                <Text
                  style={{ color: colors.textSecondary, maxWidth: "100%", overflowWrap: "break-word" }}
                  size={isMobile ? "md" : "lg"}
                  fw={500}
                  fs="italic"
                >
                  "We don't just teach code; we build problem solvers who can adapt to the rapidly changing technology
                  landscape."
                </Text>
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
};

export default OurMission;
