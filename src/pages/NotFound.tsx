import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { API_BASE_URL } from "../lib/apiConfig";
import SEOHelmet from '@/components/SEOHelmet';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <SEOHelmet
        title="Page Not Found | GemVoyage"
        description="The page you're looking for doesn't exist. Return to GemVoyage to discover amazing hidden gems and travel destinations."
        keywords="404, page not found, error"
        canonicalUrl={window.location.href}
        ogTitle="Page Not Found | GemVoyage"
        ogDescription="The page you're looking for doesn't exist. Return to GemVoyage to discover amazing hidden gems and travel destinations."
        ogType="website"
        twitterTitle="Page Not Found | GemVoyage"
        twitterDescription="The page you're looking for doesn't exist. Return to GemVoyage to discover amazing hidden gems and travel destinations."
        noIndex={true}
      />
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
