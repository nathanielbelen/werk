import { Box, List, ListItem, Text, useColorModeValue } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
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

  return (
    <>
      <Box>
        <List size="xl" variant="custom" spacing={5}>
          {applications.map((app, idx) =>
            <Application data={app} key={'application-no-' + idx}/>
          )}
        </List>
      </Box>


      <Box><pre>{JSON.stringify(user, null, 2)}</pre>
      </Box>
    </>)
}