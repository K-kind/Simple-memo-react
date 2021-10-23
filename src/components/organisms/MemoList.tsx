import { Fragment, VFC } from 'react';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Memo } from 'domains/models/memo';
import date from 'utils/date';

type Props = {
  memos: Memo[];
};

const MemoList: VFC<Props> = ({ memos }) => {
  const formatedDate = (dStr: string) => {
    const d = new Date(dStr);

    return date.format(d, 'MM/dd hh:mm');
  };

  return (
    <List>
      {memos.map((memo) => (
        <Fragment key={memo.id}>
          <Stack direction="row" spacing={4} sx={{ py: 2 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 'bold', minWidth: '46px' }}
            >
              No. {memo.id}
            </Typography>
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
              {memo.content}
            </Typography>
            <Typography variant="body2" sx={{ minWidth: '78px' }}>
              {formatedDate(memo.createdAt)}
            </Typography>
          </Stack>
          <Divider />
        </Fragment>
      ))}
    </List>
  );
};

export default MemoList;
