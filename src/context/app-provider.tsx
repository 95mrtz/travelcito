import { FC, ReactNode, useReducer, useEffect } from 'react';
import { AppContext } from './app-context';
import { appReducer } from './app-reducer';
import { AppState, AppContextType } from '../types';
import { generateId } from '../utils/helpers';

const STORAGE_KEY = 'travelcito-app-state';

const systemDark = typeof window !== 'undefined'
  ? window.matchMedia('(prefers-color-scheme: dark)').matches
  : false;

const defaultState: AppState = {
  lists: [],
  currentListId: null,
  darkMode: systemDark,
};

const initStateFromStorage = (): AppState => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved) as AppState;
  } catch {
    /* ignore */
  }
  return defaultState;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, defaultState, initStateFromStorage);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.darkMode);
  }, [state.darkMode]);

  const value: AppContextType = {
    lists: state.lists,
    currentListId: state.currentListId,
    darkMode: state.darkMode,

    createList: (name, type) => {
      const newId = generateId();
      dispatch({ type: 'CREATE_LIST', payload: { name, type, id: newId } });
      return newId;
    },

    deleteList: (id) => {
      dispatch({ type: 'DELETE_LIST', payload: id });
    },

    updateList: (id, list) => {
      dispatch({ type: 'UPDATE_LIST', payload: { id, list } });
    },

    setCurrentList: (id) => {
      dispatch({ type: 'SET_CURRENT_LIST', payload: id });
    },

    addItemToCategory: (listId, categoryTitle, itemName) => {
      dispatch({ type: 'ADD_ITEM', payload: { listId, categoryTitle, itemName } });
    },

    removeItemFromCategory: (listId, categoryTitle, itemName) => {
      dispatch({ type: 'REMOVE_ITEM', payload: { listId, categoryTitle, itemName } });
    },

    toggleItem: (listId, categoryTitle, itemName) => {
      dispatch({ type: 'TOGGLE_ITEM', payload: { listId, categoryTitle, itemName } });
    },

    toggleDarkMode: () => {
      dispatch({ type: 'TOGGLE_DARK_MODE' });
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
