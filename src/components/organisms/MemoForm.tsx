import {
  VFC,
  ChangeEvent,
  FormEvent,
  useRef,
  useCallback,
  useState,
} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { blue } from '@mui/material/colors';
import ClearableTextField from 'components/molecules/ClearableTextField';
import { Memo } from 'domains/models/memo';

type Props = {
  // 新規メモ
  newMemo: string | null;
  setNewMemo: (value: string | null) => void;
  confirmNewMemo: () => void;
  // メモ検索
  setSearchVal: (value: string | null) => void;
  // メモ削除
  memos: Memo[];
  deleteMemo: (id: number) => void;
};

const MemoForm: VFC<Props> = ({
  newMemo,
  setNewMemo,
  confirmNewMemo,
  setSearchVal,
  memos,
  deleteMemo,
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

  const [selectedMemo, setSelectedMemo] = useState<Memo | null>(null);
  const onSubmitDelete = () => {
    if (selectedMemo == null) return;

    deleteMemo(selectedMemo.id);
    setSelectedMemo(null);
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

        <Stack direction="row">
          <Autocomplete
            value={selectedMemo}
            options={memos}
            sx={{ flexGrow: 1, backgroundColor: 'white' }}
            size="small"
            getOptionLabel={(option) => option.content}
            renderOption={(props, option) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <li {...props} key={option.id}>
                {option.content}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
                variant="outlined"
              />
            )}
            onChange={(_e, value) => setSelectedMemo(value)}
          />
          <Button variant="contained" size="medium" onClick={onSubmitDelete}>
            Del
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default MemoForm;
