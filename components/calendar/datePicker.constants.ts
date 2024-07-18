export const datePickerStyles = {
  border: '1px solid white',
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
  // disabled buttons
  '& .MuiButtonBase-root.Mui-disabled': {
    color: 'grey',
  },
  // day
  '& .MuiPickersDay-root': {
    color: 'white',
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
  // selected day
  '& .MuiPickersDay-root.Mui-selected.MuiPickersDay-dayWithMargin': {
    backgroundColor: 'grey',
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
