"use client";
import { useState } from "react";
import { Button, Input, FormControl, FormLabel, Box, Heading, Text } from "@chakra-ui/react";
import { API_URL } from "@/api/constants";
import { useRouter } from "next/navigation";

const DesktopRegister = () => {
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
        <Box width="400px" p="6" boxShadow="lg" borderRadius="md" mx="auto" mt="50px">
            <Heading mb="4">Kayıt Ol</Heading>
            {error && <Text color="red.500">{error}</Text>}
            {success && <Text color="green.500">{success}</Text>}
            <FormControl mb="4">
                <FormLabel>Kullanıcı Adı</FormLabel>
                <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    borderColor="gray.600"
                    _focus={{ borderColor: "teal.500" }}
                />
            </FormControl>
            <FormControl mb="4">
                <FormLabel>Şifre</FormLabel>
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    borderColor="gray.600"
                    _focus={{ borderColor: "teal.500" }}
                />
            </FormControl>
            <Button onClick={handleRegister} colorScheme="teal" width="full">
                Kayıt Ol
            </Button>
        </Box>
    );
};

export default DesktopRegister; 