"use client";

import { Box, Container, Group, Stack, Text, Title, Button, rem } from "@mantine/core";
import { IconArrowRight, IconCode, IconRocket } from "@/assets/icons";
import Link from "next/link";
import { useIsMobile } from "@/hooks";
import { homeHero } from "@/assets/images";
import { HERO_GRADIENT_OVERLAY } from "@/lib/constants";

const HomeHero = () => {
  const isMobile = useIsMobile();

  return (
    <Box
      c="white"
      style={{
        position: "relative",
        overflow: "hidden",
        height: rem(600),
        maxWidth: "100%",
        width: "100%",
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
          background: HERO_GRADIENT_OVERLAY,
          zIndex: 2,
        }}
      />
      <Container
        size="lg"
        style={{
          position: "relative",
          zIndex: 3,
          padding: isMobile ? `${rem(80)} ${rem(10)} ${rem(40)}` : `${rem(120)} 0 ${rem(80)}`,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: "100%",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <Stack align="center" gap="xl">
          <Text c="white" fw={600} size="lg" tt="uppercase" ta="center">
            Building Futures Together By Empowering Minds
          </Text>

          <Title
            order={1}
            style={{
              fontSize: isMobile ? rem(32) : rem(64),
              lineHeight: 1.1,
              textAlign: "center",
              maxWidth: rem(900),
              margin: "0 auto",
              fontWeight: 800,
            }}
          >
            Launch Your Tech Career with Arodos Academy
          </Title>

          <Text size={isMobile ? "md" : "xl"} ta="center" maw={700} mx="auto" style={{ opacity: 0.9 }}>
            Join us in shaping a brighter future by nurturing potential, empowering minds, and fostering growth through
            education and collaboration.
          </Text>

          <Group mt="xl" justify="center" wrap="wrap" gap={isMobile ? "sm" : "xl"} w="100%">
            <Button
              size={isMobile ? "md" : "xl"}
              rightSection={<IconArrowRight size={isMobile ? 16 : 20} />}
              component={Link}
              href="/courses"
              radius="xl"
              px={isMobile ? 20 : 40}
              variant="white"
              c="var(--mantine-color-primary-5)"
              style={{ maxWidth: isMobile ? "45%" : "auto" }}
            >
              Explore Courses
            </Button>
            <Button 
              variant="outline" 
              size={isMobile ? "md" : "xl"} 
              color="white" 
              radius="xl" 
              px={isMobile ? 20 : 40} 
              component="a" 
              href="#why-us"
              style={{ maxWidth: isMobile ? "45%" : "auto" }}
            >
              Learn More
            </Button>
          </Group>

          {/* Decorative elements */}
          <Box
            style={{
              position: "absolute",
              right: "-5%",
              bottom: "-10%",
              opacity: 0.1,
              transform: "rotate(-15deg)",
              zIndex: -1,
            }}
          >
            <IconCode size={300} stroke={1.5} />
          </Box>

          <Box
            style={{
              position: "absolute",
              left: "-5%",
              top: "10%",
              opacity: 0.1,
              transform: "rotate(15deg)",
              zIndex: -1,
            }}
          >
            <IconRocket size={200} stroke={1.5} />
          </Box>
        </Stack>

        {/* Decorative elements */}
        <Box
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            opacity: 0.05,
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <IconCode size={400} />
        </Box>

        <Box
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            opacity: 0.05,
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <IconRocket size={300} />
        </Box>
      </Container>
    </Box>
  );
};

export default HomeHero;
