"use client";
import { API_URL } from "@/api/constants";
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  useBreakpointValue,
  VStack,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

function DesktopHome() {
  const isXXL = useBreakpointValue({
    "2xl": false,
    xl: true,
    lg: true,
    md: true,
    base: true,
  });
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [categories, setCategories] = useState<any>([]);
  const [products, setProducts] = useState<any>([]);
  const [sliders, setSliders] = useState<any[]>([]);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await fetch(`${API_URL}/get_sliders.php`);
        const data = await response.json();
        if (data.status === "success") {
          setSliders(data.sliders.reverse());
        } else {
          console.error('Sliderlar yüklenemedi');
        }
      } catch (error) {
        console.error("Veri alınırken hata oluştu:", error);
      }
    };

    fetchSliders();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/get_categories.php`);
        const data = await response.json();
        setCategories(data);
        // İlk kategori seçili olarak gelsin
        if (data.length > 0) {
          setSelectedCategory(data[0]); // İlk kategoriyi seçiyoruz
        }
      } catch (error) {
        console.error('Veriler yüklenemedi:', error);
      }
    };
    getProducts();
  }, []);


  // Kategori seçildiğinde, o kategoriye ait ürünleri al
  useEffect(() => {
    if (selectedCategory) {
      const getProductsByCategory = async () => {
        try {
          const response = await fetch(
            `${API_URL}/get_products_by_category.php?category_id=${selectedCategory.id}`
          );
          const data = await response.json();
          if (data.status === "success") {
            setProducts(data.products);  // Ürünleri state'e ekle
          } else {
            setProducts([]);  // Eğer ürün yoksa boş liste
          }
        } catch (error) {
          console.error("Ürünler alınamadı:", error);
        }
      };
      getProductsByCategory();
    }
  }, [selectedCategory]);

  return (
    <>
      {sliders.length > 0 && (
        <Image
          key={sliders[0].id}
          src={`${API_URL}/${sliders[0]?.photo}`}
          alt="Slider"
          w="100%"
          h="700px"
          objectFit={"cover"}
        />
      )}
      <Flex
        align={"center"}
        width={{ base: "100%", xl: "1440px" }}
        maxWidth={{ base: "100%", xl: "1440px" }}
        px={{ base: "16px", md: "72px", xl: "165px" }}
        margin="auto"
        alignItems={"flex-start"}
        flexDirection={"column"}
      >
        {!isXXL && (
          <Image
            alt="slider"
            src="/sliderDesktop.webp"
            w={"100%"}
            h={"100%"}
            borderBottomLeftRadius={10}
            borderBottomRightRadius={10}
          />
        )}
      </Flex>

      <VStack
        mt={50}
        mb={50}
        direction="row"
        flexDirection={"row"}
        paddingLeft={!isXXL ? "725px" : "170px"}
        overflowY="auto"
        width={"100%"}
        sx={{
          "::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {categories?.map((item: any) => (
          <Flex
            key={item.name}
            flexDirection={"column"}
            align={"center"}
            minW={"200px"}
            minH={"272px"}
            backgroundColor={"#282D30"}
            borderRadius={10}
            p={3}
            w={"10%"}
            h={"20%"}
          >
            <Image
              alt="category-image"
              src={`${API_URL}/${item?.photo}`}
              w={"100%"}
              h={175}
              borderRadius={7}
              objectFit={"cover"}
            />
            <Button
              m={4}
              key={item.id}
              onClick={() => setSelectedCategory(item)}
              flexShrink={0}
              backgroundColor={"transparent"}
              borderWidth={1.4}
              borderColor={"#fff"}
              color="#fff"
              _hover={{
                borderColor: "#282D31",
                backgroundColor: "#282D31",
                color: "white",
              }}
              _active={{
                borderColor: "#282D31",
                backgroundColor: "#282D31",
                color: "white",
              }}
              _focus={{ boxShadow: "none" }}
            >
              {item?.name}
            </Button>
          </Flex>
        ))}
      </VStack>

      <Flex
        align={"center"}
        width={{ base: "100%", xl: "1440px" }}
        maxWidth={{ base: "100%", xl: "1440px" }}
        px={{ base: "16px", md: "72px", xl: "165px" }}
        margin="auto"
        alignItems={"flex-start"}
        flexDirection={"column"}
        mb={50}
      >
        {selectedCategory && (
          <>
            <Flex
              width={"100%"}
              p={4}
              fontSize={"30px"}
              fontWeight={"600"}
              color={"#282d31"}
            >
              <Text fontSize={"30px"} fontWeight={"700"} color={"#282d31"}>
                {selectedCategory?.name}
              </Text>
            </Flex>
            <SimpleGrid columns={1} spacing={5} width={"100%"} p={4}>
              {products?.map((item: any) => (
                <>
                  <Flex key={item.name} justifyContent={"space-between"}>
                    <Text
                      width={"80%"}
                      fontSize={"18px"}
                      fontWeight={"500"}
                      color={"#282d31"}
                    >
                      {item.product_name}
                    </Text>
                    <Text
                      width={"20%"}
                      textAlign={"right"}
                      fontSize={"18px"}
                      fontWeight={"500"}
                      color={"#282d31"}
                    >
                      {parseFloat(item.product_price)} ₺
                    </Text>
                  </Flex>
                  <Box h={0.5} w={"100%"} backgroundColor={"#D3D3D3"} />
                </>
              ))}
            </SimpleGrid>
          </>
        )}
      </Flex>
    </>
  );
}

export default DesktopHome;
