import {
  Text,
  Box,
  Flex,
  Link,
  Button,
  Container,
  useColorModeValue,
  Stack,
  useColorMode,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, SettingsIcon } from '@chakra-ui/icons';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import NextLink from 'next/link'

function NavigationLinks() {
  return (
    <Stack direction='row' spacing={3} alignItems={'center'}>
      <Link as={NextLink} href='/'>
        <Text as='b' fontWeight={500} fontSize='xx-large' letterSpacing='1px'>
          werk
        </Text>
      </Link>
      <Link as={NextLink} href='/list'>
        <Text fontWeight={300} fontSize='large' letterSpacing='1px'>
          List
        </Text>
      </Link>
      {/* <Link as={NextLink} href='/data'>
        <Text fontWeight={300} fontSize='large' letterSpacing='1px'>
          Data
        </Text>
      </Link> */}
    </Stack>
  );
}

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const supabase = useSupabaseClient();
  const user = useUser();

  const renderAuthButtons = () => {
    if (user) {
      return (
        <>
          <Button as={NextLink} href='/settings'>
            <SettingsIcon />
          </Button>
          <Button onClick={() => supabase.auth.signOut()}>Sign out</Button>
        </>
      );
    } else {
      return (
        <Button as={NextLink} href='/login'>
          Sign in
        </Button>
      );
    }
  };

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Container maxW='container.xl'>
        <Flex h={16} alignItems='center' justifyContent='space-between'>
          <Flex gap={3} alignItems='center'>
            <NavigationLinks />
          </Flex>
          <Flex alignItems='center'>
            <Stack direction='row' spacing={3}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              {renderAuthButtons()}
            </Stack>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}