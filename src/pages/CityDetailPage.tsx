import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gem, City } from '@/types';
import { API_BASE_URL } from '../lib/apiConfig';
import { GemCardSkeleton } from '@/components/ui/loading';
import SEOHelmet from '@/components/SEOHelmet';

// Lazy load GemCard
const GemCard = lazy(() => import('@/components/GemCard'));

interface PaginatedResponse {
  content: Gem[];
  offset: number;
  pageSize: number;
  totalElements: number;
}

const CityDetailPage: React.FC = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const navigate = useNavigate();
  const [gems, setAllGems] = useState<Gem[]>([]);
  const [cityData, setCityData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalGems, setTotalGems] = useState(0);
  const [debugInfo, setDebugInfo] = useState<string>('');

  // Format city name for display (decode URI and format)
  const displayCityName = decodeURIComponent(cityName || '').replace(/-/g, ' ');
  
  // Convert URL-friendly city name back to proper format for API
  const apiCityName = decodeURIComponent(cityName || '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  useEffect(() => {
    if (!cityName) {
      navigate('/404');
      return;
    }

    const fetchCityGems = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Debug: Log the city names and API URL
        console.log('URL cityName:', cityName);
        console.log('Display cityName:', displayCityName);
        console.log('API cityName:', apiCityName);
        
        // First, fetch all cities to find the matching city data
        const citiesResponse = await fetch(`${API_BASE_URL}/city`);
        if (citiesResponse.ok) {
          const cities: City[] = await citiesResponse.json();
          const matchingCity = cities.find(city => 
            city.name.toLowerCase() === apiCityName.toLowerCase()
          );
          if (matchingCity) {
            setCityData(matchingCity);
            console.log('Found matching city:', matchingCity);
          }
        }
        
        // Then fetch gems for this city
        const apiUrl = `${API_BASE_URL}/city/${encodeURIComponent(apiCityName)}/gems`;        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch gems for ${apiCityName}: ${response.status} ${response.statusText}`);
        }
        
        const gems = await response.json();
        setAllGems(gems.data);
        setTotalGems(gems.data.length);
      } catch (err) {
        console.error('Error fetching city gems:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch city gems');
        setAllGems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCityGems();
  }, [cityName, apiCityName, navigate]);

  if (!cityName) {
    return null;
  }

  // Use city data if available, otherwise fall back to formatted URL
  const actualCityName = cityData?.name || apiCityName;
  const actualCityDescription = cityData?.description || `Discover the hidden gems and local treasures that make ${actualCityName} special. Explore unique places recommended by travelers and locals.`;
  
  return (
    <>
      <SEOHelmet 
        title={`${actualCityName} - Discover Hidden Gems`}
        description={`Explore the best hidden gems and local recommendations in ${actualCityName}. Find unique places, restaurants, and attractions discovered by our community.`}
        keywords={`${actualCityName}, hidden gems, travel, local recommendations, attractions, restaurants`}
      />
      
      <div className="min-h-screen bg-background">
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-800 text-white">
          {/* Background Image */}
          {cityData?.image && (
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${cityData.image})`,
              }}
            />
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
          
          <div className="relative container mx-auto px-4 py-16">
            <div className="max-w-4xl">
              {/* Back Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="mb-6 text-white hover:bg-white/20 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>

              {/* City Info */}
              <div className="space-y-4">                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  {actualCityName}
                </h1>
                
                <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl">
                  {actualCityDescription}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-12">
          
          {loading ? (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Hidden Gems in {actualCityName}</h2>
                <p className="text-muted-foreground">
                  Loading amazing places to discover...
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <GemCardSkeleton key={i} />
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  Unable to load gems for {actualCityName} at the moment.
                </p>
                <Badge variant="destructive">
                  {error}
                </Badge>
              </div>
            </div>
          ) : !gems || gems.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">No gems found in {actualCityName}</h3>
                <p className="text-muted-foreground mb-4">
                  Be the first to discover and share hidden gems in this city!
                </p>
                <Button onClick={() => navigate('/create')}>
                  Add a Gem
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Hidden Gems in {actualCityName}</h2>
                <p className="text-muted-foreground">
                  {totalGems} amazing {totalGems === 1 ? 'place' : 'places'} discovered by our community
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gems && gems.map((gem, index) => {
                  console.log(`Rendering gem ${index}:`, gem);
                  return (
                    <Suspense key={gem.id} fallback={<GemCardSkeleton />}>
                      <GemCard gem={gem} />
                    </Suspense>
                  );
                })}
              </div>

              {/* Load More Section (placeholder for future pagination) */}
              {gems && totalGems > gems.length && (
                <div className="flex justify-center mt-12">
                  <p className="text-muted-foreground">
                    Showing {gems.length} of {totalGems} gems
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CityDetailPage;
