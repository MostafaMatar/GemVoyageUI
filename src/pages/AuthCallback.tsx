import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // You can store user info or token here if needed
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/');
      } else {
        navigate('/login');
      }
    };
    checkSession();
  }, []);

  return <p>Authenticating...</p>;
}
