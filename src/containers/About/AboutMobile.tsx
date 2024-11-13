"use client";
import { Box, Flex, Text } from "@chakra-ui/react";

const AboutMobile = () => {
  return (
    <Box w="100%" pr={"12px"} pl={"12px"} bgColor={"#fff"}>
      <Text
        color="#000"
        fontSize="24px"
        fontWeight={"bold"}
        marginBottom={"25px"}
        pt={"50px"}
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
  );
};

export default AboutMobile;
