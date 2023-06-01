import { Box, List, ListItem, Text, useColorModeValue, Center, Heading } from '@chakra-ui/react';
import { useState, useEffect, useMemo } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import Application from './application'
import { useRouter } from 'next/router';
import { redirect } from 'next/dist/server/api-utils';

export default function AppList() {
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    async function getApplications() {
      const { data } = await supabaseClient.from('applications').select();
      setApplications(data)
    }
    getApplications();
  }, [])

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

  return (
    <><Box p={5}>
      <Center>
        <Heading lineHeight="tall" align="center">showing <Highlight color='gray.100'>{applications.length}</Highlight> applications. <Highlight color='yellow.100'>{statusTally['0']}</Highlight> waiting on response, <Highlight color='red.100'>{statusTally['-1']}</Highlight> rejections, and <Highlight color='green.100'>{statusTally['1']}</Highlight> in the interview stage.</Heading>
      </Center>
    </Box>

      <Box>
        <List size="xl" variant="custom" spacing={5}>
          {applications.map((app, idx) =>
            <Application data={app} key={'application-no-' + idx} />
          )}
        </List>
      </Box>
    </>)
}

function Highlight({ color, children }) {
  return (<Box as="span"
    px="2"
    py="0"
    rounded="xl"
    bg={color}
    color='black'
    display="inline-block">{children}</Box>)
}