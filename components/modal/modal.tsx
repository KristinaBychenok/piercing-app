import { setIsModalOpen } from '../../store/settings.slice'
import { RootState } from '../../store/store'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { studios } from '../form/form.constants'
import dayjs from 'dayjs'
import { clearForm } from '../form/form.slice'
import { Box, Modal, Typography } from '@mui/material'
import { useTranslations } from 'next-intl'
import { useGetFormDataHook } from '../form/form.hooks'

export const ModalComponent = () => {
  const t = useTranslations()
  const isModalOpen = useSelector(
    (state: RootState) => state.settings.isModalOpen
  )
  const bookingForm = useSelector(
    (state: RootState) => state.bookingForm.bookingData
  )
  const dispatch = useDispatch()

  const { services } = useGetFormDataHook(false)

  const handleClose = useCallback(() => {
    dispatch(clearForm())
    dispatch(setIsModalOpen({ isOpen: false, appointment: null }))
  }, [dispatch])

  return (
    <Modal
      open={isModalOpen.isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-solid border-black-light bg-black-default p-6 text-black-light">
        <Typography id="modal-modal-title" variant="h5" component="h1">
          {t('bookingConfirmation.title')}
        </Typography>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className="py-4"
        >
          {t('bookingConfirmation.subTitle', {
            number: isModalOpen.appointment,
          })}
        </Typography>
        <div className="py-4">
          <Typography id="modal-modal-title" variant="h6" component="h3">
            {t('bookingConfirmation.detailsTitle')}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {t('bookingConfirmation.service', {
              service: services.find(
                (service) => service.value.toString() === bookingForm.service
              )?.label,
            })}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {t('bookingConfirmation.address', {
              address: studios.find(
                (studio) => studio.value === bookingForm.studio
              )?.label,
            })}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {t('bookingConfirmation.date', {
              date: dayjs(new Date(bookingForm.date)).format('DD MMM YYYY'),
              time: bookingForm.time,
            })}
          </Typography>
        </div>
      </Box>
    </Modal>
  )
}
