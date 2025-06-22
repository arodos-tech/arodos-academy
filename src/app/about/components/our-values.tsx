"use client";

import { Box, Container, SimpleGrid, Stack, Text, Title, rem, Card } from "@mantine/core";
import { IconAward, IconBulb, IconHeartHandshake, IconTargetArrow } from "@/assets/icons";
import { useIsMobile } from "@/hooks";

const values = [
  {
    icon: IconBulb,
    title: "Innovation",
    description: "We constantly push boundaries and embrace new technologies to provide cutting-edge education.",
    color: "var(--mantine-color-primary-5)",
  },
  {
    icon: IconHeartHandshake,
    title: "Integrity",
    description: "We uphold the highest standards of honesty, transparency, and ethical conduct in all our interactions.",
    color: "var(--mantine-color-primary-6)",
  },
  {
    icon: IconAward,
    title: "Excellence",
    description: "We strive for excellence in our curriculum, teaching methods, and student outcomes.",
    color: "var(--mantine-color-primary-7)",
  },
  {
    icon: IconTargetArrow,
    title: "Impact",
    description: "We measure our success by the positive impact we have on our students' careers and lives.",
    color: "var(--mantine-color-primary-8)",
  },
];

const OurValues = () => {
  const isMobile = useIsMobile();

  return (
    <Box py={80} style={{ backgroundColor: "var(--mantine-color-gray-0)" }}>
      <Container size="lg">
        <Stack align="center" gap="xl" mb={60}>
          <Text c="var(--mantine-color-primary-5)" fw={700} size="lg" tt="uppercase" ta="center">
            OUR VALUES
          </Text>
          <Title
            order={2}
            style={{
              fontSize: isMobile ? rem(28) : rem(36),
              textAlign: "center",
              maxWidth: rem(700),
              margin: "0 auto",
            }}
          >
            The Principles That Guide Us
          </Title>
          <Text size="lg" ta="center" c="dimmed" maw={800} mx="auto">
            Our core values shape everything we do at Arodos Academy, from curriculum development to student interactions.
          </Text>
        </Stack>

        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl" mt={50}>
          {values.map((value, index) => (
            <Card
              key={index}
              shadow="md"
              p="xl"
              radius="lg"
              withBorder
              style={{
                transition: "all 0.3s ease",
                height: "100%",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 20px 30px rgba(0, 0, 0, 0.1)",
                  borderColor: value.color,
                },
              }}
            >
              <Box
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  backgroundColor: "var(--mantine-color-primary-0)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: rem(20),
                }}
              >
                <value.icon size={30} color={value.color} />
              </Box>
              <Title order={4} mb="sm">
                {value.title}
              </Title>
              <Text size="md" c="dimmed" lh={1.6}>
                {value.description}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default OurValues;
