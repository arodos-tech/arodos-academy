"use client";

import { Avatar, Box, Card, Container, Flex, Group, Stack, Text, Title, rem } from "@mantine/core";
import { IconQuote, IconStar } from "@/assets/icons";

import { useMediaQuery } from "@mantine/hooks";
import { useTheme } from "@/theme/use-theme";

const testimonials = [
  {
    name: "Vikram Singh",
    position: "Software Engineer at Microsoft",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    quote:
      "Arodos Academy completely transformed my career. The hands-on approach and mentorship from industry experts gave me the confidence and skills to land my dream job at Microsoft.",
    rating: 5,
  },
  {
    name: "Neha Gupta",
    position: "Frontend Developer at Amazon",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    quote:
      "I tried several online courses before, but nothing compares to the immersive learning experience at Arodos Academy. The curriculum is practical, up-to-date, and focused on real-world applications.",
    rating: 5,
  },
  {
    name: "Arjun Reddy",
    position: "Full Stack Developer at Flipkart",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    quote:
      "The career support at Arodos Academy is exceptional. They don't just teach you to code; they prepare you for the job market and connect you with potential employers.",
    rating: 5,
  },
];

const Testimonials = () => {
  const { colors, mantineTheme, themeMode } = useTheme();
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
    <Box py={100} bg={themeMode === "dark" ? mantineTheme.colors.dark[7] : mantineTheme.colors.gray[0]}>
      <Container size="lg">
        <Stack align="center" gap="xl" mb={60}>
          <Text
            style={{ color: colors.textSecondary }}
            c={themeMode === "dark" ? mantineTheme.colors.primary[2] : colors.primary}
            fw={700}
            size="lg"
            tt="uppercase"
            ta="center"
          >
            TESTIMONIALS
          </Text>
          <Title
            order={2}
            style={{
              fontSize: getResponsiveValue(rem(28), rem(32), rem(36), rem(36)),
              textAlign: "center",
              maxWidth: rem(700),
              margin: "0 auto",
              color: themeMode === "dark" ? mantineTheme.white : mantineTheme.colors.dark[8],
            }}
          >
            What Our Alumni Say
          </Title>
          <Text
            style={{ color: colors.textSecondary }}
            size="lg"
            ta="center"
            c={themeMode === "dark" ? mantineTheme.colors.gray[3] : "dimmed"}
            maw={800}
            mx="auto"
          >
            Hear from our graduates who have successfully transitioned into rewarding tech careers.
          </Text>
        </Stack>

        <Flex gap="xl" direction={{ base: "column", md: "row" }} align="stretch" justify="center" mt={50}>
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              shadow="md"
              p="xl"
              radius="lg"
              withBorder
              style={{
                flex: 1,
              }}
            >
              <IconQuote
                size={40}
                style={{
                  color: themeMode === "dark" ? mantineTheme.colors.primary[2] : mantineTheme.colors.primary[6],
                  marginBottom: rem(20),
                }}
              />
              <Text
                style={{ color: colors.textSecondary }}
                size="md"
                c={themeMode === "dark" ? mantineTheme.colors.gray[3] : mantineTheme.colors.gray[6]}
                lh={1.6}
                mb="xl"
              >
                {testimonial.quote}
              </Text>
              <Group gap="md" mt="auto">
                <Avatar src={testimonial.image} radius="xl" size="lg" />
                <Box>
                  <Text
                    fw={600}
                    style={{ color: themeMode === "dark" ? mantineTheme.white : mantineTheme.colors.dark[8] }}
                  >
                    {testimonial.name}
                  </Text>
                  <Text
                    style={{ color: colors.textSecondary }}
                    size="xs"
                    c={themeMode === "dark" ? mantineTheme.colors.gray[3] : mantineTheme.colors.gray[6]}
                  >
                    {testimonial.position}
                  </Text>
                </Box>
              </Group>
              <Group gap={5} mt="md">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <IconStar
                    key={i}
                    size={16}
                    fill={themeMode === "dark" ? mantineTheme.colors.primary[2] : mantineTheme.colors.primary[6]}
                    color={themeMode === "dark" ? mantineTheme.colors.primary[2] : mantineTheme.colors.primary[6]}
                  />
                ))}
              </Group>
            </Card>
          ))}
        </Flex>
      </Container>
    </Box>
  );
};

export default Testimonials;
