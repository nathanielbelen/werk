import {
  Text,
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Container,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, SettingsIcon } from '@chakra-ui/icons';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import NextLink from 'next/link'

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Container maxW={'container.xl'}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>
            <Link as={NextLink} href={'/'}>
              <Text as="b" fontWeight={500} fontSize="xx-large" letterSpacing="1px">werk</Text>
            </Link>
          </Box>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={3}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              {user && <><Button as={NextLink} href={"/settings"}>
                <SettingsIcon />
              </Button><Button onClick={() => { supabaseClient.auth.signOut() }}>Sign out</Button></>
              }
              {!user && <Button as={NextLink} href={"/login"}>
                Sign in
              </Button>}

            </Stack>
          </Flex>
        </Flex>
      </Container >
    </Box >
  );
}