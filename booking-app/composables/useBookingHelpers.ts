import { useBookingStore } from '~/stores/booking'
import type { Booking, BookingFormData } from '~/types'
import { checkOverlap } from '~/utils/dateHelpers'

export const useBookingHelpers = () => {
  const bookingStore = useBookingStore()
  
  const checkConflicts = (
    resourceId: string,
    startTime: string,
    endTime: string,
    excludeBookingId?: string
  ) => {
    const bookings = bookingStore.getBookingsByResource(resourceId)
    
    return bookings.some(booking => {
      if (excludeBookingId && booking.id === excludeBookingId) return false
      return checkOverlap(startTime, endTime, booking.startTime, booking.endTime)
    })
  }
  
  const getConflictingBookings = (
    resourceId: string,
    startTime: string,
    endTime: string,
    excludeBookingId?: string
  ) => {
    const bookings = bookingStore.getBookingsByResource(resourceId)
    
    return bookings.filter(booking => {
      if (excludeBookingId && booking.id === excludeBookingId) return false
      return checkOverlap(startTime, endTime, booking.startTime, booking.endTime)
    })
  }
  
  const validateBooking = (
    data: BookingFormData,
    excludeBookingId?: string
  ) => {
    if (!data.resourceId) return 'Выберите ресурс'
    if (!data.startTime) return 'Укажите время начала'
    if (!data.endTime) return 'Укажите время окончания'
    
    const start = new Date(data.startTime)
    const end = new Date(data.endTime)
    
    if (start >= end) return 'Время окончания должно быть позже начала'
    
    const hasConflict = checkConflicts(
      data.resourceId,
      data.startTime,
      data.endTime,
      excludeBookingId
    )
    
    if (hasConflict) return 'Это время уже занято'
    
    return null
  }
  
  return {
    checkConflicts,
    getConflictingBookings,
    validateBooking
  }
}