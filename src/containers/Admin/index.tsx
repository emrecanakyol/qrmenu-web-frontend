"use client";
import React from "react";
import { useBreakpointValue } from "@chakra-ui/react";
import AdminDesktop from "./AdminDesktop";
import AdminMobile from "./AdminMobile";

function Index() {
  const isDesktop = useBreakpointValue({
    xl: true,
    lg: true,
    md: false,
    base: false,
  });
  return <>{isDesktop ? <AdminDesktop /> : <AdminMobile />}</>;
}

export default Index;
