"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Input, FormControl, FormLabel, Box, Heading, Text } from "@chakra-ui/react";
import { API_URL } from "@/api/constants";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const response = await fetch(`${API_URL}/login.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.success) {
      // Giriş başarılıysa, admin sayfasına yönlendir
      router.push("/admin");
    } else {
      setError(data.error || "Bir hata oluştu.");
    }
  };

  return (
    <Box width="400px" p="6" boxShadow="lg" borderRadius="md" mx="auto" mt="50px">
      <Heading mb="4">Giriş Yap</Heading>
      {error && <Text color="red.500">{error}</Text>}
      <FormControl mb="4">
        <FormLabel>Kullanıcı Adı</FormLabel>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>
      <FormControl mb="4">
        <FormLabel>Şifre</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Button onClick={handleLogin} colorScheme="teal" width="full">
        Giriş Yap
      </Button>
      <Text mt="4" textAlign="center">
        Hesabınız yok mu? <Link href="/register">Kayıt ol</Link>
      </Text>
    </Box>
  );
};

export default Login;
