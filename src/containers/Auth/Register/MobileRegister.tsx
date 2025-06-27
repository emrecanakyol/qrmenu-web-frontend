"use client";
import { useState } from "react";
import { Box, Button, Input, FormControl, FormLabel, Text, Heading } from "@chakra-ui/react";
import { API_URL } from "@/api/constants";
import { useRouter } from "next/navigation";

function MobileRegister() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRegister = async () => {
        setError("");
        setSuccess("");
        const response = await fetch(`${API_URL}/register.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (data.success) {
            setSuccess("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...");
            setTimeout(() => router.push("/login"), 1500);
        } else {
            setError(data.error || "Bir hata oluştu.");
        }
    };

    return (
        <Box width="100%" maxW="350px" p="4" boxShadow="md" borderRadius="md" mx="auto" mt="40px" bg="#fff">
            <Heading mb="4" fontSize="2xl" textAlign="center">Kayıt Ol</Heading>
            {error && <Text color="red.500" fontSize="md" mb="2">{error}</Text>}
            {success && <Text color="green.500" fontSize="md" mb="2">{success}</Text>}
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
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    borderColor="gray.600"
                    _focus={{ borderColor: "teal.500" }}
                    fontSize="md"
                />
            </FormControl>
            <Button onClick={handleRegister} colorScheme="teal" width="full" fontSize="md" py={6}>
                Kayıt Ol
            </Button>
        </Box>
    );
}

export default MobileRegister; 