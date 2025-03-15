import type { Metadata } from "next";
import { Saira } from "next/font/google";
import "./globals.css";

const SairaSans = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VRG demo",
  description: "VRG demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${SairaSans.variable}`}>
      <body
        className={`antialiased bg-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
