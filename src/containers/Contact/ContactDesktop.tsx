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

const Contact = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <Flex
      align={"center"}
      width={{ base: "100%", xl: "1440px" }}
      px={{ base: "16px", md: "72px", xl: "165px" }}
      margin="auto"
      marginTop={"100px"}
      marginBottom={"100px"}
    >
      <Box
        borderRadius="md"
        backgroundColor={"#fff"}
        padding={"54px"}
        w={"100%"}
      >
        <Box p={4}>
          <Heading mb={4}>Dilek & Şikayet</Heading>
          <Text
            color="#000"
            fontSize="18px"
            fontWeight={"normal"}
            marginBottom={"50px"}
          >
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

            <FormControl mb={4} isRequired>
              <FormLabel>Açıklama</FormLabel>
              <Textarea placeholder="Açıklama" />
            </FormControl>

            <Button colorScheme="teal" type="submit">
              Gönder
            </Button>
          </form>

          <Box
            mt={20}
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
                <Text color={"#282d31"} fontWeight={"500"} fontSize={"18px"}>
                  0 (532) 012 70 65
                </Text>
              </NextLink>
            </Flex>

            <NextLink href="https://www.instagram.com/craxcrispy/">
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
                <Image
                  alt="instagram"
                  src="/ins-icon.png"
                  w={"20px"}
                  h={"20px"}
                />
                <Text color={"#282d31"} fontWeight={"400"} fontSize={"18px"}>
                  @craxcrispy
                </Text>
              </Flex>
            </NextLink>
            {/* <NextLink href="https://www.facebook.com/profile.php?id=61567858995945&locale=tr_TR">
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
                <Image
                  alt="facebook"
                  src="/facebook-icon.png"
                  w={"20px"}
                  h={"20px"}
                />
                <Text color={"#282d31"} fontWeight={"400"} fontSize={"18px"}>
                  Beykoz Balıkçısı
                </Text>
              </Flex>
            </NextLink> */}
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Contact;
