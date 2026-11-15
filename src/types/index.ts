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
  type: 'backpack' | 'luggage';
  categories: Category[];
  createdAt: number;
  updatedAt: number;
}

export type TravelType = 'backpack' | 'luggage';
