import { FC } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useAppContext } from '../context/app-context';

interface HeaderProps {
  listName?: string;
}

const Header: FC<HeaderProps> = ({ listName }) => {
  const { darkMode, toggleDarkMode } = useAppContext();

  return (
    <header className="w-full px-4 pt-safe">
      <div className="max-w-4xl mx-auto flex justify-between items-center py-4 border-b border-slate-200/60 dark:border-slate-700/60">
        <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 truncate max-w-[70%]">
          {listName || 'Travelcito'}
        </h1>
        <button
          onClick={toggleDarkMode}
          className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all duration-200 active:scale-90 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          aria-label={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
        >
          {darkMode
            ? <Sun size={18} aria-hidden="true" />
            : <Moon size={18} aria-hidden="true" />
          }
        </button>
      </div>
    </header>
  );
};

export default Header;
