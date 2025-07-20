// src/components/ThemeToggle.tsx
import React, { useContext } from 'react';
import { ThemeContext } from '../App'; // Asumsi ThemeContext ada di App.tsx
import { SunIcon, MoonIcon } from './icons'; // Pastikan ikon ini ada

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {theme === 'dark' ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
        </button>
    );
};

export default ThemeToggle;