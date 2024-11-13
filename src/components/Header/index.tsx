"use client";
import React from "react";
import { useBreakpointValue } from "@chakra-ui/react";
import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";
import { useRouter } from "next/navigation";

function Header() {
  const router = useRouter();
  const isDesktop = useBreakpointValue({
    xl: true,
    lg: true,
    md: false,
    base: false,
  });

  return (
    <>{isDesktop ? <HeaderDesktop router={router} /> : <HeaderMobile />}</>
  );
}

export default Header;
