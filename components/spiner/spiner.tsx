import { CircularProgress } from '@mui/material'
import { memo } from 'react'

export const Spiner = memo(function SpinerComponent() {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black-strong opacity-95">
      <CircularProgress color="inherit" size={100} />
    </div>
  )
})
