import "@/assets/styles/globals.css";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";

import { AppShell, ColorSchemeScript, MantineProvider, mantineHtmlProps } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

// Theme
import theme from "@/theme/theme";
import "@/theme/theme-toggle.css";
import { ThemeProvider } from "@/theme/theme-provider";

// Components
import Header from "@/components/header";

// Metadata
export const metadata = {
  title: "My Mantine app",
  description: "I have followed setup instructions carefully",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <ModalsProvider>
            <Notifications position="top-right" />
            <ThemeProvider>
              <AppShell header={{ height: 80 }} padding="md">
                <Header />
                {children}
              </AppShell>
            </ThemeProvider>
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
