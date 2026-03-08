// stores/resources.ts
import { defineStore } from 'pinia'
import type { Resource } from '~/types'

export const useResourcesStore = defineStore('resources', {
  state: () => ({
    resources: [] as Resource[],
    loading: false,
    error: null as string | null
  }),
  
  getters: {
    getResourceById: (state) => (id: string) => {
      return state.resources.find(r => r.id === id)
    },
    
    resourcesByType: (state) => (type: string) => {
      return state.resources.filter(r => r.type === type)
    }
  },
  
  actions: {
    async fetchResources() {
      this.loading = true
      try {
        // Здесь будет запрос к API
        // Пока используем моковые данные
        this.resources = [
          // ... данные из страницы
        ]
      } catch (error) {
        this.error = 'Ошибка загрузки ресурсов'
      } finally {
        this.loading = false
      }
    },
    
    async createResource(resource: Omit<Resource, 'id' | 'createdAt' | 'updatedAt'>) {
      // Здесь будет POST запрос
    },
    
    async updateResource(id: string, resource: Partial<Resource>) {
      // Здесь будет PUT запрос
    },
    
    async deleteResource(id: string) {
      // Здесь будет DELETE запрос
    }
  }
})