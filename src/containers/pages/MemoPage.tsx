import { VFC } from 'react';
import MemoPageComponent from 'components/pages/MemoPage';
import useMemos from 'hooks/useMemos';
import useNewMemo from 'hooks/useNewMemo';
import useSearchMemos from 'hooks/useSearchMemos';

const MemoPage: VFC = () => {
  const { memos, setMemos, nextId, setNextId } = useMemos();
  const { newMemo, setNewMemo, confirmNewMemo } = useNewMemo(
    memos,
    setMemos,
    nextId,
    setNextId,
  );
  const { searchVal, setSearchVal, getFilteredMemos } = useSearchMemos();
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
