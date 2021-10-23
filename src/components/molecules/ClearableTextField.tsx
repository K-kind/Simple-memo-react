import { ChangeEvent, memo, useMemo, VFC } from 'react';
import { styled } from '@mui/material/styles';
import FormControl, { FormControlProps } from '@mui/material/FormControl';
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Close from '@mui/icons-material/Close';

type Props = {
  value?: string | null;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickClear?: () => void;
  formControlProps?: FormControlProps;
  inputProps?: OutlinedInputProps;
};

const ClearableTextField: VFC<Props> = memo(
  ({
    value,
    onChange,
    onClickClear,
    formControlProps = {},
    inputProps = {},
  }) => {
    const CustomFormControl = useMemo(
      () => styled(FormControl)`
        .MuiIconButton-root {
          opacity: 0;
          transition: visibility, opacity 0.2s;
        }
        :hover .MuiIconButton-root {
          opacity: 1;
        }
      `,
      [],
    );

    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <CustomFormControl size="small" {...formControlProps}>
        <OutlinedInput
          value={value}
          sx={{ backgroundColor: '#fff' }}
          onChange={onChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton size="small" edge="end" onClick={onClickClear}>
                <Close />
              </IconButton>
            </InputAdornment>
          }
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...inputProps}
        />
      </CustomFormControl>
    );
  },
);

export default ClearableTextField;
