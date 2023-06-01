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
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
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
          <Box><Link as={NextLink} href={'/'}><Text as="b" fontSize="xl">werk</Text></Link></Box>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              {(user) ? (<Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <Center>
                    <p>Username</p>
                  </Center>
                  <MenuDivider />
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem><div onClick={() => supabaseClient.auth.signOut()}>Sign out</div></MenuItem>
                </MenuList>
              </Menu>) : <Center><Link as={NextLink} href='/login'>Sign in</Link></Center>}
            </Stack>
          </Flex>
        </Flex>
        </Container>
      </Box>
  );
}