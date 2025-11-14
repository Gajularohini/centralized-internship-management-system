import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import NeonBackground from "@/components/ui/neon-background";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Internship Management System",
  description: "A unified platform connecting Students, Teachers, and Companies for seamless internship tracking, evaluation, and communication.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Global neon background with dark gradient */}
          <div className="min-h-screen bg-gradient-to-br from-[#0d0d0f] to-[#1a1a1d] relative overflow-hidden">
            <NeonBackground />
            <div className="relative z-10">
              {children}
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
