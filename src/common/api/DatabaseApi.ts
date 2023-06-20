import * as SQLite from 'expo-sqlite';
import { MenuItem, MenuCategoryOption } from './interfaces';

const db = SQLite.openDatabase('little_lemon');

export const DatabaseApi = {
  createMenuItemsTable: async () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        // tx.executeSql('drop table menuItems');
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS menuItems (id INTEGER PRIMARY KEY, category TEXT, description TEXT, image TEXT, name TEXT, price TEXT, uuid TEXT)',
          [],
          /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
          (_, { rows }) => resolve(undefined)
        );
      }, reject);
    });
  },

  selectCountMenuItems: async (): Promise<number> => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql('SELECT COUNT(id) FROM menuItems', [], (_, { rows }) => {
          resolve(rows._array[0]['COUNT(id)']);
        });
      }, reject);
    });
  },

  filterMenuItems: async (
    categories: MenuCategoryOption[],
    search: string
  ): Promise<MenuItem[]> => {
    return new Promise((resolve, reject) => {
      const active: string[] = categories
        .filter((category) => category.active)
        .map((category) => category.id);

      db.transaction((tx) => {
        tx.executeSql(
          `SELECT id, category, description, image, name, price FROM menuItems WHERE name LIKE '%${search}%' AND category IN (${Array(
            active.length
          ).fill('?')})`,
          active,
          (_, { rows }) => {
            resolve(rows._array);
          }
        );
      }, reject);
    });
  },

  insertMenuItems: (items: MenuItem[]) => {
    items.forEach((item) => {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO menuItems (category, description, image, name, price) VALUES (?, ?, ?, ?, ?)',
          [
            `${item.category}`,
            `${item.description}`,
            `${item.image}`,
            `${item.name}`,
            `${item.price}`,
          ]
        );
      });
    });
  },
};
