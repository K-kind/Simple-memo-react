import { Memo } from 'domains/models/memo';
import { useState } from 'react';

const useNewMemo = (
  memos: Memo[],
  setMemos: (updatedMemos: Memo[]) => void,
  nextId: number,
  setNextId: (id: number) => void,
): {
  newMemo: string | null;
  setNewMemo: React.Dispatch<React.SetStateAction<string | null>>;
  confirmNewMemo: () => void;
} => {
  const [newMemo, setNewMemo] = useState<string | null>('');

  const confirmNewMemo = () => {
    const newMemoObj = {
      id: nextId,
      content: newMemo ?? '',
      createdAt: new Date().toLocaleString(),
    };
    setMemos([...memos, newMemoObj]);
    setNewMemo('');
    setNextId(nextId + 1);
  };

  return { newMemo, setNewMemo, confirmNewMemo };
};

export default useNewMemo;
