import { TextField, InputAdornment } from '@mui/material';
import { useEffect, useState} from 'react';
import { ChromePicker } from 'react-color';

export const EditTextInput = ({
  onChange,
  value,
  prefix,
  label,
  type,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const [active, setActive] = useState(false);
  useEffect(() => {
    let val = value;
    if (type === 'color' || type === 'bg')
      val = `rgba(${Object.values(value)})`;
    setInternalValue(val);
  }, [value, type]);

  return (
    <div
      style={{ width: '100%', position: 'relative' }}
      onClick={() => {
        setActive(true);
      }}
    >
      {(type === 'color' || type === 'bg') && active ? (
        <div
          style={{
            zIndex: 99999,
            top: 'calc(100% + 10px)',
            left: '-5%',
          }}
        >
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActive(false);
            }}
          ></div>
          <ChromePicker
            color={value}
            onChange={(color) => {
              onChange(color.rgb);
            }}
          />
        </div>
      ) : null}
      <TextField
        label={label}
        style={{ margin: 0, width: '100%' }}
        value={internalValue || ''}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onChange((e.target).value);
          }
        }}
        onChange={(e) => {
          setInternalValue(e.target.value);
        }}
        margin="dense"
        variant="filled"
        InputProps={{
          disableUnderline: true,
          startAdornment: ['color', 'bg'].includes(type) ? (
            <InputAdornment
              position="start"
              style={{
                position: 'absolute',
                marginTop: '2px',
                marginRight: '8px',
              }}
            >
              <div
                style={{
                  left: '15px',
                  background: internalValue,
                }}
              />
            </InputAdornment>
          ) : null,
        }}
        InputLabelProps={{
          shrink: true,
        }}
        {...props}
      />
    </div>
  );
};