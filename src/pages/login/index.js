import { Auth } from '@supabase/auth-ui-react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Box, Center, Heading, useColorMode } from '@chakra-ui/react'
import { useRouter } from 'next/router';

const LoginPage = () => {
  const supabaseClient = useSupabaseClient()
  const { colorMode } = useColorMode();
  const user = useUser()
  const router = useRouter();

  if (user) router.push('/');

  return (
    <Box>
      <Center h='800px'>
        <Box
          w="500px"
          mx="auto"
          p={4}
          rounded="md"
          boxShadow="md"
        >
          <Auth
            redirectTo="/"
            supabaseClient={supabaseClient}
            appearance={{ theme: ThemeSupa }}
            socialLayout="horizontal"
            theme={colorMode === 'light' ? 'default' : 'dark'}
          />
        </Box>
      </Center>
    </Box>
  )
}

export default LoginPage