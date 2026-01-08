/**
 * Color Palette Configuration
 * 
 * Customize these colors to match your brand.
 * Update the CSS variables in glassmorphic.css to use these values.
 */

export const colors = {
  // Primary Colors
  primary: '#26A9E0',
  primaryDark: '#1e8fc4',
  primaryLight: '#4db8e6',
  
  // Secondary Colors (optional)
  secondary: '#04a4c4',
  secondaryDark: '#151a27',
  
  // Accent Colors (optional)
  green: '#a9b237',
  greenLight: '#b5c94c',
  yellow: '#f0be3b',
  orange: '#eb7f37',
  red: '#d72e27',
  
  // Neutral Colors
  grayLight: '#96989a',
  grayMedium: '#909294',
  grayDark: '#8f9193',
  black: '#232222',
  blackDark: '#211e1f',
  darkBlue: '#151a27',
  
  // Glass Effects (opacity values)
  glass: {
    bgLight: 'rgba(255, 255, 255, 0.15)',
    bgMedium: 'rgba(255, 255, 255, 0.25)',
    bgDark: 'rgba(255, 255, 255, 0.1)',
    borderLight: 'rgba(255, 255, 255, 0.3)',
    borderMedium: 'rgba(255, 255, 255, 0.4)',
    borderDark: 'rgba(0, 0, 0, 0.05)',
  },
  
  // Base Colors
  background: '#ffffff',
  foreground: '#211e1f',
};

/**
 * Helper function to convert hex to rgba
 */
export function hexToRgba(hex: string, alpha: number = 1): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

