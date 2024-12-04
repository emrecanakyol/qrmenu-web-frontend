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
          Kılıç Kanat olarak, tavuk lezzetini en kaliteli ve en taze şekilde sofralarınıza sunuyoruz! Usta şeflerimizin özenle hazırladığı ızgara tavuk çeşitlerimiz, eşsiz marinasyonlarla tatlandırılıyor ve her bir lokmada mükemmel bir lezzet deneyimi yaşatıyor. Farklı tatlar arayanlara, tavuk kanadından şişe, tavuk pirzoladan spesyal çeşitlere kadar geniş bir menü sunuyoruz.
        </Text>
        <Text
          color="#000"
          fontSize="16px"
          fontWeight={"normal"}
          marginBottom={"50px"}
        >
          Siz değerli misafirlerimize, lezzet dolu bir yemek keyfi yaşatırken, sağlıklı ve kaliteli malzemelerle hazırlanan yemeklerimizle de damak zevkinizi şımartıyoruz. Sevdiklerinizle birlikte sıcak bir akşam yemeği, arkadaşlarınızla keyifli bir buluşma ya da ailenizle birlikte unutulmaz bir öğün için Kılıç Kanat sizi bekliyor. Izgara tavuk keyfinin adresi Kılıç Kanat, her zaman taze, her zaman leziz!
        </Text>
      </Box>
    </Flex>
  );
};

export default AboutDesktop;
