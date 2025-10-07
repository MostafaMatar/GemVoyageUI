import { useState } from 'react';
import { API_BASE_URL } from '../lib/apiConfig';
import { useToast } from '@/hooks/use-toast';
import SEOHelmet from '@/components/SEOHelmet';

export default function EmailConfirmation() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const email = localStorage.getItem('pending_verification_email');
  const handleResend = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/resend-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        toast({ title: 'Error', description: JSON.parse(errorText).msg || 'Failed to resend verification email.', variant: 'destructive' });
      } else {
        toast({ title: 'Success', description: 'Verification email resent! Please check your inbox.', variant: 'default' });
      }
    } catch (err: any) {
      toast({ title: 'Error', description: err.message || 'Failed to resend verification email.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 text-center">
      <SEOHelmet
        title="Verify Your Email | GemVoyage"
        description="Complete your GemVoyage account setup by verifying your email address."
        canonicalUrl={window.location.href}
        noIndex={true}
      />
      <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
      <p className="mb-4">We have sent a verification email to <span className="font-semibold">{email}</span>. Please check your inbox and verify your email before you can start using the app.</p>
      <button
        onClick={handleResend}
        className="py-2 px-4 bg-primary text-white font-bold rounded hover:bg-primary-dark"
        disabled={loading}
      >
        {loading ? 'Resending...' : 'Resend Verification Email'}
      </button>
    </div>
  );
}
