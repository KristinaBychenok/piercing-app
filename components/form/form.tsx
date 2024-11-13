import { useChangeFormHook, useGetFormDataHook } from './form.hooks'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { CircularProgress } from '@mui/material'
import { ThemeProvider, useTheme } from '@mui/material/styles'
import { customFieldTheme } from './form.constants'
import {
  Button,
  Checkbox,
  FormControl,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useRouter } from 'next/router'

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
  const t = useTranslations()
  const { locale } = useRouter()

  const { studios, services, serviceTypes, times } = useGetFormDataHook(
    !!isEdit
  )

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
    handleChangeAcceptAgreement,
    handleChangeAcceptAge,
    handleSubmitForm,
    isBookButtonDisable,
    handleSaveChanges,
    handleAskDeleteAppointment,
    isFormLoading,
    isRescheduleFormLoading,
  } = useChangeFormHook(!!isEdit, appointmentId)

  return (
    <div
      className={`flex w-full items-center justify-center tablet:p-10 tablet:w-[572px]`}
    >
      {(isEdit ? !isRescheduleFormLoading : !isFormLoading) && (
        <FormControl className="w-full">
          <ThemeProvider theme={customFieldTheme(outerTheme)}>
            <div className="flex flex-col w-full">
              <div className="grid grid-cols-1 gap-1 tablet:grid-cols-2 tablet:gap-4">
                <TextField
                  type="text"
                  required
                  id="name"
                  label={t('form.nameField')}
                  placeholder={t('form.nameField')}
                  fullWidth
                  onChange={handleChangeName}
                  value={bookingForm.name.value}
                  helperText={
                    bookingForm.name.isValid
                      ? ''
                      : t('form.errors.nameNotValid')
                  }
                  error={!bookingForm.name.isValid}
                  disabled={isEdit}
                />
                <TextField
                  type="text"
                  required
                  id="phone"
                  label={t('form.phoneField')}
                  placeholder={'+48 123456789'}
                  fullWidth
                  onChange={handleChangePhone}
                  value={bookingForm.phone.value}
                  helperText={
                    bookingForm.phone.isValid
                      ? ''
                      : t('form.errors.phoneNotValid')
                  }
                  error={!bookingForm.phone.isValid}
                  disabled={isEdit}
                />
                <TextField
                  type="email"
                  required
                  id="email"
                  label={t('form.emailField')}
                  placeholder={t('form.emailField')}
                  fullWidth
                  onChange={handleChangeEmail}
                  value={bookingForm.email.value}
                  helperText={
                    bookingForm.email.isValid
                      ? ''
                      : t('form.errors.emailNotValid')
                  }
                  error={!bookingForm.email.isValid}
                  disabled={isEdit}
                />
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
                  {studios?.map((studio) => {
                    return (
                      <MenuItem key={studio.id} value={studio.id}>
                        {studio.address}
                      </MenuItem>
                    )
                  })}
                </TextField>
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
              </div>
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
                id="message"
                label={t('form.messageField')}
                placeholder={t('form.messageFieldPlaceholder')}
                fullWidth
                onChange={handleChangeMessage}
                multiline={true}
                rows={2}
                value={bookingForm.message.value}
                helperText={
                  bookingForm.message.isValid
                    ? ''
                    : t('form.errors.messageNotValid')
                }
                error={!bookingForm.message.isValid}
              />
              {!isEdit && (
                <div className="flex flex-row items-center py-1">
                  <Checkbox
                    required
                    className="text-grey"
                    value={bookingForm.acceptAgreement}
                    onChange={handleChangeAcceptAgreement}
                  />
                  <Typography className="font-inter font-basic" fontSize={16}>
                    {t('form.acceptAgreement.start')}
                    {
                      <Link
                        href="/agreement"
                        locale={locale || 'en'}
                        target="_blank"
                        className="underline"
                      >
                        {t('form.acceptAgreement.agreement')}
                      </Link>
                    }
                    {t('form.acceptAgreement.end')}*
                  </Typography>
                </div>
              )}
              {!isEdit && (
                <div className="flex flex-row items-center py-1">
                  <Checkbox
                    required
                    className="text-grey"
                    value={bookingForm.acceptAge}
                    onChange={handleChangeAcceptAge}
                  />
                  <Typography className="font-inter font-basic" fontSize={16}>
                    {t('form.acceptAge')}*
                  </Typography>
                </div>
              )}
              <Button
                className="button m-4 w-full h-12 self-center"
                variant="outlined"
                onClick={isEdit ? handleSaveChanges : handleSubmitForm}
                disabled={isBookButtonDisable}
              >
                {!!isEdit ? t('reschedule.buttonSave') : t('form.formButton')}
              </Button>
              {!!isEdit && (
                <Button
                  className="button m-4 w-full h-12 self-center"
                  variant="outlined"
                  onClick={handleAskDeleteAppointment}
                >
                  {t('reschedule.buttonDelete')}
                </Button>
              )}
            </div>
          </ThemeProvider>
        </FormControl>
      )}
      {(isEdit ? isRescheduleFormLoading : isFormLoading) && (
        <div className="flex flex-col items-center justify-center text-center h-[970px]">
          <CircularProgress color="inherit" size={67} />
          <Typography className="font-sans font-inter text-17 font-light pt-20">
            {t('form.alert.loading')}
          </Typography>
        </div>
      )}
    </div>
  )
}
