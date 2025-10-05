# CityCarousel Component

A React component that fetches and displays cities in a beautiful full-width carousel UI with auto-switching functionality. This component integrates with the CityController.java API to retrieve all cities and presents them in an immersive, full-screen carousel format.

## Features

- **Full-width design**: Cities displayed as immersive, full-width cards with background images
- **Auto-switching**: Automatically cycles through cities every 5 seconds (when multiple cities exist)
- **Background images**: City images serve as stunning backgrounds with overlay gradients
- **Large typography**: City names and descriptions prominently displayed with main fonts
- **Interactive controls**: Navigation buttons on sides and dot indicators below
- **Responsive scaling**: Images subtly scale on active slides for enhanced visual appeal
- **Auto-loading states**: Shows skeleton loading while fetching data
- **Error handling**: Graceful error display with retry capabilities
- **Image fallback**: Displays a gradient background when city images fail to load
- **Accessibility**: Full keyboard navigation and screen reader support

## Design Specifications

- **Card height**: 500px for immersive viewing
- **Background**: City images as full background with gradient overlays
- **Typography**: Large, bold city names (4xl-6xl) with readable descriptions
- **Auto-play**: 5-second intervals with pause on user interaction
- **Navigation**: Side buttons (left/right) and dot indicators for manual control
- **Visual effects**: Subtle zoom effect on active slides

## API Integration

The component fetches data from the `/api/city` endpoint which returns an array of cities with the following structure:

```typescript
interface City {
  id: string;
  name: string;
  description: string;
  image: string;
  createdAt?: string;
}
```

## Usage

### Basic Usage

```tsx
import CityCarousel from '@/components/CityCarousel';

const HomePage: React.FC = () => {
  return (
    <div>
      <CityCarousel />
    </div>
  );
};
```

### With Custom Styling

```tsx
import CityCarousel from '@/components/CityCarousel';

const CustomPage: React.FC = () => {
  return (
    <div>
      <CityCarousel className="bg-gray-50 dark:bg-gray-900 py-20" />
    </div>
  );
};
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Additional CSS classes to apply to the section wrapper |

## Component Structure

The `CityCarousel` component consists of:

1. **Section wrapper**: Contains the entire carousel section with title and description
2. **Carousel container**: Uses embla-carousel-react with autoplay for smooth carousel functionality
3. **Full-width CityCard components**: Immersive cards with background images and overlay content
4. **Navigation controls**: Side buttons for manual navigation (hidden when only one city)
5. **Dot indicators**: Below carousel for direct slide access and visual progress

## Responsive Behavior

- **All screen sizes**: Full-width display (one city per view)
- **Mobile**: Touch/swipe navigation with hidden side buttons
- **Desktop**: Side navigation buttons visible with hover effects
- **Typography**: Responsive text sizing (4xl on mobile to 6xl on large screens)

## Auto-play Functionality

- **Trigger**: Activates only when multiple cities are available
- **Interval**: 5 seconds between automatic transitions
- **Pause**: Stops on user interaction (hovering, clicking, swiping)
- **Resume**: Continues after interaction ends

## Loading States

The component handles three main states:

1. **Loading**: Shows animated skeleton placeholders
2. **Error**: Displays error message with the specific error details
3. **Empty**: Shows a friendly message when no cities are available
4. **Success**: Displays the carousel with city cards

## Styling

The component uses:
- **Tailwind CSS** for styling
- **shadcn/ui components** for consistent design
- **Lucide React icons** for visual elements
- **CSS transitions** for smooth animations

## Dependencies

- `@/components/ui/card` - Card components
- `@/components/ui/carousel` - Carousel functionality  
- `@/components/ui/badge` - Badge component
- `@/types` - TypeScript interfaces
- `@/lib/apiConfig` - API configuration
- `@/lib/utils` - Utility functions
- `lucide-react` - Icons
- `embla-carousel-react` - Carousel functionality
- `embla-carousel-autoplay` - Auto-play functionality

## API Endpoint Requirements

Ensure your backend CityController provides:

```java
@GetMapping
public ResponseEntity<List<City>> getAllCities() {
    List<City> cities = cityRepository.findAllByOrderByNameAsc();
    return ResponseEntity.ok(cities);
}
```

The endpoint should return cities sorted alphabetically by name for the best user experience.
