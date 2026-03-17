import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../hooks/useTheme';
import Icon from '../../../components/ui/Icon';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';

const EInvites = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const categories = [
    { id: 'all', name: 'All Templates', icon: 'grid' },
    { id: 'traditional', name: 'Traditional', icon: 'star' },
    { id: 'modern', name: 'Modern', icon: 'trending' },
    { id: 'floral', name: 'Floral', icon: 'heart' },
    { id: 'minimal', name: 'Minimal', icon: 'layout' },
    { id: 'luxury', name: 'Luxury', icon: 'crown' }
  ];

  const templates = [
    {
      id: 1,
      name: 'Royal Elegance',
      category: 'luxury',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=600&fit=crop&q=80',
      price: 'Free',
      isPremium: false,
      colors: ['#8B4513', '#FFD700', '#FFFFFF'],
      features: ['Animated', 'Music', 'RSVP']
    },
    {
      id: 2,
      name: 'Floral Dreams',
      category: 'floral',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=600&fit=crop&q=80',
      price: 'Free',
      isPremium: false,
      colors: ['#FFB6C1', '#FFFFFF', '#90EE90'],
      features: ['Animated', 'RSVP']
    },
    {
      id: 3,
      name: 'Modern Chic',
      category: 'modern',
      image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=600&fit=crop&q=80',
      price: '₹299',
      isPremium: true,
      colors: ['#000000', '#FFFFFF', '#FF69B4'],
      features: ['Animated', 'Music', 'RSVP', 'Video']
    },
    {
      id: 4,
      name: 'Traditional Mandala',
      category: 'traditional',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=600&fit=crop&q=80',
      price: 'Free',
      isPremium: false,
      colors: ['#FF6347', '#FFD700', '#8B0000'],
      features: ['Animated', 'Music', 'RSVP']
    },
    {
      id: 5,
      name: 'Minimalist White',
      category: 'minimal',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=600&fit=crop&q=80',
      price: 'Free',
      isPremium: false,
      colors: ['#FFFFFF', '#000000', '#C0C0C0'],
      features: ['RSVP']
    },
    {
      id: 6,
      name: 'Golden Luxury',
      category: 'luxury',
      image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=400&h=600&fit=crop&q=80',
      price: '₹499',
      isPremium: true,
      colors: ['#FFD700', '#000000', '#FFFFFF'],
      features: ['Animated', 'Music', 'RSVP', 'Video', 'Gallery']
    },
    {
      id: 7,
      name: 'Pastel Flowers',
      category: 'floral',
      image: 'https://images.unsplash.com/photo-1519167758481-83f29d8ae8e4?w=400&h=600&fit=crop&q=80',
      price: '₹199',
      isPremium: true,
      colors: ['#FFE4E1', '#E6E6FA', '#F0E68C'],
      features: ['Animated', 'Music', 'RSVP']
    },
    {
      id: 8,
      name: 'Contemporary Art',
      category: 'modern',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=600&fit=crop&q=80',
      price: '₹399',
      isPremium: true,
      colors: ['#4169E1', '#FFFFFF', '#FF1493'],
      features: ['Animated', 'Music', 'RSVP', 'Video']
    },
    {
      id: 9,
      name: 'Classic Red',
      category: 'traditional',
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&h=600&fit=crop&q=80',
      price: 'Free',
      isPremium: false,
      colors: ['#DC143C', '#FFD700', '#FFFFFF'],
      features: ['Animated', 'RSVP']
    },
    {
      id: 10,
      name: 'Simple Elegance',
      category: 'minimal',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=600&fit=crop&q=80',
      price: 'Free',
      isPremium: false,
      colors: ['#F5F5F5', '#333333', '#D4AF37'],
      features: ['RSVP']
    },
    {
      id: 11,
      name: 'Rose Garden',
      category: 'floral',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=600&fit=crop&q=80',
      price: '₹299',
      isPremium: true,
      colors: ['#FF69B4', '#FFFFFF', '#32CD32'],
      features: ['Animated', 'Music', 'RSVP', 'Gallery']
    },
    {
      id: 12,
      name: 'Royal Palace',
      category: 'luxury',
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=600&fit=crop&q=80',
      price: '₹599',
      isPremium: true,
      colors: ['#800080', '#FFD700', '#FFFFFF'],
      features: ['Animated', 'Music', 'RSVP', 'Video', 'Gallery', 'Timeline']
    }
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  const myInvites = [
    {
      id: 1,
      name: 'Priya & Rahul Wedding',
      template: 'Royal Elegance',
      status: 'Published',
      views: 234,
      rsvps: 156,
      date: '15 March 2026',
      thumbnail: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=300&h=400&fit=crop&q=80'
    },
    {
      id: 2,
      name: 'Sangeet Ceremony',
      template: 'Floral Dreams',
      status: 'Draft',
      views: 0,
      rsvps: 0,
      date: '13 March 2026',
      thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=300&h=400&fit=crop&q=80'
    }
  ];

  const features = [
    { icon: 'edit', title: 'Easy Customization', description: 'Personalize every detail' },
    { icon: 'share', title: 'Easy Sharing', description: 'Share via WhatsApp, Email, SMS' },
    { icon: 'users', title: 'RSVP Tracking', description: 'Track guest responses' },
    { icon: 'chart', title: 'Analytics', description: 'View invitation statistics' },
    { icon: 'music', title: 'Add Music', description: 'Include your favorite songs' },
    { icon: 'image', title: 'Photo Gallery', description: 'Share your love story' }
  ];

  return (
    <div 
      className="min-h-screen pb-20"
      style={{ backgroundColor: theme.semantic.background.primary }}
    >
      {/* Header */}
      <div 
        className="sticky top-0 z-10 px-4 py-4 border-b"
        style={{
          backgroundColor: theme.semantic.background.primary,
          borderColor: theme.semantic.border.light
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg hover:bg-opacity-10 hover:bg-black transition-colors"
            >
              <Icon name="chevronLeft" size="md" style={{ color: theme.semantic.text.primary }} />
            </button>
            <div>
              <h1 
                className="text-xl font-bold"
                style={{ color: theme.semantic.text.primary }}
              >
                Digital E-Invites
              </h1>
              <p 
                className="text-sm"
                style={{ color: theme.semantic.text.secondary }}
              >
                Create beautiful wedding invitations
              </p>
            </div>
          </div>
          <Button
            onClick={() => navigate('/user/e-invites/create')}
            variant="primary"
            className="flex items-center gap-2"
          >
            <Icon name="plus" size="sm" />
            <span className="hidden sm:inline">Create New</span>
          </Button>
        </div>
      </div>

      <div className="px-4 py-6 max-w-7xl mx-auto">
        {/* My Invites Section */}
        {myInvites.length > 0 && (
          <div className="mb-8">
            <h2 
              className="text-lg font-semibold mb-4"
              style={{ color: theme.semantic.text.primary }}
            >
              My Invitations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {myInvites.map((invite) => (
                <Card key={invite.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={invite.thumbnail}
                      alt={invite.name}
                      className="w-full h-full object-cover"
                    />
                    <div 
                      className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold"
                      style={{
                        backgroundColor: invite.status === 'Published' ? theme.colors.accent[500] : theme.colors.secondary[500],
                        color: 'white'
                      }}
                    >
                      {invite.status}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 
                      className="font-semibold mb-1"
                      style={{ color: theme.semantic.text.primary }}
                    >
                      {invite.name}
                    </h3>
                    <p 
                      className="text-sm mb-3"
                      style={{ color: theme.semantic.text.secondary }}
                    >
                      {invite.template} • {invite.date}
                    </p>
                    <div className="flex items-center gap-4 mb-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Icon name="eye" size="sm" style={{ color: theme.semantic.text.secondary }} />
                        <span style={{ color: theme.semantic.text.secondary }}>{invite.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="users" size="sm" style={{ color: theme.semantic.text.secondary }} />
                        <span style={{ color: theme.semantic.text.secondary }}>{invite.rsvps} RSVPs</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => navigate(`/user/e-invites/edit/${invite.id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        className="flex-1"
                        onClick={() => navigate(`/user/e-invites/preview/${invite.id}`)}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="mb-8">
          <h2 
            className="text-lg font-semibold mb-4"
            style={{ color: theme.semantic.text.primary }}
          >
            Why Choose Digital Invites?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {features.map((feature, index) => (
              <Card key={index} className="p-4 text-center hover:shadow-md transition-shadow">
                <div 
                  className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center"
                  style={{ backgroundColor: theme.colors.primary[50] }}
                >
                  <Icon name={feature.icon} size="md" style={{ color: theme.colors.primary[500] }} />
                </div>
                <h3 
                  className="text-sm font-semibold mb-1"
                  style={{ color: theme.semantic.text.primary }}
                >
                  {feature.title}
                </h3>
                <p 
                  className="text-xs"
                  style={{ color: theme.semantic.text.secondary }}
                >
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <h2 
            className="text-lg font-semibold mb-4"
            style={{ color: theme.semantic.text.primary }}
          >
            Browse Templates
          </h2>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all"
                style={{
                  backgroundColor: selectedCategory === category.id 
                    ? theme.colors.primary[500] 
                    : theme.semantic.background.accent,
                  color: selectedCategory === category.id 
                    ? 'white' 
                    : theme.semantic.text.primary,
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: selectedCategory === category.id 
                    ? theme.colors.primary[500] 
                    : theme.semantic.border.light
                }}
              >
                <Icon 
                  name={category.icon} 
                  size="sm" 
                  style={{ 
                    color: selectedCategory === category.id 
                      ? 'white' 
                      : theme.semantic.text.secondary 
                  }} 
                />
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTemplates.map((template) => (
            <Card 
              key={template.id} 
              className="overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
              onClick={() => setSelectedTemplate(template)}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {template.isPremium && (
                  <div 
                    className="absolute top-2 left-2 px-2 py-1 rounded text-xs font-semibold flex items-center gap-1"
                    style={{ backgroundColor: theme.colors.accent[500], color: 'white' }}
                  >
                    <Icon name="crown" size="xs" />
                    Premium
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                  <Button
                    variant="primary"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/user/e-invites/customize/${template.id}`);
                    }}
                  >
                    Use Template
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 
                    className="font-semibold"
                    style={{ color: theme.semantic.text.primary }}
                  >
                    {template.name}
                  </h3>
                  <span 
                    className="text-sm font-bold"
                    style={{ color: template.isPremium ? theme.colors.accent[500] : theme.colors.primary[500] }}
                  >
                    {template.price}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {template.features.map((feature, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 rounded"
                      style={{
                        backgroundColor: theme.colors.primary[50],
                        color: theme.colors.primary[600]
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="flex gap-1">
                  {template.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full border-2"
                      style={{ 
                        backgroundColor: color,
                        borderColor: theme.semantic.border.light
                      }}
                    />
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <div 
              className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: theme.colors.primary[50] }}
            >
              <Icon name="search" size="2xl" style={{ color: theme.colors.primary[500] }} />
            </div>
            <h3 
              className="text-lg font-semibold mb-2"
              style={{ color: theme.semantic.text.primary }}
            >
              No templates found
            </h3>
            <p 
              className="text-sm mb-4"
              style={{ color: theme.semantic.text.secondary }}
            >
              Try selecting a different category
            </p>
            <Button
              variant="outline"
              onClick={() => setSelectedCategory('all')}
            >
              View All Templates
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EInvites;
