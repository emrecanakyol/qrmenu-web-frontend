"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Input, FormControl, FormLabel, Box, Heading, Text, IconButton } from "@chakra-ui/react";
import { API_URL } from "@/api/constants";
import { useRouter } from "next/navigation";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'; // Chakra UI'nın ikonları

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Şifreyi göster/gizle kontrolü

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
      // Başarılı giriş, sessionStorage'a user_id ekliyoruz
      sessionStorage.setItem('user_id', data.user_id);
      sessionStorage.setItem('username', username);

      // Admin sayfasına yönlendir
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
          borderColor="gray.600" // Border rengini koyu yapıyoruz
          _focus={{ borderColor: "teal.500" }} // Focus durumunda renk değişimi
        />
      </FormControl>
      <FormControl mb="4">
        <FormLabel>Şifre</FormLabel>
        <Box position="relative">
          <Input
            type={showPassword ? "text" : "password"} // Şifreyi göster/gizle
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            pr="4.5rem" // İkon için sağ padding
            borderColor="gray.600" // Border rengini koyu yapıyoruz
            _focus={{ borderColor: "teal.500" }} // Focus durumunda renk değişimi
          />
          <IconButton
            variant="link"
            aria-label={showPassword ? "Şifreyi Gizle" : "Şifreyi Göster"}
            icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
            onClick={() => setShowPassword(!showPassword)}
            position="absolute"
            right="1rem"
            top="50%"
            transform="translateY(-50%)" // Vertikal olarak ortalamak için
            zIndex="1"
            fontSize={18}
          />
        </Box>
      </FormControl>
      <Button onClick={handleLogin} colorScheme="teal" width="full">
        Giriş Yap
      </Button>
    </Box>
  );
};

export default Login;
