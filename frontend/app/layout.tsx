import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GoPratle — Post a Requirement",
  description:
    "Find the best event planners, performers, and crew for your event. Post your requirement in minutes on GoPratle.",
  keywords: ["event planner", "performers", "event crew", "event management India"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
