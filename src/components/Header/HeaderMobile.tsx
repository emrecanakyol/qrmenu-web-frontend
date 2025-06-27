"use client";
import { ChevronRightIcon, CloseIcon, SmallAddIcon } from "@chakra-ui/icons";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";

const HeaderMobile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      id="header"
      style={{
        backgroundColor: "#282d30",
        // backgroundColor: "#F6EEE4",
      }}
    >
      <Flex
        w="full"
        height={{ md: "72px", base: "52px" }}
        justifyContent={"space-between"}
        pr={"12px"}
        pl={"12px"}
      >
        <Flex mt={"40px"} justifyContent={"start"} alignItems={"center"}>
          <NextLink href="/">
            <Image
              alt="logo"
              src="/logo-white.png"
              w={{ md: "100px", base: "70px" }}
              h={{ md: "100px", base: "70px" }}
              borderRadius={"100px"}
              ml={"10px"}
              position={"absolute"}
              top={{ md: "0px", base: "0px" }}
            />
          </NextLink>
        </Flex>

        <Flex
          gridGap={{ md: "20px", base: "10px" }}
          alignItems={"center"}
          justifyContent={"end"}
        >
          <Image
            alt="logo"
            src="/menu-icon.png"
            w={{ md: "24px", base: "20px" }}
            h={{ md: "26px", base: "22px" }}
            onClick={onOpen}
          />
          <Drawer onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader
                display={"flex"}
                alignItems={"center"}
                borderBottomWidth="1px"
                justifyContent={"space-between"}
              >
                <Text
                  style={{
                    color: "#282d30",
                    fontWeight: "bold",
                    fontSize: "24px",
                  }}
                >
                  Menu
                </Text>
                <CloseIcon
                  color={"#282d30"}
                  onClick={onClose}
                  w={"16px"}
                  h={"16px"}
                />
              </DrawerHeader>
              <Box bg="#282d30" h={"2px"} />
              <DrawerBody>
                <NextLink href="/" onClick={onClose}>
                  <Flex align={"center"} mt={"30px"}>
                    <ChevronRightIcon
                      fontSize={"18px"}
                      color={"#282d30"}
                      mr={"5px"}
                    />
                    <Text
                      style={{
                        fontSize: "16px",
                        color: "#000",
                        fontWeight: "600",
                      }}
                    >
                      Qr Menü
                    </Text>
                  </Flex>
                </NextLink>
                <NextLink href="/about" onClick={onClose}>
                  <Flex align={"center"} mt={"10px"}>
                    <ChevronRightIcon
                      fontSize={"18px"}
                      color={"#282d30"}
                      mr={"5px"}
                    />
                    <Text
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#000",
                      }}
                    >
                      Hakkımızda
                    </Text>
                  </Flex>
                </NextLink>
                <NextLink href="/contact" onClick={onClose}>
                  <Flex align={"center"} mt={"10px"}>
                    <ChevronRightIcon
                      fontSize={"18px"}
                      color={"#282d30"}
                      mr={"5px"}
                    />
                    <Text
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#000",
                      }}
                    >
                      İletişim
                    </Text>
                  </Flex>
                </NextLink>
                <NextLink href="/admin" onClick={onClose}>
                  <Flex align={"center"} mt={"10px"}>
                    <ChevronRightIcon
                      fontSize={"18px"}
                      color={"#282d30"}
                      mr={"5px"}
                    />
                    <Text
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#000",
                      }}
                    >
                      Hesap
                    </Text>
                  </Flex>
                </NextLink>
              </DrawerBody>
              <DrawerFooter
                display={"flex"}
                alignItems={"center"}
                borderBottomWidth="1px"
                justifyContent={"space-between"}
              >
                <Box bg="#282d30" h={"2px"} />
                <Text
                  style={{
                    fontSize: "12px",
                    width: "100%",
                    textAlign: "center",
                    color: "#282d30"
                  }}
                >
                  © Crax Crispy Qr Menu
                </Text>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Flex>
      </Flex>
    </Box>
  );
};
export default HeaderMobile;
