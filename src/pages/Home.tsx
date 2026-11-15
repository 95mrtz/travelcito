import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Backpack, Luggage, Sun, Moon } from 'lucide-react';
import { useAppContext } from '../context/app-context';

const Home: FC = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useAppContext();

  const handleNavigate = (type: 'backpack' | 'luggage'): void => {
    navigate(`/travel/${type}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Top bar */}
      <div className="flex justify-end px-5 pt-5">
        <button
          onClick={toggleDarkMode}
          className="w-9 h-9 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 shadow-sm text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 active:scale-90 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          aria-label={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
        >
          {darkMode
            ? <Sun size={16} aria-hidden="true" />
            : <Moon size={16} aria-hidden="true" />
          }
        </button>
      </div>

      <main className="flex flex-col items-center justify-center px-5 pb-12 min-h-[calc(100vh-56px)]">
        {/* Hero */}
        <div className="text-center mb-14 animate-slide-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30 mb-6">
            <span className="text-4xl" role="img" aria-label="avión">✈️</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
            Travelcito
          </h1>
          <p className="text-base text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
            Organizá lo que necesitás llevar en cada viaje
          </p>
        </div>

        {/* Selector */}
        <div className="w-full max-w-sm space-y-3 animate-slide-up" style={{ animationDelay: '60ms' }}>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 text-center mb-4">
            ¿Cómo viajás?
          </p>

          {/* Mochilero */}
          <button
            onClick={() => handleNavigate('backpack')}
            className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900 transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500/50 group"
            type="button"
            aria-label="Seleccionar modo mochilero"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 dark:group-hover:bg-blue-950 transition-colors duration-200">
              <Backpack size={24} className="text-blue-500" aria-hidden="true" />
            </div>
            <div className="text-left flex-1">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Mochilero</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Aventuras sin límites de equipaje</p>
            </div>
            <span className="text-slate-300 dark:text-slate-600 group-hover:text-blue-400 dark:group-hover:text-blue-500 transition-colors duration-200">
              ›
            </span>
          </button>

          {/* Con Valija */}
          <button
            onClick={() => handleNavigate('luggage')}
            className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-purple-200 dark:hover:border-purple-900 transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500/50 group"
            type="button"
            aria-label="Seleccionar modo con valija"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-100 dark:group-hover:bg-purple-950 transition-colors duration-200">
              <Luggage size={24} className="text-purple-500" aria-hidden="true" />
            </div>
            <div className="text-left flex-1">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Con Valija</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Viajes cómodos y organizados</p>
            </div>
            <span className="text-slate-300 dark:text-slate-600 group-hover:text-purple-400 dark:group-hover:text-purple-500 transition-colors duration-200">
              ›
            </span>
          </button>
        </div>

        {/* Tip */}
        <div
          className="mt-8 w-full max-w-sm px-4 py-3 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 animate-slide-up"
          style={{ animationDelay: '120ms' }}
        >
          <p className="text-xs text-slate-400 dark:text-slate-500 text-center leading-relaxed">
            💡 Podés crear hasta 5 listas por tipo de viaje
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
