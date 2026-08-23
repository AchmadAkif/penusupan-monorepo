import React, { useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAppDispatch } from '../../store/hooks';
import { setCredentials, clearCredentials } from '../../store/slices/authSlice';

export const AuthListener: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // 1. Check initial active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        dispatch(setCredentials({ user: session.user, session }));
      } else {
        dispatch(clearCredentials());
      }
    });

    // 2. Listen to real-time auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        dispatch(setCredentials({ user: session.user, session }));
      } else {
        dispatch(clearCredentials());
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch]);

  return <>{children}</>;
};
