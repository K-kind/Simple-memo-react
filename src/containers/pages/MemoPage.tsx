import { useState, VFC } from 'react';
import MemoPageComponent from 'components/pages/MemoPage';
import { Memo } from 'domains/models/memo';

const useMemos = () => {
  const [memos, setMemos] = useState<Memo[]>([]);

  return { memos, setMemos };
};

const useNewMemo = (
  memos: Memo[],
  setMemos: (updatedMemos: Memo[]) => void,
) => {
  const [newMemo, setNewMemo] = useState<string | null>('');

  const confirmNewMemo = () => {
    const newMemoObj = {
      id: (memos[memos.length - 1]?.id ?? 0) + 1,
      content: newMemo ?? '',
      createdAt: new Date().toLocaleString(),
    };
    setMemos([...memos, newMemoObj]);
    setNewMemo('');
  };

  return { newMemo, setNewMemo, confirmNewMemo };
};

const useSearchMemo = () => {
  const [searchVal, setSearchVal] = useState<string | null>('');

  const getFilteredMemos = (memos: Memo[]) =>
    searchVal
      ? memos.filter((memo) => memo.content.includes(searchVal))
      : memos;

  return { searchVal, setSearchVal, getFilteredMemos };
};

const MemoPage: VFC = () => {
  const { memos, setMemos } = useMemos();
  const { newMemo, setNewMemo, confirmNewMemo } = useNewMemo(memos, setMemos);
  const { searchVal, setSearchVal, getFilteredMemos } = useSearchMemo();
  const deleteMemo = (id: number) => {
    setMemos(memos.filter((memo) => memo.id !== id));
  };

  return (
    <MemoPageComponent
      memos={getFilteredMemos(memos)}
      {...{
        newMemo,
        setNewMemo,
        confirmNewMemo,
        searchVal,
        setSearchVal,
        deleteMemo,
      }}
    />
  );
};

export default MemoPage;
