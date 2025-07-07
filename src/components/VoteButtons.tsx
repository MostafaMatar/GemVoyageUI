import React, { useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast"

interface VoteButtonsProps {
  initialUpvotes: number;
  initialDownvotes: number;
  vertical?: boolean;
  gemId?: string;
  commentId?: string;
}

const VoteButtons: React.FC<VoteButtonsProps> = ({
  initialUpvotes,
  initialDownvotes,
  vertical = false,
  gemId,
  commentId
}) => {
  const { toast } = useToast();
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  
  const handleUpvote = () => {
    if (userVote === 'up') {
      // Remove upvote
      setUpvotes(upvotes - 1);
      setUserVote(null);
    } else {
      // Add upvote
      setUpvotes(upvotes + 1);
      if (userVote === 'down') {
        // If user previously downvoted, remove the downvote
        setDownvotes(downvotes - 1);
      }
      setUserVote('up');
      
      // Show toast notification
      toast({
        title: "Upvoted!",
        description: commentId 
          ? "You've upvoted this comment." 
          : "You've upvoted this gem.",
      });
    }
  };
  
  const handleDownvote = () => {
    if (userVote === 'down') {
      // Remove downvote
      setDownvotes(downvotes - 1);
      setUserVote(null);
    } else {
      // Add downvote
      setDownvotes(downvotes + 1);
      if (userVote === 'up') {
        // If user previously upvoted, remove the upvote
        setUpvotes(upvotes - 1);
      }
      setUserVote('down');
      
      // Show toast notification
      toast({
        title: "Downvoted",
        description: commentId 
          ? "You've downvoted this comment." 
          : "You've downvoted this gem.",
        variant: "destructive",
      });
    }
  };
  
  const score = upvotes - downvotes;
  const scoreColor = score > 0 ? 'text-green-500' : score < 0 ? 'text-red-500' : 'text-muted-foreground';
  
  return (
    <div className={`flex ${vertical ? 'flex-col items-center' : 'items-center'} gap-1`}>
      <Button 
        variant="ghost" 
        size="sm" 
        className={`p-0 h-auto ${userVote === 'up' ? 'text-green-500' : 'text-muted-foreground hover:text-green-500'}`}
        onClick={handleUpvote}
      >
        <ArrowUp className={`h-5 w-5 ${vertical ? '' : 'mr-0.5'}`} />
      </Button>
      
      <span className={`text-sm font-medium ${scoreColor}`}>
        {score}
      </span>
      
      <Button 
        variant="ghost" 
        size="sm" 
        className={`p-0 h-auto ${userVote === 'down' ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'}`}
        onClick={handleDownvote}
      >
        <ArrowDown className={`h-5 w-5 ${vertical ? '' : 'mr-0.5'}`} />
      </Button>
    </div>
  );
};

export default VoteButtons;
