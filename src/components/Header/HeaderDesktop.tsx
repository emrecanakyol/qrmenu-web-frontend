"use client";
import React from "react";
import { Box, Text, Image, Flex, Menu, MenuButton } from "@chakra-ui/react";
import NextLink from "next/link";

interface Props {
  router: any;
}

function HeaderDesktop({ router }: Props) {
  return (
    <Box
      id="header"
      style={{
        height: "130px",
        backgroundColor: "#282d30",
        // backgroundColor: "#F6EEE4",
      }}
    >
      <Flex position="absolute" zIndex="1" w="full">
        <Flex
          align={"center"}
          justifyContent={"space-evenly"}
          width={{ base: "100%", xl: "1440px" }}
          py="28px"
          px={{ base: "16px", md: "72px", xl: "165px" }}
          margin="auto"
        >
          <Flex w={"30%"} justifyContent={"start"} alignItems={"center"}>
            <NextLink href="/">
              <Image
                alt="logo-white"
                src="/logo-white.png"
                w={"150px"}
                h={"150px"}
                borderRadius={"100px"}
              />
            </NextLink>
          </Flex>

          <Flex
            gridGap={"50px"}
            justifyContent={"flex-end"}
            alignItems={"center"}
            w={"70%"}
          >
            <Menu>
              <MenuButton
                color={"#fff"}
                fontSize={"18px"}
                fontWeight={"600"}
                onClick={() => router.push("/")}
              >
                <Text w={"120px"}>Qr Menü</Text>
              </MenuButton>
              <MenuButton
                color={"#fff"}
                fontSize={"18px"}
                fontWeight={"600"}
                onClick={() => router.push("/about")}
              >
                Hakkımızda
              </MenuButton>
              <MenuButton
                color={"#fff"}
                fontSize={"18px"}
                fontWeight={"600"}
                onClick={() => router.push("/contact")}
              >
                İletişim
              </MenuButton>
            </Menu>
            {/* <NextLink href={"/account"}> */}
            <Image
              alt="account"
              src="/account-white.png"
              w={"20px"}
              h={"20px"}
            />
            {/* </NextLink> */}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default HeaderDesktop;
