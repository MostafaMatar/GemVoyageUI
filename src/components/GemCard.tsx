import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, ArrowUp, ArrowDown, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Gem } from '@/types';
import AuthorInfo from './AuthorInfo';
import { API_BASE_URL } from '../lib/apiConfig';

interface GemCardProps {
  gem: Gem;
}

const GemCard: React.FC<GemCardProps> = ({ gem }) => {
  const [votes, setVotes] = useState<{ positive: boolean }[]>([]);
  const [loadingVotes, setLoadingVotes] = useState(true);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
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
  }, [gem.id]);

  const handleVote = async (positive: boolean) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert('You must be logged in to vote.');
        return;
      }
      const vote = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        gemId: gem.id,
        ownerId: userId,
        positive,
      };
      const res = await fetch(`${API_BASE_URL}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vote),
      });
      if (!res.ok) {
        alert('Failed to submit vote.');
        return;
      }
      // Refresh votes after voting
      const updatedRes = await fetch(`${API_BASE_URL}/vote/gem/${gem.id}`);
      if (updatedRes.ok) {
        setVotes(await updatedRes.json());
      }
    } catch (err) {
      alert('Failed to submit vote.');
    }
  };

  const upvotes = votes.filter(v => v.positive === true).length;
  const downvotes = votes.filter(v => v.positive === false).length;
  const voteScore = upvotes - downvotes;
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md gem-card-shadow animate-fade-in">
      <Link to={`/gem/${gem.id}`}>
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={gem.image ?? '/placeholder.svg'} 
            alt={gem.title} 
            className="h-full w-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
      </Link>
      
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="bg-gem-100 text-gem-500 border-gem-200">
            {gem.category}
          </Badge>
          <div className="flex items-center text-muted-foreground text-xs">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{gem.location}</span>
          </div>
        </div>
        
        <Link to={`/gem/${gem.id}`}>
          <h3 className="font-semibold text-lg leading-snug hover:text-gem-400 transition-colors line-clamp-1">
            {gem.title}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground mt-1">
          <AuthorInfo userId={gem.owner ?? ''} />
        </p>
        
        <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
          {gem.description}
        </p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center space-x-4">
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
      </CardFooter>
    </Card>
  );
};

export default GemCard;
