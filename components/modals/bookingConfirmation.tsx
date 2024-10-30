import { RootState } from '../../store/store'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { clearForm } from '../form/form.slice'
import { Box, Modal, Typography } from '@mui/material'
import { useTranslations } from 'next-intl'
import { useGetFormDataHook } from '../form/form.hooks'
import { Button } from '../buttons/button'
import { setIsModalOpen } from '@/store/settings.slice'

export const BookingConfirmationModal = () => {
  const t = useTranslations()
  const isModalOpen = useSelector(
    (state: RootState) => state.settings.isModalOpen
  )
  const bookingForm = useSelector(
    (state: RootState) => state.bookingForm.bookingData
  )
  const dispatch = useDispatch()

  const { studios, services, serviceTypes } = useGetFormDataHook(false)

  const handleClose = useCallback(() => {
    dispatch(clearForm())
    dispatch(setIsModalOpen(false))
  }, [dispatch])

  return (
    <Modal
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="w-11/12 tablet:w-3/5 laptop:w-1/2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-solid border-white bg-grey-default p-8 tablet:p-10 laptop:p-16 text-white">
        <div className="flex flex-col">
          <Typography
            variant="h2"
            className="font-inter font-basic pb-8"
            fontSize={32}
          >
            {t('bookingConfirmation.title')}
          </Typography>
          <Typography className="font-inter font-light mb-6" fontSize={17}>
            {t('bookingConfirmation.subTitle', {
              number: bookingForm.appointmentId,
            })}
          </Typography>
          <Typography className="font-inter font-light mb-6" fontSize={17}>
            {t('bookingConfirmation.text', {
              email: bookingForm.email.value,
            })}
          </Typography>
          <div className="flex flex-col pl-4 border-l border-white border-solid mb-8">
            <Typography className="font-inter font-light" fontSize={17}>
              {bookingForm.name.value}
            </Typography>
            <Typography className="font-inter font-light pb-4" fontSize={14}>
              {bookingForm.email.value}
            </Typography>
            <Typography className="font-inter font-light" fontSize={17}>
              {dayjs(new Date(bookingForm.date)).format('DD MMM YYYY')}
            </Typography>
            <Typography className="font-inter font-light pb-4" fontSize={14}>
              {bookingForm.time}
            </Typography>
            <Typography className="font-inter font-light" fontSize={17}>
              {t('bookingConfirmation.details.serviceTypeField')}:
            </Typography>
            <Typography className="font-inter font-light pb-4" fontSize={14}>
              {
                serviceTypes.find(
                  (serviceType) =>
                    String(serviceType.value) === bookingForm.serviceType
                )?.label
              }
            </Typography>
            <Typography className="font-inter font-light" fontSize={17}>
              {t('bookingConfirmation.details.serviceField')}:
            </Typography>
            <Typography className="font-inter font-light" fontSize={14}>
              {
                services.find(
                  (service) => String(service.value) === bookingForm.service
                )?.label
              }
            </Typography>
          </div>
          <Typography className="font-inter font-light mb-1" fontSize={17}>
            Wroclaw,{' '}
            {
              studios?.find(
                (studio) => String(studio.id) === bookingForm.studio
              )?.address
            }
          </Typography>
          <Typography className="font-inter font-light mb-6" fontSize={17}>
            +48 780-743-556
          </Typography>
          <Button
            name={t('bookingConfirmation.buttonReturn')}
            href="/"
            onClick={handleClose}
          />
        </div>
      </Box>
    </Modal>
  )
}
