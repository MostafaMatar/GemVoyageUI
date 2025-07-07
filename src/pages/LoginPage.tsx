import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout.tsx';
import Input from '../components/ui/Input.tsx';
import { API_BASE_URL } from '../lib/apiConfig';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = JSON.parse(errorText).msg;
        setError(errorMessage);
        if(errorMessage === 'Email not confirmed'){
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
      // Check if user profile exists for this email
      const profileRes = await fetch(`${API_BASE_URL}/user_profiles/${encodeURIComponent(localStorage.getItem('userId'))}`);
      if (profileRes.ok) {
        // Profile exists, not first login
        navigate('/');
      } else {
        // No profile found, first login
        navigate('/complete-profile');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  return (
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
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
        <p className="mt-4 text-center">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
  );
}