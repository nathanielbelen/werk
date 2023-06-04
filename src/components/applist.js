import {
  Box, List, Center, Heading, Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Spinner, Flex
} from '@chakra-ui/react';
import { useState, useEffect, useMemo } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import Application from './application'
import { useRouter } from 'next/router';
import { SpinnerIcon } from '@chakra-ui/icons';

export default function AppList({ userId }) {
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getApplications() {
      setIsLoading(true);
      setError(null);

      try {
        let query = supabaseClient.from('applications').select();
        if (userId) query = query.eq('user_id', userId);
        const { data, error } = await query;

        if (error) {
          throw new Error('Failed to fetch applications');
        }

        setApplications(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    getApplications();
  }, [user]);

  const statusTally = useMemo(() => {
    const statusCount = {
      '-1': 0,
      '0': 0,
      '1': 0,
    };

    for (const application of applications) {
      const { status } = application;
      statusCount[status.toString()]++;
    }

    return statusCount;
  }, [applications]);

  if (isLoading) {
    return <Flex flexGrow={1} alignItems='center' justifyContent='center'><Spinner /></Flex>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Box p={5}>
        <Center>
          <Heading
            fontWeight={600}
            fontSize={{ base: 'xl', sm: '3xl', md: '5xl' }}
            lineHeight={'110%'}
            align="center"
          >Showing <Highlight color='gray.100'>{applications.length}</Highlight> applications. <Highlight color='yellow.100'>{statusTally['0']}</Highlight> waiting on responses, <Highlight color='red.100'>{statusTally['-1']}</Highlight> rejections, and <Highlight color='green.100'>{statusTally['1']}</Highlight> in the interview stage.</Heading>
        </Center>
      </Box>

      <Box>
        <Accordion allowMultiple size="xl" variant="custom" spacing={'5'}>
          {applications.map((app, idx) =>
            <Application data={app} key={'application-no-' + idx} />
          )}
        </Accordion>
      </Box>
    </>
  )
}

function Highlight({ color, children }) {
  return (
    <Box as="span"
      px="2"
      py="0"
      rounded="xl"
      bg={color}
      color='black'
      display="inline-block">
      {children}
    </Box>
  )
}