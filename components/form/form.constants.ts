import { outlinedInputClasses } from '@mui/material'
import { createTheme, Theme } from '@mui/material/styles'

export const customFieldTheme = (outerTheme: Theme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      // MuiFormControlLabel: {
      //   styleOverrides: {
      //     root: {
      //       width: '100%',
      //     },
      //   },
      // },
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
              color: 'var(--TextField-white)',
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
            [`&.Mui-disabled .${outlinedInputClasses.notchedOutline}`]: {
              // borderColor: 'var(--TextField-white)',
              border: '2px solid var(--TextField-gray)',
              color: 'var(--TextField-gray)',
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
            '&.Mui-disabled': {
              // borderColor: 'var(--TextField-white)',
              border: '2px solid var(--TextField-gray)',
              color: 'var(--TextField-gray)',
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
            '&:hover': {
              color: 'var(--TextField-white)',
              borderColor: 'var(--TextField-brandBorderHoverColor)',
            },
            '&.Mui-disabled': {
              color: 'grey',
              borderColor: 'grey',
            },
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            height: '200px',
            backgroundColor: '#B2BAC2',
          },
        },
      },
    },
  })

export const studios = [
  { label: 'Hugona Kołłątaja 21', value: '1' },
  { label: 'Kuźnicza 25', value: '2' },
]
