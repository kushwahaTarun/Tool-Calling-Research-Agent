import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

import ApplicationSidebar from "@/components/sidebar";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Research Agent",
  description: "Ask a question. The agent researches with tools, then answers.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${poppins.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full overflow-hidden">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ApplicationSidebar>{children}</ApplicationSidebar>
      </body>
    </html>
  );
}
