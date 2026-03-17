import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../hooks/useTheme';
import Icon from '../../../components/ui/Icon';

const VendorsMain = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [selectedCity] = useState('Indore');
  const [hoveredIcon, setHoveredIcon] = useState(null);

  // Vendor categories with exact styling from reference
  const vendorCategories = [
    {
      id: 'invites-gifts',
      name: 'Invites & Gifts',
      subtitle: 'Invitations, Favors, Trousseau Packages',
      bgColor: '#f3e8ff', // Light purple
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=400&fit=crop&crop=center',
      route: '/user/vendors/invites-gifts'
    },
    {
      id: 'food',
      name: 'Food',
      subtitle: 'Catering Services, Cake, Chaat & Food Stalls',
      bgColor: '#fce7f3', // Light pink
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=400&fit=crop&crop=center',
      route: '/user/vendors/food'
    },
    {
      id: 'pre-wedding-shoot',
      name: 'Pre Wedding Shoot',
      subtitle: 'Pre Wedding Photographers',
      bgColor: '#dbeafe', // Light blue
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=400&h=400&fit=crop&crop=center',
      route: '/user/vendors/pre-wedding-shoot'
    },
    {
      id: 'bridal-wear',
      name: 'Bridal Wear',
      subtitle: 'Bridal Lehengas, Kanjeevaram / Silk Sarees',
      bgColor: '#f0fdf4', // Light green
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop&crop=center',
      route: '/user/vendors/bridal-wear'
    },
    {
      id: 'groom-wear',
      name: 'Groom Wear',
      subtitle: 'Sherwani, Wedding Suits / Tuxes, Sehra',
      bgColor: '#f0f9ff', // Light cyan
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center',
      route: '/user/vendors/groom-wear'
    },
    {
      id: 'jewellery',
      name: 'Jewellery',
      subtitle: 'Jewellery, Flower Jewellery, Bridal Jewellery',
      bgColor: '#fef3c7', // Light yellow
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center',
      route: '/user/vendors/jewellery'
    },
    {
      id: 'pandits',
      name: 'Pandits',
      subtitle: 'Wedding Pandits',
      bgColor: '#fed7aa', // Light orange
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center',
      route: '/user/vendors/pandits'
    },
    {
      id: 'mehndi',
      name: 'Mehndi',
      subtitle: 'Mehendi Artists',
      bgColor: '#f3e8ff', // Light purple
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=400&fit=crop&crop=center',
      route: '/user/vendors/mehndi'
    },
    {
      id: 'music-dance',
      name: 'Music & Dance',
      subtitle: 'DJs, Sangeet Choreographer, Wedding Entertainment',
      bgColor: '#fce7f3', // Light pink
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center',
      route: '/user/vendors/music-dance'
    },
    {
      id: 'venues',
      name: 'Venues',
      subtitle: 'Banquet Halls, Marriage Garden / Lawn',
      bgColor: '#dbeafe', // Light blue
      image: 'https://images.unsplash.com/photo-1519167758481-83f29d8ae8e4?w=400&h=400&fit=crop&crop=center',
      route: '/user/vendors/venues'
    },
    {
      id: 'photographers',
      name: 'Photographers',
      subtitle: 'Photographers',
      bgColor: '#fce7f3', // Light pink
      image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=400&fit=crop&crop=center',
      route: '/user/vendors/photographers'
    },
    {
      id: 'makeup',
      name: 'Makeup',
      subtitle: 'Bridal Makeup Artists',
      bgColor: '#fecaca', // Light red
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=center',
      route: '/user/vendors/makeup'
    },
    {
      id: 'planning-decor',
      name: 'Planning & Decor',
      subtitle: 'Wedding Planners, Decorators',
      bgColor: '#fed7aa', // Light orange
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=400&fit=crop&crop=center',
      route: '/user/vendors/planning-decor'
    },
    {
      id: 'virtual-planning',
      name: 'Virtual Planning',
      subtitle: 'Virtual planning',
      bgColor: '#f0fdf4', // Light green
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=400&fit=crop&crop=center',
      route: '/user/vendors/virtual-planning'
    }
  ];

  const handleCategoryClick = (category) => {
    navigate(category.route, { 
      state: { 
        category: category.id,
        categoryTitle: category.name 
      } 
    });
  };

  const handleSearchClick = () => {
    navigate('/user/search');
  };

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: theme.semantic.background.primary }}>
      {/* Header Section */}
      <div className="px-4 py-4">
        {/* Title */}
        <h1 
          className="text-center text-lg font-medium mb-2"
          style={{ color: theme.semantic.text.primary }}
        >
          Vendor Categories
        </h1>
        
        {/* City Selector and Icons */}
        <div className="flex items-center justify-between">
          {/* City Selector - Left Side */}
          <div className="flex items-center space-x-1">
            <span 
              className="text-base font-medium"
              style={{ color: theme.colors.primary[500] }}
            >
              {selectedCity}
            </span>
            <Icon 
              name="chevronDown" 
              size="sm" 
              style={{ color: theme.colors.primary[500] }}
            />
          </div>
          
          {/* Right Icons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSearchClick}
              className="transition-colors"
              style={{ 
                color: hoveredIcon === 'search' ? theme.semantic.text.primary : theme.semantic.text.secondary,
                backgroundColor: 'transparent',
                border: 'none',
                padding: '8px'
              }}
              onMouseEnter={() => setHoveredIcon('search')}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <Icon name="search" size="md" />
            </button>
            <button
              className="transition-colors"
              style={{ 
                color: hoveredIcon === 'bookmark' ? theme.semantic.text.primary : theme.semantic.text.secondary,
                backgroundColor: 'transparent',
                border: 'none',
                padding: '8px'
              }}
              onMouseEnter={() => setHoveredIcon('bookmark')}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <Icon name="bookmark" size="md" />
            </button>
          </div>
        </div>
      </div>

      {/* Vendor Categories */}
      <div className="px-4 py-2">
        <div className="space-y-3">
          {vendorCategories.map((category) => (
            <div
              key={category.id}
              className="relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
              style={{ 
                backgroundColor: category.bgColor,
                height: '88px' // Fixed height matching reference
              }}
              onClick={() => handleCategoryClick(category)}
            >
              {/* Content Container */}
              <div className="flex items-center h-full px-4">
                {/* Left Side - Text Content */}
                <div className="flex-1 pr-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 
                      className="text-base font-medium"
                      style={{ color: theme.semantic.text.primary }}
                    >
                      {category.name}
                    </h3>
                    <Icon 
                      name="chevronDown" 
                      size="xs" 
                      style={{ color: theme.semantic.text.secondary }} 
                    />
                  </div>
                  <p 
                    className="text-sm line-clamp-1"
                    style={{ color: theme.semantic.text.secondary }}
                  >
                    {category.subtitle}
                  </p>
                </div>
                
                {/* Right Side - Circular Image */}
                <div className="relative">
                  <div 
                    className="w-16 h-16 rounded-full overflow-hidden shadow-md"
                    style={{
                      transform: 'translateX(8px)', // Partially crop into card edge
                    }}
                  >
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop&crop=center';
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom spacing for mobile navigation */}
      <div className="h-4"></div>
    </div>
  );
};

export default VendorsMain;