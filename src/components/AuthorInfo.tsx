import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../lib/apiConfig';

interface AuthorInfoProps {
  userId: string;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  city?: string;
}

const AuthorInfo: React.FC<AuthorInfoProps> = ({ userId }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/user_profiles/${userId}`);
        if (!res.ok) throw new Error('User not found');
        const data = await res.json();
        setProfile(data);
      } catch (err: any) {
        setError('User not found');
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchProfile();
  }, [userId]);

  if (loading) return <span className="text-muted-foreground">Loading...</span>;
  if (error || !profile) return <span className="text-muted-foreground">Unknown user</span>;

  return (
    <span>
      {profile.firstName} {profile.lastName}
      {profile.city ? <span className="text-xs text-muted-foreground"> &bull; {profile.city}</span> : null}
    </span>
  );
};

export default AuthorInfo;
