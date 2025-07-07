import React from 'react';
import Hero from '@/components/Hero';
import FeaturedGems from '@/components/FeaturedGems';
import CategoriesSection from '@/components/CategoriesSection';
import { Link } from 'lucide-react';
import { API_BASE_URL } from '../lib/apiConfig';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedGems />
      <CategoriesSection />

      <section className="py-16 bg-gradient-to-r from-gem-100 to-gem-200">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community of Travelers</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Share your own hidden gems, engage with fellow explorers, and create your personalized map of discoveries.
          </p>
          <button className="px-6 py-3 bg-gem-300 hover:bg-gem-400 text-white rounded-lg font-medium transition-colors">
            Sign Up Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Index;
