"use client";
import {
  Box,
  Flex,
  Text,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Image,
} from "@chakra-ui/react";
import NextLink from "next/link";

const ContactMobile = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <Box w="100%" px={"22px"} py={"50px"} bgColor={"#fff"}>
      <Heading mb={4}>Dilek & Şikayet</Heading>
      <Text color="#000" fontSize="18px" fontWeight={"normal"} mb={"20px"}>
        Önerilerinizi ve şikayetlerinizi bizimle paylaşabilirsiniz.
      </Text>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4} isRequired>
          <FormLabel>Ad</FormLabel>
          <Input type="text" placeholder="Adınız" />
        </FormControl>

        <FormControl mb={4} isRequired>
          <FormLabel>Soyad</FormLabel>
          <Input type="text" placeholder="Soyadınız" />
        </FormControl>

        <FormControl mb={4} isRequired>
          <FormLabel>E-posta</FormLabel>
          <Input type="email" placeholder="E-posta adresiniz" />
        </FormControl>

        <FormControl mb={4} isRequired>
          <FormLabel>Konu Başlığı</FormLabel>
          <Input type="text" placeholder="Konu başlığı" />
        </FormControl>

        <FormControl mb={20} isRequired>
          <FormLabel>Açıklama</FormLabel>
          <Textarea placeholder="Açıklama" />
        </FormControl>

        <Button colorScheme="teal" type="submit">
          Gönder
        </Button>
      </form>

      <Box
        mt={10}
        gap={10}
        display={{
          xl: "flex",
          lg: "flex",
          md: "flex",
        }}
      >
        <Flex gap={2} alignItems={"center"}>
          <Image alt="tel" src="/tel-icon.png" w={"22px"} h={"22px"} />
          <NextLink href="tel:+902122993300" passHref>
            <Text color={"#282d31"} fontWeight={"400"} fontSize={"18px"}>
              0 (212) 299 33 00
            </Text>
          </NextLink>
        </Flex>

        <NextLink href="https://www.instagram.com/kilickanatsariyer/">
          <Flex
            gap={2}
            mt={{
              xl: 0,
              lg: 0,
              md: 0,
              base: 5,
            }}
            alignItems={"center"}
          >
            <Image alt="instagram" src="/ins-icon.png" w={"20px"} h={"20px"} />
            <Text color={"#282d31"} fontWeight={"400"} fontSize={"18px"}>
              @kilickanatsariyer
            </Text>
          </Flex>
        </NextLink>
      </Box>
    </Box>
  );
};

export default ContactMobile;
