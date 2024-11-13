import ChakraProvider from "@/providers/ChakraProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Beykoz Balıkçısı",
  description: "Qr Menü",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ backgroundColor: "#F6EEE4" }}>
        <ChakraProvider>{children}</ChakraProvider>
      </body>
    </html>
  );
}