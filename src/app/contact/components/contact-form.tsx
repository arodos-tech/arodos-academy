"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import {
  Box,
  TextInput,
  Select,
  Button,
  Group,
  Text,
  Paper,
  FileInput,
  Stack,
  Container,
  SimpleGrid,
  rem,
  ThemeIcon,
  Title,
  MultiSelect,
  Loader,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconUpload, IconCheck, IconX, IconPhoto } from "@/assets/icons";
import { useIsMobile } from "@/hooks";
import { getCourses } from "@/actions/courses";
import { submitApplication } from "@/actions/applications";
import { getSettings } from "@/actions/settings";
import { notifications } from "@mantine/notifications";

const educationalQualifications = [
  { value: "be-btech", label: "B.E/B.Tech" },
  { value: "me-mtech", label: "M.E/M.Tech" },
  { value: "bca", label: "BCA" },
  { value: "mca", label: "MCA" },
  { value: "bsc", label: "BSC" },
  { value: "others", label: "Others" },
];

const semesters = [
  { value: "1", label: "1st Semester" },
  { value: "2", label: "2nd Semester" },
  { value: "3", label: "3rd Semester" },
  { value: "4", label: "4th Semester" },
  { value: "5", label: "5th Semester" },
  { value: "6", label: "6th Semester" },
  { value: "7", label: "7th Semester" },
  { value: "8", label: "8th Semester" },
  { value: "graduate", label: "Graduate" },
  { value: "pg", label: "Post Graduate" },
];

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must have at least 2 characters" }),
  email: z.string().email({ message: "Invalid email format" }),
  phone: z.string().regex(/^[0-9]{10}$/, { message: "Phone number must be exactly 10 digits" }),
  qualification: z.string().min(1, { message: "Please select your qualification" }),
  semester: z.string().min(1, { message: "Please select your semester" }),
  college: z.string().min(1, { message: "Please enter your college/university name" }),
  courses: z.array(z.string()).min(1, { message: "Please select at least one course" }),
  receipt: z.instanceof(File, { message: "Payment receipt is required" }).nullable(),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [availableCourses, setAvailableCourses] = useState<{ value: string; label: string }[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [paymentSettings, setPaymentSettings] = useState({
    upiId: "arodos@upi",
    qrCodeUrl: "",
  });
  const isMobile = useIsMobile();

  // Fetch available courses
  useEffect(() => {
    // Fetch courses from API
    const fetchCourses = async () => {
      try {
        const { courses } = await getCourses();
        if (courses && courses.length > 0) {
          const formattedCourses = courses.map((course) => ({
            value: course.id.toString(), // Ensure value is a string
            label: course.name,
          }));
          setAvailableCourses(formattedCourses);
        }
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      } finally {
        setLoadingCourses(false);
      }
    };

    // Fetch payment settings
    const fetchSettings = async () => {
      try {
        const { success, settings } = await getSettings();
        if (success && settings?.payment) {
          setPaymentSettings({
            upiId: settings.payment.upiId || "arodos@upi",
            qrCodeUrl: settings.payment.qrCodeUrl || "",
          });
        }
      } catch (error) {
        console.error("Failed to fetch payment settings:", error);
      }
    };

    fetchCourses();
    fetchSettings();
  }, []);

  const form = useForm<FormValues>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      qualification: "",
      semester: "",
      college: "",
      courses: [],
      receipt: null,
    },
    validate: zodResolver(formSchema),
    validateInputOnBlur: true,
  });

  const handleSubmit = async (values: typeof form.values) => {
    // Validate receipt is present
    if (!values.receipt) {
      setFileError("Payment receipt is required");
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);
    try {
      // Get the selected qualification and semester labels
      const qualificationItem = educationalQualifications.find((item) => item.value === values.qualification);
      const semesterItem = semesters.find((item) => item.value === values.semester);

      // Get the course names from the selected course IDs
      const selectedCourseNames = values.courses.map((courseId) => {
        const course = availableCourses.find((c) => c.value === courseId);
        return course?.label || courseId;
      });

      // Submit the application using the API
      const { success, error } = await submitApplication({
        name: values.name,
        email: values.email,
        phone: values.phone,
        qualification: values.qualification,
        semester: values.semester,
        college: values.college,
        courses: values.courses,
        // Pass the labels and course names
        qualificationLabel: qualificationItem?.label,
        semesterLabel: semesterItem?.label,
        courseNames: selectedCourseNames,
        receipt: values.receipt,
      });

      if (success) {
        setIsSubmitted(true);
        form.reset();
        setFilePreview(null);
        notifications.show({
          title: "Application Submitted",
          message: "Your application has been submitted successfully!",
          color: "green",
          icon: <IconCheck size="1.5rem" />,
          position: "bottom-center",
          autoClose: 3000,
          radius: "md",
          withBorder: true,
        });
      } else {
        setSubmissionError(error || "Failed to submit application. Please try again.");
        notifications.show({
          title: "Submission Failed",
          message: error || "Failed to submit application. Please try again.",
          color: "red",
          icon: <IconX size="1.5rem" />,
          position: "bottom-center",
          autoClose: 3000,
          radius: "md",
          withBorder: true,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box py={rem(80)} style={{ backgroundColor: "white" }}>
      <Container size="lg" id="reg-form">
        <Box mb={rem(40)} ta="center">
          <Title
            order={2}
            style={{
              fontSize: isMobile ? rem(28) : rem(36),
              lineHeight: 1.2,
            }}
          >
            Registration Form
          </Title>
          <Text size="lg" c="dimmed" maw={700} mx="auto">
            Fill out the form below to register for our courses. Our team will get back to you shortly.
          </Text>
        </Box>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
          <Stack>
            <Paper
              withBorder
              p={rem(30)}
              radius="md"
              shadow="md"
              style={{
                borderLeft: "4px solid var(--mantine-color-primary-5)",
                backgroundColor: "white",
              }}
            >
              <Text fw={600} fz={rem(20)} mb={rem(20)} c="primary.5">
                Payment Details
              </Text>
              <Box mb={rem(20)}>
                <Text mb={rem(10)}>Scan QR code to pay:</Text>
                <Box
                  style={{
                    width: rem(200),
                    height: rem(200),
                    backgroundColor: "var(--mantine-color-gray-0)",
                    border: "1px solid var(--mantine-color-gray-3)",
                    borderRadius: "var(--mantine-radius-md)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                    margin: "0 auto",
                  }}
                >
                  {paymentSettings.qrCodeUrl ? (
                    <img
                      src={paymentSettings.qrCodeUrl}
                      alt="Payment QR Code"
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  ) : (
                    <>
                      <Box
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundImage:
                            "linear-gradient(45deg, var(--mantine-color-gray-1) 25%, transparent 25%, transparent 50%, var(--mantine-color-gray-1) 50%, var(--mantine-color-gray-1) 75%, transparent 75%, transparent)",
                          backgroundSize: "20px 20px",
                          opacity: 0.5,
                        }}
                      />
                      <Box
                        style={{
                          position: "relative",
                          zIndex: 1,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <IconPhoto size={120} style={{ opacity: 0.7, marginBottom: rem(10) }} />
                        <Text>QR Code</Text>
                      </Box>
                    </>
                  )}
                </Box>
              </Box>
              <Text mb={rem(5)}>UPI ID: {paymentSettings.upiId}</Text>
              <Text c="dimmed" fz="sm">
                Please upload the payment receipt in the form after completing the payment.
              </Text>
            </Paper>
          </Stack>

          <Box>
            {isSubmitted ? (
              <Paper withBorder p={rem(30)} radius="md" shadow="md">
                <Text fw={700} fz={rem(24)} c="primary.6" mb={rem(20)}>
                  Thank You!
                </Text>
                <Text>Your registration has been submitted successfully. Our team will contact you shortly.</Text>
                <Button
                  mt={rem(20)}
                  onClick={() => setIsSubmitted(false)}
                  variant="gradient"
                  gradient={{ from: "var(--mantine-color-primary-5)", to: "var(--mantine-color-primary-8)", deg: 45 }}
                >
                  Submit Another Registration
                </Button>
              </Paper>
            ) : (
              <Paper
                withBorder
                p={rem(30)}
                radius="md"
                shadow="md"
                style={{
                  backgroundColor: "white",
                  borderTop: "4px solid var(--mantine-color-primary-5)",
                }}
              >
                <form onSubmit={form.onSubmit(handleSubmit)}>
                  <Stack>
                    <TextInput
                      label="Full Name"
                      placeholder="Your name"
                      required
                      {...form.getInputProps("name")}
                      styles={{
                        input: {
                          "&:focus": {
                            borderColor: "var(--mantine-color-primary-5)",
                          },
                        },
                      }}
                    />

                    <TextInput
                      label="Email"
                      placeholder="your@email.com"
                      required
                      {...form.getInputProps("email")}
                      styles={{
                        input: {
                          "&:focus": {
                            borderColor: "var(--mantine-color-primary-5)",
                          },
                        },
                      }}
                    />

                    <TextInput
                      label="Phone Number"
                      placeholder="10-digit mobile number"
                      required
                      maxLength={10}
                      onKeyUp={(e) => {
                        // Allow only digits
                        if (!/[0-9]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      {...form.getInputProps("phone")}
                      styles={{
                        input: {
                          "&:focus": {
                            borderColor: "var(--mantine-color-primary-5)",
                          },
                        },
                      }}
                    />

                    <Select
                      label="Educational Qualification"
                      placeholder="Select your qualification"
                      data={educationalQualifications}
                      required
                      {...form.getInputProps("qualification")}
                      styles={{
                        input: {
                          "&:focus": {
                            borderColor: "var(--mantine-color-primary-5)",
                          },
                        },
                      }}
                    />

                    <Select
                      label="Current Semester"
                      placeholder="Select your semester"
                      data={semesters}
                      required
                      {...form.getInputProps("semester")}
                      styles={{
                        input: {
                          "&:focus": {
                            borderColor: "var(--mantine-color-primary-5)",
                          },
                        },
                      }}
                    />

                    <TextInput
                      label="College/University"
                      placeholder="Name of your institution"
                      required
                      {...form.getInputProps("college")}
                      styles={{
                        input: {
                          "&:focus": {
                            borderColor: "var(--mantine-color-primary-5)",
                          },
                        },
                      }}
                    />

                    {loadingCourses ? (
                      <Box py="md">
                        <Text size="sm" fw={500} mb={5}>
                          Loading Courses...
                        </Text>
                        <Loader size="sm" />
                      </Box>
                    ) : (
                      <MultiSelect
                        label="Courses Interested In"
                        placeholder="Select one or more courses"
                        data={availableCourses}
                        required
                        searchable
                        nothingFoundMessage="No courses found"
                        {...form.getInputProps("courses")}
                        styles={{
                          input: {
                            "&:focus": {
                              borderColor: "var(--mantine-color-primary-5)",
                            },
                          },
                        }}
                      />
                    )}

                    <Box mb="md">
                      <Text fw={500} size="sm" mb={5}>
                        Payment Receipt
                      </Text>
                      <Paper
                        withBorder
                        p="md"
                        radius="md"
                        style={{
                          backgroundColor: "white",
                          border: "1px dashed var(--mantine-color-primary-3)",
                        }}
                      >
                        <FileInput
                          placeholder="Upload payment receipt"
                          accept="image/png,image/jpeg,application/pdf"
                          required
                          leftSection={<IconUpload size="0.9rem" style={{ opacity: 0.7 }} />}
                          onChange={(file) => {
                            form.setFieldValue("receipt", file);
                            // Clear error if file is selected, otherwise set error
                            if (file) {
                              setFileError(null);

                              if (file && file.type.startsWith("image/")) {
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                  setFilePreview(e.target?.result as string);
                                };
                                reader.readAsDataURL(file);
                              } else {
                                setFilePreview(null);
                              }
                            } else {
                              setFileError("Payment receipt is required");
                              setFilePreview(null);
                            }
                          }}
                          error={fileError}
                          styles={{
                            root: {
                              width: "100%",
                            },
                            input: {
                              border: "1px dashed var(--mantine-color-primary-3)",
                              backgroundColor: "var(--mantine-color-body)",
                            },
                          }}
                        />

                        {form.values.receipt && (
                          <Group mt="md" gap="md">
                            <ThemeIcon color="primary.5" variant="light" size={rem(32)} radius="xl">
                              <IconCheck size={rem(20)} />
                            </ThemeIcon>
                            <Box style={{ flex: 1 }}>
                              <Text size="sm" fw={500} lineClamp={1}>
                                {form.values.receipt.name}
                              </Text>
                              <Text size="xs" c="dimmed">
                                {(form.values.receipt.size / 1024).toFixed(2)} KB
                              </Text>
                            </Box>
                          </Group>
                        )}

                        {filePreview && (
                          <Box mt="md" style={{ position: "relative" }}>
                            <Text size="sm" fw={500} mb={5}>
                              Preview:
                            </Text>
                            <Box
                              style={{
                                width: "100%",
                                height: rem(150),
                                backgroundImage: `url(${filePreview})`,
                                backgroundSize: "contain",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                border: "1px solid var(--mantine-color-gray-3)",
                                borderRadius: "var(--mantine-radius-md)",
                              }}
                            />
                          </Box>
                        )}

                        <Text size="xs" c="dimmed" mt="xs">
                          Accepted formats: PNG, JPEG, PDF. Max size: 5MB
                        </Text>
                      </Paper>
                    </Box>

                    <Group justify="flex-end">
                      {submissionError && (
                        <Text c="red" size="sm" mt="xs">
                          {submissionError}
                        </Text>
                      )}
                      <Button
                        type="submit"
                        loading={isSubmitting}
                        size="lg"
                        fullWidth
                        mt="md"
                        radius="md"
                        color="primary"
                        disabled={!form.isValid() || !form.values.receipt || Object.keys(form.errors).length > 0}
                        style={{
                          fontWeight: 600,
                        }}
                      >
                        Submit Registration
                      </Button>
                    </Group>
                  </Stack>
                </form>
              </Paper>
            )}
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default ContactForm;
