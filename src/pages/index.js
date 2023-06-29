import Head from 'next/head';
import NextLink from 'next/link';
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Link,
  Icon,
  useColorModeValue,
  createIcon,
} from '@chakra-ui/react';

function HeroSection() {
  return (
    <Stack
      as={Box}
      textAlign={'center'}
      spacing={{ base: 8, md: 14 }}
      py={{ base: 20, md: 36 }}
    >
      <Heading
        fontWeight={600}
        fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
        lineHeight={'110%'}
      >
        Keep track of your applications. <br />
        <Text as={'span'} color={'green.400'}>
          See what works.
        </Text>
      </Heading>
      <Text color={'gray.500'}>
        You can manage all your job applications in one place. <s>Werk empowers you with insightful data visualizations, helping you understand what strategies work best. Discover the impact of your job search habits, and optimize your job search like never before.</s>
      </Text>
      <Stack
        direction={'column'}
        spacing={3}
        align={'center'}
        alignSelf={'center'}
        position={'relative'}
      >
        <Button
          as={NextLink}
          href={'/list'}
          colorScheme={'green'}
          bg={'green.400'}
          rounded={'full'}
          px={6}
          _hover={{
            bg: 'green.500'
          }}
        >
          Get Started
        </Button>
        {/* <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
          Learn more
        </Button> */}
      </Stack>
    </Stack>
  );
}

export default function Home() {
  return (
    <Container maxW={'3xl'}>
      <HeroSection />
    </Container>
  );
}