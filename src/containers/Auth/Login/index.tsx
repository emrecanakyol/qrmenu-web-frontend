"use client"
import { Box, useBreakpointValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DesktopLogin from "./DesktopLogin";
import MobileLogin from "./MobileLogin";
import { useRouter } from "next/navigation";

function Home() {
  const isDesktop = useBreakpointValue({
    xl: true,
    lg: true,
    md: false,
    base: false,
  });

  return <>{isDesktop ? <DesktopLogin /> : <MobileLogin />}</>;
}

export default Home;
