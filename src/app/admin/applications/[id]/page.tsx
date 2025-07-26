"use client";

import {
  Alert,
  Anchor,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  Divider,
  Group,
  Image,
  Loader,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconAlertCircle, IconArrowLeft, IconDownload } from "@/assets/icons";
import { useEffect, useState } from "react";

import { IMAGE_URL } from "@/lib/constants";
import Link from "next/link";
import { getApplications } from "@/actions/applications";
import { use } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/theme/use-theme";

interface ApplicationDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

const ApplicationDetailsPage = ({ params }: ApplicationDetailsProps) => {
  // Properly unwrap params using use() from React
  const unwrappedParams = use(params);
  const applicationId = unwrappedParams.id;

  const { colors } = useTheme();
  const theme = useMantineTheme();
  const router = useRouter();
  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { applications, error: fetchError } = await getApplications();
        if (fetchError) {
          console.error("Error fetching applications:", fetchError);
          setError(fetchError);
        } else {
          // Find the application with the matching ID
          const app = applications?.find((a) => a.id === Number(applicationId));
          if (app) {
            setApplication(app);
            setError(null);
          } else {
            setError("Application not found");
          }
        }
      } catch (err: any) {
        console.error("Error in fetch operation:", err);
        setError(err.message || "Failed to fetch application details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [applicationId]);

  if (loading) {
    return (
      <Group justify="center" py="xl">
        <Loader size="lg" />
        <Text>Loading application details...</Text>
      </Group>
    );
  }

  if (error) {
    return (
      <Alert icon={<IconAlertCircle size={16} />} title="Error" color={theme.colors.error[8]}>
        {error}
      </Alert>
    );
  }

  return (
    <>
      <Box mb="lg"></Box>

      <Group mb="md">
        <Button variant="light" leftSection={<IconArrowLeft size={16} />} onClick={() => router.back()}>
          Back to Applications
        </Button>
      </Group>

      <Paper shadow="xs" p="xl" radius="md" withBorder>
        <Stack gap="lg">
          <Group justify="space-between" align="center" wrap="wrap">
            <Text size="xl" fw={700}>
              Application Details
            </Text>
            <Text size="sm" c="dimmed">
              Submitted on {application?.created_at ? new Date(application.created_at).toLocaleString() : "N/A"}
            </Text>
          </Group>

          <Divider />

          {/* Use SimpleGrid instead of Group for responsive layout */}
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
            {/* First column - Personal details */}
            <Stack gap="md">
              <InfoItem label="Application ID" value={application?.id} />
              <InfoItem label="Full Name" value={application?.name} />
              <InfoItem label="Email" value={application?.email} />
              <InfoItem label="Phone" value={application?.phone} />
              <InfoItem label="Qualification" value={application?.qualification} />
              <InfoItem label="Semester" value={application?.semester} />
              <InfoItem label="College" value={application?.college} />
              <Box>
                <Text fw={600} mb="xs">
                  Courses Applied For:
                </Text>
                <Group gap="xs" wrap="wrap">
                  {application?.courses?.map((course: string) => (
                    <Badge
                      key={course}
                      size="md"
                      radius="sm"
                      style={{
                        textTransform: "none",
                        backgroundColor: colors.primaryLight,
                        color: colors.primary,
                        fontWeight: 600,
                        padding: "6px 14px",
                      }}
                    >
                      {course}
                    </Badge>
                  ))}
                </Group>
              </Box>
            </Stack>

            {/* Second column - Receipt */}
            <Stack gap="md">
              <Box>
                <Text fw={600} mb="xs">
                  Receipt:
                </Text>
                {application?.receipt ? (
                  <Stack gap="sm">
                    <Image
                      src={`${IMAGE_URL}/${application.receipt}`}
                      alt="Receipt"
                      radius="md"
                      fit="contain"
                      h={300}
                    />
                    <Button
                      variant="light"
                      leftSection={<IconDownload size={16} />}
                      component="a"
                      href={`${IMAGE_URL}/${application.receipt}`}
                      target="_blank"
                      download
                    >
                      Download Receipt
                    </Button>
                  </Stack>
                ) : (
                  <Text c="dimmed">No receipt uploaded</Text>
                )}
              </Box>
            </Stack>
          </SimpleGrid>
        </Stack>
      </Paper>
    </>
  );
};

// Helper component for displaying information items
const InfoItem = ({ label, value }: { label: string; value: any }) => (
  <Box>
    <Text fw={600} size="sm" mb={4}>
      {label}:
    </Text>
    <Text>{value || "N/A"}</Text>
  </Box>
);

export default ApplicationDetailsPage;
