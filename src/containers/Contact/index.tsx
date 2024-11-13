"use client";
import React from "react";
import { useBreakpointValue } from "@chakra-ui/react";
import ContactMobile from "./ContactMobile";
import ContactDesktop from "./ContactDesktop";

function Index() {
  const isDesktop = useBreakpointValue({
    xl: true,
    lg: true,
    md: false,
    base: false,
  });
  return <>{isDesktop ? <ContactDesktop /> : <ContactMobile />}</>;
}

export default Index;