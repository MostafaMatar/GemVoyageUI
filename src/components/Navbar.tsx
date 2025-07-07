import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Earth, Compass, User } from 'lucide-react';
import { API_BASE_URL } from '../lib/apiConfig';

const Navbar: React.FC = () => {
  // Track login state in localStorage for persistence
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLogoutError(null);
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': token } : {}),
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        if(errorText.includes('403') && errorText.includes('token is expired')) {
          // Handle token expiration
          localStorage.removeItem('access_token');
          localStorage.removeItem('userId');
          localStorage.setItem('isLoggedIn', 'false');
          setIsLoggedIn(false);
          setLogoutError('Your session has expired. Please log in again.');
          return;
        }
        setLogoutError(errorText);
        return;
      }
      localStorage.setItem('isLoggedIn', 'false');
      localStorage.removeItem('access_token');
      localStorage.removeItem('userId');
      setIsLoggedIn(false);
    } catch (err: any) {
      setLogoutError(err.message || 'Logout failed');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2 mr-6">
            <img 
              src="logo.png" 
              alt="GemVoyage Logo"
              className="h-8 w-8"
            />
            <span className="font-bold text-2xl bg-gradient-to-r from-gem-300 to-gem-500 bg-clip-text text-transparent">
              GemVoyage
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <Link 
              to="/" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Home
            </Link>
            <Link 
              to="/browse" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Browse Gems
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex">
            {!isLoggedIn ? (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="mr-2">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-gem-300 hover:bg-gem-400">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <Button size="sm" variant="destructive" onClick={handleLogout}>
                Log Out
              </Button>
            )}
          </div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Compass className="h-5 w-5" />
          </Button>
          {isLoggedIn && (
            <>
              <Button
                variant="outline"
                size="sm"
                className="bg-gem-400 hover:bg-gem-500 text-white mr-2"
                onClick={() => navigate('/create')}
              >
                Create Gem
              </Button>
              <Button variant="ghost" size="icon" onClick={() => navigate('/edit-profile')}>
                <User className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>
      </div>
      {logoutError && (
        <div className="text-red-600 text-sm text-center mt-2">{logoutError}</div>
      )}
    </header>
  );
};

export default Navbar;
