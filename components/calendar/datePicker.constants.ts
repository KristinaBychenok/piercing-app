export const datePickerStyles = {
  border: '1px solid grey',
  borderRadius: '4px',
  color: 'white',
  width: '100%',
  alignItems: 'center',
  // week days
  '& .MuiTypography-root ': {
    color: 'white',
    fontWeight: '600px',
  },
  // buttons
  '& .MuiButtonBase-root': {
    color: 'white',
  },
  '& .MuiButtonBase-root:hover': {
    color: '#FFDC97',
  },
  '& .MuiButtonBase-root:active': {
    color: '#FFA800',
  },
  // disabled buttons
  '& .MuiButtonBase-root.Mui-disabled': {
    color: 'grey',
  },
  // day
  '& .MuiPickersDay-root': {
    color: 'white',
  },
  // day :hover
  '& .MuiPickersDay-root:hover': {
    color: 'black',
    backgroundColor: '#FFDC97',
    opacity: '70%',
  },
  // day :active
  '& .MuiPickersDay-root:active': {
    color: 'black',
    backgroundColor: '#FFDC97',
    opacity: '80%',
  },
  // disabled day
  '& .MuiPickersDay-root.Mui-disabled': {
    color: 'grey',
  },
  '& .MuiButtonBase-root.Mui-disabled.MuiPickersDay-root.Mui-disabled.MuiPickersDay-dayWithMargin':
    {
      color: 'grey',
    },
  // hidden day
  '& .MuiPickersDay-hiddenDaySpacingFiller': {
    color: 'grey',
  },
  // today day
  '& .MuiPickersDay-dayWithMargin.MuiPickersDay-today': {
    borderColor: 'white',
  },
  // today disabled day
  '& .MuiButtonBase-root.Mui-disabled.MuiPickersDay-root.Mui-selected.Mui-disabled.MuiPickersDay-dayWithMargin.MuiPickersDay-today':
    {
      borderColor: 'white',
      color: 'white',
    },
  // selected day
  '& .MuiPickersDay-root.Mui-selected.MuiPickersDay-dayWithMargin': {
    backgroundColor: '#FFDC97',
    color: 'black',
    opacity: '80%',
  },
  // months
  '& .MuiPickersMonth-monthButton': {
    color: 'white',
  },
  // disabled months
  '& .MuiPickersMonth-monthButton.Mui-disabled': {
    color: 'grey',
  },
  // selected months
  '& .MuiPickersMonth-monthButton.Mui-selected': {
    backgroundColor: 'grey',
  },
}
