import { outlinedInputClasses } from '@mui/material'
import { createTheme, Theme } from '@mui/material/styles'

export const customFieldTheme = (outerTheme: Theme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '--TextField-white': '#FFFFFF',
            '--TextField-gray': '#FFFFFF61',
            '--TextField-brandBorderHoverColor': '#B2BAC2',
            '--TextField-brandBorderFocusedColor': '#6F7E8C',
            marginBottom: '20px',
            '& input': {
              color: 'var(--TextField-white)',
            },
            '& input.Mui-focused': {
              color: 'var(--TextField-white)',
            },
            '& input.Mui-disabled': {
              color: 'var(--TextField-gray)',
              '-webkit-text-fill-color': '#FFFFFF61 !important',
            },
            '& textarea': {
              color: 'var(--TextField-white)',
            },
            '& textarea.Mui-disabled': {
              color: 'var(--TextField-gray)',
            },
            '& label': {
              color: 'var(--TextField-gray)',
            },
            '& label.Mui-focused': {
              color: '#FFA800',
            },
            '& label.Mui-disabled': {
              color: 'var(--TextField-gray)',
            },
            '.MuiSelect-select': {
              color: 'var(--TextField-white)',
            },
            '.MuiSelect-nativeInput': {
              color: 'var(--TextField-white)',
            },
            '& svg': {
              color: 'var(--TextField-white)',
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            border: '1px solid var(--TextField-gray)',
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderHoverColor)',
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              border: '2px solid #FFA800',
            },
            [`&.Mui-disabled .${outlinedInputClasses.notchedOutline}`]: {
              border: '2px solid var(--TextField-gray)',
              color: 'var(--TextField-white)',
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            '&::before, &::after': {
              borderBottom: '1px solid var(--TextField-white)',
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
            },
            '&.Mui-focused:after': {
              borderBottom: '2px solid var(--TextField-white)',
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            '&::before': {
              borderBottom: '2px solid var(--TextField-white)',
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
            },
            '&.Mui-focused:after': {
              borderBottom: '2px solid var(--TextField-white)',
            },
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            '& lable': {
              color: 'var(--TextField-white)',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            color: 'var(--TextField-white)',
            borderColor: 'var(--TextField-white)',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'transparent',
            },
            '&:active': {
              backgroundColor: 'transparent',
            },
            '&.Mui-disabled': {
              color: 'grey',
              borderColor: 'grey',
              backgroundColor: 'transparent',
            },
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            backgroundColor: '#3C3C3C',
            color: 'var(--TextField-white)',
          },
          root: {
            '& li.Mui-selected': {
              backgroundColor: '#2c2c2c',
            },
            '& li.Mui-selected:hover': {
              backgroundColor: '#2c2c2c',
            },
          },
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            maxHeight: '200px',
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            padding: '0',
            marginRight: '8px',
            color: '#FFFFFF61',
            '&.Mui-checked': {
              color: '#fff',
            },
          },
        },
      },
    },
  })
