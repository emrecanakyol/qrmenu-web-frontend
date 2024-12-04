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
        Kılıç Kanat olarak, tavuk lezzetini en kaliteli ve en taze şekilde sofralarınıza sunuyoruz! Usta şeflerimizin özenle hazırladığı ızgara tavuk çeşitlerimiz, eşsiz marinasyonlarla tatlandırılıyor ve her bir lokmada mükemmel bir lezzet deneyimi yaşatıyor. Farklı tatlar arayanlara, tavuk kanadından şişe, tavuk pirzoladan spesyal çeşitlere kadar geniş bir menü sunuyoruz.
      </Text>
      <Text
        color="#000"
        fontSize="16px"
        fontWeight={"normal"}
        marginBottom={"50px"}
        paddingBottom={"50px"}
      >
        Siz değerli misafirlerimize, lezzet dolu bir yemek keyfi yaşatırken, sağlıklı ve kaliteli malzemelerle hazırlanan yemeklerimizle de damak zevkinizi şımartıyoruz. Sevdiklerinizle birlikte sıcak bir akşam yemeği, arkadaşlarınızla keyifli bir buluşma ya da ailenizle birlikte unutulmaz bir öğün için Kılıç Kanat sizi bekliyor. Izgara tavuk keyfinin adresi Kılıç Kanat, her zaman taze, her zaman leziz!
      </Text>
    </Box>
  );
};

export default AboutMobile;
