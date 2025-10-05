import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error('Error retrieving session:', error);
        navigate('/login');
        return;
      }

      if (session) {
        // ✅ Extract the correct values from the Supabase session
        const accessToken = session.access_token;
        const userId = session.user.id;

        // ✅ Store them in localStorage (like your password login)
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('userId', userId);
        localStorage.setItem('isLoggedIn', 'true');

        // Redirect to home (or profile setup)
        navigate('/complete-profile');
      } else {
        navigate('/login');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return <p>Authenticating...</p>;
}
