import { useChangeFormHook, useGetFormDataHook } from './form.hooks'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

import { ThemeProvider, useTheme } from '@mui/material/styles'
import { customFieldTheme, studios } from './form.constants'
import { Spiner } from '../spiner/spiner'
import {
  Button,
  FormControl,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'

const DatePicker = dynamic(() => import('../calendar/datePicker'), {
  ssr: false,
})

export const Form = ({
  isEdit,
  appointmentId,
}: {
  isEdit?: boolean
  appointmentId?: string
}) => {
  const bookingForm = useSelector(
    (state: RootState) => state.bookingForm.bookingData
  )
  const isLoading = useSelector((state: RootState) => state.settings.isLoading)
  const t = useTranslations()

  const { services, serviceTypes, times } = useGetFormDataHook(!!isEdit)

  const outerTheme = useTheme()

  const {
    handleChangeName,
    handleChangePhone,
    handleChangeEmail,
    handleSelectServiceType,
    handleSelectService,
    handleSelectStudio,
    handleChangeDate,
    handleChangeTime,
    handleChangeMessage,
    handleSubmitForm,
    isBookButtonDisable,
    handleSaveChanges,
    handleDeleteAppointment,
  } = useChangeFormHook(!!isEdit, appointmentId)

  return (
    <div
      className={`flex flex-col laptop:flex-row items-center desktop:p-4 ${
        isEdit
          ? 'w-full laptop:items-start'
          : ' w-full desktop:w-[572px] py-8 laptop:p-8 border-y desktop:border border-white'
      }`}
    >
      <FormControl className="w-full desktop:w-[572px]">
        {!isEdit && <p className="pb-8">{t('form.formHeader')}</p>}
        <ThemeProvider theme={customFieldTheme(outerTheme)}>
          <div className="flex flex-col w-full">
            {!!isEdit && (
              <Typography className="font-sans font-inter pb-6" fontSize={17}>
                {t('form.nameField')}: {bookingForm.name}
              </Typography>
            )}
            {!isEdit && (
              <TextField
                type="text"
                required
                id="name"
                label={t('form.nameField')}
                placeholder={t('form.nameField')}
                fullWidth
                onChange={handleChangeName}
                value={bookingForm.name}
              />
            )}
            {!!isEdit && (
              <Typography className="font-sans font-inter pb-6" fontSize={17}>
                {t('form.phoneField')}: {bookingForm.phone}
              </Typography>
            )}
            {!isEdit && (
              <TextField
                type="text"
                required
                id="phone"
                label={t('form.phoneField')}
                placeholder={t('form.phoneField')}
                fullWidth
                onChange={handleChangePhone}
                value={`+${
                  bookingForm.phone
                    ? bookingForm.phone[0] === '+'
                      ? bookingForm.phone.slice(1)
                      : bookingForm.phone
                    : ''
                }`}
              />
            )}
            {!!isEdit && (
              <Typography className="font-sans font-inter pb-6" fontSize={17}>
                {t('form.emailField')}: {bookingForm.email}
              </Typography>
            )}
            {!isEdit && (
              <TextField
                type="email"
                required
                id="email"
                label={t('form.emailField')}
                placeholder={t('form.emailField')}
                fullWidth
                onChange={handleChangeEmail}
                value={bookingForm.email}
              />
            )}
            <TextField
              required
              id="serviceType"
              label={t('form.serviceTypeField')}
              placeholder={t('form.serviceTypeField')}
              fullWidth
              select
              onChange={handleSelectServiceType}
              value={bookingForm.serviceType}
            >
              {serviceTypes.map((service) => {
                return (
                  <MenuItem key={service.value} value={service.value}>
                    {service.label}
                  </MenuItem>
                )
              })}
            </TextField>
            <TextField
              required
              id="service"
              label={t('form.serviceField')}
              placeholder={t('form.serviceField')}
              fullWidth
              select
              onChange={handleSelectService}
              value={bookingForm.service}
            >
              {services.map((service) => {
                return (
                  <MenuItem key={service.value} value={service.value}>
                    {service.label}
                  </MenuItem>
                )
              })}
            </TextField>
            <TextField
              required
              id="studio"
              label={t('form.studioField')}
              placeholder={t('form.studioField')}
              fullWidth
              select
              onChange={handleSelectStudio}
              defaultValue={'2'}
              value={bookingForm.studio}
            >
              {studios.map((studio) => {
                return (
                  <MenuItem key={studio.value} value={studio.value}>
                    {studio.label}
                  </MenuItem>
                )
              })}
            </TextField>
            <DatePicker handleChangeDate={handleChangeDate} />
            <TextField
              required
              id="time"
              label={t('form.timeField')}
              placeholder={t('form.timeField')}
              fullWidth
              select
              onChange={handleChangeTime}
              value={bookingForm.time}
            >
              {times.map((timeSlot) => {
                return (
                  <MenuItem key={timeSlot} value={timeSlot}>
                    {timeSlot}
                  </MenuItem>
                )
              })}
            </TextField>
            <TextField
              type="text"
              required
              id="message"
              label={t('form.messageField')}
              placeholder={t('form.messageFieldPlaceholder')}
              fullWidth
              onChange={handleChangeMessage}
              value={bookingForm.message}
              multiline={true}
              rows={2}
            />
            <Button
              className="m-4 p-5 w-60 self-center"
              variant="outlined"
              onClick={isEdit ? handleSaveChanges : handleSubmitForm}
              disabled={isBookButtonDisable}
            >
              {!!isEdit ? t('reschedule.buttonSave') : t('form.formButton')}
            </Button>
          </div>
        </ThemeProvider>
      </FormControl>
      {!!isEdit && (
        <Button
          className="laptop:ml-20 p-5 w-60 border-white text-white  hover:border-black-light bg-pink bg-opacity-50 hover:bg-opacity-30 active:bg-opacity-20"
          variant="outlined"
          onClick={handleDeleteAppointment}
        >
          {t('reschedule.buttonDelete')}
        </Button>
      )}
      {!!isLoading && <Spiner />}
    </div>
  )
}
