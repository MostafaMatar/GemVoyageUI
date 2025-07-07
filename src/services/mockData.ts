
import { Gem } from '../types';

// Sample data for development
export const mockGems: Gem[] = [
  {
    id: '1',
    title: 'Hidden Waterfall in Bali',
    description: 'A secluded waterfall away from the tourist crowds, perfect for a peaceful swim surrounded by lush jungle. The hike to get here is about 30 minutes through dense forest, but the reward is worth every step.',
    location: {
      city: 'Ubud',
      country: 'Indonesia',
    },
    coordinates: {
      lat: -8.5069,
      lng: 115.2625,
    },
    imageUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    author: {
      id: 'user1',
      name: 'Maya Wong',
      avatar: 'https://i.pravatar.cc/150?u=user1',
    },
    createdAt: '2023-06-15T10:30:00Z',
    upvotes: 142,
    downvotes: 5,
    category: 'Nature',
    comments: [
      {
        id: 'comment1',
        gemId: '1',
        author: {
          id: 'user2',
          name: 'James Smith',
          avatar: 'https://i.pravatar.cc/150?u=user2',
        },
        content: 'I visited this place last month and it was even more beautiful than your photo shows. Definitely worth the trek!',
        createdAt: '2023-06-18T14:15:00Z',
        upvotes: 24,
        downvotes: 0,
      },
      {
        id: 'comment2',
        gemId: '1',
        author: {
          id: 'user3',
          name: 'Sophia Chen',
          avatar: 'https://i.pravatar.cc/150?u=user3',
        },
        content: 'Could you share the exact location? I\'ll be in Ubud next week and would love to visit.',
        createdAt: '2023-06-20T09:45:00Z',
        upvotes: 12,
        downvotes: 0,
      },
    ],
  },
  {
    id: '2',
    title: 'Secret Rooftop Bar in Tokyo',
    description: 'This speakeasy-style bar is hidden in plain sight. Enter through what looks like a normal bookstore, head to the back, and take the unmarked elevator to the top floor. You\'ll find incredible views of the Tokyo skyline and unique cocktails you won\'t find anywhere else.',
    location: {
      city: 'Tokyo',
      country: 'Japan',
    },
    coordinates: {
      lat: 35.6762,
      lng: 139.6503,
    },
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    author: {
      id: 'user4',
      name: 'Takashi Yamamoto',
      avatar: 'https://i.pravatar.cc/150?u=user4',
    },
    createdAt: '2023-05-20T18:45:00Z',
    upvotes: 89,
    downvotes: 3,
    category: 'Nightlife',
    comments: [
      {
        id: 'comment3',
        gemId: '2',
        author: {
          id: 'user5',
          name: 'Emma Johnson',
          avatar: 'https://i.pravatar.cc/150?u=user5',
        },
        content: 'The cocktails here are amazing! I recommend trying the Sakura Sunset.',
        createdAt: '2023-05-22T21:15:00Z',
        upvotes: 18,
        downvotes: 0,
      },
    ],
  },
  {
    id: '3',
    title: 'Ancient Roman Bath in Budapest',
    description: 'This hidden Roman bath is tucked away beneath a modern building. Few tourists know about it, but it\'s one of the best-preserved Roman baths in Europe. The water is naturally heated and rich in minerals.',
    location: {
      city: 'Budapest',
      country: 'Hungary',
    },
    coordinates: {
      lat: 47.4979,
      lng: 19.0402,
    },
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    author: {
      id: 'user6',
      name: 'Viktor Nagy',
      avatar: 'https://i.pravatar.cc/150?u=user6',
    },
    createdAt: '2023-07-05T13:20:00Z',
    upvotes: 214,
    downvotes: 8,
    category: 'Historical',
    comments: [
      {
        id: 'comment4',
        gemId: '3',
        author: {
          id: 'user7',
          name: 'Olivia Wilson',
          avatar: 'https://i.pravatar.cc/150?u=user7',
        },
        content: 'I had no idea this existed! Adding it to my Budapest itinerary right now.',
        createdAt: '2023-07-06T10:10:00Z',
        upvotes: 32,
        downvotes: 0,
      },
      {
        id: 'comment5',
        gemId: '3',
        author: {
          id: 'user8',
          name: 'Lucas Müller',
          avatar: 'https://i.pravatar.cc/150?u=user8',
        },
        content: 'What\'s the best time of day to visit to avoid crowds?',
        createdAt: '2023-07-07T15:30:00Z',
        upvotes: 15,
        downvotes: 0,
      },
    ],
  },
  {
    id: '4',
    title: 'Secret Beach Cave in Portugal',
    description: 'This hidden sea cave can only be accessed during low tide. You have to swim through a narrow passage, but inside you\'ll find a secluded beach with crystal clear water surrounded by towering rock formations.',
    location: {
      city: 'Lagos',
      country: 'Portugal',
    },
    coordinates: {
      lat: 37.1028,
      lng: -8.6731,
    },
    imageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    author: {
      id: 'user9',
      name: 'Miguel Santos',
      avatar: 'https://i.pravatar.cc/150?u=user9',
    },
    createdAt: '2023-06-28T11:15:00Z',
    upvotes: 176,
    downvotes: 2,
    category: 'Beach',
    comments: [
      {
        id: 'comment6',
        gemId: '4',
        author: {
          id: 'user10',
          name: 'Hannah Taylor',
          avatar: 'https://i.pravatar.cc/150?u=user10',
        },
        content: 'Is it safe to swim through the passage? I\'m a decent swimmer but not an expert.',
        createdAt: '2023-06-29T16:40:00Z',
        upvotes: 8,
        downvotes: 0,
      },
      {
        id: 'comment7',
        gemId: '4',
        author: {
          id: 'user11',
          name: 'Daniel Brown',
          avatar: 'https://i.pravatar.cc/150?u=user11',
        },
        content: 'Visited last week - absolutely magical! Just make sure to check tide times carefully.',
        createdAt: '2023-07-02T09:20:00Z',
        upvotes: 21,
        downvotes: 0,
      },
    ],
  },
  {
    id: '5',
    title: 'Hidden Mountain Tea House in Taiwan',
    description: 'Perched on a misty mountainside, this traditional tea house is accessed via a hidden trail that branches off from the main tourist path. The owners have been cultivating tea on this mountain for five generations, and they serve varieties you can\'t find anywhere else.',
    location: {
      city: 'Taipei',
      country: 'Taiwan',
    },
    coordinates: {
      lat: 25.0330,
      lng: 121.5654,
    },
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    author: {
      id: 'user12',
      name: 'Li Wei',
      avatar: 'https://i.pravatar.cc/150?u=user12',
    },
    createdAt: '2023-04-12T08:30:00Z',
    upvotes: 103,
    downvotes: 4,
    category: 'Culinary',
    comments: [
      {
        id: 'comment8',
        gemId: '5',
        author: {
          id: 'user13',
          name: 'Rebecca Anderson',
          avatar: 'https://i.pravatar.cc/150?u=user13',
        },
        content: 'The hike up is so worth it! I recommend going early in the morning when the mist is still lingering.',
        createdAt: '2023-04-15T14:50:00Z',
        upvotes: 16,
        downvotes: 0,
      },
    ],
  },
  {
    id: '6',
    title: 'Abandoned Railway Tunnel Park in Australia',
    description: 'This former railway tunnel has been transformed into a unique park. The tunnel runs for almost a kilometer through a mountain and opens up to a stunning valley view. Bring a flashlight as parts of the tunnel are unlit, creating a mysterious atmosphere.',
    location: {
      city: 'Adelaide',
      country: 'Australia',
    },
    coordinates: {
      lat: -34.9285,
      lng: 138.6007,
    },
    imageUrl: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    author: {
      id: 'user14',
      name: 'Sarah Thompson',
      avatar: 'https://i.pravatar.cc/150?u=user14',
    },
    createdAt: '2023-05-02T16:45:00Z',
    upvotes: 87,
    downvotes: 6,
    category: 'Urban Exploration',
    comments: [
      {
        id: 'comment9',
        gemId: '6',
        author: {
          id: 'user15',
          name: 'Ethan Parker',
          avatar: 'https://i.pravatar.cc/150?u=user15',
        },
        content: 'I took some amazing long-exposure photographs in the tunnel. The acoustics are incredible too!',
        createdAt: '2023-05-08T20:25:00Z',
        upvotes: 10,
        downvotes: 0,
      },
    ],
  },
];

// Function to get all gems
export const getAllGems = (): Promise<Gem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockGems), 500);
  });
};

// Function to get a gem by ID
export const getGemById = (id: string): Promise<Gem | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockGems.find((gem) => gem.id === id)), 500);
  });
};

// Function to get featured gems (top 3 by upvotes)
export const getFeaturedGems = (): Promise<Gem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const featured = [...mockGems].sort((a, b) => b.upvotes - a.upvotes).slice(0, 3);
      resolve(featured);
    }, 500);
  });
};

// Categories for filtering
export const categories = [
  'All',
  'Nature',
  'Beach',
  'Culinary',
  'Nightlife',
  'Historical',
  'Urban Exploration',
];

// Regions for filtering
export const regions = [
  'All Regions',
  'Asia',
  'Europe',
  'Africa',
  'North America',
  'South America',
  'Oceania',
];
