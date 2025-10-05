import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout.tsx';
import Input from '../components/ui/Input.tsx';
import { API_BASE_URL } from '../lib/apiConfig';
import { supabase } from '../services/supabaseClient'; // ✅ import Supabase client

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // 🧩 Your existing email/password login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        const errorMessage = JSON.parse(errorText).msg;
        setError(errorMessage);
        if (errorMessage === 'Email not confirmed') {
          window.location.href = '/email-confirmation';
        }
        return;
      }

      const data = await response.json();
      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('userId', data.user.id);
      }
      localStorage.setItem('isLoggedIn', 'true');

      // check if user profile exists
      const profileRes = await fetch(
        `${API_BASE_URL}/user_profiles/${encodeURIComponent(localStorage.getItem('userId') || '')}`
      );
      if (profileRes.ok) navigate('/');
      else navigate('/complete-profile');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  // 🌐 Google Sign-In with Supabase
  const handleGoogleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://gemvoyage.net/auth/callback', // ✅ must match your Supabase redirect URL
      },
    });
    if (error) {
      console.error('Google sign-in error:', error.message);
      setError('Failed to sign in with Google.');
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>

        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mb-4"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mb-4"
          />
          <button
            type="submit"
            className="py-2 px-4 bg-primary text-white font-bold w-full rounded hover:bg-primary-dark"
          >
            Login
          </button>

          {error && (
            <div className="text-red-600 text-sm mt-2 text-center">{error}</div>
          )}
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* 🌐 Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-2 w-full py-2 px-4 border border-gray-300 rounded hover:bg-gray-50"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google logo"
            className="w-5 h-5"
          />
          <span className="font-medium text-gray-700">Sign in with Google</span>
        </button>

        <p className="mt-4 text-center">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </Layout>
  );
}
