
export interface Gem {
  id: string;
  title: string;
  description: string;
  location: {
    city: string;
    country: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
  imageUrl: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
  upvotes: number;
  downvotes: number;
  category: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  gemId: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
}
