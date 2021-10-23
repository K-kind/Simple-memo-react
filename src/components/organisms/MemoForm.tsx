import { VFC, ChangeEvent, FormEvent, useRef, useCallback } from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { blue } from '@mui/material/colors';
import ClearableTextField from 'components/molecules/ClearableTextField';

type Props = {
  newMemo: string | null;
  setNewMemo: (value: string | null) => void;
  confirmNewMemo: () => void;

  setSearchVal: (value: string | null) => void;
};

const MemoForm: VFC<Props> = ({
  newMemo,
  setNewMemo,
  confirmNewMemo,
  setSearchVal,
}) => {
  const onNewMemoInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setNewMemo(e.target.value);
    },
    [setNewMemo],
  );

  const onSubmitNewMemo = useCallback(
    (e: FormEvent) => {
      confirmNewMemo();
      e.preventDefault();
    },
    [confirmNewMemo],
  );

  const searchFieldRef = useRef<HTMLInputElement>();
  const onSubmitSearch = (e: FormEvent) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setSearchVal(searchFieldRef.current!.value);
    e.preventDefault();
  };

  return (
    <Paper variant="outlined" sx={{ backgroundColor: blue[50], px: 2, py: 3 }}>
      <Stack spacing={2}>
        <form onSubmit={onSubmitNewMemo}>
          <Stack direction="row">
            <ClearableTextField
              value={newMemo}
              onChange={onNewMemoInputChange}
              onClickClear={() => setNewMemo('')}
              formControlProps={{ sx: { flexGrow: 1 } }}
            />
            <Button variant="contained" size="medium" type="submit">
              Add
            </Button>
          </Stack>
        </form>

        <form onSubmit={onSubmitSearch}>
          <Stack direction="row">
            <ClearableTextField
              onClickClear={() => {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                searchFieldRef.current!.value = '';
              }}
              formControlProps={{ sx: { flexGrow: 1 } }}
              inputProps={{ inputRef: searchFieldRef }}
            />
            <Button variant="contained" size="medium" type="submit">
              Find
            </Button>
          </Stack>
        </form>
      </Stack>
    </Paper>
  );
};

export default MemoForm;
