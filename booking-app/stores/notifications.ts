import { defineStore } from 'pinia'

export interface Notification {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
  timeout?: number
}

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    notifications: [] as Notification[]
  }),
  
  actions: {
    addNotification(notification: Omit<Notification, 'id'>) {
      const id = Date.now().toString()
      this.notifications.push({
        id,
        ...notification,
        timeout: notification.timeout || 5000
      })
      
      setTimeout(() => {
        this.removeNotification(id)
      }, notification.timeout || 5000)
    },
    
    removeNotification(id: string) {
      this.notifications = this.notifications.filter(n => n.id !== id)
    },
    
    success(message: string) {
      this.addNotification({ type: 'success', message })
    },
    
    error(message: string) {
      this.addNotification({ type: 'error', message })
    },
    
    info(message: string) {
      this.addNotification({ type: 'info', message })
    },
    
    warning(message: string) {
      this.addNotification({ type: 'warning', message })
    }
  }
})