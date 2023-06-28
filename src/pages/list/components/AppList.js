import {
  Box, Center, Heading, Accordion,
  Spinner, Flex
} from '@chakra-ui/react';
import { useState, useEffect, useMemo } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import Application from './Application'
import AddApplication from './AddApplication'
import ContentBox from '@/components/ContentBox';

export default function AppList({ userId }) {
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const [Applications, setApplications] = useState([]);
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
          throw new Error('Failed to fetch Applications');
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

    for (const Application of Applications) {
      const { status } = Application;
      statusCount[status.toString()]++;
    }

    return statusCount;
  }, [Applications]);

  if (isLoading) {
    return <Flex flexGrow={1} alignItems='center' justifyContent='center'><Spinner /></Flex>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ContentBox heading={'Applications'}>
      <Box pb={'5'}>
        <Center>
          <Heading
            fontWeight={600}
            fontSize={{ base: 'xl', sm: '3xl', md: '5xl' }}
            lineHeight={'110%'}
            align="center"
          >Showing <Highlight color='gray.100'>{Applications.length}</Highlight> Applications. <Highlight color='yellow.100'>{statusTally['0']}</Highlight> waiting on responses, <Highlight color='red.100'>{statusTally['-1']}</Highlight> rejections, and <Highlight color='green.100'>{statusTally['1']}</Highlight> in the interview stage.</Heading>
        </Center>
      </Box>

      <Box>
        <AddApplication />
        <Accordion allowMultiple size="xl" variant="custom" spacing={'5'}>
          {Applications.map((app, idx) =>
            <Application data={app} key={'Application-no-' + idx} />
          )}
        </Accordion>
      </Box>
    </ContentBox>
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