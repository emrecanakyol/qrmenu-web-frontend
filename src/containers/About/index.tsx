"use client";
import React from "react";
import { useBreakpointValue } from "@chakra-ui/react";
import AboutDesktop from "./AboutDesktop";
import AboutMobile from "./AboutMobile";

function Index() {
  const isDesktop = useBreakpointValue({
    xl: true,
    lg: true,
    md: false,
    base: false,
  });
  return <>{isDesktop ? <AboutDesktop /> : <AboutMobile />}</>;
}

export default Index;
