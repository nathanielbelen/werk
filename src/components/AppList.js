import {
  Box, Center, Heading, Accordion,
  Spinner, Flex, useToast, useDisclosure, Select
} from '@chakra-ui/react';
import { useState, useEffect, useMemo, useRef } from 'react';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import Application from './Application'
import AddApplication from './AddApplication'
import ContentBox from './ContentBox';
import DeleteDialog from './DeleteDialog';
import { addApplicationToDatabase, deleteApplicationFromDatabase, editApplicationInDatabase } from '@/util/queries';
import convertToSafeClassName from '@/util/convertToSafeClassName';
import sortArray from '@/util/sortApplications';

export default function AppList({ userId, isUser }) {
  const toast = useToast();
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const [applications, setApplications] = useState([]);
  const [sortBy, setSortBy] = useState(-1);
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

  useEffect(() => {
    if (sortBy > -1) {
      setApplications(sortArray(sortBy, applications))
    }
  }, [sortBy])


  const setAppIdRef = (id) => {
    AppIdRef.current = id;
  }

  const addApp = async (app) => {
    try {
      let { data, error } = await addApplicationToDatabase({ user_id: user.id, ...app }, supabaseClient);
      if (error) {
        console.log(error)
        throw new Error('Failed to add application to the database.')
      };
      toast({
        title: 'Successfully added application!',
        status: 'success',
        isClosable: true,
        duration: 5000,
      });
      setApplications([data[0], ...applications]);
    } catch (error) {
      toast({
        title: 'Encountered error adding application.',
        status: 'error',
        isClosable: true,
        duration: 5000,
      });
    }
  }

  const deleteApp = async (id) => {
    try {
      let { count, error } = await deleteApplicationFromDatabase(id, supabaseClient);
      if (error) throw new Error('Failed to delete application from the database.');
      let newApplications = [...applications];
      newApplications = newApplications.filter((app) => app.id !== id)
      setApplications(newApplications)
      toast({
        title: 'Successfully deleted application!',
        status: 'success',
        isClosable: true,
        duration: 5000,
      });
    } catch (error) {
      toast({
        title: 'Encountered error deleting application.',
        status: 'error',
        isClosable: true,
        duration: 5000,
      });
    }
  };

  const editApp = async (app, id) => {
    try {
      let { data, error } = await editApplicationInDatabase(app, id, supabaseClient);
      console.log('received data', data)
      if (error) {
        console.log(error)
      };
      let newApplications = [...applications];
      let applicationIndex = newApplications.findIndex(obj => obj.id === id);
      if (applicationIndex !== -1) {
        newApplications[applicationIndex] = data[0];
      }
      console.log('new app,', newApplications)
      setApplications(newApplications)
      toast({
        title: 'Successfully edited application!',
        status: 'success',
        isClosable: true,
        duration: 5000,
      });
    } catch (error) {
      console.log(error)
      toast({
        title: 'Encountered error editing application.',
        status: 'error',
        isClosable: true,
        duration: 5000,
      });
    }
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
        <Box py={2} display='flex' gap={2} alignItems={'center'}><Box>Sort by:</Box>
          <Select placeholder='Select option' w='250px' onChange={(e) => { setSortBy(Number(e.target.value)) }}>
            <option value='0'>date, descending</option>
            <option value='1'>date, ascending</option>
            <option value='2'>status, descending</option>
            <option value='3'>status, ascending</option>
          </Select>
        </Box>
        <Box>
          {isUser && <AddApplication addApp={addApp} />}
          <Accordion allowMultiple size='xl' variant='custom' spacing={'5'}>
            {applications.map((app, idx) =>
              <Application isUser={isUser} data={app} key={`app_${convertToSafeClassName(app.company)}_${idx}`} onOpen={onOpen} setAppIdRef={setAppIdRef} toast={toast} editApp={editApp} />
            )}
          </Accordion>
        </Box>
      </ContentBox>
      <DeleteDialog isOpen={isOpen} cancelRef={cancelRef} onClose={onClose} deleteApp={() => { deleteApp(AppIdRef.current) }} />
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