import Navbar from "./navbar";
import Footer from "./footer";
import { Container, Flex } from '@chakra-ui/react';

export default function Layout({ children }) {
  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Navbar />
      <Container maxW="container.xl" flexGrow={1}>
        <main>{children}</main>
      </Container>
      <Footer />
    </Flex>
  );
}