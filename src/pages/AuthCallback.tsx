import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import { API_BASE_URL } from '../lib/apiConfig';
import SEOHelmet from '@/components/SEOHelmet';


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

        const profileRes = await fetch(`${API_BASE_URL}/user_profiles/${encodeURIComponent(userId || '')}`);
        if (profileRes.ok) navigate('/');
        else navigate('/complete-profile');
      } else {
        navigate('/login');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div>
      <SEOHelmet
        title="Authenticating... | GemVoyage"
        description="Processing authentication callback for GemVoyage account access."
        canonicalUrl={window.location.href}
        noIndex={true}
      />
      <p>Authenticating...</p>
    </div>
  );
}
