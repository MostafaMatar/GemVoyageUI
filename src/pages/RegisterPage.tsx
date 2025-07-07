import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout.tsx';
import Input from '../components/ui/Input.tsx';
import { Checkbox } from '../components/ui/checkbox.tsx';
import { API_BASE_URL } from '../lib/apiConfig';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [acceptPrivacy, setAcceptPrivacy] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Basic validation
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!acceptPrivacy || !acceptTerms) {
            setError('You must accept both privacy policy and terms of service');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                setError(JSON.parse(errorText).msg || 'Registration failed');
                return;
            }

            const data = await response.json();
            if (data.access_token) {
                localStorage.setItem('access_token', data.access_token);
            }
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('pending_verification_email', email);
            navigate('/email-confirmation');
        } catch (err: any) {
            setError(err.message || 'Registration failed');
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create Account</h1>
            <form onSubmit={handleSubmit} className="space-y-4">

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

                <Input
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="mb-4"
                />

                <div className="flex items-start gap-3">
                    <Checkbox
                        id="privacy"
                        checked={acceptPrivacy}
                        onCheckedChange={(checked) => setAcceptPrivacy(checked as boolean)}
                        required
                    />
                    <label htmlFor="privacy" className="text-sm">
                        I accept the <a href="/privacy" className="underline">Privacy Policy</a>
                    </label>
                </div>

                <div className="flex items-start gap-3">
                    <Checkbox
                        id="terms"
                        checked={acceptTerms}
                        onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                        required
                    />
                    <label htmlFor="terms" className="text-sm">
                        I accept the <a href="/terms" className="underline">Terms of Service</a>
                    </label>
                </div>

                <button
                    type="submit"
                    className="py-2 px-4 bg-primary text-white font-bold w-full rounded hover:bg-primary-dark"
                >
                    Register
                </button>
                {error && (
                    <div className="text-red-600 text-sm mt-2 text-center">{error}</div>
                )}
            </form>

            <p className="mt-4 text-center text-sm">
                Already have an account? <Link to="/login" className="underline">Login here</Link>
            </p>
        </div>
    );
}
