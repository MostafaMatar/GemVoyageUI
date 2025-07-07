import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Comment } from '@/types';
import VoteButtons from '@/components/VoteButtons';
import { formatDistanceToNow } from 'date-fns';
import AuthorInfo from './AuthorInfo';
import { API_BASE_URL } from '../lib/apiConfig';
import { useToast } from "@/hooks/use-toast";

interface CommentSectionProps {
  comments?: Comment[];
  gemId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments = [], gemId }) => {
  const [commentText, setCommentText] = useState('');
  const [localComments, setLocalComments] = useState<Comment[]>(comments);
  const { toast } = useToast();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/gem_comment/gem/${gemId}`);
        if (!res.ok) throw new Error('Failed to fetch comments');
        const data = await res.json();
        setLocalComments(data);
      } catch {
        setLocalComments([]);
        toast({ title: 'Error', description: 'Failed to fetch comments.', variant: 'destructive' });
      }
    };
    fetchComments();
  }, [gemId]);
  
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast({ title: 'Error', description: 'You must be logged in to comment.', variant: 'destructive' });
      return;
    }
    // Prepare GemComment data
    const newComment = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      gemId,
      ownerId: userId,
      comment: commentText,
    };
    try {
      const res = await fetch(`${API_BASE_URL}/gem_comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment),
      });
      if (!res.ok) {
        toast({ title: 'Error', description: 'Failed to post comment.', variant: 'destructive' });
        return;
      }
      // Refresh comments after posting
      const updatedRes = await fetch(`${API_BASE_URL}/gem_comment/gem/${gemId}`);
      if (updatedRes.ok) {
        setLocalComments(await updatedRes.json());
        toast({ title: 'Success', description: 'Comment posted!', variant: 'default' });
      }
      setCommentText('');
    } catch {
      toast({ title: 'Error', description: 'Failed to post comment.', variant: 'destructive' });
    }
  };
  
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-6">
        Comments ({localComments.length})
      </h3>
      
      <form onSubmit={handleSubmitComment} className="mb-8">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src="https://i.pravatar.cc/150" alt="Your avatar" />
            <AvatarFallback>YU</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea 
              placeholder="Share your thoughts about this gem..." 
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="min-h-[100px] mb-3"
            />
            <div className="flex justify-end">
              <Button 
                type="submit" 
                className="bg-gem-300 hover:bg-gem-400"
                disabled={!commentText.trim()}
              >
                Post Comment
              </Button>
            </div>
          </div>
        </div>
      </form>
      
      <div className="space-y-6">
        {localComments.map((comment) => (
          <div key={comment.id} className="rounded-lg border p-4 animate-fade-in">
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-medium text-sm">
                    <AuthorInfo userId={comment.ownerId} />
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-3">
              <p className="text-sm">{comment.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
