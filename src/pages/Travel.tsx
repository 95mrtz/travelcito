import { FC, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, Trash2, ChevronLeft, Backpack, Luggage } from 'lucide-react';
import { useAppContext } from '../context/app-context';
import { TravelType } from '../types';
import { formatDate } from '../utils/helpers';
import CreateListModal from '../components/create-list-modal';
import Header from '../components/header';

const Travel: FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const { lists, currentListId, setCurrentList, deleteList } = useAppContext();
  const [showModal, setShowModal] = useState(false);

  if (type !== 'backpack' && type !== 'luggage') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center px-6">
          <p className="text-base text-slate-500 dark:text-slate-400 mb-4">Tipo de viaje inválido</p>
          <button
            onClick={() => navigate('/')}
            className="px-5 py-2.5 rounded-xl text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const travelType = type as TravelType;
  const filteredLists = lists.filter((list) => list.type === travelType);
  const maxListsReached = filteredLists.length >= 5;
  const isBackpack = travelType === 'backpack';
  const accent = isBackpack ? 'blue' : 'purple';

  const handleSelectList = (id: string) => {
    setCurrentList(id);
    navigate(`/list/${id}`);
  };

  const handleDeleteList = (id: string) => {
    if (window.confirm('¿Eliminar esta lista?')) {
      deleteList(id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Header />

      <main className="max-w-2xl mx-auto px-4 pb-12">
        {/* Back + Title */}
        <div className="flex items-center gap-3 py-5">
          <button
            onClick={() => navigate('/')}
            className="w-8 h-8 rounded-full flex items-center justify-center text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-all duration-150 active:scale-90 focus:outline-none focus:ring-2 focus:ring-blue-500/50 -ml-1"
            aria-label="Volver al inicio"
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <div className="flex items-center gap-2">
            {isBackpack
              ? <Backpack size={18} className="text-blue-500" aria-hidden="true" />
              : <Luggage size={18} className="text-purple-500" aria-hidden="true" />
            }
            <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {isBackpack ? 'Mochilero' : 'Con Valija'}
            </h1>
          </div>
        </div>

        {/* Max lists warning */}
        {maxListsReached && (
          <div className="mb-4 px-4 py-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/40">
            <p className="text-xs font-medium text-amber-700 dark:text-amber-400">
              Límite alcanzado — máximo 5 listas por tipo de viaje
            </p>
          </div>
        )}

        {/* Lists grid */}
        <div className="space-y-2.5">
          {filteredLists.map((list, i) => (
            <div
              key={list.id}
              className="animate-slide-up"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <button
                onClick={() => handleSelectList(list.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border transition-all duration-200 active:scale-[0.99] focus:outline-none text-left shadow-sm hover:shadow-md group ${
                  currentListId === list.id
                    ? accent === 'blue'
                      ? 'border-blue-300 dark:border-blue-700 ring-1 ring-blue-200 dark:ring-blue-800'
                      : 'border-purple-300 dark:border-purple-700 ring-1 ring-purple-200 dark:ring-purple-800'
                    : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    accent === 'blue'
                      ? 'bg-blue-50 dark:bg-blue-950/60'
                      : 'bg-purple-50 dark:bg-purple-950/60'
                  }`}
                >
                  {isBackpack
                    ? <Backpack size={18} className="text-blue-500" aria-hidden="true" />
                    : <Luggage size={18} className="text-purple-500" aria-hidden="true" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                    {list.name}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                    {formatDate(list.createdAt)}
                  </p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDeleteList(list.id); }}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-slate-300 dark:text-slate-700 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all duration-150 active:scale-90 focus:outline-none focus:ring-2 focus:ring-red-500/50 opacity-0 group-hover:opacity-100"
                  aria-label={`Eliminar lista ${list.name}`}
                >
                  <Trash2 size={14} aria-hidden="true" />
                </button>
              </button>
            </div>
          ))}

          {/* New list button */}
          {!maxListsReached && (
            <button
              onClick={() => setShowModal(true)}
              className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-800 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all duration-200 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-blue-500/50 group"
              type="button"
              aria-label="Crear nueva lista"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-950/40 transition-colors duration-200">
                <Plus size={18} className="text-slate-400 group-hover:text-blue-500 transition-colors duration-200" aria-hidden="true" />
              </div>
              <p className="text-sm font-medium text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-200">
                Nueva lista
              </p>
            </button>
          )}

          {/* Empty state */}
          {filteredLists.length === 0 && !showModal && (
            <div className="py-12 text-center">
              <p className="text-sm text-slate-400 dark:text-slate-500">
                Todavía no creaste ninguna lista
              </p>
            </div>
          )}
        </div>
      </main>

      {showModal && (
        <CreateListModal
          travelType={travelType}
          onClose={() => setShowModal(false)}
          onSuccess={(id) => {
            setShowModal(false);
            navigate(`/list/${id}`);
          }}
        />
      )}
    </div>
  );
};

export default Travel;
