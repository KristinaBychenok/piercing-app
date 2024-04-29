import { setIsModalOpen } from '../../store/settings.slice'
import { RootState } from '../../store/store'
import { Box, Modal, Typography } from '@mui/material'
import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { studios } from '../form/form.constants'
import dayjs from 'dayjs'
import { clearForm } from '../form/form.slice'
import { useTranslation } from 'react-i18next'
import { getServices } from '../form/form.helpers'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: 'black',
}

export const ModalComponent = () => {
  const isModalOpen = useSelector(
    (state: RootState) => state.settings.isModalOpen
  )
  const bookingForm = useSelector((state: RootState) => state.bookingForm)
  const loadedData = useSelector((state: RootState) => state.loadedData)
  const { i18n } = useTranslation()

  const dispatch = useDispatch()

  const services = useMemo(
    () =>
      getServices(loadedData.services, bookingForm?.serviceType, i18n.language),
    [bookingForm?.serviceType, i18n.language, loadedData.services]
  )

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
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h5" component="h1">
          Thank you for your booking! Administrator will contact you.
        </Typography>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className="py-4"
        >
          {`Your booking number: ${isModalOpen.appointment}`}
        </Typography>
        <div className="py-4">
          <Typography id="modal-modal-title" variant="h7" component="h3">
            Your Booking details:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {`Service: ${
              services.find(
                (service) => service.value.toString() === bookingForm.service
              )?.label
            }`}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {`Studio address: ${
              studios.find((studio) => studio.value === bookingForm.studio)
                ?.label
            }`}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {`Date: ${dayjs(new Date('2024-04-26')).format('DD MMM YYYY')} ${
              bookingForm.time
            }`}
          </Typography>
        </div>
      </Box>
    </Modal>
  )
}
