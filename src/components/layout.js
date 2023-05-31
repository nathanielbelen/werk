import Navbar from './navbar';
import Footer from './footer';
import { Box } from '@chakra-ui/react';

export default function Layout({ children }) {
  return (
    <Box minHeight='100vh'>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </Box>
  );
}