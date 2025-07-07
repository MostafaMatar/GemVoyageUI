import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero.jpg')] bg-cover bg-center opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-gem-100/50 via-transparent to-gem-100/50"></div>
      </div>
      
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-gem-400 to-gem-500 bg-clip-text text-transparent mb-6">
            Discover Hidden Gems Around the World
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Join our community of travelers sharing secret spots, hidden treasures, 
            and extraordinary places off the beaten path.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gem-300 hover:bg-gem-400 gap-2">
              <Link to="/browse">
                Browse Gems
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-gem-300 text-gem-400 hover:bg-gem-100 hover:text-gem-500">
              <a href="/create">Share Your Find</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
