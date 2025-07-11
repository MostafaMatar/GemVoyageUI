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
  const [allGems, setAllGems] = useState<Gem[]>([]); // Store all gems for filtering
  const [filteredGems, setFilteredGems] = useState<Gem[]>([]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true);
  const gemsPerPage = 10;
  
  // Load all gems initially for filtering (we need this for search/category filtering)
  useEffect(() => {
    const loadAllGems = async () => {
      try {
        setLoading(true);
        const allGemsData = [];
        let offset = 0;
        let hasMore = true;
        
        // Fetch all gems in batches for filtering purposes
        while (hasMore) {
          const res = await fetch(`${API_BASE_URL}/gem?offset=${offset}&category=All`);
          if (!res.ok) throw new Error('Failed to fetch gems');
          const batch = await res.json();
          
          if (batch.length === 0) {
            hasMore = false;
          } else {
            allGemsData.push(...batch);
            offset += 10;
            // If we got less than 10, we've reached the end
            if (batch.length < 10) {
              hasMore = false;
            }
          }
        }
        
        setAllGems(allGemsData);
      } catch (err) {
        setAllGems([]);
      }
      setLoading(false);
    };
    loadAllGems();
  }, []);

  // Load gems for current page with server-side pagination
  useEffect(() => {
    const loadPageGems = async () => {
      if (searchQuery.trim()) {
        // For search results, use client-side pagination from allGems
        return;
      }
      
      try {
        setLoading(true);
        const offset = (currentPage - 1) * gemsPerPage;
        const res = await fetch(`${API_BASE_URL}/gem?offset=${offset}&category=${selectedCategory}`);
        if (!res.ok) throw new Error('Failed to fetch gems');
        const pageGems = await res.json();
        
        setGems(pageGems);
        setHasMorePages(pageGems.length === 10);
      } catch (err) {
        setGems([]);
        setHasMorePages(false);
      }
      setLoading(false);
    };
    
    if (!searchQuery.trim()) {
      loadPageGems();
    }
  }, [currentPage, searchQuery, selectedCategory]);
  
  // Filter gems when filters or search query change
  useEffect(() => {
    if (loading) return;
    
    // If no search query, use server-side paginated gems (with category filtering)
    if (!searchQuery.trim()) {
      setFilteredGems(gems);
      return;
    }
    
    // For search results, use all gems and apply client-side filtering
    let filtered = [...allGems];
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(gem => gem.category === selectedCategory);
    }
    
    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(gem => 
        gem.title.toLowerCase().includes(query) || 
        gem.description.toLowerCase().includes(query) ||
        gem.location.toLowerCase().includes(query) ||
        gem.location.toLowerCase().includes(query)
      );
    }
    
    setFilteredGems(filtered);
    
  }, [gems, allGems, searchQuery, selectedCategory, loading]);
  
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
  const isFiltered = searchQuery.trim(); // Only search query requires client-side filtering now
  const displayGems = isFiltered ? 
    filteredGems.slice((currentPage - 1) * gemsPerPage, currentPage * gemsPerPage) : 
    filteredGems;
  
  const totalPages = isFiltered ? Math.ceil(filteredGems.length / gemsPerPage) : null;
  const canGoNext = isFiltered ? currentPage < totalPages! : hasMorePages;
  const canGoPrev = currentPage > 1;
  
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
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[350px] bg-muted rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : filteredGems.length > 0 ? (
          <>
            <div className="mb-6 text-muted-foreground">
              {isFiltered 
                ? `${filteredGems.length} ${filteredGems.length === 1 ? 'gem' : 'gems'} found`
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
                
                {isFiltered && totalPages && totalPages <= 10 ? (
                  // Show page numbers for filtered results with reasonable total pages
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
                  // Show current page for unfiltered results or many pages
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
