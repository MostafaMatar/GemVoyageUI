import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Input from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import GemCard from '@/components/GemCard';
import { Gem } from '@/types';
import { Search } from 'lucide-react';
import { API_BASE_URL } from '../lib/apiConfig';

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

  const [gems, setGems] = useState<Gem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Gem[]>([]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true);
  const gemsPerPage = 10;

  // Load gems for current page - handles both browsing and search
  useEffect(() => {
    const loadGems = async () => {
      if (searchQuery.trim()) {
        // Handle search with server-side search if API supports it
        setSearchLoading(true);
        try {
          const res = await fetch(`${API_BASE_URL}/gem/search?q=${encodeURIComponent(searchQuery)}&category=${selectedCategory}&offset=0`);
          if (res.ok) {
            const results = await res.json();
            setSearchResults(results);
          } else {
            // Fallback: search all gems client-side (less efficient but works)
            const res = await fetch(`${API_BASE_URL}/gem?offset=0&category=All&limit=1000`);
            if (res.ok) {
              const allGems = await res.json();
              const query = searchQuery.toLowerCase();
              const filtered = allGems.filter((gem: any) => {
                const matchesSearch = gem.title.toLowerCase().includes(query) || 
                                    gem.description.toLowerCase().includes(query) ||
                                    gem.location.toLowerCase().includes(query);
                const matchesCategory = selectedCategory === 'All' || gem.category === selectedCategory;
                return matchesSearch && matchesCategory;
              });
              setSearchResults(filtered);
            }
          }
        } catch (err) {
          setSearchResults([]);
        }
        setSearchLoading(false);
      } else {
        // Regular pagination for browsing
        setLoading(true);
        try {
          const offset = (currentPage - 1) * gemsPerPage;
          const res = await fetch(`${API_BASE_URL}/gem?offset=${offset}&category=${selectedCategory}`);
          if (!res.ok) throw new Error('Failed to fetch gems');
          const pageGems = await res.json();
          
          setGems(pageGems);
          setHasMorePages(pageGems.length === gemsPerPage);
        } catch (err) {
          setGems([]);
          setHasMorePages(false);
        }
        setLoading(false);
      }
    };
    
    loadGems();
  }, [currentPage, searchQuery, selectedCategory]);
  
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

  // Pagination logic
  const isSearching = searchQuery.trim();
  const currentGems = isSearching ? searchResults : gems;
  const displayGems = isSearching 
    ? currentGems.slice((currentPage - 1) * gemsPerPage, currentPage * gemsPerPage)
    : currentGems;
  
  const totalPages = isSearching ? Math.ceil(currentGems.length / gemsPerPage) : null;
  const canGoNext = isSearching ? currentPage < totalPages! : hasMorePages;
  const canGoPrev = currentPage > 1;
  const isLoading = isSearching ? searchLoading : loading;
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the useEffect above
  };
  
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div id="ezoic-pub-ad-placeholder-114"></div>
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
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[350px] bg-muted rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : currentGems.length > 0 ? (
          <>
            <div className="mb-6 text-muted-foreground">
              {isSearching 
                ? `${currentGems.length} ${currentGems.length === 1 ? 'gem' : 'gems'} found`
                : `Page ${currentPage} of gems`
              }
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayGems.map(gem => (
                <GemCard key={gem.id} gem={gem} />
              ))}
            </div>
            {/* Pagination Controls */}
            {(canGoNext || canGoPrev) && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <Button
                  variant="outline"
                  disabled={!canGoPrev}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Prev
                </Button>
                
                {isSearching && totalPages && totalPages <= 10 ? (
                  // Show page numbers for search results with reasonable total pages
                  Array.from({ length: totalPages }, (_, i) => (
                    <Button
                      key={i + 1}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))
                ) : (
                  // Show current page for regular browsing or many pages
                  <span className="px-4 py-2 text-sm text-muted-foreground">
                    Page {currentPage}
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
              Try adjusting your filters or search query
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
