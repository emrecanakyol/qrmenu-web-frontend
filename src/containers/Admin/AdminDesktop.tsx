"use client";
import { API_URL } from "@/api/constants";
import { CloseIcon } from "@chakra-ui/icons";
import { Box, Flex, Text, Input, Button, FormControl, FormLabel, Image, Select, Heading, VStack, IconButton, useToast, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@chakra-ui/react";
import { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";

const AdminDesktop: React.FC = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryPhoto, setCategoryPhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<{ id: number, name: string }[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number | string>("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [sliderPhoto, setSliderPhoto] = useState<File | null>(null);
  const [sliderPreviewUrl, setSliderPreviewUrl] = useState<string | null>(null);
  const [photoSliderPreviewUrl, setPhotoSliderPreviewUrl] = useState<string | null>(null);
  const [sliderId, setSliderId] = useState<number | null>(null);
  const [activeMenu, setActiveMenu] = useState<string>("categories");
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [editingCategoryName, setEditingCategoryName] = useState<string>("");
  const [editingCategoryPhoto, setEditingCategoryPhoto] = useState<File | null>(null);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [editingProductName, setEditingProductName] = useState<string>("");
  const [editingProductPrice, setEditingProductPrice] = useState<number | string>("");

  // Slider fotoğrafını yüklemek için handlePhotoChange fonksiyonu
  const handleSliderPhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSliderPhoto(file);
      setPhotoSliderPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Slider fotoğrafını eklemek için API'ye veri gönderme fonksiyonu
  const handleSliderSubmit = async () => {
    if (!sliderPhoto) {
      return;
    }

    const formData = new FormData();
    formData.append("slider_photo", sliderPhoto);

    try {
      const response = await fetch(`${API_URL}/add_slider.php`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      alert("Slider Fotoğrafı başarıyla değiştirildi.");
    } catch (error) {
      console.error("Slider eklenirken bir hata oluştu:", error);
    }
  };

  // Mevcut slider'ı veritabanından çekmek için fetchSlider fonksiyonu
  const fetchSlider = async () => {
    try {
      const response = await fetch(`${API_URL}/get_sliders.php`);
      const data = await response.json();
      if (data.status === "success" && data.sliders.length > 0) {
        const lastSlider = data.sliders[data.sliders.length - 1];
        setSliderId(lastSlider.id);
        setSliderPreviewUrl(lastSlider.photo);
      } else {
        setSliderId(null);
        setSliderPreviewUrl(null);
      }
    } catch (error) {
      console.error("Slider fotoğrafı yüklenemedi:", error);
    }
  };

  // Veritabanından kategorileri çekmek için useEffect kullanıyoruz
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/get_categories.php`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Kategoriler yüklenemedi:", error);
    }
  };

  useEffect(() => {
    fetchSlider();
    fetchCategories();
  }, []);

  // Seçilen kategoriye ait ürünleri yüklemek için
  const fetchProducts = async () => {
    if (selectedCategory !== null) {
      try {
        const response = await fetch(`${API_URL}/get_products.php?category_id=${selectedCategory}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Ürünler yüklenemedi:", error);
      }
    };
  }

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  //Ürün düzenleme
  const startEditingProduct = (product: any) => {
    setEditingProductId(product.id);
    setEditingProductName(product.product_name);
    setEditingProductPrice(product.product_price);
  };
  //Ürün düzenleme
  const updateProduct = async () => {
    if (editingProductId === null || !editingProductName || !editingProductPrice) {
      alert("Ürün adı ve fiyatı boş bırakılamaz.");
      return;
    }

    const formData = new URLSearchParams();
    formData.append("product_id", editingProductId.toString());
    formData.append("product_name", editingProductName);
    formData.append("product_price", editingProductPrice.toString());

    try {
      const response = await fetch(`${API_URL}/update_product.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData
      });
      const result = await response.json();
      if (result.status === "success") {
        alert("Ürün başarıyla güncellendi.");
        setEditingProductId(null);
        setEditingProductName("");
        setEditingProductPrice("");
        fetchProducts(); // ürün listesini yeniden çek
      } else {
        alert(`Hata: ${result.message}`);
      }
    } catch (error) {
      console.error("Ürün güncellenirken hata oluştu:", error);
    }
  };



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
      const response = await fetch(`${API_URL}/add_category.php`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.status === "success") {
        alert("Kategori başarıyla eklenmiştir.");
        setCategoryName("");
        setCategoryPhoto(null);
        setPreviewUrl(null);
        fetchCategories();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Kategori eklenirken hata oluştu:", error);
    }
  };

  //Kategori Düzenleme
  const startEditingCategory = (id: number, name: string) => {
    setEditingCategoryId(id);
    setEditingCategoryName(name);
  };
  //Kategori Düzenleme
  const updateCategory = async () => {
    if (editingCategoryId === null || editingCategoryName.trim() === "") {
      alert("Kategori adı boş olamaz.");
      return;
    }

    const formData = new FormData();
    formData.append("category_id", editingCategoryId.toString());
    formData.append("category_name", editingCategoryName);
    if (editingCategoryPhoto) {
      formData.append("category_photo", editingCategoryPhoto);
    }

    try {
      const response = await fetch(`${API_URL}/update_category.php`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.status === "success") {
        alert(result.message);
        setEditingCategoryId(null);
        setEditingCategoryName("");
        setEditingCategoryPhoto(null);
        fetchCategories();
      } else {
        alert(`Hata: ${result.message}`);
      }
    } catch (error) {
      console.error("Kategori güncellenirken hata oluştu:", error);
      alert("Bir hata oluştu.");
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
      const response = await fetch(`${API_URL}/add_product.php`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.status === "success") {
        alert("Ürün başarıyla eklenmiştir.");
        setProductName("");
        setProductPrice("");
        fetchProducts();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Ürün eklenirken hata oluştu:", error);
    }
  };

  // Silme işlemi için onay modal'ını açma
  const deleteCategory = (categoryId: number) => {
    setCategoryToDelete(categoryId);
    onOpen();
  };
  const deleteProduct = (productId: number) => {
    setProductToDelete(productId);
    onOpen();
  };

  const confirmDelete = async () => {
    if (categoryToDelete !== null) {
      try {
        const response = await fetch(`${API_URL}/delete_category.php`, {
          method: 'POST',
          body: new URLSearchParams({
            category_id: categoryToDelete.toString()
          })
        });
        const result = await response.json();
        if (result.status === 'success') {
          setCategories(categories.filter(category => category.id !== categoryToDelete));
        } else {
          alert(`Hata: ${result.message}`);
        }
      } catch (error) {
        console.error('Kategori silinirken hata oluştu:', error);
        alert('Bir hata oluştu.');
      }
    } else if (productToDelete !== null) {
      try {
        const response = await fetch(`${API_URL}/delete_product.php`, {
          method: 'POST',
          body: new URLSearchParams({
            product_id: productToDelete.toString() // Burada doğru parametreyi gönderdiğinizden emin olun
          })
        });
        const result = await response.json();

        if (result.status === 'success') {
          setProducts(products.filter(product => product.id !== productToDelete));
        } else {
          alert(`Hata: ${result.message}`);
        }
      } catch (error) {
        console.error('Ürün silinirken hata oluştu:', error);
        alert('Bir hata oluştu.');
      }
    }
    setCategoryToDelete(null);
    setProductToDelete(null);
    onClose();
  };

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Gerçekten çıkmak istiyor musunuz?");

    if (confirmLogout) {
      // Oturumu sonlandırıyoruz
      sessionStorage.removeItem('user_id');
      sessionStorage.removeItem('username');

      // Anasayfaya yönlendiriyoruz
      router.push("/");
    }
  };


  return (
    <Flex
      align={"center"}
      width={{ base: "100%", xl: "1440px" }}
      maxWidth={{ base: "100%", xl: "1440px" }}
      px={{ base: "16px", md: "72px", xl: "165px" }}
      margin="auto"
      alignItems={"flex-start"}
    >
      <Box
        bg="teal.500"
        as="nav"
        color="white"
        width="290px"
        minHeight="200vh"
        p={4}
        display={{ base: "none", md: "block" }}
      >
        <Heading fontSize="24px" mb={6} mt={10}>ADMIN PANELİ</Heading>
        <VStack align="start" spacing={4}>
          <Button
            variant="link"
            color="white"
            fontSize="18px"
            onClick={() => handleMenuClick("categories")}
          >
            Kategoriler
          </Button>
          <Button
            variant="link"
            color="white"
            fontSize="18px"
            onClick={() => handleMenuClick("products")}
          >
            Ürünler
          </Button>
          <Button
            variant="link"
            color="white"
            fontSize="18px"
            onClick={() => handleMenuClick("sliders")}
          >
            Slider
          </Button>
        </VStack>
        <VStack>
          <Button
            variant="link"
            color="white"
            fontSize="18px"
            onClick={handleLogout}
            mt={10}
          >
            Çıkış Yap
          </Button>
        </VStack>
      </Box>



      <Box
        borderRadius="md"
        backgroundColor="#fff"
        padding="54px"
        w="100%"
        minHeight="200vh"
      >
        {activeMenu === "categories" && (
          <>
            <Heading fontSize="24px" color="teal.500" mb={8}>
              YENİ KATEGORİ EKLE
            </Heading>
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
                  boxSize="100px"
                  objectFit="cover"
                  borderRadius="md"
                  mt={15}
                  mb={15}
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
            <Button colorScheme="blue" onClick={handleCategorySubmit} w={150}>
              Kategoriyi Ekle
            </Button>

            {categories.length > 0 && (
              <VStack align="start" spacing={4} mt={100}>
                <Heading fontSize="24px" color="teal.500">KATEGORİ LİSTESİ</Heading>
                {categories.map((category: any) => (
                  <Box
                    key={category.id}
                    p={4}
                    borderWidth={1}
                    borderRadius="md"
                    width="100%"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    bg="white"
                    boxShadow="sm"
                  >
                    {editingCategoryId === category.id ? (
                      <>
                        <Box mr={2}>
                          {category.photo && (
                            <Image
                              src={`${API_URL}/${category.photo}`}
                              alt="Mevcut Kategori Fotoğrafı"
                              boxSize="200px"
                              objectFit="cover"
                              borderRadius="md"
                              mb={2}
                            />
                          )}
                          <Input
                            type="file"
                            accept="image/*"
                            size="m"
                            mr={2}
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setEditingCategoryPhoto(e.target.files[0]);
                              }
                            }}
                          />
                        </Box>
                        <Input
                          value={editingCategoryName}
                          onChange={(e) => setEditingCategoryName(e.target.value)}
                          size="sm"
                          mr={2}
                        />
                        <Button
                          colorScheme="green"
                          onClick={updateCategory}
                          size="sm"
                          mr={2}
                          p={4}
                        >
                          Kaydet
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setEditingCategoryId(null)}>
                          İptal
                        </Button>
                      </>
                    ) : (
                      <>
                        <Box w={"100%"}>
                          {category.photo && (
                            <Image
                              src={`${API_URL}/${category.photo}`}
                              alt="Mevcut Kategori Fotoğrafı"
                              boxSize="50px"
                              objectFit="cover"
                              borderRadius="md"
                              mb={1}
                            />
                          )}
                          <Text fontSize="16px" color={"#000"}>{category.name}</Text>
                        </Box>

                        <Flex gap={2}>
                          <Button size="sm" colorScheme="yellow" onClick={() => startEditingCategory(category.id, category.name)}>
                            Düzenle
                          </Button>
                          <IconButton
                            icon={<CloseIcon />}
                            colorScheme="red"
                            aria-label="Kategori sil"
                            size="sm"
                            onClick={() => deleteCategory(category.id)}
                          />
                        </Flex>
                      </>
                    )}
                  </Box>
                ))}

              </VStack>
            )}
          </>
        )}


        {activeMenu === "products" && (
          <>
            <Heading fontSize="24px" color="teal.500" mb={8}>
              YENİ ÜRÜN EKLE
            </Heading>

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

            <Button colorScheme="blue" onClick={handleProductSubmit} w={150}>
              Ürünü Ekle
            </Button>


            <Heading fontSize={"24px"} mt={8} color="teal.500">ÜRÜN LİSTESİ</Heading>
            <Select
              placeholder="Kategori Seçin"
              value={selectedCategory ?? ''}
              onChange={(e) => setSelectedCategory(Number(e.target.value))}
              mt={4}
              bg="white"
              borderColor="gray.300"
              borderRadius="md"
              boxShadow="sm"
              _hover={{ borderColor: "teal.500" }}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
            {selectedCategory ? (
              <Box mt={4}>
                {products.length > 0 ? (
                  <VStack spacing={4}>
                    {products.map((product) => (
                      <Box
                        key={product.id}
                        p={4}
                        borderWidth={1}
                        borderRadius="md"
                        width="100%"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        bg="white"
                        boxShadow="sm"
                      >
                        {editingProductId === product.id ? (
                          <>
                            <Box>
                              <FormLabel display={"flex"}>Ürün Adı<Text color={"red"} fontSize={15}>*</Text></FormLabel>
                              <Input
                                value={editingProductName}
                                onChange={(e) => setEditingProductName(e.target.value)}
                                size="sm"
                                mr={2}
                                width="33%"
                              />
                            </Box>
                            <Box>
                              <FormLabel display={"flex"}>Ürün Fiyatı<Text color={"red"} fontSize={15}>*</Text></FormLabel>
                              <Input
                                type="number"
                                value={editingProductPrice}
                                onChange={(e) => setEditingProductPrice(e.target.value)}
                                size="sm"
                                mr={2}
                                width="33%"
                              />
                            </Box>
                            <Button size="sm" colorScheme="green" onClick={updateProduct} mr={2}>
                              Kaydet
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => setEditingProductId(null)}>
                              İptal
                            </Button>
                          </>
                        ) : (
                          <>
                            <Text fontSize="16px" width={"33%"}>{product.product_name}</Text>
                            <Text fontSize="16px" fontWeight="bold" width={"33%"}>{product.product_price} ₺</Text>
                            <Flex gap={2}>
                              <Button size="sm" colorScheme="yellow" onClick={() => startEditingProduct(product)}>
                                Düzenle
                              </Button>
                              <IconButton
                                icon={<CloseIcon />}
                                colorScheme="red"
                                aria-label="Ürün sil"
                                onClick={() => deleteProduct(product.id)}
                                size="sm"
                              />
                            </Flex>
                          </>
                        )}
                      </Box>
                    ))}
                  </VStack>
                ) : (
                  <Text mt={4}>Bu kategoriye ait ürün bulunmamaktadır.</Text>
                )}
              </Box>
            ) : (
              <Text mt={4}>Bir kategori seçin.</Text>
            )}

          </>
        )}


        {activeMenu === "sliders" && (
          <>
            <VStack spacing={8} align="start">

              <Box>
                <FormControl id="slider-photo" mb={4}>
                  <Heading fontSize={"24px"} mb={10} color="teal.500">SLIDER FOTOĞRAFI</Heading>

                  <Image src={photoSliderPreviewUrl ? photoSliderPreviewUrl : `${API_URL}/${sliderPreviewUrl}`} alt="Slider Preview" boxSize="150px" objectFit="cover" borderRadius="md" mb={4} />

                  <Input type="file" accept="image/*" p={1} onChange={handleSliderPhotoChange} />
                </FormControl>

                <Button colorScheme="teal" onClick={handleSliderSubmit}>
                  {sliderId ? "Slider Fotoğrafını Güncelle" : "Slider Fotoğrafı Ekle"}
                </Button>
              </Box>
            </VStack>
          </>
        )}

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Silme Onayı</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Bu işlemi geri alamazsınız. Silmek istediğinizden emin misiniz?</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={confirmDelete}>
                Sil
              </Button>
              <Button variant="ghost" onClick={onClose}>
                İptal
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

      </Box>
    </Flex>
  );
};

export default AdminDesktop;
