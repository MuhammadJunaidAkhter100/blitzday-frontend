import type { Metadata } from "next";
import ThemeProvider from "@/theme";

import MainLayout from "@/components/MainLayout";

export const metadata: Metadata = {
  title: "BlitzDay.AIi",
  description: "BlitzDay.AI gives live recommendations based on Customer’s questions, enabling reps to tailor their pitch dynamically and close more deals",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <MainLayout>
            {children}
          </MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
