import { Flex, Box, Text, Badge, useColorModeValue } from '@chakra-ui/react'

const stages = {
  0: { text: 'waiting on response' },
  1: { text: 'phone screen' },
  2: { text: 'round 1 interview' },
  3: { text: 'round 2 interview' },
  4: { text: 'round 3 interview' },
  5: { text: 'round 4 interview' }
}

export default function Chips({ application: { cover_letter, public: isPublic, resume_number, stage, status } }) {

  return (
    <Flex gap={1} justify='flex-end' >
      {(stage > 0) && <StyledBadge colorScheme='orange'>{stages[stage].text}</StyledBadge>}
      {cover_letter && <StyledBadge colorScheme='green'>sent cover letter</StyledBadge>}
      <StyledBadge colorScheme='purple'>{`resume #${resume_number}`}</StyledBadge>
      <StyledBadge>{isPublic ? 'public' : 'private'}</StyledBadge>
    </Flex>
  )
}

function StyledBadge({ colorScheme, children }) {
  return (
    <Badge colorScheme={colorScheme} textTransform={'lowercase'}>{children}</Badge>
  )
}