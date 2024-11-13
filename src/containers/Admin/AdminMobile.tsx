// "use client";
// import { Box, Flex, Text } from "@chakra-ui/react";

// const AboutMobile = () => {
//   return (
//     <Box w="100%" pr={"12px"} pl={"12px"} bgColor={"#fff"}>

//     </Box>
//   );
// };

// export default AboutMobile;


"use client";
import { Box, Flex, Text, Input, Button, FormControl, FormLabel, Image, Select, useBreakpointValue } from "@chakra-ui/react";
import { useState, ChangeEvent, useEffect } from "react";

const AdminMobile: React.FC = () => {
  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryPhoto, setCategoryPhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ id: number, name: string }[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number | string>("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://beykozbalikcisi.com/get_categories.php");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Kategoriler yüklenemedi:", error);
      }
    };

    fetchCategories();
  }, []);

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCategoryPhoto(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCategorySubmit = async () => {
    if (!categoryName || !categoryPhoto) {
      alert("Kategori adı ve fotoğrafı girilmelidir.");
      return;
    }

    const formData = new FormData();
    formData.append("category_name", categoryName);
    formData.append("category_photo", categoryPhoto);

    try {
      const response = await fetch("https://beykozbalikcisi.com/add_category.php", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.status === "success") {
        alert("Kategori başarıyla eklendi!");
        setCategoryName("");
        setCategoryPhoto(null);
        setPreviewUrl(null);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Kategori eklenirken hata oluştu:", error);
    }
  };

  const handleProductSubmit = async () => {
    if (selectedCategoryId === null || !productName || !productPrice) {
      alert("Lütfen kategori, ürün adı ve fiyatını girin.");
      return;
    }

    const formData = new FormData();
    formData.append("category_id", selectedCategoryId.toString());
    formData.append("product_name", productName);
    formData.append("product_price", productPrice.toString());

    try {
      const response = await fetch("https://beykozbalikcisi.com/add_product.php", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.status === "success") {
        alert("Ürün başarıyla eklendi!");
        setProductName("");
        setProductPrice("");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Ürün eklenirken hata oluştu:", error);
    }
  };


  return (
    <Box w="100%" pr={"12px"} pl={"12px"} bgColor={"#fff"}>
      <Flex
        align="center"
        width="100%"
        // px={{ base: "16px", md: "72px", xl: "165px" }}
        margin="auto"
        marginTop="50px"
        marginBottom="50px"
      >
        <Box
          borderRadius="md"
          backgroundColor="#fff"
          padding="30px"
          w="100%"
          maxWidth="600px"
          boxShadow="md"
        >
          <Text fontSize="xl" mb="4" fontWeight="bold">
            Yeni Kategori Ekle
          </Text>
          <FormControl id="category-name" mb="4">
            <FormLabel display={"flex"}>Kategori Adı<Text color={"red"} fontSize={15}>*</Text></FormLabel>
            <Input
              placeholder="Kategori adını girin"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </FormControl>
          <FormControl id="category-photo" mb="4">
            <FormLabel display={"flex"}>Kategori Fotoğrafı<Text color={"red"} fontSize={15}>*</Text></FormLabel>
            {previewUrl && (
              <Image
                src={previewUrl}
                alt="Category Preview"
                boxSize="80px"
                objectFit="cover"
                borderRadius="md"
                mt={2}
                mb={4}
              />
            )}
            <Input
              id="category-photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              p={1}
            />
          </FormControl>
          <Button
            colorScheme="blue"
            onClick={handleCategorySubmit}
            width="100%"
            mt={4}
          >
            Kategoriyi Ekle
          </Button>

          <Text fontSize="xl" mt="50px" mb="4" fontWeight="bold">
            Yeni Ürün Ekle
          </Text>

          <FormControl id="select-category" mb="4">
            <FormLabel display={"flex"}>Kategori Seçin<Text color={"red"} fontSize={15}>*</Text></FormLabel>
            <Select
              placeholder="Bir kategori seçin"
              value={selectedCategoryId ?? ""}
              onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl id="product-name" mb="4">
            <FormLabel display={"flex"}>Ürün Adı<Text color={"red"} fontSize={15}>*</Text></FormLabel>
            <Input
              placeholder="Ürün adını girin"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </FormControl>

          <FormControl id="product-price" mb="4">
            <FormLabel display={"flex"}>Ürün Fiyatı<Text color={"red"} fontSize={15}>*</Text></FormLabel>
            <Input
              type="number"
              placeholder="Ürün fiyatını girin"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </FormControl>

          <Button
            colorScheme="green"
            onClick={handleProductSubmit}
            width="100%"
            mt={4}
          >
            Ürünü Ekle
          </Button>
        </Box>
      </Flex>
    </Box>

  );
};

export default AdminMobile;
