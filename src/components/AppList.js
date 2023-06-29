import {
  Box, Center, Heading, Accordion,
  Spinner, Flex, useToast, useDisclosure
} from '@chakra-ui/react';
import { useState, useEffect, useMemo, useRef } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Application from './Application'
import AddApplication from './AddApplication'
import ContentBox from './ContentBox';
import DeleteDialog from './DeleteDialog';
import convertToSafeClassName from '@/util/convertToSafeClassName';

export default function AppList({ userId, isUser }) {
  const toast = useToast();
  const supabaseClient = useSupabaseClient();
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const AppIdRef = useRef(null);


  useEffect(() => {
    async function getApplications() {
      setIsLoading(true);
      setError(null);

      try {
        let query = supabaseClient.from('applications').select().order('created_at', { ascending: false });
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
  }, []);

  const setAppIdRef = (id) => {
    AppIdRef.current = id;
  }

  const addApp = (app) => {
    setApplications([app, ...applications])
  }

  const deleteApp = async (id) => {
    console.log('attempting to delete id...', id);
    async function deleteApplicationFromDatabase() {
      return supabaseClient
        .from('applications')
        .delete({ count: 'estimated' })
        .eq('id', id);
    }

    try {
      let { count, error } = await deleteApplicationFromDatabase();
      if (error) throw new Error('Failed to delete application from the database.');

      // delete from application array
      console.log(`deleted ${count} row`)
      let newApplications = applications;
      newApplications = newApplications.filter((app) => app.id !== id)
      setApplications(newApplications)
      // display successful toast
    } catch (error) {
      // display fail toast with error
    }
  };

  const deleteCurrentAppByRef = () => {
    deleteApp(AppIdRef.current)
  }

  if (isLoading) {
    return <Flex flexGrow={1} alignItems='center' justifyContent='center'><Spinner /></Flex>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <ContentBox heading={'Applications'}>
        <ApplicationListSummary applications={applications} />
        <Box>
          {isUser && <AddApplication addApp={addApp} />}
          <Accordion allowMultiple size='xl' variant='custom' spacing={'5'}>
            {applications.map((app, idx) =>
              <Application isUser={isUser} data={app} key={`app_${convertToSafeClassName(app.company)}_${idx}`} toast={toast} onOpen={onOpen} setAppIdRef={setAppIdRef} />
            )}
          </Accordion>
        </Box>
      </ContentBox>
      <DeleteDialog isOpen={isOpen} cancelRef={cancelRef} onClose={onClose} deleteApp={deleteCurrentAppByRef} />
    </>
  )
}

function Highlight({ color, children }) {
  return (
    <Box as='span'
      px='2'
      py='0'
      rounded='xl'
      bg={color}
      color='black'
      display='inline-block'>
      {children}
    </Box>
  )
}

const ApplicationListSummary = ({ applications }) => {
  const statusTally = useMemo(() => {
    const statusCount = {
      '-1': 0,
      '0': 0,
      '1': 0,
    };

    for (const application of applications) {
      console.log('status', application.status)
      const { status } = application;
      statusCount[status.toString()]++;
    }

    return statusCount;
  }, [applications]);

  return (<Box pb={'5'}>
    <Center>
      <Heading
        fontWeight={600}
        fontSize={{ base: 'xl', sm: '3xl', md: '5xl' }}
        lineHeight={'110%'}
        align='center'
      >Showing <Highlight color='gray.100'>{applications.length}</Highlight> applications. <Highlight color='yellow.100'>{statusTally['0']}</Highlight> waiting on responses, <Highlight color='red.100'>{statusTally['-1']}</Highlight> rejections, and <Highlight color='green.100'>{statusTally['1']}</Highlight> in the interview stage.</Heading>
    </Center>
  </Box>)
}