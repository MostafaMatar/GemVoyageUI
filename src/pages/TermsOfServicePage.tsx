import React from "react";
import TermsOfService from "../components/TermsOfService";
import SEOHelmet from '@/components/SEOHelmet';

const TermsOfServicePage: React.FC = () => (
  <div className="min-h-screen bg-background">
    <SEOHelmet
      title="Terms of Service | GemVoyage"
      description="Read the terms of service for GemVoyage, the platform for discovering and sharing hidden travel gems and unique destinations worldwide."
      keywords="terms of service, user agreement, platform rules, hidden gems platform"
      canonicalUrl={window.location.href}
      ogTitle="Terms of Service | GemVoyage"
      ogDescription="Read the terms of service for GemVoyage, the platform for discovering and sharing hidden travel gems and unique destinations."
      ogType="website"
      twitterTitle="Terms of Service | GemVoyage"
      twitterDescription="Read the terms of service for GemVoyage, the platform for discovering and sharing hidden travel gems and unique destinations."
    />
    <TermsOfService />
  </div>
);

export default TermsOfServicePage;
