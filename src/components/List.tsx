import { FC } from 'react';
import { Category } from '../types';
import { Plus, Trash2, Check } from 'lucide-react';
import { useAppContext } from '../context/app-context';

interface ListProps {
  categories: Category[];
  listId: string;
  onShowAddItem: (categoryTitle: string) => void;
  showDeleteItem: boolean;
}

const List: FC<ListProps> = ({ categories, listId, onShowAddItem, showDeleteItem }) => {
  const { removeItemFromCategory, toggleItem } = useAppContext();

  return (
    <>
      {categories.map((category) => (
        <article key={category.title} className="flex flex-col gap-1">
          <div className="flex justify-between items-center px-1 mb-1">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              {category.title}
            </h2>
            <button
              onClick={() => onShowAddItem(category.title)}
              className="w-7 h-7 rounded-full flex items-center justify-center text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950 transition-all duration-150 active:scale-90 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              aria-label={`Agregar ítem a ${category.title}`}
            >
              <Plus size={16} aria-hidden="true" />
            </button>
          </div>

          <ul className="flex flex-col gap-0.5">
            {category.items.map((item) => (
              <li
                key={item.name}
                className={`group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  item.check
                    ? 'bg-slate-100/60 dark:bg-slate-800/40'
                    : 'bg-white dark:bg-slate-800/80 shadow-sm'
                }`}
              >
                <button
                  onClick={() => toggleItem(listId, category.title, item.name)}
                  className="flex items-center gap-3 flex-1 text-left focus:outline-none"
                  aria-pressed={item.check}
                  aria-label={item.check ? `Desmarcar ${item.name}` : `Marcar ${item.name}`}
                >
                  <span
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                      item.check
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-slate-300 dark:border-slate-600'
                    }`}
                  >
                    {item.check && <Check size={11} className="text-white" aria-hidden="true" />}
                  </span>
                  <span
                    className={`text-sm transition-all duration-200 ${
                      item.check
                        ? 'line-through text-slate-400 dark:text-slate-600'
                        : 'text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {item.name}
                  </span>
                </button>

                {showDeleteItem && (
                  <button
                    onClick={() => removeItemFromCategory(listId, category.title, item.name)}
                    className="ml-2 w-7 h-7 rounded-full flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all duration-150 active:scale-90 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                    aria-label={`Eliminar ${item.name}`}
                  >
                    <Trash2 size={14} aria-hidden="true" />
                  </button>
                )}
              </li>
            ))}

            {category.items.length === 0 && (
              <li className="px-3 py-4 text-center">
                <p className="text-xs text-slate-400 dark:text-slate-600">Sin ítems</p>
              </li>
            )}
          </ul>
        </article>
      ))}
    </>
  );
};

export default List;
