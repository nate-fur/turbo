// 'use client';

// import type { ReactNode } from 'react';
// import { createContext, use } from 'react';

// type ThemeContextProps = {
//   theme: ThemeType;
// };
export type ThemeType = {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    error: string;
    info: string;
    success: string;
    warning: string;
  };
  palette: {
    white: string;
    dark: string;
    grey: string;
    orange: string;
    transparent?: string;
    // Add other palette colors as needed
  };
  // Add other theme properties like fonts, spacing, etc.
};

export const theme: ThemeType = {
  colors: {
    primary: "#71abb8",
    secondary: "#f15a22",
    background: "#F8FAFC",
    text: "#0F172A",
    error: "#f44336",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FF9800",
  },
  palette: {
    white: "#FFFFFF",
    dark: "#0B1739",
    grey: "#666666",
    orange: "#f15a22",
    transparent: "transparent",
  },
};
// export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// export const ThemeProvider = ({ children }: { children: ReactNode }) => {
//   return (
//     <ThemeContext value={{ theme }}>
//       {children}
//     </ThemeContext>
//   );
// };

// export const useTheme = () => {
//   const context = use(ThemeContext);
//   if (context === undefined) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };
