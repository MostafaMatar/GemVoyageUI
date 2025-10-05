// Example usage of CityCarousel component

import React from 'react';
import CityCarousel from '@/components/CityCarousel';

// Basic usage - displays all cities in a carousel
const HomePage: React.FC = () => {
  return (
    <div>
      {/* Other components */}
      
      <CityCarousel />
      
      {/* Other components */}
    </div>
  );
};

// Usage with custom styling
const CustomStyledPage: React.FC = () => {
  return (
    <div>
      {/* Other components */}
      
      <CityCarousel className="bg-gray-50 dark:bg-gray-900" />
      
      {/* Other components */}
    </div>
  );
};

export default HomePage;
