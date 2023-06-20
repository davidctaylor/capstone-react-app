import { MenuItem } from './interfaces';

const API_MENU =
  'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';
const API_IMAGE =
  'https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/'; // ${imageFileName}?raw=true`;
const fetchDataJSON = async (api: string) => {
  const response = await fetch(api);
  return await response.json();
};

export const HttpApi = {
  getMenuItems: async (): Promise<MenuItem[]> => {
    try {
      const items = await fetchDataJSON(API_MENU);
      return items.menu;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  getMenuItemImageUrl: (imageFileName: string): string => {
    return `${API_IMAGE}${imageFileName}?raw=true`;
  },
};
