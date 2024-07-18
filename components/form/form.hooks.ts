import { RootState } from '../../store/store'
import {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useMemo,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addName,
  addPhone,
  addEmail,
  addStudio,
  addService,
  addDate,
  addTime,
  addServiceType,
  addMessage,
  clearForm,
} from './form.slice'
import { Dayjs } from 'dayjs'
import { DateTime } from '../../store/index.types'
import {
  deleteAppointment,
  editAppointment,
  fetchSchedule,
  postAppointment,
} from '../../helpers/fetch.helpers'
import { addLoadedData } from '../../store/index.slice'
import { setIsLoading, setIsModalOpen } from '../../store/settings.slice'
import {
  getDeletedTimes,
  getServiceTypes,
  getServices,
  getTimes,
} from './form.helpers'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'

export const useChangeFormHook = (isEdit: boolean, appointmentId?: string) => {
  const bookingForm = useSelector(
    (state: RootState) => state.bookingForm.bookingData
  )
  const backup = useSelector((state: RootState) => state.bookingForm.backup)

  const dispatch = useDispatch()
  const { locale, push } = useRouter()

  const handleChangeName: ChangeEventHandler<HTMLInputElement> = useCallback(
    (value) => {
      dispatch(addName(value.target.value))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleChangePhone: ChangeEventHandler<HTMLInputElement> = useCallback(
    (value) => {
      dispatch(addPhone(value.target.value))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  const handleChangeEmail: ChangeEventHandler<HTMLInputElement> = useCallback(
    (value) => {
      dispatch(addEmail(value.target.value))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  const handleSelectServiceType: ChangeEventHandler<HTMLInputElement> =
    useCallback((value) => {
      dispatch(addServiceType(value.target.value))
      dispatch(addService(''))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  const handleSelectService: ChangeEventHandler<HTMLInputElement> = useCallback(
    (value) => {
      dispatch(addService(String(value.target.value)))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  const handleSelectStudio: ChangeEventHandler<HTMLInputElement> = useCallback(
    async (value) => {
      dispatch(addStudio(value.target.value))
      if (bookingForm.date) {
        dispatch(addDate(''))
      }
      if (bookingForm.time) {
        dispatch(addTime(''))
      }
      const loadedData: DateTime[] | undefined = await fetchSchedule(
        value.target.value
      )
      dispatch(addLoadedData(loadedData || []))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bookingForm.date, bookingForm.time]
  )
  const handleChangeDate = useCallback((date: Dayjs) => {
    dispatch(addDate(date.format('YYYY-MM-DD')))
    dispatch(addTime(''))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleChangeTime: ChangeEventHandler<HTMLInputElement> = useCallback(
    (value) => {
      if (!bookingForm.date || !bookingForm.service) {
        return
      }
      dispatch(addTime(value.target.value))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bookingForm.date, bookingForm.service]
  )
  const handleChangeMessage: ChangeEventHandler<HTMLInputElement> = useCallback(
    (value) => {
      dispatch(addMessage(value.target.value))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleSubmitForm: MouseEventHandler<HTMLButtonElement> =
    useCallback(async () => {
      dispatch(setIsLoading(true))
      const result: { number_appointment: number } = await postAppointment(
        {
          name: bookingForm.name,
          phone: bookingForm.phone,
          email: bookingForm.email,
          studio: bookingForm.studio,
          serviceType: bookingForm.serviceType,
          service: bookingForm.service,
          date: bookingForm.date,
          time: bookingForm.time,
          message: bookingForm.message,
        },
        locale || 'en'
      )
      dispatch(
        setIsModalOpen({ isOpen: true, appointment: result.number_appointment })
      )
      const loadedData = await fetchSchedule('1')
      dispatch(addLoadedData(loadedData || []))
      dispatch(setIsLoading(false))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      bookingForm.date,
      bookingForm.email,
      bookingForm.message,
      bookingForm.name,
      bookingForm.phone,
      bookingForm.service,
      bookingForm.serviceType,
      bookingForm.studio,
      bookingForm.time,
      locale,
    ])

  const isBookButtonDisable = useMemo(() => {
    const isBookingFormInvalid =
      !bookingForm.name ||
      !bookingForm.phone ||
      !bookingForm.email ||
      !bookingForm.service ||
      !bookingForm.serviceType ||
      !bookingForm.studio ||
      !bookingForm.date ||
      !bookingForm.time

    const rescheduleFormInvalid =
      isBookingFormInvalid ||
      (bookingForm.service === backup.service &&
        bookingForm.studio === backup.studio &&
        bookingForm.date === backup.date &&
        bookingForm.time === backup.time &&
        bookingForm.message === backup.message)

    return isEdit ? rescheduleFormInvalid : isBookingFormInvalid
  }, [
    backup.date,
    backup.message,
    backup.service,
    backup.studio,
    backup.time,
    bookingForm.date,
    bookingForm.email,
    bookingForm.message,
    bookingForm.name,
    bookingForm.phone,
    bookingForm.service,
    bookingForm.serviceType,
    bookingForm.studio,
    bookingForm.time,
    isEdit,
  ])

  const handleSaveChanges: MouseEventHandler<HTMLButtonElement> =
    useCallback(async () => {
      if (!appointmentId) return

      const editAppointmentData = {
        studio: !!bookingForm.studio ? bookingForm.studio : undefined,
        service: !!bookingForm.service ? bookingForm.service : undefined,
        date: !!bookingForm.date ? bookingForm.date : undefined,
        time: !!bookingForm.time ? bookingForm.time : undefined,
      }
      dispatch(setIsLoading(true))
      const result = await editAppointment(editAppointmentData, appointmentId)
      dispatch(setIsLoading(false))
      if (result.message === 'Appointment edited successfully') {
        push('/appointment/rescheduled')
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      appointmentId,
      bookingForm.date,
      bookingForm.service,
      bookingForm.studio,
      bookingForm.time,
      push,
    ])

  const handleDeleteAppointment: MouseEventHandler<HTMLButtonElement> =
    useCallback(async () => {
      if (!appointmentId) return

      dispatch(setIsLoading(true))
      const res = await deleteAppointment(appointmentId)
      dispatch(setIsLoading(false))
      if (res.message === 'Appointment deleted successfully') {
        dispatch(clearForm())
        push('/appointment/deleted')
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [appointmentId, push])

  return {
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
  }
}

export const useGetFormDataHook = (isEdit: boolean) => {
  const bookingForm = useSelector(
    (state: RootState) => state.bookingForm.bookingData
  )
  const loadedData = useSelector((state: RootState) => state.loadedData)
  const t = useTranslations()

  const services = useMemo(
    () => getServices(loadedData.services, bookingForm?.serviceType),
    [bookingForm?.serviceType, loadedData.services]
  )
  const formServices: { value: number; label: string }[] = useMemo(
    () =>
      services.map((service) => ({
        value: service.value,
        label: `${t(`services.${service.type}.${service.name}`)} - ${
          service.cost
        }zl - ${service.time}min`,
      })),
    [services, t]
  )
  const formServiceTypes = useMemo(() => {
    const srvcsTypes = getServiceTypes(loadedData.services)

    return srvcsTypes.map((srvcsType) => ({
      value: srvcsType.value,
      label: `${t(`services.${srvcsType.label}.title`)}`,
    }))
  }, [loadedData.services, t])

  const formTimes = useMemo(() => {
    const times = getTimes(bookingForm.date, loadedData.data, isEdit)
    let filteredTimes: string[] = times
    if (!bookingForm.service || !bookingForm.date)
      return ['Please select a service and a date.']

    const choosedServiceDuration = services.find(
      (service) => String(service.value) === bookingForm.service
    )?.time

    if (!!choosedServiceDuration && choosedServiceDuration >= 30) {
      const deletedTimes: string[] = []
      loadedData.data.forEach((data) => {
        const date = data.date

        if (date === bookingForm.date) {
          let editedBusyTimes: string[] = data.busyTimes
          if (isEdit) {
            const editedBusyTimeIndex = editedBusyTimes.findIndex(
              (item) => item === bookingForm.time
            )
            editedBusyTimes = [
              ...editedBusyTimes.slice(0, editedBusyTimeIndex),
              ...editedBusyTimes.slice(editedBusyTimeIndex + 2),
            ]
          }

          const busyTimes = isEdit ? editedBusyTimes : data.busyTimes
          const delItems = getDeletedTimes(
            [...busyTimes, '20:00'],
            choosedServiceDuration
          )
          deletedTimes.push(...delItems)
        }
      })

      deletedTimes.forEach((deletedTime) => {
        filteredTimes = filteredTimes.filter((time) => time !== deletedTime)
      })
    }

    return filteredTimes
  }, [
    bookingForm.date,
    bookingForm.service,
    bookingForm.time,
    isEdit,
    loadedData.data,
    services,
  ])

  return {
    services: formServices,
    serviceTypes: formServiceTypes,
    times: formTimes,
  }
}
