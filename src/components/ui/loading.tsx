import React from 'react';

// Main app loading spinner
export const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
  </div>
);

// Generic content loading
export const ContentLoading = ({ height = "h-64" }: { height?: string }) => (
  <div className={`${height} flex items-center justify-center bg-gray-50 rounded-lg`}>
    <div className="animate-pulse flex space-x-4">
      <div className="rounded-full bg-gray-300 h-10 w-10"></div>
      <div className="flex-1 space-y-2 py-1">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  </div>
);

// Gem card skeleton
export const GemCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-300"></div>
    <div className="p-4">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-gray-300 rounded w-full mb-1"></div>
      <div className="h-3 bg-gray-300 rounded w-2/3"></div>
    </div>
  </div>
);

// Navbar skeleton
export const NavbarSkeleton = () => (
  <div className="h-16 bg-gray-100 border-b animate-pulse flex items-center px-4">
    <div className="h-8 w-32 bg-gray-300 rounded"></div>
    <div className="ml-auto flex space-x-4">
      <div className="h-8 w-16 bg-gray-300 rounded"></div>
      <div className="h-8 w-16 bg-gray-300 rounded"></div>
    </div>
  </div>
);

// Footer skeleton
export const FooterSkeleton = () => (
  <div className="h-24 bg-gray-100 border-t animate-pulse"></div>
);

// Vote buttons skeleton
export const VoteButtonsSkeleton = () => (
  <div className="flex items-center space-x-2 animate-pulse">
    <div className="h-10 w-16 bg-gray-300 rounded"></div>
    <div className="h-10 w-16 bg-gray-300 rounded"></div>
  </div>
);

// Comment section skeleton
export const CommentSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    <div className="h-6 bg-gray-300 rounded w-1/4"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
    </div>
  </div>
);

// Author info skeleton
export const AuthorSkeleton = () => (
  <div className="flex items-center space-x-3 animate-pulse">
    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
    <div className="space-y-1">
      <div className="h-4 bg-gray-300 rounded w-24"></div>
      <div className="h-3 bg-gray-300 rounded w-16"></div>
    </div>
  </div>
);

// Editor skeleton
export const EditorSkeleton = () => (
  <div className="w-full h-64 bg-gray-100 border border-gray-300 rounded animate-pulse flex items-center justify-center">
    <div className="text-gray-500">Loading editor...</div>
  </div>
);
