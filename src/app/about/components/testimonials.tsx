"use client";

import { Box, Container, Stack, Text, Title, rem, Card, Avatar, Group, Flex } from "@mantine/core";
import { IconQuote, IconStar } from "@/assets/icons";
import { useIsMobile } from "@/hooks";

const testimonials = [
  {
    name: "Vikram Singh",
    position: "Software Engineer at Microsoft",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    quote: "Arodos Academy completely transformed my career. The hands-on approach and mentorship from industry experts gave me the confidence and skills to land my dream job at Microsoft.",
    rating: 5,
  },
  {
    name: "Neha Gupta",
    position: "Frontend Developer at Amazon",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    quote: "I tried several online courses before, but nothing compares to the immersive learning experience at Arodos Academy. The curriculum is practical, up-to-date, and focused on real-world applications.",
    rating: 5,
  },
  {
    name: "Arjun Reddy",
    position: "Full Stack Developer at Flipkart",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    quote: "The career support at Arodos Academy is exceptional. They don't just teach you to code; they prepare you for the job market and connect you with potential employers.",
    rating: 5,
  },
];

const Testimonials = () => {
  const isMobile = useIsMobile();

  return (
    <Box py={100} style={{ backgroundColor: "var(--mantine-color-gray-0)" }}>
      <Container size="lg">
        <Stack align="center" gap="xl" mb={60}>
          <Text c="var(--mantine-color-primary-5)" fw={700} size="lg" tt="uppercase" ta="center">
            TESTIMONIALS
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
            What Our Alumni Say
          </Title>
          <Text size="lg" ta="center" c="dimmed" maw={800} mx="auto">
            Hear from our graduates who have successfully transitioned into rewarding tech careers.
          </Text>
        </Stack>

        <Flex 
          gap="xl" 
          direction={{ base: "column", md: "row" }} 
          align="stretch" 
          justify="center" 
          mt={50}
        >
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              shadow="md"
              p="xl"
              radius="lg"
              withBorder
              style={{
                transition: "all 0.3s ease",
                flex: 1,
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 20px 30px rgba(0, 0, 0, 0.1)",
                  borderColor: "var(--mantine-color-primary-3)",
                },
              }}
            >
              <IconQuote 
                size={40} 
                style={{ 
                  color: "var(--mantine-color-primary-1)",
                  marginBottom: rem(20),
                }} 
              />
              <Text size="md" c="dimmed" lh={1.6} mb="xl">
                {testimonial.quote}
              </Text>
              <Group gap="md" mt="auto">
                <Avatar src={testimonial.image} radius="xl" size="lg" />
                <Box>
                  <Text fw={600}>{testimonial.name}</Text>
                  <Text size="xs" c="dimmed">{testimonial.position}</Text>
                </Box>
              </Group>
              <Group gap={5} mt="md">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <IconStar 
                    key={i} 
                    size={16} 
                    fill="var(--mantine-color-primary-5)" 
                    color="var(--mantine-color-primary-5)" 
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
