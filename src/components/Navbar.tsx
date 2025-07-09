import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Earth, Compass, User, Menu, X } from 'lucide-react';
import { API_BASE_URL } from '../lib/apiConfig';

const Navbar: React.FC = () => {
  // Track login state in localStorage for persistence
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
      setIsMobileMenuOpen(false); // Close mobile menu after logout
    } catch (err: any) {
      setLogoutError(err.message || 'Logout failed');
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2 mr-6" onClick={closeMobileMenu}>
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
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
          {isLoggedIn && (
            <>
              <Button
                variant="outline"
                size="sm"
                className="bg-gem-400 hover:bg-gem-500 text-white mr-2 hidden sm:flex"
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
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <nav className="container max-w-7xl px-4 py-4 space-y-4">
            <Link 
              to="/" 
              className="block text-sm font-medium transition-colors hover:text-primary"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link 
              to="/browse" 
              className="block text-sm font-medium transition-colors hover:text-primary"
              onClick={closeMobileMenu}
            >
              Browse Gems
            </Link>
            
            {/* Mobile Auth Buttons */}
            <div className="pt-2 border-t space-y-2">
              {!isLoggedIn ? (
                <>
                  <Link to="/login" onClick={closeMobileMenu}>
                    <Button variant="outline" size="sm" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register" onClick={closeMobileMenu}>
                    <Button size="sm" className="w-full bg-gem-300 hover:bg-gem-400">
                      Sign Up
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-gem-400 hover:bg-gem-500 text-white"
                    onClick={() => {
                      navigate('/create');
                      closeMobileMenu();
                    }}
                  >
                    Create Gem
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive" 
                    className="w-full"
                    onClick={handleLogout}
                  >
                    Log Out
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
      
      {logoutError && (
        <div className="text-red-600 text-sm text-center mt-2">{logoutError}</div>
      )}
    </header>
  );
};

export default Navbar;
