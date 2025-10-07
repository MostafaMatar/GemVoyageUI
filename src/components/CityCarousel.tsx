import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';
import { City } from '@/types';
import { API_BASE_URL } from '../lib/apiConfig';
import { cn } from '@/lib/utils';
import Autoplay from 'embla-carousel-autoplay';

interface CityCarouselProps {
  className?: string;
}

const CityCarousel: React.FC<CityCarouselProps> = ({ className }) => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const autoplayPlugin = useCallback(() => {
    return Autoplay({ delay: 5000, stopOnInteraction: true });
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}/city`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch cities: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        setCities(data);
      } catch (err) {
        console.error('Error fetching cities:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch cities');
        setCities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  if (loading) {
    return (
      <section className={cn("py-12", className)}>
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">Explore Cities</h2>
            <p className="text-muted-foreground mt-2">
              Discover amazing destinations around the world.
            </p>
          </div>
          
          <div className="relative">
            <div className="h-[500px] bg-muted rounded-lg animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={cn("py-12", className)}>
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">Explore Cities</h2>
            <p className="text-muted-foreground mt-2">
              Discover amazing destinations around the world.
            </p>
          </div>
          
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                Unable to load cities at the moment.
              </p>
              <Badge variant="destructive">
                {error}
              </Badge>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (cities.length === 0) {
    return (
      <section className={cn("py-12", className)}>
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">Explore Cities</h2>
            <p className="text-muted-foreground mt-2">
              Discover amazing destinations around the world.
            </p>
          </div>
          
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <MapPin className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                No cities available at the moment.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("py-12", className)}>
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Explore Cities</h2>
          <p className="text-muted-foreground mt-2">
            Discover amazing destinations around the world.
          </p>
        </div>
        
        <div className="relative">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={cities.length > 1 ? [autoplayPlugin()] : []}
            className="w-full"
          >
            <CarouselContent>
              {cities.map((city, index) => (
                <CarouselItem key={city.id}>
                  <CityCard city={city} isActive={index === current} />
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {cities.length > 1 && (
              <>
                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white/90 border-white/20 backdrop-blur-sm" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white/90 border-white/20 backdrop-blur-sm" />
              </>
            )}
          </Carousel>

          {/* Dot indicators */}
          {cities.length > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {cities.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index === current
                      ? "bg-primary w-8"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                  onClick={() => api?.scrollTo(index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

interface CityCardProps {
  city: City;
  isActive: boolean;
}

const CityCard: React.FC<CityCardProps> = ({ city, isActive }) => {
  const [imageError, setImageError] = useState(false);

  // Create URL-friendly city name
  const cityUrl = encodeURIComponent(city.name.toLowerCase().replace(/\s+/g, '-'));

  return (
    <Link to={`/city/${cityUrl}`} className="block group">
      <Card className="w-full h-[400px] sm:h-[450px] md:h-[500px] overflow-hidden border-0 rounded-xl cursor-pointer transition-transform duration-300 hover:scale-[1.02]">
        <div className="relative w-full h-full">
          {/* Background Image */}
          {!imageError && city.image ? (
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700"
              style={{
                backgroundImage: `url(${city.image})`,
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
              }}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800">
              <div className="absolute inset-0 bg-black/20" />
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />

          {/* Content */}
          <div className="relative h-full flex items-end p-4 sm:p-6 md:p-8 lg:p-12">
            <div className="w-full space-y-2 sm:space-y-3 md:space-y-4">
              <div className="space-y-1 sm:space-y-2">
                <Badge 
                  variant="secondary" 
                  className="bg-white/20 text-white border-white/20 backdrop-blur-sm text-xs sm:text-sm"
                >
                </Badge>
                
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                  {city.name}
                </h1>
              </div>
              
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-3xl">
                <span className="sm:hidden">
                  {city.description.length > 100 ? `${city.description.substring(0, 100)}...` : city.description}
                </span>
                <span className="hidden sm:block">
                  {city.description}
                </span>
              </p>
              
              {/* Hover indicator */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-1 sm:pt-2">
                <Badge variant="outline" className="bg-white/10 text-white border-white/30 text-xs sm:text-sm">
                  Click to explore →
                </Badge>
              </div>
            </div>
          </div>

          {/* Image load error fallback */}
          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <MapPin className="h-24 w-24 text-white/50" />
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default CityCarousel;
