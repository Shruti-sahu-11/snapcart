import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";



export const metadata: Metadata = {
  title: "Snapcart | 10 minutes grocey delivery App",
  description: "10 minutes grocey delivery App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
      className="w-full min-h-screen bg-linear-to-b from-green-100 to-white"
      >
        {children}
      </body>
    </html>
  );
}
