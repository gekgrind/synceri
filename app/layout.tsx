import type { Metadata } from "next";
import { Oswald, Josefin_Sans } from "next/font/google";
import "./globals.css";
import { ClickSpark } from "@/components/global/ClickSpark";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const josefinSans = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Synceri — Align. Amplify. Achieve.",
  description: "Life administration and personal alignment for entrepreneurs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${josefinSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClickSpark />
        {children}
      </body>
    </html>
  );
}
