import { Auth } from '@supabase/auth-ui-react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useEffect, useState } from 'react'
import { Box, Center } from '@chakra-ui/react'

const LoginPage = () => {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const [data, setData] = useState()

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from('applications').select('*')
      setData(data)
    }
    // only run query once user is logged in.
    if (user) loadData()
  }, [user])

  if (!user)
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

  return (
    <>
      <button onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
      <p>user:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <p>client-side data fetching with RLS</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}

export default LoginPage