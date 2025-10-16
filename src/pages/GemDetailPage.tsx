import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, ArrowLeft, Bookmark, ArrowUp, ArrowDown } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Gem } from '@/types';
import { format } from 'date-fns';
import MarkdownIt from 'markdown-it';
import { API_BASE_URL } from '../lib/apiConfig';
import { useToast } from "@/hooks/use-toast";
import { VoteButtonsSkeleton, CommentSkeleton, AuthorSkeleton } from '@/components/ui/loading';
import SEOHelmet from '@/components/SEOHelmet';

// Lazy load heavy components
const VoteButtons = lazy(() => import('@/components/VoteButtons'));
const CommentSection = lazy(() => import('@/components/CommentSection'));
const AuthorInfo = lazy(() => import('@/components/AuthorInfo'));

const GemDetailPage: React.FC = () => {
  const { id: slug } = useParams<{ id: string }>(); // URL param is always the slug
  const navigate = useNavigate();
  const { toast } = useToast();
  const [gem, setGem] = useState<Gem | null>(null);
  const [loading, setLoading] = useState(true);
  const [votes, setVotes] = useState<{ positive: boolean; ownerId?: string; id?: string; createdAt?: string }[]>([]);
  const [loadingVotes, setLoadingVotes] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const mdParser = new MarkdownIt({
    html: false,
    linkify: true,
    typographer: true
  });

  // Helper function to extract plain text from markdown and limit to 100 characters
  const getDescriptionForSEO = (markdownText: string): string => {
    if (!markdownText || typeof markdownText !== 'string') {
      return 'Discover this hidden gem on GemVoyage.';
    }
    
    // Remove markdown syntax and get plain text
    const plainText = markdownText
      .replace(/#{1,6}\s/g, '') // Remove headers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.*?)\*/g, '$1') // Remove italic
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links, keep text
      .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
      .replace(/`(.*?)`/g, '$1') // Remove code blocks
      .replace(/\n/g, ' ') // Replace newlines with spaces
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim();
    
    // Limit to 100 characters and add ellipsis if truncated
    return plainText.length > 100 ? plainText.substring(0, 100) + '...' : plainText;
  };

  useEffect(() => {
    const loadGem = async () => {
      if (!slug) {
        setError('No gem slug provided.');
        navigate('/browse');
        return;
      }
      try {
        // Use slug for the API call
        const res = await fetch(`${API_BASE_URL}/gem/${slug}`);
        if (!res.ok) {
          setError('Failed to fetch gem details.');
          navigate('/browse');
          return;
        }
        const gemData = await res.json();
        setGem(gemData);
      } catch (err) {
        setError('Failed to fetch gem details.');
        navigate('/browse');
      } finally {
        setLoading(false);
      }
    };
    loadGem();
  }, [slug, navigate]);

  useEffect(() => {
    const fetchVotes = async () => {
      if (!gem?.id) return;
      try {
        // Use the gem's UUID for API calls
        const res = await fetch(`${API_BASE_URL}/vote/gem/${gem.id}`);
        if (!res.ok) throw new Error('Failed to fetch votes');
        const data = await res.json();
        setVotes(data);
      } catch {
        setVotes([]);
      }
      setLoadingVotes(false);
    };
    fetchVotes();
  }, [gem?.id]);

  const handleVote = async (positive: boolean) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError('You must be logged in to vote.');
        return;
      }
      
      if (!gem?.id) {
        setError('Gem data not loaded.');
        return;
      }
      
      // Check if user has already voted
      const existingVote = votes.find(v => v.ownerId === userId);
      const votePayload = {
        gemId: gem.id, // Use the gem's UUID for API calls
        ownerId: userId,
        positive,
        id: existingVote ? existingVote.id : crypto.randomUUID(),
        createdAt: existingVote ? existingVote.createdAt : new Date().toISOString(),
      };
      const method = existingVote ? 'PUT' : 'POST';
      const url = existingVote ? `${API_BASE_URL}/vote/${existingVote.id}` : `${API_BASE_URL}/vote`;
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(votePayload),
      });
      if (!res.ok) {
        setError('Failed to submit vote.');
        return;
      }
      // Refresh votes after voting using the gem's UUID
      const updatedRes = await fetch(`${API_BASE_URL}/vote/gem/${gem.id}`);
      if (updatedRes.ok) {
        setVotes(await updatedRes.json());
        setSuccess('Vote submitted!');
      }
    } catch (err) {
      setError('Failed to submit vote.');
    }
  };

  const upvotes = votes.filter(v => v.positive === true).length;
  const downvotes = votes.filter(v => v.positive === false).length;
  const voteScore = upvotes - downvotes;

  useEffect(() => {
    if (loading) return;
    if (error) {
      toast({ title: 'Error', description: error, variant: 'destructive' });
      setError(null);
    }
    if (success) {
      toast({ title: 'Success', description: success, variant: 'default' });
      setSuccess(null);
    }
  }, [error, success, loading]);

  if (loading) {
    return (
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-16 bg-muted rounded w-3/4"></div>
            <div className="h-96 bg-muted rounded"></div>
            <div className="h-8 bg-muted rounded w-1/2"></div>
            <div className="h-32 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!gem) return null;

  // Add safety checks for gem properties
  const gemTitle = gem.title || 'Untitled Gem';
  const gemLocation = gem.location || 'Unknown Location';
  const gemCategory = gem.category || 'Uncategorized';
  const gemDescription = gem.description || 'No description available';
  const gemImage = gem.image || gem.imageUrl || 'https://gemvoyage.net/hero.jpg';
  const gemId = gem.id; // Use the actual UUID from gem data
  const gemSlug = gem.slug || slug; // Use gem's slug, fallback to URL slug
  
  // Generate better keywords
  const generateKeywords = () => {
    const baseKeywords = [gemTitle, gemLocation, gemCategory, 'hidden gem', 'travel destination'];
    // Add some words from the title (but not all)
    const titleWords = gemTitle.split(' ').filter(word => word.length > 3);
    baseKeywords.push(...titleWords.slice(0, 3)); // Add first 3 meaningful words
    
    return baseKeywords.join(', ');
  };

  return (
    <div className="py-8">
      <SEOHelmet
        title={`${gemTitle} - ${gemLocation} | GemVoyage`}
        description={getDescriptionForSEO(gemDescription)}
        keywords={generateKeywords()}
        canonicalUrl={`https://gemvoyage.net/gem/${slug}`}
        ogTitle={`${gemTitle} in ${gemLocation}`}
        ogDescription={getDescriptionForSEO(gemDescription)}
        ogImage={gemImage}
        ogType="article"
        twitterTitle={`${gemTitle} - Hidden Gem in ${gemLocation}`}
        twitterDescription={getDescriptionForSEO(gemDescription)}
        twitterImage={gemImage}
      />
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          className="flex items-center mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="mb-6">
          <Badge variant="outline" className="mb-3 bg-gem-100 text-gem-500 border-gem-200">
            {gemCategory}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{gemTitle}</h1>

          <div className="flex items-center flex-wrap gap-4">
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>
                {gemLocation}
              </span>
            </div>

            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              <span>
                Shared on {format(new Date(gem.createdAt), 'MMMM d, yyyy')}
              </span>
            </div>

            <div className="flex items-center text-muted-foreground">
              <span className="ml-2">
                <Suspense fallback={<AuthorSkeleton />}>
                  <AuthorInfo userId={gem.owner || gem.ownerId || ''} />
                </Suspense>
              </span>
            </div>
          </div>
        </div>

        <div className="relative rounded-xl overflow-hidden mb-8">
          <img
            src={gemImage}
            alt={gemTitle}
            className="w-full h-[400px] md:h-[500px] object-cover"
            loading="lazy"
            decoding="async"
            srcSet={gemImage !== 'https://gemvoyage.net/hero.jpg' ? `
              ${gemImage}?w=400 400w,
              ${gemImage}?w=800 800w,
              ${gemImage}?w=1200 1200w
            ` : undefined}
            sizes="(max-width: 768px) 100vw, 66vw"
            style={{ background: '#f3f3f3' }}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-em:text-foreground prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-code:bg-muted prose-code:text-foreground prose-pre:bg-muted prose-ul:text-foreground prose-ol:text-foreground prose-li:text-foreground">
              <div 
                className="text-lg leading-relaxed mb-8" 
                dangerouslySetInnerHTML={{ 
                  __html: (() => {
                    try {
                      return mdParser.render(gemDescription);
                    } catch (error) {
                      console.error('Markdown rendering error:', error);
                      return `<p>${gemDescription}</p>`;
                    }
                  })()
                }} 
              />
            </div>
            <Separator className="my-8" />
          </div>

          <div className="md:w-1/3">
            <div className="bg-muted p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-2">Votes</h2>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <button className="text-muted-foreground hover:text-green-500 transition-colors" onClick={() => handleVote(true)}>
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <span className={`text-xs font-medium ${voteScore > 0 ? 'text-green-500' : voteScore < 0 ? 'text-red-500' : 'text-muted-foreground'}`}>
                    {loadingVotes ? '-' : voteScore}
                  </span>
                  <button className="text-muted-foreground hover:text-red-500 transition-colors" onClick={() => handleVote(false)}>
                    <ArrowDown className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Suspense fallback={<CommentSkeleton />}>
          <CommentSection gemId={gemId} />
        </Suspense>
      </div>
    </div>
  );
};

export default GemDetailPage;
