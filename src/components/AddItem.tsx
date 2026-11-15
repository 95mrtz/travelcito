import { FC, useState, ChangeEvent, KeyboardEvent } from 'react';
import { Category } from '../types';

interface AddItemProps {
  searchItem: Category;
  data: Category[];
  setData: (data: Category[]) => void;
  setShowAddItem: (show: boolean) => void;
}

const AddItem: FC<AddItemProps> = (props) => {
  const { searchItem, data: categories, setData, setShowAddItem } = props;
  const [item, setItem] = useState<string>('');
  const [error, setError] = useState<string>('');

  const resetForm = (): void => {
    setItem('');
    setError('');
  };

  const onChangeItem = (e: ChangeEvent<HTMLInputElement>): void => {
    setItem(e.target.value);
    if (error) setError('');
  };

  const addItem = (): void => {
    // Validación
    if (!item.trim()) {
      setError('Por favor ingresa un nombre para el item');
      return;
    }

    // Crear copia del array en lugar de mutar
    const newItem = { name: item.trim(), check: false };
    const updatedItems = [...searchItem.items, newItem];

    // Actualizar datos correctamente
    const updatedData = categories.map((category) => {
      if (category.title === searchItem.title) {
        return { ...category, items: updatedItems };
      }
      return category;
    });

    setData(updatedData);
    resetForm();
    setShowAddItem(false);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      addItem();
    }
  };

  return (
    <section className="mb-5 flex flex-col gap-3 p-4 bg-white rounded-lg shadow-md max-w-md">
      <p className="text-lg font-semibold">Agregar algo más a {searchItem.title}</p>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <input
        type="text"
        value={item}
        onChange={onChangeItem}
        onKeyPress={handleKeyPress}
        placeholder="Nombre del item"
        className="border border-gray-300 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <article className="w-full flex gap-4 justify-center">
        <button
          className="border border-gray-300 rounded-sm py-2 px-6 cursor-pointer hover:bg-blue-50 transition"
          onClick={addItem}
        >
          Agregar
        </button>
        <button
          className="border border-gray-300 rounded-sm py-2 px-6 cursor-pointer hover:bg-red-50 transition"
          onClick={() => {
            resetForm();
            setShowAddItem(false);
          }}
        >
          Cancelar
        </button>
      </article>
    </section>
  );
};

export default AddItem;
