import { defineStore } from 'pinia'
import type { Booking, BookingFormData } from '@/types'

export const useBookingStore = defineStore('booking', {
  state: () => ({
    bookings: [] as Booking[],
    loading: false,
    error: null as string | null
  }),
  
  getters: {
    getBookingsByResource: (state) => (resourceId: string) => {
      return state.bookings.filter(b => b.resourceId === resourceId)
    },
    getBookingById: (state) => (id: string) => {
      return state.bookings.find(b => b.id === id)
    }
  },
  
  actions: {
    async fetchBookings() {
      this.loading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 500))
        this.bookings = [
          {
            id: '1',
            resourceId: '1',
            resourceName: 'Иван Петров',
            startTime: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(),
            endTime: new Date(new Date().setHours(12, 0, 0, 0)).toISOString(),
            participants: ['Мария', 'Алексей'],
            comment: 'Съемка мероприятия',
            createdBy: 'user1',
            createdAt: new Date().toISOString()
          },
          {
            id: '2',
            resourceId: '2',
            resourceName: 'Конференц-зал "Сириус"',
            startTime: new Date(new Date().setHours(14, 0, 0, 0)).toISOString(),
            endTime: new Date(new Date().setHours(16, 0, 0, 0)).toISOString(),
            participants: ['Петр', 'Иван', 'Ольга'],
            comment: 'Планерка',
            createdBy: 'user1',
            createdAt: new Date().toISOString()
          }
        ]
      } catch (error) {
        this.error = 'Ошибка загрузки бронирований'
      } finally {
        this.loading = false
      }
    },
    
    async createBooking(data: BookingFormData) {
      this.loading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 500))
        const newBooking: Booking = {
          id: Date.now().toString(),
          ...data,
          createdAt: new Date().toISOString(),
          createdBy: 'user1'
        }
        this.bookings.push(newBooking)
        return newBooking
      } catch (error) {
        this.error = 'Ошибка создания бронирования'
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async deleteBooking(id: string) {
      this.loading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 500))
        this.bookings = this.bookings.filter(b => b.id !== id)
      } catch (error) {
        this.error = 'Ошибка удаления бронирования'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})