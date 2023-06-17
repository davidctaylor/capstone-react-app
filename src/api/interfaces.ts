export type MenuCategoryType =
  | 'desserts'
  | 'drinks'
  | 'mains'
  | 'specials'
  | 'starters';

export interface MenuItem {
  id?: number;
  category: MenuCategoryType;
  description: string;
  image: string;
  name: string;
  price: string;
}

export interface MenuCategoryOption {
  active: boolean;
  id: MenuCategoryType;
  label: string;
}
