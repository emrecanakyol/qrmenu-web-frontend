"use client";
import React, { useEffect } from "react";
import { useBreakpointValue } from "@chakra-ui/react";
import AdminDesktop from "./AdminDesktop";
import AdminMobile from "./AdminMobile";
import { useRouter } from "next/navigation";

function Index() {
  const isDesktop = useBreakpointValue({
    xl: true,
    lg: true,
    md: false,
    base: false,
  });
  const router = useRouter();

  return <>{isDesktop ? <AdminDesktop /> : <AdminMobile />}</>;
}

export default Index;