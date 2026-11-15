import { FC, useState, ChangeEvent, KeyboardEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/app-context';
import { X } from 'lucide-react';

interface AddItemModalProps {
  categoryTitle: string;
  onClose: () => void;
}

const AddItemModal: FC<AddItemModalProps> = ({ categoryTitle, onClose }) => {
  const { id } = useParams<{ id: string }>();
  const { addItemToCategory } = useAppContext();
  const [itemName, setItemName] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setItemName(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = (): void => {
    if (!itemName.trim()) {
      setError('Ingresá un nombre para el ítem');
      return;
    }
    if (!id) {
      setError('Error: lista no encontrada');
      return;
    }
    addItemToCategory(id, categoryTitle, itemName.trim());
    setItemName('');
    onClose();
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 animate-fade-in p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full sm:max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-2xl animate-slide-up overflow-hidden">
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Agregar ítem
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{categoryTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-150 active:scale-90 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            aria-label="Cerrar"
          >
            <X size={14} aria-hidden="true" />
          </button>
        </div>

        <div className="px-5 py-4">
          <input
            type="text"
            value={itemName}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder="Nombre del ítem"
            aria-label="Nombre del ítem"
            aria-invalid={!!error}
            aria-describedby={error ? 'add-item-error' : undefined}
            className="w-full px-4 py-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-150"
            autoFocus
          />
          {error && (
            <p
              id="add-item-error"
              role="alert"
              className="mt-2 text-xs text-red-500 dark:text-red-400"
            >
              {error}
            </p>
          )}
        </div>

        <div className="flex gap-2 px-5 pb-5">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-500/50"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-3 rounded-xl text-sm font-semibold bg-blue-500 hover:bg-blue-600 text-white transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;
