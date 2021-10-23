import { VFC } from 'react';
import Box from '@mui/material/Box';
import DefaultLayout from 'components/templates/DefaultLayout';
import MemoForm from 'components/organisms/MemoForm';
import MemoList from 'components/organisms/MemoList';
import { Memo } from 'domains/models/memo';

type Props = {
  // メモ一覧
  memos: Memo[];
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
  memos,
  newMemo,
  setNewMemo,
  confirmNewMemo,
  searchVal,
  setSearchVal,
  deleteMemo,
}) => (
  <DefaultLayout>
    <MemoForm
      {...{
        newMemo,
        setNewMemo,
        confirmNewMemo,
        setSearchVal,
        memos,
        deleteMemo,
      }}
    />
    {searchVal && <Box sx={{ pt: 2, pb: 1 }}>「{searchVal}」での検索結果</Box>}
    <MemoList memos={memos} />
  </DefaultLayout>
);

export default MemoPage;
