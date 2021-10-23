import { useState } from 'react';
import { Memo } from 'domains/models/memo';
import LOCAL_STORAGE_KEYS from 'constants/localStorageKeys';
import localStorageUtils from 'utils/localStorage';

const FIRST_MEMO_ID = 1;

const getStoredMemos = () => {
  const memos = localStorageUtils.getItem<Memo[]>(LOCAL_STORAGE_KEYS.MEMOS);

  return memos ?? [];
};

const getStoredNextId = () => {
  const memos = localStorageUtils.getItem<number>(
    LOCAL_STORAGE_KEYS.MEMO_NEXT_ID,
  );

  return memos ?? FIRST_MEMO_ID;
};

const storeMemos = (memos: Memo[]) => {
  localStorageUtils.setItem(LOCAL_STORAGE_KEYS.MEMOS, memos);
};

const storeNextId = (id: number) => {
  localStorageUtils.setItem(LOCAL_STORAGE_KEYS.MEMO_NEXT_ID, id);
};

const useMemos = (): {
  memos: Memo[];
  setMemos: (lMemos: Memo[]) => void;
  nextId: number;
  setNextId: (id: number) => void;
} => {
  const [memos, setMemosState] = useState(getStoredMemos());
  const setMemos = (lMemos: Memo[]) => {
    setMemosState(lMemos);
    storeMemos(lMemos);
  };

  const [nextId, setNextIdState] = useState(getStoredNextId());
  const setNextId = (id: number) => {
    setNextIdState(id);
    storeNextId(id);
  };

  return { memos, setMemos, nextId, setNextId };
};

export default useMemos;
