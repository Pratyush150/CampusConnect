// src/components/theme-provider.jsx
import * as React from "react"; 
import { ThemeProvider as NextThemesProvider } from "next-themes"; // Import the Next.js ThemeProvider
import { useTheme as useNextTheme } from "next-themes"; // Import the useTheme hook from next-themes

// ThemeProvider component that wraps the NextThemesProvider and passes children
export function ThemeProvider({ children, ...props }) {
  return (
    // The NextThemesProvider manages the theme context, which can be light/dark mode or any other theme configurations
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  );
}

// Export useTheme hook for easier access to the current theme and theme toggling
export const useTheme = useNextTheme;

