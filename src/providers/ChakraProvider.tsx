"use client"
import Header from "@/components/Header";
import { ChakraProvider } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import Loading from "./Loading";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [])

  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>
          {loading ? <Loading /> :
            (
              <>
                <Header />
                {children}
              </>
            )}
        </ChakraProvider>
      </body>
    </html>
  );
}