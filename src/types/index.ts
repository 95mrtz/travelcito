/**
 * Tipos e interfaces del proyecto Travelcito
 */

export interface TravelItem {
  name: string;
  check: boolean;
}

export interface Category {
  title: string;
  items: TravelItem[];
}

export interface TravelList {
  id: string;
  name: string;
  type: TravelType;
  categories: Category[];
  createdAt: number;
  updatedAt: number;
}

export type TravelType = 'backpack' | 'luggage';

// Context Types
export interface AppContextType {
  lists: TravelList[];
  currentListId: string | null;
  darkMode: boolean;

  // List actions
  createList: (name: string, type: TravelType) => string;
  deleteList: (id: string) => void;
  updateList: (id: string, list: TravelList) => void;
  setCurrentList: (id: string) => void;

  // Category actions
  addItemToCategory: (listId: string, categoryTitle: string, itemName: string) => void;
  removeItemFromCategory: (listId: string, categoryTitle: string, itemName: string) => void;
  toggleItem: (listId: string, categoryTitle: string, itemName: string) => void;

  // Theme actions
  toggleDarkMode: () => void;
}

export interface CreateListPayload {
  name: string;
  type: TravelType;
}

export interface AppState {
  lists: TravelList[];
  currentListId: string | null;
  darkMode: boolean;
}
