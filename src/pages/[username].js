import { useRouter } from 'next/router';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react';

export default function Page() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const [applications, setApplications] = useState();

  useEffect(() => {
    async function loadApplications() {
      console.log('loading apps')
      const { data } = await supabaseClient.from('applications').select('*')
      console.log(data)
      setApplications(data)
    }
    loadApplications();
  }, [])

  return <div><p>Post: {router.query.username}</p>
  <pre>{JSON.stringify(applications, null, 2)}</pre>
  <pre>{JSON.stringify(user, null, 2)}</pre>
  </div>;
}