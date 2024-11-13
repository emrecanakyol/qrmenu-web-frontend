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
          Van Gogh Cafe & Fast Food, lezzetli ve kaliteli yiyecekleri bir araya
          getiren modern bir kafe ve fast food restoranıdır. Misafirlerine hem
          hızlı hem de keyifli bir yemek deneyimi sunan Van Gogh Cafe, zengin
          menüsüyle her damak zevkine hitap eder. Taze malzemelerle hazırlanan
          burgerler, sandviçler, salatalar ve atıştırmalıklar, günlük yaşamın
          koşuşturmacasında hem doyurucu hem de lezzetli bir alternatif sunar.
        </Text>
        <Text
          color="#000"
          fontSize="16px"
          fontWeight={"normal"}
          marginBottom={"50px"}
        >
          Van Gogh Cafe & Fast Food, sadece yiyecekleriyle değil, samimi ve
          rahat atmosferiyle de öne çıkar. Hem iç hem de dış mekan oturma
          seçenekleri sunan restoran, dostlarınızla buluşup keyifli vakit
          geçirebileceğiniz, çalışırken bir kahve molası verebileceğiniz veya
          sadece hızlı bir atıştırmalıkla gününüze enerji katabileceğiniz bir
          mekandır.
        </Text>
        <Text
          color="#000"
          fontSize="24px"
          fontWeight={"bold"}
          marginBottom={"50px"}
        >
          Vizyonumuz{" "}
        </Text>
        <Text
          color="#000"
          fontSize="16px"
          fontWeight={"normal"}
          marginBottom={"50px"}
          ml={"15px"}
        >
          Van Gogh Cafe & Fast Food olarak vizyonumuz, kaliteli, taze ve
          lezzetli yiyecekleri misafirlerimizle buluştururken, keyifli ve samimi
          bir atmosfer sunarak sektörde fark yaratan bir marka olmaktır.
          Amacımız, yalnızca hızlı servis sunan bir restoran olmak değil, aynı
          zamanda sanatı, lezzeti ve misafirperverliği bir araya getirerek her
          ziyaretin unutulmaz bir deneyime dönüştüğü bir yer haline gelmektir.
          Müşterilerimizin vazgeçilmez durağı olmayı hedefleyerek, hem yerel hem
          de global düzeyde tanınan bir marka olmayı amaçlıyoruz.
        </Text>
        <Text
          color="#000"
          fontSize="24px"
          fontWeight={"bold"}
          marginBottom={"50px"}
        >
          Misyonumuz{" "}
        </Text>
        <Text
          color="#000"
          fontSize="16px"
          fontWeight={"normal"}
          marginBottom={"50px"}
        >
          Misyonumuz, günlük koşuşturmaca içinde olan herkese taze, hızlı ve
          sağlıklı yiyecekler sunarak, hem fiziksel hem de ruhsal açıdan
          doyurucu bir yemek deneyimi yaşatmaktır. Misafirlerimize her zaman
          yüksek kalitede hizmet sunarak, güler yüzlü bir ortamda onları
          ağırlamak, damak zevklerine hitap eden zengin bir menü sunmak ve her
          yaştan insan için ulaşılabilir fiyatlarla lezzeti yaygınlaştırmak
          temel önceliğimizdir. Aynı zamanda, topluma ve çevreye duyarlı bir
          işletme olarak, sürdürülebilirlik ve etik değerlere bağlı kalmak
          misyonumuzun önemli bir parçasıdır.
        </Text>
        <Text
          color="#000"
          fontSize="16px"
          fontWeight={"normal"}
          marginBottom={"50px"}
        >
          Van Gogh Cafe & Fast Food olarak, misafirlerimize sadece hızlı ve
          lezzetli yiyecekler sunmanın ötesine geçerek, her ziyaretlerinde sıcak
          ve samimi bir deneyim yaşamalarını amaçlıyoruz. Sanat, lezzet ve
          kaliteli hizmeti bir araya getirerek, insanların keyifle vakit
          geçirebileceği bir mekan sunuyoruz. Vizyonumuz doğrultusunda, sektörde
          yenilikçi ve sürdürülebilir bir anlayışla ilerlemeye devam edecek,
          misafirlerimizin memnuniyeti için her zaman en iyisini sunmayı
          hedefleyeceğiz. Lezzet yolculuğumuzda sizleri de aramızda görmekten
          mutluluk duyarız.
        </Text>
      </Box>
    </Flex>
  );
};

export default AboutDesktop;
