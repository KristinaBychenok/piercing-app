import { Alert } from '@mui/material'

export const Error = ({
  message,
  onClose,
}: {
  message: string
  onClose: () => void
}) => {
  return (
    <Alert
      onClose={onClose}
      severity="error"
      className="m-4 fixed right-0 bottom-0 z-50"
    >
      {message}
    </Alert>
  )
}
