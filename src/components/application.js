import {
  Box, Grid, ListItem, Text, useColorModeValue, Flex, Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Chips from './chips';

const stages = {
  0: { text: 'waiting on response' },
  1: { text: 'phone screen' },
  2: { text: 'round 1 interview' },
  3: { text: 'round 2 interview' },
  4: { text: 'round 3 interview' },
  5: { text: 'round 4 interview' }
}

const statuses = {
  "-2": { color: 'gray.100', text: 'assumed rejected' },
  "-1": { color: 'gray.100', text: 'rejected' },
  "0": { color: 'yellow.100', text: 'waiting on response' },
  "1": { color: 'green.100', text: 'interviewing' }
}

export default function Application({ data }) {
  const {
    company,
    position,
    location,
    subtitle,
    id,
    cover_letter,
    created_at,
    notes,
    stage,
    url,
    status,
    resume_number,
    category
  } = data;
  const [isExpanded, setIsExpanded] = useState(false);

  const handleItemClick = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <AccordionItem
      borderRadius="lg"
      bg={useColorModeValue("gray.50", "blackAlpha.100")}
      width="100%"
      textAlign="left"
      overflow="hidden"
      shadow='xs'
      borderStyle="none"
      marginBottom="4"
    >
      <AccordionButton p={0}
        sx={{
          '&:hover': {
            bg: 'none',
          },
        }}
      >
        <Box display="flex" w={"100%"} alignItems="stretch">
          <Box bg={statuses[status].color} width={12} />
          <Flex justify="space-between" flex={1} my={5} mx={3}>
            <Flex direction="column" align="start" gap={1} flex="1">
              <Box align="start">
                <Text fontSize="xl">
                  <b>{company}</b>
                </Text>
                <Text as="span" fontSize="lg">
                  {position}
                </Text>
                {subtitle && <Text as="span" fontSize="xs" color="gray.400">({subtitle})</Text>}
              </Box>
              <Box align="start">
                <Text color="gray.400" fontSize="xs">
                  {location}
                </Text>
                <Text
                  as="span"
                  color="gray.400"
                  fontSize="xs"
                  noOfLines={1}
                >
                  {new Date(created_at).toLocaleString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    day: '2-digit',
                  })}
                  {' '}
                  <a href={url}>{url}</a>
                </Text>
              </Box>
            </Flex>
            <Flex flexDirection="column" justifyContent="center" gap={1}>
              <StatusText status={status} stage={stage} />
              <Chips
                stage={stage}
                cover_letter={cover_letter}
                resume_number={resume_number}
                category={category}
              />
            </Flex>
          </Flex>
        </Box>
      </AccordionButton>
      <AccordionPanel pb={4}>
        {notes}
      </AccordionPanel>
    </AccordionItem>
  )
}

function StatusText({ status, stage }) {
  return (
    <Flex justifyContent="flex-end">
      <Text color="gray.400" fontSize="xs">
        {status === 1 ? stages[stage].text : statuses[status].text}
      </Text>
    </Flex>
  )
}