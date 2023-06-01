import { Box, Grid, ListItem, Text, useColorModeValue, Flex } from '@chakra-ui/react';
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

export default function Application({ data: { company, position, location, subtitle, id, cover_letter, created_at, notes, stage, url, status, resume_number } }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleItemClick = () => {
    setIsExpanded(!isExpanded)
  }

  return (<ListItem><Box as="button" onClick={handleItemClick} borderRadius="lg" bg={useColorModeValue("gray.50", "blackAlpha.100")} p={5} shadow="xs" width="100%" textAlign="left">
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box bg={statuses[status].color} borderRadius="lg" width={12} height={24} marginRight={4} />
      <Grid templateRows="auto 1fr" gap={1} flex="1">
        <Box>
          <Text fontSize="xl"><b>{company}</b></Text>
          <Text as="span" fontSize="lg">{position}</Text>
          {subtitle && <Text as="span" fontSize="xs" color="gray.400">({subtitle})</Text>}
        </Box>
        <Box>
          <Text color="gray.400" fontSize="xs">
            {location}
          </Text>
          <Text as="span" color="gray.400" fontSize="xs" noOfLines={1}>
            {new Date(created_at).toLocaleString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              day: '2-digit',
            })}{' '}
            <a href={url}>{url}</a>
          </Text>
        </Box>
      </Grid>
      <Grid templateRows="auto 1fr" gap={1}>
        <StatusText status={status} stage={stage} />
        <Chips stage={stage} cover_letter={cover_letter} resume_number={resume_number} />
      </Grid>

    </Box>
    {isExpanded && <Box>{notes}</Box>}
  </Box></ListItem>)
}

function StatusText({ status, stage }) {
  return (<Flex justifyContent="flex-end"><Text color="gray.400" fontSize="xs">
    {status === 1 ? stages[stage].text : statuses[status].text}
  </Text>
  </Flex>)
}