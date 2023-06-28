import { Box, Heading, useColorModeValue } from '@chakra-ui/react'

export default function ContentBox({ children, heading }) {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      color={useColorModeValue('gray.800', 'white')}
      rounded={'lg'} p={'5'} m={'2'}>
      <Heading color={useColorModeValue('gray.500', 'gray.300')} size='1xl' pb='2'>{heading?.toUpperCase()}</Heading>
      <Box>{children}</Box>
    </Box>
  )
}