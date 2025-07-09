"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
  Stack,
  Text,
  Alert,
  Box,
} from "@mantine/core";
import { IconAlertCircle } from "@/assets/icons";
import { store } from "@/services/store";

const AdminLoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Use the store directly - this will automatically subscribe to changes
  const auth = store.auth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // For demo purposes, using hardcoded credentials
      // In a real application, this would be an API call
      if (username === "admin" && password === "admin123") {
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

  // If already logged in and is admin, redirect to admin dashboard
  if (auth?.isLoggedIn && auth?.isAdmin) {
    router.push("/admin");
    return null;
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
                <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red" variant="light">
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
