"use client";

import { ADMIN_PASSWORD, ADMIN_USERNAME } from "@/lib/constants";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useEffect, useState } from "react";

import { IconAlertCircle } from "@/assets/icons";
import { store } from "@/services/store";
import { useRouter } from "next/navigation";
import { useTheme } from "@/theme/use-theme";

const AdminLoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const theme = useMantineTheme();
  const { colors } = useTheme();

  // Use the store directly - this will automatically subscribe to changes
  const auth = store.auth();

  // Handle redirect if already logged in
  useEffect(() => {
    if (auth?.isLoggedIn && auth?.isAdmin) {
      router.push("/admin");
    }
  }, [auth?.isLoggedIn, auth?.isAdmin, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Use credentials from constants file
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        // Set auth state
        store.auth.set({
          user: { username, role: "admin" },
          token: "demo-token",
          isLoggedIn: true,
          isAdmin: true,
          forcePasswordReset: false,
          forceLogout: false,
          lastLogin: new Date().toISOString(),
          // persist property is handled by the store internally
        });

        // Redirect to admin dashboard
        router.push("/admin");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // If the user is already logged in, show a loading state instead of the form
  if (auth?.isLoggedIn && auth?.isAdmin) {
    return (
      <Box py="xl">
        <Container size={420} my={40} ta="center">
          <Text>Already logged in. Redirecting to dashboard...</Text>
        </Container>
      </Box>
    );
  }

  return (
    <Box py="xl">
      <Container size={420} my={40}>
        <Title ta="center" fw={900}>
          Admin Login
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Enter your credentials to access the admin panel
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={handleLogin}>
            <Stack gap="md">
              {error && (
                <Alert icon={<IconAlertCircle size={16} />} title="Error" color={theme.colors.error[8]} variant="light">
                  {error}
                </Alert>
              )}

              <TextInput
                label="Username"
                placeholder="Your username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button type="submit" fullWidth mt="xl" loading={loading}>
                Sign in
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminLoginPage;
