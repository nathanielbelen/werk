import { Auth } from '@supabase/auth-ui-react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Box, Center } from '@chakra-ui/react'
import { useRouter } from 'next/router';

const LoginPage = () => {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const router = useRouter();

  if (user) {
    router.push('/');
  }

  return (
    <Box>
      <Center h='800px'>
        <Box w='500px'>
          <Auth
            redirectTo="http://localhost:3000/"
            supabaseClient={supabaseClient}
            appearance={{ theme: ThemeSupa }}
            socialLayout="horizontal"
          />
        </Box>
      </Center>
    </Box>
  )
}

export default LoginPage