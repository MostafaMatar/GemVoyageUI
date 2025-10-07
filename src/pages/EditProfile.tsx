import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { API_BASE_URL } from '../lib/apiConfig';
import { useToast } from '@/hooks/use-toast';
import SEOHelmet from '@/components/SEOHelmet';

interface ProfileData {
  firstName: string;
  lastName: string;
  city: string;
  bio: string;
}

export default function EditProfile() {
  const [profile, setProfile] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    city: '',
    bio: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const isLoggedIn = (localStorage.getItem('isLoggedIn') === 'true' && localStorage.getItem('access_token') !== null && localStorage.getItem('userId') !== null);
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast({ title: 'Error', description: 'User ID not found.', variant: 'destructive' });
      setFetching(false);
      return;
    }
    fetch(`${API_BASE_URL}/user_profiles/${userId}`)
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to fetch user profile');
        return res.json();
      })
      .then((data) => {
        setProfile({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          city: data.city || '',
          bio: data.bio || '',
        });
        setError(null);
      })
      .catch(() => {
        toast({ title: 'Error', description: 'Failed to fetch user profile.', variant: 'destructive' });
        setError('Failed to fetch user profile.');
      })
      .finally(() => setFetching(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/user_profiles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });
      if (!res.ok) {
        const text = await res.text();
        toast({ title: 'Error', description: 'Failed to update profile: ' + text, variant: 'destructive' });
        setError('Failed to update profile: ' + text);
      } else {
        toast({ title: 'Success', description: 'Profile updated successfully!', variant: 'default' });
        setSuccess('Profile updated successfully!');
        setTimeout(() => navigate('/'), 1200);
      }
    } catch (err: any) {
      toast({ title: 'Error', description: 'Failed to update profile.', variant: 'destructive' });
      setError('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl min-h-[60vh] mx-auto p-8 flex flex-col justify-center items-center">
      <SEOHelmet
        title="Edit Profile | GemVoyage"
        description="Update your GemVoyage profile to personalize your travel discovery experience and connect better with fellow explorers."
        keywords="edit profile, user settings, account management"
        canonicalUrl={window.location.href}
        ogTitle="Edit Your Profile | GemVoyage"
        ogDescription="Update your GemVoyage profile to personalize your travel discovery experience and connect better with fellow explorers."
        ogType="website"
        twitterTitle="Edit Your Profile | GemVoyage"
        twitterDescription="Update your GemVoyage profile to personalize your travel discovery experience and connect better with fellow explorers."
        noIndex={true}
      />
      <h2 className="text-3xl font-bold mb-8">Edit Your Profile</h2>
      {fetching ? (
        <div className="text-lg">Loading...</div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center" style={{ maxWidth: 500 }}>
          <label className="block mb-2 text-lg font-semibold w-full">First Name</label>
          <input
            type="text"
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
            className="w-full text-lg border-2 border-primary rounded-xl p-4 mb-4 shadow focus:ring-2 focus:ring-primary"
            required
          />
          <label className="block mb-2 text-lg font-semibold w-full">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={profile.lastName}
            onChange={handleChange}
            className="w-full text-lg border-2 border-primary rounded-xl p-4 mb-4 shadow focus:ring-2 focus:ring-primary"
            required
          />
          <label className="block mb-2 text-lg font-semibold w-full">City</label>
          <input
            type="text"
            name="city"
            value={profile.city}
            onChange={handleChange}
            className="w-full text-lg border-2 border-primary rounded-xl p-4 mb-4 shadow focus:ring-2 focus:ring-primary"
            required
          />
          <label className="block mb-2 text-lg font-semibold w-full">Bio</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            className="w-full min-h-[100px] text-lg border-2 border-primary rounded-xl p-4 mb-4 shadow focus:ring-2 focus:ring-primary"
            rows={4}
            required
          />
          {error && <div className="text-red-600 mb-4 text-lg font-medium w-full text-center">{error}</div>}
          {success && <div className="text-green-600 mb-4 text-lg font-medium w-full text-center">{success}</div>}
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-white text-lg rounded-xl hover:bg-primary-dark transition w-full"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </form>
      )}
    </div>
  );
}
