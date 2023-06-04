import Navbar from "./navbar";
import Footer from "./footer";
import { Container, Flex } from '@chakra-ui/react';

export default function Layout({ children }) {
  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Navbar />
      <Container as={"main"} maxW="container.xl" flexGrow={1} flexDirection='column' sx={{ display: 'flex'}}>
        {children}
      </Container>
      <Footer />
    </Flex>
  );
}