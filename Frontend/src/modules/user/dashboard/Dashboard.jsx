import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../hooks/useTheme';
import { useAuth } from '../../../contexts/AuthContext';
import Icon from '../../../components/ui/Icon';

const Dashboard = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  const dashboardOptions = [
    {
      id: 'news',
      title: 'News & Updates',
      subtitle: 'Latest wedding trends',
      icon: 'news',
      route: '/user/news',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop&q=80',
      gradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.75) 0%, rgba(244, 114, 182, 0.75) 100%)',
      shadowColor: 'rgba(236, 72, 153, 0.4)',
      stats: '50+ Articles'
    },
    {
      id: 'plan',
      title: 'Plan',
      subtitle: 'Plan your event',
      icon: 'plan',
      route: '/user/requirements',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop&q=80',
      gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.75) 0%, rgba(251, 191, 36, 0.75) 100%)',
      shadowColor: 'rgba(245, 158, 11, 0.4)',
      stats: 'Event Planning'
    },
    {
      id: 'horoscope',
      title: 'Horoscope',
      subtitle: 'Check your horoscope',
      icon: 'star',
      route: '/user/horoscope',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop&q=80',
      gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.75) 0%, rgba(52, 211, 153, 0.75) 100%)',
      shadowColor: 'rgba(16, 185, 129, 0.4)',
      stats: 'Daily Predictions'
    },
    {
      id: 'home',
      title: 'Explore Home',
      subtitle: 'Browse all services',
      icon: 'sparkles',
      route: '/user/home',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop&q=80',
      gradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.75) 0%, rgba(167, 139, 250, 0.75) 100%)',
      shadowColor: 'rgba(139, 92, 246, 0.4)',
      stats: 'All Categories'
    }
  ];

  const handleCardClick = (option) => {
    if (option.id === 'plan') {
      const saved = localStorage.getItem('eventDetails');
      let hasRequirements = false;
      try {
        if (saved && saved !== 'null' && saved !== 'undefined') {
          const parsed = JSON.parse(saved);
          hasRequirements = parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0;
        }
      } catch (e) {
        hasRequirements = false;
      }

      if (hasRequirements) {
        navigate('/user/planning-dashboard');
      } else {
        navigate('/user/requirements');
      }
      return;
    }
    navigate(option.route);
  };

  // Get user's first name or default greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const userName = user?.name?.split(' ')[0] || 'There';

  return (
    <div
      className="min-h-screen px-4 py-8"
      style={{ backgroundColor: theme.semantic.background.secondary }}
    >
      <div className="w-full max-w-2xl mx-auto">
        {/* Enhanced Header with Greeting */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1
                className="text-3xl font-bold mb-1"
                style={{ color: theme.semantic.text.primary }}
              >
                {getGreeting()}, {userName}! 👋
              </h1>
              <p
                className="text-sm"
                style={{ color: theme.semantic.text.secondary }}
              >
                Let's make your event planning easier
              </p>
            </div>
            <button
              onClick={() => navigate('/user/account')}
              className="w-12 h-12 rounded-full overflow-hidden border-2 transition-transform hover:scale-105"
              style={{
                borderColor: theme.colors.primary[500],
                backgroundColor: theme.semantic.background.primary
              }}
            >
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ backgroundColor: theme.colors.primary[100] }}
              >
                <Icon name="account" size="lg" style={{ color: theme.colors.primary[500] }} />
              </div>
            </button>
          </div>

          {/* Quick Stats Bar */}
          <div
            className="grid grid-cols-3 gap-3 p-4 rounded-xl"
            style={{
              backgroundColor: theme.semantic.background.primary,
              border: `1px solid ${theme.semantic.border.primary}`
            }}
          >
            <div className="text-center">
              <div
                className="text-2xl font-bold"
                style={{ color: theme.colors.primary[500] }}
              >
                12
              </div>
              <div
                className="text-xs"
                style={{ color: theme.semantic.text.secondary }}
              >
                Tasks Left
              </div>
            </div>
            <div className="text-center border-l border-r" style={{ borderColor: theme.semantic.border.primary }}>
              <div
                className="text-2xl font-bold"
                style={{ color: theme.colors.secondary[500] }}
              >
                8
              </div>
              <div
                className="text-xs"
                style={{ color: theme.semantic.text.secondary }}
              >
                Vendors Saved
              </div>
            </div>
            <div className="text-center">
              <div
                className="text-2xl font-bold"
                style={{ color: theme.colors.accent[500] }}
              >
                45
              </div>
              <div
                className="text-xs"
                style={{ color: theme.semantic.text.secondary }}
              >
                Days to Go
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced 2x2 Grid of Cards with Images - Swiggy Style Square Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {dashboardOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleCardClick(option)}
              className="dashboard-card relative overflow-hidden rounded-3xl transition-all duration-300 active:scale-95 text-left"
              style={{
                boxShadow: `0 4px 12px ${option.shadowColor}`,
                aspectRatio: '1',
                backgroundColor: theme.semantic.background.primary
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 12px 24px ${option.shadowColor}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 4px 12px ${option.shadowColor}`;
              }}
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <img
                  src={option.image}
                  alt={option.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop&q=80';
                  }}
                />
                {/* Gradient overlay - lighter for better image visibility */}
                <div
                  className="absolute inset-0"
                  style={{ background: option.gradient }}
                />
                {/* Bottom gradient for text readability (Swiggy style) */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(0, 0, 0, 0.4) 100%)'
                  }}
                />
              </div>

              {/* Content */}
              <div className="relative z-10 p-4 h-full flex flex-col justify-between">
                {/* Top Section - Icon */}
                <div className="flex items-start justify-between">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <Icon name={option.icon} size="md" style={{ color: 'white' }} />
                  </div>
                </div>

                {/* Bottom Section - Title, Subtitle and Stats */}
                <div>
                  <h3 className="text-base font-bold text-white mb-0.5" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}>
                    {option.title}
                  </h3>
                  <p
                    className="text-xs mb-2"
                    style={{
                      color: 'rgba(255, 255, 255, 0.95)',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    {option.subtitle}
                  </p>
                  <div
                    className="inline-block px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      backdropFilter: 'blur(10px)',
                      color: 'white',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    {option.stats}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* My Work Section */}
        <div
          className="p-4 rounded-xl"
          style={{
            backgroundColor: theme.semantic.background.primary,
            border: `1px solid ${theme.semantic.border.primary}`
          }}
        >
          <h3
            className="text-sm font-semibold mb-3"
            style={{ color: theme.semantic.text.primary }}
          >
            My Work
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: 'search', label: 'Search', route: '/user/search' },
              { icon: 'heart', label: 'Favorites', route: '/user/favourites' },
              { icon: 'settings', label: 'Settings', route: '/user/account' }
            ].map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.route)}
                className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all hover:scale-105"
                style={{
                  backgroundColor: theme.semantic.background.secondary
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: theme.colors.primary[100] }}
                >
                  <Icon name={action.icon} size="md" style={{ color: theme.colors.primary[500] }} />
                </div>
                <span
                  className="text-xs font-medium"
                  style={{ color: theme.semantic.text.secondary }}
                >
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer Inspiration */}
        <div className="text-center mt-6">
          <p
            className="text-xs italic"
            style={{ color: theme.semantic.text.tertiary }}
          >
            "Every great love story deserves a perfect celebration" ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
