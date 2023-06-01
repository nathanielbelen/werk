import { Flex, Box, Text, useColorModeValue } from '@chakra-ui/react'

export default function Chips({ stage, cover_letter, resume_number }) {
  console.log(resume_number)
  return (<Flex gap={1} justify="flex-end" >
    {stage > 0 && <Chip>round {stage}</Chip>}
    {cover_letter && <Chip>sent cover letter</Chip>}
    <Chip>resume #{resume_number}</Chip>
  </Flex>)
}

function Chip({ children }) {
  return (<Box
    as="span"
    px="1"
    py="0"
    rounded="lg"
    bg={useColorModeValue('gray.200', 'gray.700')}
    display="inline-flex"
  >
    <Text fontSize='xs'>{children}</Text>
  </Box>)
}