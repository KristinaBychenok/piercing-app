import { RootState } from '../../store/store'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Modal, Typography } from '@mui/material'
import { useTranslations } from 'next-intl'
import { useChangeFormHook } from '../form/form.hooks'
import { setIsModalOpen } from '@/store/settings.slice'

export const AskDeleteAppointment = ({
  appointmentId,
}: {
  appointmentId: string
}) => {
  const t = useTranslations()
  const isModalOpen = useSelector(
    (state: RootState) => state.settings.isModalOpen
  )
  const dispatch = useDispatch()

  const handleClose = useCallback(() => {
    dispatch(setIsModalOpen(false))
  }, [dispatch])

  const { handleDeleteAppointment } = useChangeFormHook(true, appointmentId)

  return (
    <Modal
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="w-11/12 tablet:w-3/5 laptop:w-3/4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-solid border-white bg-grey-default p-8 tablet:p-10 laptop:p-16 text-white">
        <div className="flex flex-col">
          <Typography
            variant="h2"
            className="font-inter font-basic pb-8"
            fontSize={32}
          >
            {t('reschedule.askDelete.title')}
          </Typography>
          <Typography className="font-inter font-light mb-4" fontSize={17}>
            {t('reschedule.askDelete.subtitle')}
          </Typography>
          <div className="flex flex-col laptop:flex-row items-center justify-center laptop:items-center laptop:justify-start mt-6">
            <Button
              className="p-5 w-[258px] h-12 mb-6 laptop:mb-0 laptop:mr-6 border-white text-white hover:text-yellow-light hover:border-yellow-light active:text-yellow-default active:border-yellow-default"
              variant="outlined"
              onClick={handleClose}
            >
              {t('reschedule.askDelete.buttonGoBack')}
            </Button>
            <Button
              className="p-5 w-[258px] h-12 border-white text-white hover:text-yellow-light hover:border-yellow-light active:text-yellow-default active:border-yellow-default"
              variant="outlined"
              onClick={handleDeleteAppointment}
            >
              {t('reschedule.askDelete.buttonDelete')}
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  )
}
