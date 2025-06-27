"use client";
import { useBreakpointValue } from "@chakra-ui/react";
import DesktopRegister from "./DesktopRegister";
import MobileRegister from "./MobileRegister";

function Register() {
    const isDesktop = useBreakpointValue({
        xl: true,
        lg: true,
        md: false,
        base: false,
    });
    return <>{isDesktop ? <DesktopRegister /> : <MobileRegister />}</>;
}

export default Register; 