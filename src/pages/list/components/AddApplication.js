import {
  Box,
  Flex,
  Button,
  useColorModeValue
} from '@chakra-ui/react';
import AddApplicationForm from './AddApplicationForm'
import { useState } from 'react';
import { SmallAddIcon } from '@chakra-ui/icons'

export default function AddApplication() {
  // company, position, url, subtitle, notes, cover_letter, resume_number, location, stage, status, category
  const [adding, setAdding] = useState(false);
  const responsiveBg = useColorModeValue("gray.50", "blackAlpha.100")
  const responsiveColor = useColorModeValue('gray.800', 'white')
  const handleStop = () => {
    setAdding(false);
  }

  if (adding) {
    return (
      <Flex
        borderRadius="lg"
        minHeight="100px"
        flexDirection={'column'}
        shadow='xs'
        borderStyle="solid"
        borderColor='black'
        borderWidth='1px'
        marginBottom="4"
        alignItems={'center'}
        justifyContent={'center'}
        bg={responsiveBg}
        color={responsiveColor}
      >
        <Box width='100%' p={10} mt={4}>
          <AddApplicationForm handleStop={handleStop} />
        </Box>
      </Flex>
    )
  }

  return (<Flex
    as={Button}
    flexDirection={'column'}
    borderRadius="lg"
    width="100%"
    minHeight="100px"
    shadow='xs'
    borderStyle="none"
    marginBottom="4"
    alignItems={'center'}
    justifyContent={'center'}
    onClick={() => { setAdding(true); }}
  >
    <SmallAddIcon />
  </Flex>)
}