import { Memo } from 'domains/models/memo';
import { useState } from 'react';

const useSearchMemos = (): {
  searchVal: string | null;
  setSearchVal: React.Dispatch<React.SetStateAction<string | null>>;
  getFilteredMemos: (memos: Memo[]) => Memo[];
} => {
  const [searchVal, setSearchVal] = useState<string | null>('');

  const getFilteredMemos = (memos: Memo[]) =>
    searchVal
      ? memos.filter((memo) => memo.content.includes(searchVal))
      : memos;

  return { searchVal, setSearchVal, getFilteredMemos };
};

export default useSearchMemos;
