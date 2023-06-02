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

export default function SettingsForm() {

  const [URL, setURL] = useState('')
  const [puublic, setPuublic] = useState(false)

  const isError = URL === ''

  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form">
        <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
          User Settings
        </Heading>
        <FormControl width={'auto'} isInvalid={isError}>
          <Flex align="center" mb={"-5px"}>
            <Box pr={2}><Text whiteSpace={'nowrap'}>http://werk-5-app.vercel.app/</Text></Box>
            <Input id="user-url" placeholder="URL" />
          </Flex>
          <Center><FormErrorMessage>URL is required.</FormErrorMessage></Center>
        </FormControl>
        <FormControl display='flex' alignItems='center'>
          <FormLabel htmlFor='email-alerts' mt='5px'>
            Expose applications to public?
          </FormLabel>
          <Switch id='email-alerts' />
        </FormControl>
        <ButtonGroup mt="2%" w="100%">
          <Flex w="100%" justifyContent="center" align="center">
            <Button
              w="7rem"
              onClick={() => {
              }}
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