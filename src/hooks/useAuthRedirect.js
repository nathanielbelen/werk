import { useEffect, useState } from 'react';
import { useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router';

const useAuthRedirect = (redirectPath) => {
  const user = useUser();
  const router = useRouter();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    setIsAuthChecked(true);
  }, []);

  useEffect(() => {
    if (isAuthChecked && !user) {
      router.push(redirectPath);
    }
  }, [isAuthChecked, router, user, redirectPath]);

  return {user, isAuthChecked};
};

export default useAuthRedirect;