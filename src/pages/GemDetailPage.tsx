import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, ArrowLeft, Bookmark, ArrowUp, ArrowDown } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import VoteButtons from '@/components/VoteButtons';
import CommentSection from '@/components/CommentSection';
import { Gem } from '@/types';
import { format } from 'date-fns';
import MarkdownIt from 'markdown-it';
import AuthorInfo from '@/components/AuthorInfo';
import { API_BASE_URL } from '../lib/apiConfig';
import { useToast } from "@/hooks/use-toast";

const GemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [gem, setGem] = useState<Gem | null>(null);
  const [loading, setLoading] = useState(true);
  const [votes, setVotes] = useState<{ positive: boolean; ownerId?: string; id?: string; createdAt?: string }[]>([]);
  const [loadingVotes, setLoadingVotes] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const mdParser = new MarkdownIt();

  useEffect(() => {
    const loadGem = async () => {
      if (!id) {
        setError('No gem ID provided.');
        navigate('/browse');
        return;
      }
      try {
        const res = await fetch(`${API_BASE_URL}/gem/${id}`);
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
  }, [id, navigate]);

  useEffect(() => {
    const fetchVotes = async () => {
      if (!id) return;
      try {
        const res = await fetch(`${API_BASE_URL}/vote/gem/${id}`);
        if (!res.ok) throw new Error('Failed to fetch votes');
        const data = await res.json();
        setVotes(data);
      } catch {
        setVotes([]);
      }
      setLoadingVotes(false);
    };
    fetchVotes();
  }, [id]);

  const handleVote = async (positive: boolean) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError('You must be logged in to vote.');
        return;
      }
      // Check if user has already voted
      const existingVote = votes.find(v => v.ownerId === userId);
      const votePayload = {
        gemId: id,
        ownerId: userId,
        positive,
        id: existingVote ? existingVote.id : crypto.randomUUID(),
        createdAt: existingVote ? existingVote.createdAt : new Date().toISOString(),
      };
      const method = existingVote ? 'PUT' : 'POST';
      const url = existingVote ? `${API_BASE_URL}/vote/${existingVote.id}` : `${API_BASE_URL}/api/vote`;
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(votePayload),
      });
      if (!res.ok) {
        setError('Failed to submit vote.');
        return;
      }
      // Refresh votes after voting
      const updatedRes = await fetch(`${API_BASE_URL}/vote/gem/${id}`);
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

  return (
    <div className="py-8">
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
            {gem.category}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{gem.title}</h1>

          <div className="flex items-center flex-wrap gap-4">
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>
                {gem.location}
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
                <AuthorInfo userId={gem.owner ?? ''} />
              </span>
            </div>
          </div>
        </div>

        <div className="relative rounded-xl overflow-hidden mb-8">
          <img
            src={gem.image ?? '/placeholder.svg'}
            alt={gem.title}
            className="w-full h-[400px] md:h-[500px] object-cover"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <div className="prose max-w-none">
              <div className="text-lg leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: mdParser.render(gem.description) }} />
            </div>
            <div id="ezoic-pub-ad-placeholder-114"></div>
            <Separator className="my-8" />
          </div>

          <div className="md:w-1/3">
            <div id="ezoic-pub-ad-placeholder-104"></div>
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
        <CommentSection gemId={gem.id} />
      </div>
    </div>
  );
};

export default GemDetailPage;
