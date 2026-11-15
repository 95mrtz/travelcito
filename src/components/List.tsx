import { FC } from 'react';
import { Category } from '../types';
import { AiOutlinePlusCircle, AiOutlineDelete } from 'react-icons/ai';

interface ListProps {
  data: Category[];
  setData: (data: Category[]) => void;
  show: (title: string) => void;
  showDeleteItem: boolean;
}

const List: FC<ListProps> = (props) => {
  const { data: categories, setData, show: handleShowAddItem, showDeleteItem } = props;
  const deleteItem = (categoryTitle: string, itemName: string): void => {
    const categoryToUpdate = categories.find((c) => c.title === categoryTitle);

    if (!categoryToUpdate) return;

    const updatedItems = categoryToUpdate.items.filter(
      (item) => item.name !== itemName
    );

    const updatedData = categories.map((category) => {
      if (category.title === categoryTitle) {
        return { ...category, items: updatedItems };
      }
      return category;
    });

    setData(updatedData);
  };

  const onChangeCheckbox = (categoryTitle: string, itemName: string): void => {
    const categoryToUpdate = categories.find((c) => c.title === categoryTitle);

    if (!categoryToUpdate) return;

    const updatedItems = categoryToUpdate.items.map((item) => {
      if (item.name === itemName) {
        return { ...item, check: !item.check };
      }
      return item;
    });

    const updatedData = categories.map((category) => {
      if (category.title === categoryTitle) {
        return { ...category, items: updatedItems };
      }
      return category;
    });

    setData(updatedData);
  };

  return (
    <>
      {categories.map((category) => (
        <article key={category.title} className="pl-2 pr-2 flex flex-col gap-2">
          <article className="flex justify-between items-center">
            <h2 className="text-xl font-bold">{category.title}</h2>
            <button
              onClick={() => handleShowAddItem(category.title)}
              className="py-1 px-2 flex justify-center items-center cursor-pointer hover:text-blue-500 transition"
              aria-label={`Agregar item a ${category.title}`}
            >
              <AiOutlinePlusCircle size={24} />
            </button>
          </article>
          <ul className="list-inside flex flex-col items-start gap-2">
            {category.items.map((item) => (
              <li
                key={item.name}
                className="w-full flex justify-between items-center"
              >
                <article className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    id={item.name}
                    name={item.name}
                    checked={item.check}
                    onChange={() => onChangeCheckbox(category.title, item.name)}
                    aria-label={`Marcar ${item.name}`}
                  />
                  <label htmlFor={item.name} className="cursor-pointer">
                    {item.name}
                  </label>
                </article>
                {showDeleteItem && (
                  <button
                    onClick={() => deleteItem(category.title, item.name)}
                    className="py-1 px-2 flex justify-center items-center cursor-pointer hover:text-red-500 transition"
                    aria-label={`Eliminar ${item.name}`}
                  >
                    <AiOutlineDelete size={20} />
                  </button>
                )}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </>
  );
};

export default List;
