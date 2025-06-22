"use client";

import { Box, Container, Text, Title, rem } from "@mantine/core";
import { useIsMobile } from "@/hooks";
import { aboutHero } from "@/assets/images";

const AboutHero = () => {
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
          backgroundImage: `url(${aboutHero.src})`,
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
          background: "linear-gradient(135deg, rgba(255, 0, 0, 0.36) 0%, rgba(180, 0, 0, 0.45) 100%)",
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
        <Text c="white" fw={600} size="lg" tt="uppercase" ta="center">
          ABOUT ARODOS ACADEMY
        </Text>

        <Title
          order={1}
          style={{
            fontSize: isMobile ? rem(40) : rem(64),
            lineHeight: 1.1,
            textAlign: "center",
            maxWidth: rem(900),
            margin: "1rem auto 0",
            fontWeight: 800,
          }}
        >
          Empowering the Next Generation of Tech Leaders
        </Title>

        <Text size={isMobile ? "lg" : "xl"} ta="center" maw={800} mx="auto" mt="xl" style={{ opacity: 0.9 }}>
          Founded with a vision to transform tech education, Arodos Academy, a branch of{" "}
          <Text
            component="a"
            href="https://arodos.com/"
            target="_blank"
            rel="noopener noreferrer"
            span
            c="white"
            fw={600}
            style={{ textDecoration: "underline" }}
          >
            Arodos Technologies
          </Text>
          , bridges the gap between theoretical knowledge and practical industry skills.
        </Text>
      </Container>
    </Box>
  );
};

export default AboutHero;
