"use client"
import { useState } from "react";
import { Button, Input, FormControl, FormLabel, Box, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { API_URL } from "@/api/constants";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    const res = await fetch(`${API_URL}/register.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();

    if (data.success) {
      // Kayıt başarılı olursa yönlendirme
      window.location.href = "/login";  // Direkt yönlendirme
    } else {
      setError(data.error || "Kayıt başarısız.");
    }
  };

  return (
    <Box width="400px" p="6" boxShadow="lg" borderRadius="md" mx="auto" mt="50px">
      <Heading mb="4">Kayıt Ol</Heading>
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
      <Button onClick={handleRegister} colorScheme="teal" width="full">
        Kayıt Ol
      </Button>
      <Text mt="4" textAlign="center">
        Zaten bir hesabınız var mı? <Link href="/login">Giriş yap</Link>
      </Text>
    </Box>
  );
};

export default Register;
