import Navbar from "./navbar";
import Footer from "./footer";
import { Container } from '@chakra-ui/react';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Container maxW="container.xl">
        <main>{children}</main>
      </Container>
      <Footer />
    </>
  );
}