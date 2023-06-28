import Navbar from "./Navbar";
import Footer from "./Footer";
import { Container, Flex, useColorModeValue } from '@chakra-ui/react';

export default function Layout({ children }) {
  return (
    <Flex flexDirection="column" minHeight="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <Navbar />
      <Container as={"main"} maxW="container.xl" flexGrow={1} flexDirection='column' sx={{ display: 'flex' }}>
        {children}
      </Container>
      <Footer />
    </Flex>
  );
}