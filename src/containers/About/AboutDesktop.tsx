"use client";
import { Box, Flex, Text } from "@chakra-ui/react";

const AboutDesktop = () => {
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
        <Text
          color="#000"
          fontSize="24px"
          fontWeight={"bold"}
          marginBottom={"50px"}
        >
          Hakkımızda
        </Text>
        <Text
          color="#000"
          fontSize="16px"
          fontWeight={"normal"}
          marginBottom={"25px"}
        >
          Trabzonun eşsiz lezzetlerini denizden sofralarınıza getiriyoruz! Denizin taptaze kokusu eşliğinde, Karadeniz’in en lezzetli balıklarını sizlerle buluşturuyoruz. Usta şeflerimizin özenle hazırladığı menümüzde, hamsiden levreğe, mezgitten çupraya kadar en taze balık çeşitlerini bulabilirsiniz. Deniz ürünleriyle harmanlanmış mezelerimiz ve Karadeniz mutfağının zengin tatları, damaklarınıza unutulmaz bir yolculuk yaşatacak.
        </Text>
        <Text
          color="#000"
          fontSize="16px"
          fontWeight={"normal"}
          marginBottom={"50px"}
        >
          Sevdiklerinizle keyifli bir akşam yemeği, özel kutlamalar ya da Trabzon’un muhteşem manzarasında lezzet dolu bir öğle yemeği için sizleri bekliyoruz. Trabzonda balık keyfinin en doğru adresi!
        </Text>
      </Box>
    </Flex>
  );
};

export default AboutDesktop;
