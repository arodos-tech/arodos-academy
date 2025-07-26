import "@/assets/styles/globals.css";
import "@/assets/styles/admin.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "mantine-datatable/styles.css";

import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";

import RootLayoutClient from "./root-layout-client";

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
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
