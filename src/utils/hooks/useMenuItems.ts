import { useEffect, useState } from 'react';
import {
  MenuItem,
  MenuItems,
  MenuCategoryOption,
  HttpApi,
  DatabaseApi,
} from '@api';

export const useMenuItems = (
  menuCategories: MenuCategoryOption[],
  searchString: string
) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        await DatabaseApi.createMenuItemsTable();
        const items: number = await DatabaseApi.selectCountMenuItems(
          menuCategories
        );
        if (items === 0) {
          DatabaseApi.insertMenuItems(await HttpApi.getMenuItems());
        }
        setInitialized(true);
      } catch (error) {
        console.log('database load error', error);
      }
    })();
  }, []);

  useEffect(() => {
    if (!initialized) {
      return;
    }
    (async () => {
      try {
        const items: MenuItems[] = await DatabaseApi.filterMenuItems(
          menuCategories,
          searchString
        );
        setMenuItems(items);
      } catch (error) {
        console.log('database query error', error);
      }
    })();
  }, [initialized, menuCategories, searchString]);

  return menuItems;
};
