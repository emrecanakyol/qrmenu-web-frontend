"use client"
import { useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import DesktopHome from "./DesktopHome";
import MobileHome from "./MobileHome";

function Home() {
  const isDesktop = useBreakpointValue({
    xl: true,
    lg: true,
    md: false,
    base: false,
  });

  return <>{isDesktop ? <DesktopHome /> : <MobileHome />}</>;
}

export default Home;
