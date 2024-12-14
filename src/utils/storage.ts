import AsyncStorage from '@react-native-async-storage/async-storage';

export enum storageEnumKeys {
  USERW = 'USERW',
  QUOTE = 'QUOTE',
  HABIT = 'HABIT',
}

export const setStorage = async (
  key: string,
  value: string | null | undefined,
): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, value || '');
    return true;
  } catch (e) {
    return false;
  }
};

export const getStorage = async (key: string): Promise<string | null> => {
  try {
    return AsyncStorage.getItem(key);
  } catch (error) {
    return null;
  }
};

export const removeStorage = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
};
