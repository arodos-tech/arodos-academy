"use client";

import { Box, Container, Text, Title, Stack, rem } from "@mantine/core";
import { useIsMobile } from "@/hooks";
import { contactHero } from "@/assets/images";
import { HERO_GRADIENT_OVERLAY } from "@/lib/constants";

const ContactHero = () => {
  const isMobile = useIsMobile();

  return (
    <Box
      c="white"
      style={{
        position: "relative",
        overflow: "hidden",
        height: isMobile ? rem(650) : rem(600),
        maxWidth: "100%",
        width: "100%",
        overflowX: "hidden",
        marginTop: isMobile ? rem(40) : 0,
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
          backgroundImage: `url(${contactHero.src})`,
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
          opacity: 0.7,
          zIndex: 2,
        }}
      />
      <Container
        size="md"
        style={{
          position: "relative",
          zIndex: 3,
          padding: isMobile ? `${rem(80)} ${rem(30)} ${rem(60)}` : `${rem(120)} 0 ${rem(80)}`,
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
        <Stack align="center" gap="xl">
          <Text c="white" fw={600} size={isMobile ? "8px" : "lg"} tt="uppercase" ta="center">
            GET IN TOUCH
          </Text>

          <Title
            order={1}
            style={{
              fontSize: isMobile ? rem(9) : rem(64),
              lineHeight: isMobile ? 1.3 : 1.1,
              textAlign: "center",
              maxWidth: isMobile ? "90%" : rem(900),
              margin: "0 auto",
              fontWeight: 800,
              wordBreak: "break-word",
              overflowWrap: "break-word",
              padding: isMobile ? "0 10px" : 0,
            }}
          >
            Contact Arodos Academy
          </Title>

          <Text size={isMobile ? "xs" : "xl"} ta="center" maw={isMobile ? 280 : 700} mx="auto" style={{ opacity: 0.9 }}>
            {isMobile ? "We're here to help with your tech education journey." : "Have questions about our courses or need assistance? We're here to help you take the next step in your tech education journey."}
          </Text>
        </Stack>
      </Container>
    </Box>
  );
};

export default ContactHero;
