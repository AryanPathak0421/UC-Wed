import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import Button from '../ui/Button';
import Icon from '../ui/Icon';

const Welcome = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    {
      title: 'Find Perfect Vendors',
      description: 'Connect with top-rated wedding vendors in your city',
      icon: 'users'
    },
    {
      title: 'Plan Your Budget',
      description: 'Smart tools to manage your wedding expenses',
      icon: 'money'
    },
    {
      title: 'Get Inspired',
      description: 'Browse thousands of wedding ideas and themes',
      icon: 'heart'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: theme.semantic.background.primary }}
    >
      {/* Hero Section with Image */}
      <div className="relative h-[55vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop&q=80"
          alt="Wedding"
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, ${theme.colors.primary[900]}95 100%)`
          }}
        />
        
        {/* Brand Name at Top */}
        <div className="absolute top-8 left-0 right-0 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Icon name="rings" size="lg" className="text-white drop-shadow-lg" />
            <h1 className="text-2xl font-bold text-white drop-shadow-lg">
              UtsavChakra
            </h1>
          </div>
        </div>

        {/* Main Heading */}
        <div className="absolute bottom-8 left-0 right-0 px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
            Your Dream Wedding
          </h2>
          <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
            Starts Here
          </h2>
          <p className="text-white/90 text-sm drop-shadow">
            Plan, organize, and celebrate your perfect day
          </p>
        </div>
      </div>

      {/* Features Carousel */}
      <div className="flex-1 px-6 py-8">
        <div className="max-w-md mx-auto">
          {/* Feature Cards */}
          <div className="relative h-32 mb-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-500 ${
                  index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
              >
                <div 
                  className="p-6 rounded-2xl h-full flex items-center gap-4"
                  style={{ 
                    backgroundColor: theme.semantic.background.accent,
                    border: `1px solid ${theme.semantic.border.light}`
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: theme.colors.primary[100] }}
                  >
                    <Icon name={feature.icon} size="md" style={{ color: theme.colors.primary[600] }} />
                  </div>
                  <div>
                    <h3 
                      className="font-semibold mb-1"
                      style={{ color: theme.semantic.text.primary }}
                    >
                      {feature.title}
                    </h3>
                    <p 
                      className="text-sm"
                      style={{ color: theme.semantic.text.secondary }}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mb-8">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className="transition-all duration-300"
                style={{
                  width: index === currentSlide ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: index === currentSlide 
                    ? theme.colors.primary[500] 
                    : theme.semantic.border.primary
                }}
              />
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => navigate('/signup')}
              className="w-full py-4 rounded-xl font-semibold text-white transition-all active:scale-95"
              style={{
                background: `linear-gradient(135deg, ${theme.colors.primary[500]}, ${theme.colors.primary[600]})`,
                boxShadow: `0 4px 16px ${theme.colors.primary[500]}40`
              }}
            >
              Get Started
            </button>

            <button
              onClick={() => navigate('/login')}
              className="w-full py-4 rounded-xl font-semibold transition-all active:scale-95"
              style={{
                backgroundColor: theme.semantic.background.accent,
                color: theme.colors.primary[600],
                border: `2px solid ${theme.colors.primary[500]}`
              }}
            >
              I Already Have an Account
            </button>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ backgroundColor: theme.semantic.border.light }} />
              <span className="text-xs" style={{ color: theme.semantic.text.tertiary }}>
                Or continue with
              </span>
              <div className="flex-1 h-px" style={{ backgroundColor: theme.semantic.border.light }} />
            </div>

            <div className="flex gap-3">
              <button
                className="flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
                style={{
                  backgroundColor: theme.semantic.background.accent,
                  border: `1px solid ${theme.semantic.border.light}`
                }}
              >
                <Icon name="google" size="sm" style={{ color: '#DB4437' }} />
                <span className="text-sm font-medium" style={{ color: theme.semantic.text.primary }}>
                  Google
                </span>
              </button>

              <button
                className="flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
                style={{
                  backgroundColor: theme.semantic.background.accent,
                  border: `1px solid ${theme.semantic.border.light}`
                }}
              >
                <Icon name="facebook" size="sm" style={{ color: '#1877F2' }} />
                <span className="text-sm font-medium" style={{ color: theme.semantic.text.primary }}>
                  Facebook
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;