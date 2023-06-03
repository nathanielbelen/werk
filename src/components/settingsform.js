import { useState, useEffect } from 'react';
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Center,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Switch,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
  FormErrorMessage,
  Text
} from '@chakra-ui/react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import useAuthRedirect from '@/hooks/useAuthRedirect';

export default function SettingsForm() {
  useAuthRedirect('/login');
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const [URL, setURL] = useState('')
  const [publicBool, setPublicBool] = useState(false)

  const isError = URL === ''

  useEffect(() => {
    async function getSettings() {
      const { data, error } = await supabaseClient.from('user_details').select();
      // setApplications(data)
      setURL(data[0].username)
      setPublicBool(data[0].public)
    }
    user?.id && getSettings();
  }, [user])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting:', { URL, publicBool });
    async function submitSettings() {
      const { data, error } = await supabaseClient
        .from('user_details')
        .upsert({ user_id: user.id, username: URL, public: publicBool }, {
          onConflict: ['user_id']
        })
        .select()

      if (error) {
        console.log('errored!', error)
        return;
      }
      console.log('SENT!, RECEIVED', data)
    }
    submitSettings();
  };

  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        p={6}
        m="30px auto"
        as="form"
        minW="430px"
        maxW="615px"
        onSubmit={handleSubmit}
        flexGrow={0}>
        <Heading textAlign={'center'} fontWeight="normal" mb="2%">
          User Settings
        </Heading>
        <FormControl isInvalid={isError}>
          <Flex align="center" mb={"-5px"}>
            <Box pr={2}><Text whiteSpace={'nowrap'}>http://werk-5-app.vercel.app/</Text></Box>
            <Input id="user-url" placeholder="URL" value={URL} onChange={(e) => { setURL(e.target.value) }} />
          </Flex>
          <Center><FormErrorMessage>URL is required.</FormErrorMessage></Center>
        </FormControl>
        <FormControl display='flex' alignItems='center'>
          <FormLabel htmlFor='email-alerts' mt='5px'>
            Public profile
          </FormLabel>
          <Switch id='public' isChecked={publicBool} onChange={() => setPublicBool(!publicBool)} />
        </FormControl>
        <ButtonGroup mt="2%" w="100%">
          <Flex w="100%" justifyContent="center" align="center">
            <Button
              w="7rem"
              type="submit"
              colorScheme="teal"
              variant="outline">
              Save
            </Button>
          </Flex>
        </ButtonGroup>
      </Box>

    </>
  );
}