import { useEffect } from 'react';

const AdsRedirect: React.FC = () => {
  useEffect(() => {
    // Redirect to the ads.txt URL
    window.location.replace('https://srv.adstxtmanager.com/19390/gemvoyage.net');
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-lg font-semibold mb-2">Redirecting...</h2>
        <p className="text-gray-600">
          If you are not redirected automatically, 
          <a 
            href="https://srv.adstxtmanager.com/19390/gemvoyage.net"
            className="text-blue-600 hover:text-blue-800 underline ml-1"
          >
            click here
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdsRedirect;
