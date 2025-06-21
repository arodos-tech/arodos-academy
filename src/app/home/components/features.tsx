"use client";

import { Box, Container, Stack, Text, Title, SimpleGrid, Card, rem } from "@mantine/core";
import { IconBriefcase, IconCertificate, IconCode, IconRocket, IconUsers } from "@/assets/icons";

// Define features array for the features section
const features = [
  {
    icon: IconCode,
    title: "Hands-on Learning",
    description: "Practical, project-based approach to ensure you gain real-world experience.",
  },
  {
    icon: IconUsers,
    title: "Expert Mentors",
    description: "Learn from industry professionals with years of experience in the field.",
  },
  {
    icon: IconRocket,
    title: "Career Growth",
    description: "Get career support and guidance to land your dream job in tech.",
  },
  {
    icon: IconCertificate,
    title: "Industry Recognition",
    description: "Earn certificates that are recognized by top tech companies.",
  },
];

const Features = () => {
  return (
    <Container size="lg" py={120}>
      <Stack align="center" gap="xl" mb={60}>
        <Text c="red" fw={700} size="lg" tt="uppercase" ta="center">
          WHY CHOOSE US
        </Text>
        <Title
          order={2}
          style={{
            fontSize: rem(36),
            textAlign: "center",
            maxWidth: rem(700),
            margin: "0 auto",
          }}
        >
          Transform Your Career with Industry-Leading Education
        </Title>
        <Text size="lg" ta="center" c="dimmed" maw={800} mx="auto">
          Our programs are designed to give you the skills, knowledge, and confidence to excel in today's competitive
          tech industry.
        </Text>
      </Stack>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="xl">
        {features.map((feature, index) => (
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
                borderColor: "var(--mantine-color-red-3)",
              },
            }}
          >
            <Box
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                backgroundColor: "var(--mantine-color-red-0)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: rem(20),
              }}
            >
              <feature.icon size={30} color="var(--mantine-color-red-6)" />
            </Box>
            <Title order={4} mb="sm">
              {feature.title}
            </Title>
            <Text size="md" c="dimmed" lh={1.6}>
              {feature.description}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Features;
