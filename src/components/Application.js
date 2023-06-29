import {
  Box,
  Text,
  useColorModeValue,
  Flex,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon, Menu, Button, Badge,
  MenuButton,
  MenuList,
  MenuItem,
  Spinner, List, ListItem, Kbd, Tooltip
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useState, useEffect } from 'react';
import Chips from '@/components/Chips';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import ContentBox from './ContentBox';
import ApplicationForm from './ApplicationForm';
import parseISO8601 from '@/util/parseISO8601';

const stages = {
  0: { text: 'waiting on response' },
  1: { text: 'phone screen' },
  2: { text: 'round 1 interview' },
  3: { text: 'round 2 interview' },
  4: { text: 'round 3 interview' },
  5: { text: 'round 4 interview' }
}

const statuses = {
  '-2': { color: 'gray.100', text: 'rejected' },
  '-1': { color: 'gray.100', text: 'assumed rejected' },
  '0': { color: 'yellow.100', text: 'waiting on response' },
  '1': { color: 'green.100', text: 'interviewing' }
}

export default function Application({ data, isUser, onOpen, setAppIdRef, editApp }) {
  const [applicationHistory, setApplicationHistory] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const supabaseClient = useSupabaseClient();
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleAppDeleteClick = () => {
    setAppIdRef(id);
    onOpen();
  }

  const handleEdit = (app) => {
    editApp(app, data.id, supabaseClient)
      .then(() => { setEditMode(false) })
      .catch(() => { console.log(err) })
  }

  const handleAccordionClick = () => {
    if (!isButtonClicked) {
      setIsButtonClicked(true);
      async function getApplicationData() {
        try {
          let query = supabaseClient.from('application_changes').select().eq('application_id', id).order('changed_at', { ascending: false });
          const { data, error } = await query;
          if (error) {
            throw new Error('Failed to fetch application data');
          }
          setApplicationHistory(data);
        } catch (error) {
          // setError(error);
        } finally {
          // setShouldLoad(false);
        }
      }
      if (applicationHistory === null) getApplicationData();
    }
  };

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

  return (
    <AccordionItem
      borderRadius='lg'
      bg={useColorModeValue('gray.50', 'blackAlpha.100')}
      width='100%'
      textAlign='left'
      overflow='hidden'
      shadow='xs'
      borderStyle='none'
      marginBottom='4'
    >
      <AccordionButton p={0}
        sx={{
          '&:hover': {
            bg: 'none',
          },
        }}
        onClick={handleAccordionClick}
      >
        <Box display='flex' w={'100%'} alignItems='stretch'>
          <Box bg={statuses[status].color} width={12} />
          <Flex justify='space-between' flex={1} my={5} mx={3} gap={3}>
            <Flex direction='column' align='start' gap={1} flex='1'>
              <Box align='start'>
                <Text fontSize='xl'>
                  <b>{company}</b>
                </Text>
                <Text as='span' fontSize='lg' mr={1}>
                  {position}
                </Text>
                {subtitle && <Text as='span' fontSize='xs' color='gray.400'>({subtitle})</Text>}
              </Box>
              <Box align='start'>
                <Text color='gray.400' fontSize='xs'>
                  {location}
                </Text>
                <Text
                  as='span'
                  color='gray.400'
                  fontSize='xs'
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
            <Flex flexDirection='column' justifyContent='center' gap={1}>
              <StatusText status={status} stage={stage} />
              <Chips application={data} />
            </Flex>
            <AccordionIcon alignSelf={'center'} />
          </Flex>
        </Box>
      </AccordionButton>
      <AccordionPanel pb={4}>
        {!editMode && <Flex h={'auto'} flexDirection='column'>
          <Flex flexGrow={1} mb={2}>
            <ContentBox width={'50%'} heading='History' headingSize={'xs'}>
              {applicationHistory === null ? <Spinner /> : <HistoryList list={applicationHistory} createdAt={data.created_at} />}
            </ContentBox>
            <ContentBox width={'50%'} heading='Notes' headingSize={'xs'} whiteSpace={'pre-wrap'}>{notes}</ContentBox>
          </Flex>
          {isUser && <Menu>
            <MenuButton w='150px' as={Button} rightIcon={<ChevronDownIcon />} alignSelf={'flex-end'}>Actions</MenuButton>
            <MenuList>
              <MenuItem onClick={() => { setEditMode(!editMode) }}>Edit</MenuItem>
              <MenuItem onClick={handleAppDeleteClick}>Delete</MenuItem>
            </MenuList>
          </Menu>}
        </Flex>}
        {editMode && <ContentBox heading='Edit Application'><ApplicationForm application={data} submit={handleEdit} cancel={() => { setEditMode(false) }} /></ContentBox>}
      </AccordionPanel>
    </AccordionItem>
  )
}

function StatusText({ status, stage }) {
  return (
    <Flex justifyContent='flex-end'>
      <Text color='gray.400' fontSize='xs'>
        {status === 1 ? stages[stage].text : statuses[status].text}
      </Text>
    </Flex>
  )
}

function AccordionContent({ isLoading, error }) {
  return <Note text={'# Marked in browser\n\nRendered by **marked**.'} />

  if (isLoading) {
    return <Flex flexGrow={1} alignItems='center' justifyContent='center'><Spinner /></Flex>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

}

const Note = ({ text }) => {
  const parsedHTML = marked.parse(text, { mangle: false, headerIds: false });
  const sanitizedHTML = DOMPurify.sanitize(parsedHTML);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
};

const HistoryList = ({ list, createdAt }) => {

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
  };

  const timeCreated = new Date(`${createdAt}Z`)

  return (
    <List>
      {list.map((item, idx) => {
        let date = new Date(item.changed_at)
        let fromValue, toValue;

        if (item.column_name === 'status') {
          fromValue = statuses[item.old_value].text;
          toValue = statuses[item.new_value].text;
        } else if (item.column_name === 'stage') {
          fromValue = stages[item.old_value].text;
          toValue = stages[item.new_value].text;
        }
        console.log(item, 'item')
        return (
          <ListItem key={`${idx}_${item.id}`}>
            <Tooltip label={date.toLocaleTimeString(undefined, options)}><Badge mr={1}>{parseISO8601(item.changed_at)}</Badge></Tooltip>
            <Text as={'span'} fontSize={'sm'}>
              <Kbd>{item.column_name}</Kbd> changed from <Kbd>{fromValue}</Kbd> to <Kbd>{toValue}</Kbd>.
            </Text>
          </ListItem>
        );
      })}
      <ListItem>
        <Tooltip label={timeCreated.toLocaleTimeString(undefined, options)}><Badge mr={1}>{parseISO8601(timeCreated)}</Badge></Tooltip>
        <Text as={'span'} fontSize={'sm'}>
          <Kbd>application submitted.</Kbd>
        </Text>
      </ListItem>
    </List>

  );
};