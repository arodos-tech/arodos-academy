"use client";

import { Avatar, Box, Card, Container, Group, rem, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import { IconBrandLinkedin, IconBrandTwitter } from "@/assets/icons";
import { useTheme } from "@/theme/use-theme";

const teamMembers = [
  {
    name: "Dr. Arun Kumar",
    position: "Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    bio: "With over 15 years of experience in the tech industry, Dr. Kumar founded Arodos Academy with a vision to transform tech education.",
  },
  {
    name: "Priya Sharma",
    position: "Head of Curriculum",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80",
    bio: "Priya brings her expertise in educational psychology and curriculum design to create engaging and effective learning experiences.",
  },
  {
    name: "Rahul Mehta",
    position: "Lead Instructor",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    bio: "A former senior developer at Google, Rahul specializes in full-stack development and has mentored hundreds of students.",
  },
  {
    name: "Ananya Patel",
    position: "Career Coach",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    bio: "Ananya helps students navigate their career paths and prepare for the job market with her extensive industry connections.",
  },
];

const OurTeam = () => {
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
    <Box py={100}>
      <Container size="lg">
        <Stack align="center" gap="xl" mb={60}>
          <Text style={{ color: colors.textSecondary }} c={themeMode === "dark" ? mantineTheme.colors.primary[2] : colors.primary} fw={700} size="lg" tt="uppercase" ta="center">
            OUR TEAM
          </Text>
          <Title style={{ color: colors.textPrimary }}
            order={2}
            style={{
              fontSize: getResponsiveValue(rem(28), rem(32), rem(36), rem(36)),
              textAlign: "center",
              maxWidth: rem(700),
              margin: "0 auto",
              color: themeMode === "dark" ? mantineTheme.white : mantineTheme.colors.dark[8],
            }}
          >
            Meet the Experts Behind Arodos Academy
          </Title>
          <Text style={{ color: colors.textSecondary }} size="lg" ta="center" c={themeMode === "dark" ? mantineTheme.colors.gray[3] : "dimmed"} maw={800} mx="auto">
            Our team consists of industry professionals, educators, and tech enthusiasts who are passionate about
            sharing their knowledge and experience.
          </Text>
        </Stack>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="xl" mt={50}>
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              shadow="md"
              p="xl"
              radius="lg"
              withBorder
              style={{
                height: "100%",
              }}
            >
              <Stack align="center">
                <Avatar
                  src={member.image}
                  size={120}
                  radius={120}
                  mx="auto"
                  style={{
                    border: `4px solid ${mantineTheme.colors.primary[2]}`,
                  }}
                />
                <Title style={{ color: colors.textPrimary }} order={4} ta="center" mt="md">
                  {member.name}
                </Title>
                <Text style={{ color: colors.textSecondary }} size="sm" c={colors.primary} fw={600} ta="center" mt={-5}>
                  {member.position}
                </Text>
                <Text style={{ color: colors.textSecondary }} size="sm" c="dimmed" ta="center" mt="xs">
                  {member.bio}
                </Text>
                <Group gap="md" mt="md">
                  <IconBrandLinkedin
                    size={20}
                    style={{
                      color: colors.primary,
                      cursor: "pointer",
                    }}
                  />
                  <IconBrandTwitter
                    size={20}
                    style={{
                      color: colors.primary,
                      cursor: "pointer",
                    }}
                  />
                </Group>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default OurTeam;
