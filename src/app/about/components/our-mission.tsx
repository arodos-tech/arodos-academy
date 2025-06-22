"use client";

import { Box, Container, Grid, Stack, Text, Title, rem } from "@mantine/core";
import { IconRocket, IconCode, IconCertificate, IconBulb, IconSchool } from "@/assets/icons";
import { useIsMobile } from "@/hooks";

const OurMission = () => {
  const isMobile = useIsMobile();

  return (
    <Box py={120}>
      <Container size="lg">
        <Grid gutter={60} align="center">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Box
              style={{
                position: "relative",
                height: "100%",
                minHeight: rem(350),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(135deg, var(--mantine-color-primary-0) 0%, var(--mantine-color-gray-0) 100%)",
                borderRadius: rem(12),
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.05)",
                border: "5px solid white",
                padding: rem(20),
                overflow: "hidden",
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
                    backgroundColor: "var(--mantine-color-primary-1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 10px 20px rgba(255, 0, 0, 0.1)",
                  }}
                >
                  <IconRocket size={60} color="var(--mantine-color-primary-6)" />
                </Box>
                <Text fw={600} size="md" ta="center" c="var(--mantine-color-primary-6)">
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
                }}
              >
                <IconCode size={80} color="var(--mantine-color-primary-5)" />
              </Box>

              <Box
                style={{
                  position: "absolute",
                  bottom: "15%",
                  right: "10%",
                  opacity: 0.2,
                  transform: "rotate(15deg)",
                }}
              >
                <IconCertificate size={70} color="var(--mantine-color-primary-5)" />
              </Box>

              <Box
                style={{
                  position: "absolute",
                  bottom: "10%",
                  left: "15%",
                  opacity: 0.2,
                }}
              >
                <IconBulb size={60} color="var(--mantine-color-primary-5)" />
              </Box>

              <Box
                style={{
                  position: "absolute",
                  top: "15%",
                  right: "15%",
                  opacity: 0.2,
                }}
              >
                <IconSchool size={60} color="var(--mantine-color-primary-5)" />
              </Box>
            </Box>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="md">
              <Text c="var(--mantine-color-primary-5)" fw={700} size="lg" tt="uppercase">
                OUR MISSION
              </Text>
              <Title
                order={2}
                style={{
                  fontSize: isMobile ? rem(28) : rem(36),
                  lineHeight: 1.2,
                }}
              >
                Bridging the Gap Between Education and Industry
              </Title>
              <Text size="lg" c="dimmed" lh={1.8} mt="md">
                At Arodos Academy, our mission is to transform tech education by providing hands-on, industry-relevant
                training that prepares students for real-world challenges. We believe in learning by doing, guided by
                industry experts who bring their practical experience to the classroom.
              </Text>
              <Text size="lg" c="dimmed" lh={1.8} mt="xs">
                As a specialized branch of{" "}
                <Text
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
              {/* <Text size="lg" c="dimmed" lh={1.8} mt="xs">
                We are committed to making quality tech education accessible to all, regardless of their background or previous experience. Our goal is to empower individuals with the skills, knowledge, and confidence they need to thrive in the ever-evolving tech industry.
              </Text> */}
              <Box
                mt="xl"
                style={{
                  padding: "20px",
                  borderLeft: "4px solid var(--mantine-color-primary-5)",
                  backgroundColor: "var(--mantine-color-primary-0)",
                }}
              >
                <Text size="lg" fw={500} fz="lg" fs="italic">
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
