import LOCAL_STORAGE_KEYS from 'constants/localStorageKeys';

type StorageKeyValues =
  typeof LOCAL_STORAGE_KEYS[keyof typeof LOCAL_STORAGE_KEYS];

const getItem = <T>(key: StorageKeyValues): T | null => {
  const stringifiedItem = localStorage.getItem(key);
  if (stringifiedItem == null) return null;

  try {
    return JSON.parse(stringifiedItem) as T;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);

    return null;
  }
};

const setItem = (key: StorageKeyValues, value: unknown): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

const localStorageUtils = {
  getItem,
  setItem,
};

export default localStorageUtils;
