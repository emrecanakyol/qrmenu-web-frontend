import { Center, Spinner } from "@chakra-ui/react";

export default function Home() {
  return (
    <Center height="100vh">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="#282d30"
        size="xl"
      />
    </Center>
  );
}