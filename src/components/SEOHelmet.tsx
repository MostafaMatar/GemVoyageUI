import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHelmetProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  noIndex?: boolean;
}

const SEOHelmet: React.FC<SEOHelmetProps> = ({
  title = 'GemVoyage - Discover Hidden Gems & Secret Destinations',
  description = 'Join GemVoyage to discover hidden travel destinations, connect with passionate explorers, and uncover the world\'s best-kept secrets.',
  keywords = 'hidden travel destinations, secret places, travel community, unique destinations, authentic travel, travel experiences, local favorites, hidden gems, travel exploration',
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage = 'https://gemvoyage.net/hero.jpg',
  ogType = 'website',
  twitterTitle,
  twitterDescription,
  twitterImage,
  noIndex = false,
}) => {
  const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : 'https://gemvoyage.net');
  const finalOgTitle = ogTitle || title;
  const finalOgDescription = ogDescription || description;
  const finalTwitterTitle = twitterTitle || title;
  const finalTwitterDescription = twitterDescription || description;
  const finalTwitterImage = twitterImage || ogImage;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {canonicalUrl && <link rel="canonical" href={currentUrl} />}
      
      {/* Robots */}
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="GemVoyage" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTwitterTitle} />
      <meta name="twitter:description" content={finalTwitterDescription} />
      <meta name="twitter:image" content={finalTwitterImage} />
      <meta name="twitter:site" content="@gemvoyage" />
      
      {/* Additional SEO Tags */}
      <meta name="author" content="GemVoyage" />
      <meta httpEquiv="Content-Language" content="en" />
    </Helmet>
  );
};

export default SEOHelmet;