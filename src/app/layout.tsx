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
import Footer from "@/components/footer";

// Metadata
export const metadata = {
  title: "Arodos Academy",
  description: "Launch Your Tech Career with Arodos Academy",
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
                <Footer />
              </AppShell>
            </ThemeProvider>
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
