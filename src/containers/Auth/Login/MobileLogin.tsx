"use client";
import { useState } from "react";
import { Box, Button, Input, FormControl, FormLabel, Text, IconButton, Heading } from "@chakra-ui/react";
import { API_URL } from "@/api/constants";
import { useRouter } from "next/navigation";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

function MobileLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
      sessionStorage.setItem('user_id', data.user_id);
      sessionStorage.setItem('username', username);
      router.push("/admin");
    } else {
      setError(data.error || "Bir hata oluştu.");
    }
  };

  return (
    <Box width="100%" maxW="350px" p="4" boxShadow="md" borderRadius="md" mx="auto" mt="40px" bg="#fff">
      <Heading mb="4" fontSize="2xl" textAlign="center">Giriş Yap</Heading>
      {error && <Text color="red.500" fontSize="md" mb="2">{error}</Text>}
      <FormControl mb="4">
        <FormLabel fontSize="md">Kullanıcı Adı</FormLabel>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          borderColor="gray.600"
          _focus={{ borderColor: "teal.500" }}
          fontSize="md"
        />
      </FormControl>
      <FormControl mb="4">
        <FormLabel fontSize="md">Şifre</FormLabel>
        <Box position="relative">
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            pr="3rem"
            borderColor="gray.600"
            _focus={{ borderColor: "teal.500" }}
            fontSize="md"
          />
          <IconButton
            variant="ghost"
            aria-label={showPassword ? "Şifreyi Gizle" : "Şifreyi Göster"}
            icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
            onClick={() => setShowPassword(!showPassword)}
            position="absolute"
            right="0.5rem"
            top="50%"
            transform="translateY(-50%)"
            zIndex="1"
            fontSize={18}
            size="sm"
          />
        </Box>
      </FormControl>
      <Button onClick={handleLogin} colorScheme="teal" width="full" fontSize="md" py={6}>
        Giriş Yap
      </Button>
    </Box>
  );
}

export default MobileLogin;