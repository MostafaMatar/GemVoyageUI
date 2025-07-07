import { useState, ChangeEvent } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { API_BASE_URL } from "../lib/apiConfig";
import { useToast } from "@/hooks/use-toast";

interface ProfileData {
  firstName: string;
  lastName: string;
  city: string;
  bio: string;
  profilePicture: File | null;
}

const questions = [
  { key: 'firstName', label: 'What is your first name?' },
  { key: 'lastName', label: 'What is your last name?' },
  { key: 'city', label: 'Which city do you live in?' },
  { key: 'bio', label: 'Tell us a bit about yourself.' },
];

export default function CompleteProfile({ onComplete }: { onComplete?: (data: ProfileData) => void }) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    city: '',
    bio: '',
    profilePicture: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [questionKey, setQuestionKey] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  const isLoggedIn = (localStorage.getItem('isLoggedIn') === 'true' && localStorage.getItem('access_token') !== null && localStorage.getItem('userId') !== null);
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfile((prev) => ({ ...prev, profilePicture: e.target.files![0] }));
    }
  };

  const handleNext = async () => {
    setError(null);
    setTransitioning(true);
    setTimeout(async () => {
      setTransitioning(false);
      if (step === questions.length - 1) {
        // Submit profile as JSON (no file upload)
        try {
          const res = await fetch(`${API_BASE_URL}/user_profiles`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              firstName: profile.firstName,
              lastName: profile.lastName,
              city: profile.city,
              bio: profile.bio,
              userId: localStorage.getItem('userId'),
            }),
          });
          if (!res.ok){
            toast({ title: 'Error', description: 'Failed to create profile', variant: 'destructive' });
            throw new Error('Failed to create profile');
          }
          onComplete?.(profile);
          toast({ title: 'Success', description: 'Profile created successfully!', variant: 'default' });
          navigate('/');
        } catch (err) {
          toast({ title: 'Error', description: 'Failed to create profile.', variant: 'destructive' });
          setError('Failed to create profile.');
        }
        return;
      }
      setStep((s) => s + 1);
      setQuestionKey((k) => k + 1);
    }, 250);
  };

  const handleBack = () => {
    setError(null);
    setTransitioning(true);
    setTimeout(() => {
      setTransitioning(false);
      setStep((s) => Math.max(0, s - 1));
      setQuestionKey((k) => k + 1);
    }, 250);
  };

  return (
    <div className="max-w-2xl min-h-[60vh] mx-auto p-8 flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold mb-8">Complete Your Profile</h2>
      <form
        onSubmit={e => { e.preventDefault(); handleNext(); }}
        className="w-full flex flex-col items-center"
        style={{ maxWidth: 500 }}
      >
        <div
          key={questionKey}
          className={`w-full transition-opacity duration-300 ${transitioning ? 'opacity-0' : 'opacity-100'}`}
        >
              <label className="block mb-4 text-2xl font-semibold text-center">{questions[step].label}</label>
              {step === 3 ? (
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  className="w-full min-h-[120px] text-lg border-2 border-primary rounded-xl p-4 mb-8 shadow focus:ring-2 focus:ring-primary"
                  rows={5}
                />
              ) : (
                <input
                  type="text"
                  name={questions[step].key}
                  value={profile[questions[step].key as keyof ProfileData] as string}
                  onChange={handleChange}
                  className="w-full text-lg border-2 border-primary rounded-xl p-4 mb-8 shadow focus:ring-2 focus:ring-primary"
                />
              )}
        </div>
        {error && <div className="text-red-600 mb-4 text-lg font-medium">{error}</div>}
        <div className="flex justify-between w-full mt-8">
          <button
            type="button"
            onClick={handleBack}
            className="px-6 py-3 bg-gray-200 text-lg rounded-xl hover:bg-gray-300 transition"
            disabled={step === 0 || transitioning}
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-white text-lg rounded-xl hover:bg-primary-dark transition"
            disabled={transitioning}
          >
            {step === questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
}
