import React, { Suspense, lazy, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../lib/apiConfig';
import { ContentLoading } from '@/components/ui/loading';
import SEOHelmet from '@/components/SEOHelmet';

// Lazy load components
const Hero = lazy(() => import('@/components/Hero'));
const FeaturedGems = lazy(() => import('@/components/FeaturedGems'));
const LatestGems = lazy(() => import('@/components/LatestGems'));
const Cities = lazy(() => import('@/components/CityCarousel'));
const CategoriesSection = lazy(() => import('@/components/CategoriesSection'));

const Index: React.FC = () => {
  const navigate = useNavigate();
  
  // Check if user is logged in
  const [isLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  return (
    <div className="min-h-screen">
      <SEOHelmet
        title="GemVoyage - Discover Hidden Gems & Secret Destinations"
        description="Join GemVoyage to discover hidden travel destinations, connect with passionate explorers, and uncover the world's best-kept secrets. Find unique places off the beaten path."
        keywords="hidden travel destinations, secret places, travel community, unique destinations, authentic travel, travel experiences, local favorites, hidden gems, travel exploration, off the beaten path"
        canonicalUrl={window.location.href}
        ogTitle="GemVoyage - Discover Hidden Gems Around the World"
        ogDescription="Join our community of travelers and explorers to discover hidden gems, secret spots, and unique destinations around the world."
        ogType="website"
        twitterTitle="GemVoyage - Discover Hidden Gems Around the World"
        twitterDescription="Join our community of travelers and explorers to discover hidden gems, secret spots, and unique destinations around the world."
      />
      <Suspense fallback={<ContentLoading height="h-96" />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<ContentLoading height="h-64" />}>
        <Cities />
      </Suspense>
      <Suspense fallback={<ContentLoading height="h-64" />}>
        <LatestGems />
      </Suspense>

      <Suspense fallback={<ContentLoading height="h-64" />}>
        <FeaturedGems />
      </Suspense>
      
      <Suspense fallback={<ContentLoading height="h-48" />}>
        <CategoriesSection />
      </Suspense>

      {/* Only show sign-up section if user is not logged in */}
      {!isLoggedIn && (
        <section className="py-16 bg-gradient-to-r from-gem-100 to-gem-200">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Community of Travelers</h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Share your own hidden gems, engage with fellow explorers, and create your personalized map of discoveries.
            </p>
            <button 
              className="px-6 py-3 bg-gem-300 hover:bg-gem-400 text-white rounded-lg font-medium transition-colors"
              onClick={() => navigate('/register')}
            >
              Sign Up Now
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;
