import { useEffect, useMemo, useState, VFC } from 'react';
import MemoPageComponent from 'components/pages/MemoPage';
import useMemos from 'hooks/useMemos';
import useNewMemo from 'hooks/useNewMemo';
import useSearchMemos from 'hooks/useSearchMemos';

const MEMOS_PER_PAGE = 5;

const getPageFromQueryStr = () =>
  Number(new URLSearchParams(window.location.search).get('page'));

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

  const filteredMemos = getFilteredMemos(memos);

  const [currentPage, setCurrentPage] = useState(getPageFromQueryStr() || 1);
  const pageCount = useMemo(() => {
    if (filteredMemos.length === 0) return 1;

    return Math.ceil(filteredMemos.length / MEMOS_PER_PAGE);
  }, [filteredMemos]);

  const currentMemos = filteredMemos.slice(
    (currentPage - 1) * MEMOS_PER_PAGE,
    (currentPage - 1) * MEMOS_PER_PAGE + MEMOS_PER_PAGE,
  );

  useEffect(() => {
    if (currentPage > pageCount) {
      setCurrentPage(pageCount);
    }
  }, [pageCount, currentPage]);

  useEffect(() => {
    const queryString = new URLSearchParams({
      page: String(currentPage),
    }).toString();
    window.history.replaceState(null, '', `?${queryString}`);
  }, [currentPage]);

  useEffect(() => {
    const page = getPageFromQueryStr();
    if (page) {
      setCurrentPage(Number(page));
    }
  }, []);

  return (
    <MemoPageComponent
      allMemos={filteredMemos}
      {...{
        newMemo,
        setNewMemo,
        confirmNewMemo,
        searchVal,
        setSearchVal,
        deleteMemo,
        currentPage,
        pageCount,
        setCurrentPage,
        currentMemos,
      }}
    />
  );
};

export default MemoPage;
