# CityDetail Page

A comprehensive page that displays detailed information about a specific city and all the gems (hidden places) discovered within it.

## Features

- **City Header**: Beautiful gradient header with city name and description
- **Gems Grid**: Display all gems in the city using GemCard components
- **Responsive Layout**: Works perfectly on all screen sizes
- **SEO Optimized**: Proper meta tags and structured data
- **Loading States**: Skeleton loading while fetching data
- **Error Handling**: Graceful error display and fallback UI
- **Back Navigation**: Easy return to previous page
- **Empty State**: Encourages users to add gems when none exist

## Route Structure

The page is accessible at `/city/:cityName` where `cityName` is URL-encoded.

Examples:
- `/city/new-york` → "New York"
- `/city/san-francisco` → "San Francisco" 
- `/city/los-angeles` → "Los Angeles"

## API Integration

Fetches data from the CityController endpoint:
- `GET /api/city/{cityName}/gems?size=20` - Gets paginated gems for the city

## Components Used

- **GemCard**: Displays individual gems in a grid layout
- **SEOHelmet**: Provides meta tags for search engines
- **Button**: For navigation and CTAs
- **Badge**: For displaying gem counts and labels
- **Loading components**: Skeleton loaders during data fetch

## Navigation Flow

1. User clicks on a city card in the CityCarousel
2. Navigation to `/city/{cityName}` 
3. Page loads city gems and displays them
4. User can click on individual gems to view details
5. Back button returns to previous page

## URL Encoding

City names are converted to URL-friendly format:
- Spaces → hyphens
- Lowercase conversion
- URI encoding for special characters

Example: "New York City" → "new-york-city"

## Future Enhancements

- Pagination for large numbers of gems
- Filtering and sorting options
- City image in header
- Related cities recommendations
