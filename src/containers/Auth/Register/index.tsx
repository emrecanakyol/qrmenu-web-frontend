"use client"
import { useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import DesktopRegister from "./DesktopRegister";
import MobileRegister from "./MobileRegister";

function Home() {
  const isDesktop = useBreakpointValue({
    xl: true,
    lg: true,
    md: false,
    base: false,
  });

  return <>{isDesktop ? <DesktopRegister /> : <MobileRegister />}</>;
}

export default Home;
