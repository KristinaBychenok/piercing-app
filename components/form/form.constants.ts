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
            '& label': {
              color: 'var(--TextField-gray)',
            },
            '& label.Mui-focused': {
              color: 'var(--TextField-white)',
            },
            '.MuiSelect-select': {
              color: 'var(--TextField-white)',
            },
            'input:-internal-autofill-selected': {
              backgroundColor: 'red',
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            // borderColor: 'var(--TextField-white)',
            border: '1px solid var(--TextField-white)',
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderHoverColor)',
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              // borderColor: 'var(--TextField-white)',
              border: '2px solid var(--TextField-white)',
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
    },
  })

export const procedures = [
  { label: 'Pirsing Bridge - 1', value: 'Pirsing Bridge - 1' },
  { label: 'Pirsing Bridge - 2', value: 'Pirsing Bridge - 2' },
  { label: 'Pirsing Bridge - 3', value: 'Pirsing Bridge - 3' },
]
export const studios = [
  { label: 'Hugona Kołłątaja 21', value: '1' },
  { label: 'Kuźnicza 25', value: '2' },
]
