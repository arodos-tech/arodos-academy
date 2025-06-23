"use client";

import { Box, Container, Text, Title, rem } from "@mantine/core";
import { useIsMobile } from "@/hooks";
import { aboutHero } from "@/assets/images";
import { HERO_GRADIENT_OVERLAY } from "@/lib/constants";

const AboutHero = () => {
  const isMobile = useIsMobile();

  return (
    <Box
      c="white"
      style={{
        position: "relative",
        overflow: "hidden",
        height: isMobile ? rem(600) : rem(600),
        maxWidth: "100%",
        width: "100%",
        overflowX: "hidden",
        marginTop: isMobile ? rem(20) : 0,
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
          background: HERO_GRADIENT_OVERLAY,
          zIndex: 2,
        }}
      />
      <Container
        size="md"
        style={{
          position: "relative",
          zIndex: 3,
          padding: isMobile ? `${rem(60)} ${rem(20)} ${rem(60)}` : `${rem(120)} 0 ${rem(80)}`,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: isMobile ? "85%" : "100%",
          width: isMobile ? "85%" : "100%",
          boxSizing: "border-box",
          overflow: "hidden",
          margin: "0 auto",
        }}
      >
        <Text c="white" fw={600} size={isMobile ? "xs" : "lg"} tt="uppercase" ta="center">
          ABOUT ARODOS ACADEMY
        </Text>

        <Title
          order={1}
          style={{
            fontSize: isMobile ? rem(18) : rem(64),
            lineHeight: isMobile ? 1.3 : 1.2,
            textAlign: "center",
            maxWidth: isMobile ? rem(260) : "100%",
            margin: "0.5rem auto 0",
            fontWeight: 800,
            wordBreak: "break-word",
            overflowWrap: "break-word",
            padding: 0,
          }}
        >
          Empowering Tech Leaders
        </Title>

        <Text 
          size={isMobile ? "xs" : "xl"} 
          ta="center" 
          maw={isMobile ? 280 : 800} 
          mx="auto" 
          mt={isMobile ? "sm" : "xl"} 
          style={{ 
            opacity: 0.9,
            lineHeight: isMobile ? 1.3 : undefined,
          }}
        >
          {isMobile ? (
            <>A branch of <Text
              component="a"
              href="https://arodos.com/"
              target="_blank"
              rel="noopener noreferrer"
              span
              c="white"
              fw={600}
              style={{ textDecoration: "underline" }}
            >Arodos Technologies</Text>, bridging theory and practice.</>
          ) : (
            <>Founded with a vision to transform tech education, Arodos Academy, a branch of{" "}
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
            , bridges the gap between theoretical knowledge and practical industry skills.</>
          )}
        </Text>
      </Container>
    </Box>
  );
};

export default AboutHero;
