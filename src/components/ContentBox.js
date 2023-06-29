import { Box, Heading, useColorModeValue } from '@chakra-ui/react'

export default function ContentBox({ children, heading, headingSize, width, whiteSpace }) {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      color={useColorModeValue('gray.800', 'white')}
      rounded={'lg'} p={'5'} m={'2'}
      width={width}>
      <Heading color={useColorModeValue('gray.500', 'gray.300')} size={headingSize || '1xl'} pb='2'>{heading?.toUpperCase()}</Heading>
      <Box whiteSpace={whiteSpace || 'normal'}>{children}</Box>
    </Box>
  )
}