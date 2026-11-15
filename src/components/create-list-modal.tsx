import { FC, useState, ChangeEvent, KeyboardEvent } from 'react';
import { useAppContext } from '../context/app-context';
import { TravelType } from '../types';
import { X } from 'lucide-react';

interface CreateListModalProps {
  travelType: TravelType;
  onClose: () => void;
  onSuccess: (id: string) => void;
}

const CreateListModal: FC<CreateListModalProps> = ({ travelType, onClose, onSuccess }) => {
  const { createList } = useAppContext();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = (): void => {
    if (!name.trim()) {
      setError('Ingresá un nombre para la lista');
      return;
    }
    if (name.length > 50) {
      setError('El nombre debe tener menos de 50 caracteres');
      return;
    }
    const newListId = createList(name.trim(), travelType);
    setName('');
    onSuccess(newListId);
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
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Nueva lista
          </h2>
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
            value={name}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder="Ej: Viaje a Bariloche"
            aria-label="Nombre de la lista"
            aria-invalid={!!error}
            aria-describedby={error ? 'create-list-error' : undefined}
            className="w-full px-4 py-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-150"
            autoFocus
          />
          {error && (
            <p
              id="create-list-error"
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
            Crear
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateListModal;
