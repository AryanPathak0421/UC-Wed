import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../../hooks/useTheme';
import { useAuth } from '../../../contexts/AuthContext';
import Icon from '../../../components/ui/Icon';

const Signup = () => {
  const { theme } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      if (formData.name && formData.email && formData.password) {
        // Clear wedding details to force form
        localStorage.removeItem('weddingDetails');
        
        const result = await login(formData.email, formData.password);
        
        if (result.success) {
          console.log('Signup successful, navigating to wedding-details');
          setTimeout(() => {
            navigate('/user/wedding-details', { replace: true });
          }, 100);
        } else {
          setError('Account created but login failed. Please try logging in.');
        }
      } else {
        setError('Please fill in all fields');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: theme.semantic.background.secondary }}
    >
      {/* Header with Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=400&fit=crop&q=80"
          alt="Join Us"
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, ${theme.semantic.background.secondary} 100%)`
          }}
        />
        
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all active:scale-95"
          style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
        >
          <Icon name="chevronLeft" size="sm" className="text-white" />
        </button>

        {/* Brand Name */}
        <div className="absolute bottom-6 left-0 right-0 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Icon name="rings" size="lg" className="text-white drop-shadow-lg" />
            <h1 className="text-2xl font-bold text-white drop-shadow-lg">
              UtsavChakra
            </h1>
          </div>
          <p className="text-white/90 text-sm drop-shadow">
            Your Wedding Planning Partner
          </p>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 px-6 pt-8 pb-8">
        <div className="max-w-md mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 
              className="text-3xl font-bold mb-2"
              style={{ color: theme.semantic.text.primary }}
            >
              Create Account
            </h1>
            <p 
              className="text-sm"
              style={{ color: theme.semantic.text.secondary }}
            >
              Start planning your dream wedding today
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div 
              className="mb-6 p-4 rounded-xl flex items-start gap-3"
              style={{ 
                backgroundColor: '#fee2e2',
                border: '1px solid #fecaca'
              }}
            >
              <Icon name="alertCircle" size="sm" style={{ color: '#dc2626' }} />
              <p className="text-sm flex-1" style={{ color: '#dc2626' }}>
                {error}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 mb-6">
            {/* Name Input */}
            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: theme.semantic.text.primary }}
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Icon name="user" size="sm" style={{ color: theme.semantic.text.tertiary }} />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm transition-all"
                  style={{
                    backgroundColor: theme.semantic.background.primary,
                    border: `2px solid ${theme.semantic.border.primary}`,
                    color: theme.semantic.text.primary
                  }}
                  onFocus={(e) => e.target.style.borderColor = theme.colors.primary[500]}
                  onBlur={(e) => e.target.style.borderColor = theme.semantic.border.primary}
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: theme.semantic.text.primary }}
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Icon name="mail" size="sm" style={{ color: theme.semantic.text.tertiary }} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm transition-all"
                  style={{
                    backgroundColor: theme.semantic.background.primary,
                    border: `2px solid ${theme.semantic.border.primary}`,
                    color: theme.semantic.text.primary
                  }}
                  onFocus={(e) => e.target.style.borderColor = theme.colors.primary[500]}
                  onBlur={(e) => e.target.style.borderColor = theme.semantic.border.primary}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: theme.semantic.text.primary }}
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Icon name="lock" size="sm" style={{ color: theme.semantic.text.tertiary }} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl text-sm transition-all"
                  style={{
                    backgroundColor: theme.semantic.background.primary,
                    border: `2px solid ${theme.semantic.border.primary}`,
                    color: theme.semantic.text.primary
                  }}
                  onFocus={(e) => e.target.style.borderColor = theme.colors.primary[500]}
                  onBlur={(e) => e.target.style.borderColor = theme.semantic.border.primary}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <Icon 
                    name={showPassword ? 'eyeOff' : 'eye'} 
                    size="sm" 
                    style={{ color: theme.semantic.text.tertiary }} 
                  />
                </button>
              </div>
              <p className="text-xs mt-2" style={{ color: theme.semantic.text.tertiary }}>
                Must be at least 8 characters
              </p>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1"
                style={{ accentColor: theme.colors.primary[500] }}
              />
              <label 
                htmlFor="terms"
                className="text-xs"
                style={{ color: theme.semantic.text.secondary }}
              >
                I agree to the{' '}
                <button type="button" className="font-medium" style={{ color: theme.colors.primary[600] }}>
                  Terms of Service
                </button>
                {' '}and{' '}
                <button type="button" className="font-medium" style={{ color: theme.colors.primary[600] }}>
                  Privacy Policy
                </button>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl font-semibold text-white transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{
                background: `linear-gradient(135deg, ${theme.colors.primary[500]}, ${theme.colors.primary[600]})`,
                boxShadow: `0 4px 16px ${theme.colors.primary[500]}40`
              }}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px" style={{ backgroundColor: theme.semantic.border.light }} />
            <span className="text-xs" style={{ color: theme.semantic.text.tertiary }}>
              Or sign up with
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: theme.semantic.border.light }} />
          </div>

          {/* Social Signup */}
          <div className="flex gap-3 mb-8">
            <button
              className="flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
              style={{
                backgroundColor: theme.semantic.background.primary,
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
                backgroundColor: theme.semantic.background.primary,
                border: `1px solid ${theme.semantic.border.light}`
              }}
            >
              <Icon name="facebook" size="sm" style={{ color: '#1877F2' }} />
              <span className="text-sm font-medium" style={{ color: theme.semantic.text.primary }}>
                Facebook
              </span>
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p style={{ color: theme.semantic.text.secondary }}>
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="font-semibold"
                style={{ color: theme.colors.primary[600] }}
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;