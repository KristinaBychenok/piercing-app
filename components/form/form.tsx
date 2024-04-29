import { FC, useMemo } from 'react'
import { useChangeFormHook } from './form.hooks'
import { DatePicker } from '../calendar/datePicker'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { Button, FormControl, MenuItem, TextField } from '@mui/material'
import { ThemeProvider, useTheme } from '@mui/material/styles'
import { customFieldTheme, studios } from './form.constants'
import { getServiceTypes, getServices, getTimes } from './form.helpers'
import { useTranslation } from 'react-i18next'
// import { useTranslation } from 'next-i18next'

export const Form: FC = () => {
  const bookingForm = useSelector((state: RootState) => state.bookingForm)
  const loadedData = useSelector((state: RootState) => state.loadedData)
  const { t, i18n } = useTranslation()

  const times = useMemo(() => getTimes(bookingForm.date, loadedData.data), [
    bookingForm.date,
    loadedData,
  ])
  const serviceTypes = useMemo(() => getServiceTypes(loadedData.services), [
    loadedData.services,
  ])
  const services = useMemo(
    () =>
      getServices(loadedData.services, bookingForm?.serviceType, i18n.language),
    [bookingForm?.serviceType, i18n.language, loadedData.services]
  )

  const outerTheme = useTheme()

  const isBookButtonDisable = useMemo(() => {
    return (
      !bookingForm.name ||
      !bookingForm.phone ||
      !bookingForm.service ||
      !bookingForm.studio ||
      !bookingForm.date ||
      !bookingForm.time
    )
  }, [
    bookingForm.date,
    bookingForm.name,
    bookingForm.phone,
    bookingForm.service,
    bookingForm.studio,
    bookingForm.time,
  ])

  const {
    handleChangeName,
    handleChangePhone,
    handleChangeEmail,
    handleSelectServiceType,
    handleSelectService,
    handleSelectStudio,
    handleChangeDate,
    handleChangeTime,
    handleSubmitForm,
  } = useChangeFormHook()

  return (
    <div className="flex flex-col w-full md:w-[572px] p-4 md:px-8 xl:px-12 py-10 border-y md:border md:mx-12">
      <FormControl>
        <p className="pb-8">{t('form.formHeader')}</p>
        <ThemeProvider theme={customFieldTheme(outerTheme)}>
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
          <TextField
            type="text"
            required
            id="phone"
            label={t('form.phoneField')}
            placeholder={t('form.phoneField')}
            fullWidth
            onChange={handleChangePhone}
            value={`+${
              bookingForm.phone[0] === '+'
                ? bookingForm.phone.slice(1)
                : bookingForm.phone
            }`}
          />
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
          <Button
            className="m-4 p-5 w-60 self-center"
            variant="outlined"
            onClick={handleSubmitForm}
            disabled={isBookButtonDisable}
          >
            {t('form.formButton')}
          </Button>
        </ThemeProvider>
      </FormControl>
    </div>
  )
}
