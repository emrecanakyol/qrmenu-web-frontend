"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box } from "@chakra-ui/react";
import AdminDesktop from "./AdminDesktop";
import AdminMobile from "./AdminMobile";
import { useBreakpointValue } from "@chakra-ui/react";

const AdminPage = () => {
  const isDesktop = useBreakpointValue({
    xl: true,
    lg: true,
    md: false,
    base: false,
  });

  const router = useRouter();

  useEffect(() => {
    // Giriş kontrolü
    const isLoggedIn = sessionStorage.getItem('user_id');  // veya localStorage veya API ile kontrol edebilirsiniz

    if (!isLoggedIn) {
      router.push('/login');  // Giriş yapılmamışsa login sayfasına yönlendir
    }
  }, [router]);

  return (
    <Box>
      {isDesktop ? <AdminDesktop /> : <AdminMobile />}
    </Box>
  );
};

export default AdminPage;
