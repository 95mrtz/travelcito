import { FC, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Pencil, Check } from 'lucide-react';
import { useAppContext } from '../context/app-context';
import Header from '../components/header';
import Footer from '../components/footer';
import CantItems from '../components/cant-items';
import List from '../components/list';
import AddItemModal from '../components/add-item-modal';

const ListView: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { lists } = useAppContext();
  const [showDeleteMode, setShowDeleteMode] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const currentList = useMemo(
    () => lists.find((list) => list.id === id),
    [lists, id]
  );

  const totalItems = useMemo(
    () => currentList?.categories.flatMap((c) => c.items).length || 0,
    [currentList]
  );

  const totalChecked = useMemo(
    () =>
      currentList
        ?.categories.flatMap((c) => c.items)
        .filter((item) => item.check).length || 0,
    [currentList]
  );

  if (!currentList) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center px-6">
          <p className="text-base text-slate-500 dark:text-slate-400 mb-4">Lista no encontrada</p>
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

  const handleShowAddItem = (categoryTitle: string) => {
    setSelectedCategory(categoryTitle);
    setShowAddItemModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Header listName={currentList.name} />

      <main className="max-w-4xl mx-auto px-4 pb-12">
        {/* Nav row */}
        <div className="flex items-center justify-between py-4">
          <button
            onClick={() => navigate('/travel/' + currentList.type)}
            className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-lg px-1 -ml-1"
            aria-label="Volver a mis viajes"
          >
            <ChevronLeft size={16} aria-hidden="true" />
            <span>Mis Viajes</span>
          </button>

          <button
            onClick={() => setShowDeleteMode(!showDeleteMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 ${
              showDeleteMode
                ? 'bg-blue-500 text-white focus:ring-blue-500/50'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 focus:ring-slate-500/50'
            }`}
            aria-pressed={showDeleteMode}
          >
            {showDeleteMode
              ? <><Check size={12} aria-hidden="true" /> Listo</>
              : <><Pencil size={12} aria-hidden="true" /> Editar</>
            }
          </button>
        </div>

        {/* Progress */}
        <CantItems count={totalChecked} total={totalItems} />

        {/* Categories */}
        <section
          className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          aria-label="Categorías de la lista"
        >
          <List
            categories={currentList.categories}
            listId={currentList.id}
            onShowAddItem={handleShowAddItem}
            showDeleteItem={showDeleteMode}
          />
        </section>

        <Footer />
      </main>

      {showAddItemModal && selectedCategory && (
        <AddItemModal
          categoryTitle={selectedCategory}
          onClose={() => {
            setShowAddItemModal(false);
            setSelectedCategory(null);
          }}
        />
      )}
    </div>
  );
};

export default ListView;
