"use client";

import { Box, Container, Text, Title, Stack, rem } from "@mantine/core";
import { useIsMobile } from "@/hooks";
import { homeHero } from "@/assets/images";

const ContactHero = () => {
  const isMobile = useIsMobile();

  return (
    <Box
      c="white"
      style={{
        position: "relative",
        overflow: "hidden",
        height: rem(600),
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
          backgroundImage: `url(${homeHero.src})`,
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
          background: "linear-gradient(45deg, var(--mantine-color-primary-9) 0%, transparent 100%)",
          opacity: 0.7,
          zIndex: 2,
        }}
      />
      <Container
        size="lg"
        style={{
          position: "relative",
          zIndex: 3,
          padding: `${rem(120)} 0 ${rem(80)}`,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Stack align="center" gap="xl">
          <Text c="white" fw={600} size="lg" tt="uppercase" ta="center">
            GET IN TOUCH
          </Text>

          <Title
            order={1}
            style={{
              fontSize: isMobile ? rem(40) : rem(64),
              lineHeight: 1.1,
              textAlign: "center",
              maxWidth: rem(900),
              margin: "0 auto",
              fontWeight: 800,
            }}
          >
            Contact Arodos Academy
          </Title>

          <Text size={isMobile ? "lg" : "xl"} ta="center" maw={700} mx="auto" style={{ opacity: 0.9 }}>
            Have questions about our courses or need assistance? We're here to help you take the next step in your tech education journey.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
};

export default ContactHero;
