import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useSearchParams } from 'react-router-dom';
import Input from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Gem } from '@/types';
import { Search } from 'lucide-react';
import { API_BASE_URL } from '../lib/apiConfig';
import { GemCardSkeleton } from '@/components/ui/loading';
import SEOHelmet from '@/components/SEOHelmet';

// Lazy load the GemCard component
const GemCard = lazy(() => import('@/components/GemCard'));

const categories = [
  'All',
  'Culture',
  'History',
  'Nature',
  'Shopping',
  'Food',
  'Entertainment',
];

const BrowsePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [allGems, setAllGems] = useState<Gem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredGems, setFilteredGems] = useState<Gem[]>([]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [currentPage, setCurrentPage] = useState(1);
  const gemsPerPage = 9;

  // Load all gems once on component mount
  useEffect(() => {
    const loadAllGems = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/gem`);
        if (!res.ok) throw new Error('Failed to fetch gems');
        const gems = await res.json();
        setAllGems(gems);
      } catch (err) {
        console.error('Error loading gems:', err);
        setAllGems([]);
      }
      setLoading(false);
    };

    loadAllGems();
  }, []);

  // Filter gems when search query or category changes
  useEffect(() => {
    let filtered = [...allGems];

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(gem => gem.category === selectedCategory);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(gem => 
        gem.title.toLowerCase().includes(query) || 
        gem.description.toLowerCase().includes(query) ||
        gem.location.toLowerCase().includes(query)
      );
    }

    setFilteredGems(filtered);
  }, [allGems, searchQuery, selectedCategory]);
  
  // Update URL when category changes
  useEffect(() => {
    if (selectedCategory !== 'All') {
      setSearchParams({ category: selectedCategory });
    } else {
      setSearchParams({});
    }
  }, [selectedCategory, setSearchParams]);
  
  // Reset to first page when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  // Calculate pagination
  const totalGems = filteredGems.length;
  const totalPages = Math.ceil(totalGems / gemsPerPage);
  const startIndex = (currentPage - 1) * gemsPerPage;
  const endIndex = startIndex + gemsPerPage;
  const displayGems = filteredGems.slice(startIndex, endIndex);
  
  const canGoNext = currentPage < totalPages;
  const canGoPrev = currentPage > 1;
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the useEffect above
  };

  // Generate dynamic SEO content based on current filters
  const generatePageTitle = () => {
    if (selectedCategory !== 'All' && searchQuery.trim()) {
      return `${selectedCategory} Gems: "${searchQuery}" | GemVoyage`;
    } else if (selectedCategory !== 'All') {
      return `${selectedCategory} Hidden Gems | GemVoyage`;
    } else if (searchQuery.trim()) {
      return `Search Results: "${searchQuery}" | GemVoyage`;
    }
    return 'Explore Hidden Gems & Secret Destinations | GemVoyage';
  };

  const generatePageDescription = () => {
    if (selectedCategory !== 'All' && searchQuery.trim()) {
      return `Discover ${selectedCategory.toLowerCase()} hidden gems matching "${searchQuery}". Find unique travel destinations and secret spots shared by our community.`;
    } else if (selectedCategory !== 'All') {
      return `Explore hidden ${selectedCategory.toLowerCase()} gems and unique destinations. Discover secret spots and authentic travel experiences in ${selectedCategory.toLowerCase()}.`;
    } else if (searchQuery.trim()) {
      return `Search results for "${searchQuery}" - discover hidden gems, secret destinations, and unique travel spots from our community of explorers.`;
    }
    return 'Browse our collection of hidden gems and secret destinations. Discover unique travel spots, authentic experiences, and off-the-beaten-path locations shared by fellow travelers.';
  };

  const generateKeywords = () => {
    const baseKeywords = ['hidden gems', 'secret destinations', 'travel spots', 'unique places', 'authentic travel'];
    if (selectedCategory !== 'All') {
      baseKeywords.push(`${selectedCategory.toLowerCase()} destinations`, `${selectedCategory.toLowerCase()} travel`);
    }
    if (searchQuery.trim()) {
      baseKeywords.push(searchQuery.toLowerCase());
    }
    return baseKeywords.join(', ');
  };
  
  return (
    <div className="py-8">
      <SEOHelmet
        title={generatePageTitle()}
        description={generatePageDescription()}
        keywords={generateKeywords()}
        canonicalUrl={window.location.href}
        ogTitle={generatePageTitle()}
        ogDescription={generatePageDescription()}
        ogType="website"
        twitterTitle={generatePageTitle()}
        twitterDescription={generatePageDescription()}
      />
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Explore Hidden Gems</h1>
          <p className="text-muted-foreground">
            Discover extraordinary places shared by our community of travelers
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="md:w-2/3">
            <form onSubmit={handleSearch} className="relative">
              <Input 
                placeholder="Search by name, description, or location" 
                className="pl-5 w-full text-lg border-2 rounded-xl p-1 mb-4 shadow focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 md:w-1/3">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full text-lg border-2 rounded-xl p-2 mb-4 shadow focus:ring-2 focus:ring-primary">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="h-[350px] bg-muted rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : displayGems.length > 0 ? (
          <>
            <div className="mb-6 text-muted-foreground">
              {searchQuery.trim() || selectedCategory !== 'All'
                ? `Found ${totalGems} ${totalGems === 1 ? 'gem' : 'gems'} • Page ${currentPage} of ${totalPages}`
                : `Showing ${displayGems.length} gems • Page ${currentPage} of ${totalPages}`
              }
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayGems.map(gem => (
                <Suspense key={gem.id} fallback={<GemCardSkeleton />}>
                  <GemCard gem={gem} />
                </Suspense>
              ))}
            </div>
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <Button
                  variant="outline"
                  disabled={!canGoPrev}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Prev
                </Button>
                
                {/* Show page numbers for reasonable number of pages */}
                {totalPages <= 10 ? (
                  Array.from({ length: totalPages }, (_, i) => (
                    <Button
                      key={i + 1}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      onClick={() => setCurrentPage(i + 1)}
                      size="sm"
                    >
                      {i + 1}
                    </Button>
                  ))
                ) : (
                  <span className="px-4 py-2 text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </span>
                )}
                
                <Button
                  variant="outline"
                  disabled={!canGoNext}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold mb-2">No gems found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery.trim() || selectedCategory !== 'All'
                ? 'Try adjusting your filters or search query'
                : 'No gems available at the moment'
              }
            </p>
            <Button 
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowsePage;
