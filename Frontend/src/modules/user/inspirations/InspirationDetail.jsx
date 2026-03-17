import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../../../hooks/useTheme';
import Icon from '../../../components/ui/Icon';
import Toast from '../../../components/ui/Toast';

const InspirationDetail = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Mock data based on id
  const inspirationData = {
    1: { title: 'Red Bridal Lehenga', category: 'Bridal', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&h=1200&fit=crop&q=80', saves: 1234, views: 5678, description: 'Stunning red bridal lehenga with intricate golden embroidery. Perfect for traditional wedding ceremonies.', vendor: 'Sabyasachi', tags: ['Bridal', 'Traditional', 'Red'] },
    2: { title: 'Pink Bridal Lehenga', category: 'Bridal', image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=1200&fit=crop&q=80', saves: 987, views: 4321, description: 'Elegant pink bridal lehenga with delicate floral embroidery. Ideal for modern brides.', vendor: 'Anita Dongre', tags: ['Bridal', 'Modern', 'Pink'] },
    3: { title: 'Golden Bridal Lehenga', category: 'Bridal', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=1200&fit=crop&q=80', saves: 2345, views: 8765, description: 'Luxurious golden bridal lehenga with royal embellishments. Perfect for grand celebrations.', vendor: 'Manish Malhotra', tags: ['Bridal', 'Luxury', 'Golden'] },
    4: { title: 'Intricate Bridal Mehndi', category: 'Mehndi', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&h=1200&fit=crop&q=80', saves: 3456, views: 12345, description: 'Beautiful intricate bridal mehndi design covering full hands and arms. Traditional patterns with modern elements.', vendor: 'Mehndi by Karuna', tags: ['Mehndi', 'Bridal', 'Intricate'] },
    5: { title: 'Arabic Mehndi Design', category: 'Mehndi', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&h=1200&fit=crop&q=80', saves: 2876, views: 9876, description: 'Elegant Arabic mehndi design with bold patterns and floral motifs. Perfect for contemporary styles.', vendor: 'Henna Art Studio', tags: ['Mehndi', 'Arabic', 'Modern'] },
  };

  const item = inspirationData[id] || inspirationData[1];

  const relatedItems = [
    { id: 10, title: 'Mandap Decoration', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=600&fit=crop&q=80' },
    { id: 11, title: 'Floral Decor Ideas', image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=600&fit=crop&q=80' },
    { id: 12, title: 'Stage Decoration', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=600&fit=crop&q=80' },
    { id: 13, title: 'Entrance Decor', image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=400&h=600&fit=crop&q=80' },
  ];

  const handleSave = () => {
    setIsSaved(!isSaved);
    setToastMessage(isSaved ? 'Removed from saved' : 'Saved to your collection');
    setShowToast(true);
  };

  const handleShare = () => {
    setToastMessage('Link copied to clipboard');
    setShowToast(true);
  };

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: theme.semantic.background.primary }}>
      {/* Header */}
      <div 
        className="sticky top-0 z-40 px-4 py-4 border-b backdrop-blur-md bg-opacity-90"
        style={{ 
          backgroundColor: theme.semantic.background.primary,
          borderBottomColor: theme.semantic.border.light
        }}
      >
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full transition-colors"
            style={{ backgroundColor: theme.semantic.background.accent }}
          >
            <Icon name="chevronDown" size="sm" className="rotate-90" style={{ color: theme.semantic.text.primary }} />
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full transition-colors"
              style={{ backgroundColor: theme.semantic.background.accent }}
            >
              <Icon name="share" size="sm" style={{ color: theme.semantic.text.primary }} />
            </button>
            <button
              onClick={handleSave}
              className="p-2 rounded-full transition-colors"
              style={{ 
                backgroundColor: isSaved ? theme.colors.primary[500] : theme.semantic.background.accent 
              }}
            >
              <Icon name="heart" size="sm" style={{ color: isSaved ? 'white' : theme.semantic.text.primary }} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Image */}
      <div className="relative">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-[60vh] object-cover"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1200&fit=crop&q=80';
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Title & Stats */}
        <div>
          <h1 
            className="text-2xl font-bold mb-2"
            style={{ color: theme.semantic.text.primary }}
          >
            {item.title}
          </h1>
          <div className="flex items-center gap-4 text-sm" style={{ color: theme.semantic.text.secondary }}>
            <span className="flex items-center gap-1">
              <Icon name="heart" size="xs" />
              {item.saves} saves
            </span>
            <span className="flex items-center gap-1">
              <Icon name="eye" size="xs" />
              {item.views} views
            </span>
            <span 
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{ 
                backgroundColor: theme.semantic.background.accent,
                color: theme.colors.primary[500]
              }}
            >
              {item.category}
            </span>
          </div>
        </div>

        {/* Description */}
        <div>
          <h2 
            className="text-lg font-semibold mb-2"
            style={{ color: theme.semantic.text.primary }}
          >
            About
          </h2>
          <p 
            className="text-sm leading-relaxed"
            style={{ color: theme.semantic.text.secondary }}
          >
            {item.description}
          </p>
        </div>

        {/* Vendor */}
        <div 
          className="p-4 rounded-xl"
          style={{ backgroundColor: theme.semantic.background.accent }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs" style={{ color: theme.semantic.text.secondary }}>
                Featured by
              </p>
              <p className="font-semibold" style={{ color: theme.semantic.text.primary }}>
                {item.vendor}
              </p>
            </div>
            <button
              onClick={() => navigate('/user/vendors')}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{ 
                backgroundColor: theme.colors.primary[500],
                color: 'white'
              }}
            >
              View Vendor
            </button>
          </div>
        </div>

        {/* Tags */}
        <div>
          <h2 
            className="text-lg font-semibold mb-3"
            style={{ color: theme.semantic.text.primary }}
          >
            Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1.5 rounded-full text-sm"
                style={{ 
                  backgroundColor: theme.semantic.background.accent,
                  color: theme.semantic.text.primary
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related Inspirations */}
        <div>
          <h2 
            className="text-lg font-semibold mb-3"
            style={{ color: theme.semantic.text.primary }}
          >
            Related Inspirations
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {relatedItems.map((related) => (
              <div
                key={related.id}
                onClick={() => navigate(`/user/inspirations/${related.id}`)}
                className="cursor-pointer group"
              >
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src={related.image}
                    alt={related.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=600&fit=crop&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                  <p className="absolute bottom-2 left-2 right-2 text-white text-sm font-medium">
                    {related.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showToast && (
        <Toast
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default InspirationDetail;
