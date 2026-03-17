// Centralized theme configuration - Single source of truth for all colors
export const themeConfig = {
  // Core color palette
  colors: {
    // Primary brand colors (Pink/Rose)
    primary: {
      50: '#fdf2f8',
      100: '#fce7f3',
      200: '#fbcfe8',
      300: '#f9a8d4',
      400: '#f472b6',
      500: '#ec4899', // Main primary
      600: '#db2777',
      700: '#be185d',
      800: '#9d174d',
      900: '#831843',
      950: '#500724',
    },
    
    // Secondary colors (Amber/Gold)
    secondary: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b', // Main secondary
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
      950: '#451a03',
    },
    
    // Accent colors (Emerald/Green)
    accent: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981', // Main accent
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b',
      950: '#022c22',
    },
    
    // Neutral colors (Gray scale)
    neutral: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
      950: '#030712',
    },
    
    // Status colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  
  // Semantic color mappings
  semantic: {
    // Background colors
    background: {
      primary: '#ffffff',
      secondary: '#f9fafb',
      tertiary: '#f3f4f6',
      accent: '#fdf2f8',
      gradient: {
        primary: 'linear-gradient(135deg, #fdf2f8 0%, #fef3c7 100%)',
        hero: 'linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)',
        card: 'linear-gradient(135deg, #fdf2f8 0%, #fffbeb 100%)',
      },
    },
    
    // Text colors
    text: {
      primary: '#111827',
      secondary: '#4b5563',
      tertiary: '#9ca3af',
      inverse: '#ffffff',
      muted: '#d1d5db',
      accent: '#ec4899',
      link: '#ec4899',
      linkHover: '#db2777',
    },
    
    // Border colors
    border: {
      primary: '#e5e7eb',
      secondary: '#d1d5db',
      accent: '#fbcfe8',
      focus: '#ec4899',
      error: '#ef4444',
    },
    
    // Interactive states
    interactive: {
      hover: '#f9fafb',
      active: '#f3f4f6',
      focus: '#fdf2f8',
      disabled: '#f3f4f6',
    },
    
    // Component-specific colors
    card: {
      background: '#ffffff',
      border: '#e5e7eb',
      shadow: 'rgba(0, 0, 0, 0.05)',
      hover: '#f9fafb',
    },
    
    button: {
      primary: {
        background: '#ec4899',
        backgroundHover: '#db2777',
        text: '#ffffff',
        border: '#ec4899',
      },
      secondary: {
        background: '#f59e0b',
        backgroundHover: '#d97706',
        text: '#ffffff',
        border: '#f59e0b',
      },
      outline: {
        background: 'transparent',
        backgroundHover: '#fdf2f8',
        text: '#ec4899',
        border: '#fbcfe8',
        borderHover: '#ec4899',
      },
      ghost: {
        background: 'transparent',
        backgroundHover: '#fdf2f8',
        text: '#ec4899',
        border: 'transparent',
      },
    },
    
    input: {
      background: '#ffffff',
      border: '#d1d5db',
      borderFocus: '#ec4899',
      text: '#111827',
      placeholder: '#9ca3af',
    },
    
    navigation: {
      background: '#ffffff',
      border: '#e5e7eb',
      text: '#4b5563',
      textActive: '#ec4899',
      backgroundActive: '#fdf2f8',
      backgroundHover: '#f9fafb',
    },
  },
};

// Theme variants
export const themes = {
  light: {
    name: 'light',
    ...themeConfig,
  },
  
  dark: {
    name: 'dark',
    colors: {
      ...themeConfig.colors,
    },
    semantic: {
      ...themeConfig.semantic,
      background: {
        primary: '#111827',
        secondary: '#1f2937',
        tertiary: '#374151',
        accent: '#500724',
        gradient: {
          primary: 'linear-gradient(135deg, #500724 0%, #451a03 100%)',
          hero: 'linear-gradient(135deg, #be185d 0%, #b45309 100%)',
          card: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
        },
      },
      text: {
        primary: '#f9fafb',
        secondary: '#d1d5db',
        tertiary: '#9ca3af',
        inverse: '#111827',
        muted: '#6b7280',
        accent: '#f9a8d4',
        link: '#f9a8d4',
        linkHover: '#fce7f3',
      },
      card: {
        background: '#1f2937',
        border: '#374151',
        shadow: 'rgba(0, 0, 0, 0.3)',
        hover: '#374151',
      },
      navigation: {
        background: '#1f2937',
        border: '#374151',
        text: '#d1d5db',
        textActive: '#f9a8d4',
        backgroundActive: '#500724',
        backgroundHover: '#374151',
      },
    },
  },
};

export const defaultTheme = themes.light;

// CSS variable names mapping
export const cssVariables = {
  primary: {
    50: '--color-primary-50',
    100: '--color-primary-100',
    200: '--color-primary-200',
    300: '--color-primary-300',
    400: '--color-primary-400',
    500: '--color-primary-500',
    600: '--color-primary-600',
    700: '--color-primary-700',
    800: '--color-primary-800',
    900: '--color-primary-900',
    950: '--color-primary-950',
  },
  secondary: {
    50: '--color-secondary-50',
    100: '--color-secondary-100',
    200: '--color-secondary-200',
    300: '--color-secondary-300',
    400: '--color-secondary-400',
    500: '--color-secondary-500',
    600: '--color-secondary-600',
    700: '--color-secondary-700',
    800: '--color-secondary-800',
    900: '--color-secondary-900',
    950: '--color-secondary-950',
  },
  accent: {
    50: '--color-accent-50',
    100: '--color-accent-100',
    200: '--color-accent-200',
    300: '--color-accent-300',
    400: '--color-accent-400',
    500: '--color-accent-500',
    600: '--color-accent-600',
    700: '--color-accent-700',
    800: '--color-accent-800',
    900: '--color-accent-900',
    950: '--color-accent-950',
  },
  background: {
    primary: '--color-bg-primary',
    secondary: '--color-bg-secondary',
    tertiary: '--color-bg-tertiary',
  },
  text: {
    primary: '--color-text-primary',
    secondary: '--color-text-secondary',
    tertiary: '--color-text-tertiary',
    inverse: '--color-text-inverse',
  },
  card: {
    background: '--color-card-bg',
    border: '--color-card-border',
    shadow: '--color-card-shadow',
  },
  status: {
    success: '--color-success',
    warning: '--color-warning',
    error: '--color-error',
    info: '--color-info',
  },
};