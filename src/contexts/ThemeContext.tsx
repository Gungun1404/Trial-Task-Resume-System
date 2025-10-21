import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type Template = 'modern' | 'classic' | 'minimal';

interface ThemeContextType {
  theme: Theme;
  template: Template;
  primaryColor: string;
  toggleTheme: () => void;
  setTemplate: (template: Template) => void;
  setPrimaryColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [template, setTemplateState] = useState<Template>('modern');
  const [primaryColor, setPrimaryColorState] = useState<string>('#3b82f6');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTemplate = (newTemplate: Template) => {
    setTemplateState(newTemplate);
  };

  const setPrimaryColor = (color: string) => {
    setPrimaryColorState(color);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, template, primaryColor, toggleTheme, setTemplate, setPrimaryColor }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
