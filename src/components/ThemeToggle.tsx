import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 hover:bg-gris-100 dark:hover:bg-gris-800 rounded-lg transition-colors"
      aria-label="Cambiar tema"
      title={theme === 'light' ? 'Pasar a modo oscuro' : 'Pasar a modo claro'}
    >
      {theme === 'light' ? (
        <Moon size={20} className="text-gris-600" />
      ) : (
        <Sun size={20} className="text-yellow-500" />
      )}
    </button>
  );
};
