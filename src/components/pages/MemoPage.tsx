import { VFC } from 'react';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import DefaultLayout from 'components/templates/DefaultLayout';
import MemoForm from 'components/organisms/MemoForm';
import MemoList from 'components/organisms/MemoList';
import { Memo } from 'domains/models/memo';

type Props = {
  // メモ一覧
  allMemos: Memo[];
  currentMemos: Memo[];
  pageCount: number;
  currentPage: number;
  setCurrentPage: (selectedPage: number) => void;
  // 新規メモ
  newMemo: string | null;
  setNewMemo: (value: string | null) => void;
  confirmNewMemo: () => void;
  // メモ検索
  searchVal: string | null;
  setSearchVal: (value: string | null) => void;
  // メモ削除
  deleteMemo: (id: number) => void;
};

const MemoPage: VFC<Props> = ({
  allMemos,
  currentMemos,
  pageCount,
  currentPage,
  setCurrentPage,
  newMemo,
  setNewMemo,
  confirmNewMemo,
  searchVal,
  setSearchVal,
  deleteMemo,
}) => (
  <DefaultLayout>
    <MemoForm
      memos={allMemos}
      {...{
        newMemo,
        setNewMemo,
        confirmNewMemo,
        setSearchVal,
        deleteMemo,
      }}
    />

    {searchVal && <Box sx={{ pt: 2, pb: 1 }}>「{searchVal}」での検索結果</Box>}
    <MemoList memos={currentMemos} />

    <Stack direction="row" justifyContent="center" sx={{ py: 2 }}>
      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={(_e, page) => setCurrentPage(page)}
        color="primary"
      />
    </Stack>
  </DefaultLayout>
);

export default MemoPage;
