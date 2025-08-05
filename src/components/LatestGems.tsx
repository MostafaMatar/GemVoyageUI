import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Gem } from '@/types';
import { API_BASE_URL } from '../lib/apiConfig';
import { GemCardSkeleton } from '@/components/ui/loading';

// Lazy load GemCard
const GemCard = lazy(() => import('./GemCard'));

const LatestGems: React.FC = () => {
  const [gems, setGems] = useState<Gem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGems = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/gem/latest`);
        if (!res.ok) throw new Error('Failed to fetch latest gems');
        const featured = await res.json();
        setGems(featured);
      } catch {
        setGems([]);
      }
      setLoading(false);
    };

    loadGems();
  }, []);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Latest Gems</h2>
            <p className="text-muted-foreground mt-2">
              Discover the recently found hidden gems.
            </p>
          </div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-[350px] bg-muted rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gems.map((gem) => (
              <Suspense key={gem.id} fallback={<GemCardSkeleton />}>
                <GemCard gem={gem} />
              </Suspense>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestGems;
