import Navbar from "./navbar";
import Footer from "./footer";
import { Box, Container } from "@chakra-ui/react";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}