import { AppState, TravelList, TravelType, CreateListPayload } from '../types';
import { backpackPresets, luggagePresets } from '../data/presets';

export type AppAction =
  | { type: 'CREATE_LIST'; payload: CreateListPayload & { id: string } }
  | { type: 'DELETE_LIST'; payload: string }
  | { type: 'UPDATE_LIST'; payload: { id: string; list: TravelList } }
  | { type: 'SET_CURRENT_LIST'; payload: string }
  | { type: 'ADD_ITEM'; payload: { listId: string; categoryTitle: string; itemName: string } }
  | { type: 'REMOVE_ITEM'; payload: { listId: string; categoryTitle: string; itemName: string } }
  | { type: 'TOGGLE_ITEM'; payload: { listId: string; categoryTitle: string; itemName: string } }
  | { type: 'TOGGLE_DARK_MODE' };

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'CREATE_LIST': {
      const newList: TravelList = {
        id: action.payload.id,
        name: action.payload.name,
        type: action.payload.type,
        categories: action.payload.type === 'backpack' ? backpackPresets : luggagePresets,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      return {
        ...state,
        lists: [...state.lists, newList],
        currentListId: newList.id,
      };
    }

    case 'DELETE_LIST': {
      const filteredLists = state.lists.filter((list) => list.id !== action.payload);
      const newCurrentId =
        state.currentListId === action.payload ? filteredLists[0]?.id || null : state.currentListId;

      return {
        ...state,
        lists: filteredLists,
        currentListId: newCurrentId,
      };
    }

    case 'UPDATE_LIST': {
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.payload.id
            ? { ...action.payload.list, updatedAt: Date.now() }
            : list
        ),
      };
    }

    case 'SET_CURRENT_LIST': {
      return {
        ...state,
        currentListId: action.payload,
      };
    }

    case 'ADD_ITEM': {
      return {
        ...state,
        lists: state.lists.map((list) => {
          if (list.id === action.payload.listId) {
            return {
              ...list,
              categories: list.categories.map((category) => {
                if (category.title === action.payload.categoryTitle) {
                  return {
                    ...category,
                    items: [
                      ...category.items,
                      { name: action.payload.itemName, check: false },
                    ],
                  };
                }
                return category;
              }),
              updatedAt: Date.now(),
            };
          }
          return list;
        }),
      };
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        lists: state.lists.map((list) => {
          if (list.id === action.payload.listId) {
            return {
              ...list,
              categories: list.categories.map((category) => {
                if (category.title === action.payload.categoryTitle) {
                  return {
                    ...category,
                    items: category.items.filter(
                      (item) => item.name !== action.payload.itemName
                    ),
                  };
                }
                return category;
              }),
              updatedAt: Date.now(),
            };
          }
          return list;
        }),
      };
    }

    case 'TOGGLE_ITEM': {
      return {
        ...state,
        lists: state.lists.map((list) => {
          if (list.id === action.payload.listId) {
            return {
              ...list,
              categories: list.categories.map((category) => {
                if (category.title === action.payload.categoryTitle) {
                  return {
                    ...category,
                    items: category.items.map((item) =>
                      item.name === action.payload.itemName
                        ? { ...item, check: !item.check }
                        : item
                    ),
                  };
                }
                return category;
              }),
              updatedAt: Date.now(),
            };
          }
          return list;
        }),
      };
    }

    case 'TOGGLE_DARK_MODE': {
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    }

    default:
      return state;
  }
};
