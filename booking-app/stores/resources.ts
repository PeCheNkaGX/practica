import { defineStore } from 'pinia'
import type { Resource } from '@/types'

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
        await new Promise(resolve => setTimeout(resolve, 500))
        this.resources = [
          {
            id: '1',
            name: 'Иван Петров',
            type: 'photographer',
            responsiblePerson: 'Мария Иванова',
            description: 'Штатный фотограф',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '2',
            name: 'Конференц-зал "Сириус"',
            type: 'conference-room',
            responsiblePerson: 'Петр Сидоров',
            description: 'Вместимость 20 человек',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '3',
            name: 'Проектор Epson',
            type: 'equipment',
            responsiblePerson: 'Анна Смирнова',
            description: 'Лазерный, 4K',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ]
      } catch (error) {
        this.error = 'Ошибка загрузки ресурсов'
      } finally {
        this.loading = false
      }
    },
    
    async createResource(resource: Omit<Resource, 'id' | 'createdAt' | 'updatedAt'>) {
      this.loading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 500))
        const newResource: Resource = {
          id: Date.now().toString(),
          ...resource,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        this.resources.push(newResource)
        return newResource
      } catch (error) {
        this.error = 'Ошибка создания ресурса'
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async updateResource(id: string, resource: Partial<Resource>) {
      this.loading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 500))
        const index = this.resources.findIndex(r => r.id === id)
        if (index !== -1) {
          this.resources[index] = {
            ...this.resources[index],
            ...resource,
            updatedAt: new Date().toISOString()
          }
        }
      } catch (error) {
        this.error = 'Ошибка обновления ресурса'
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async deleteResource(id: string) {
      this.loading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 500))
        this.resources = this.resources.filter(r => r.id !== id)
      } catch (error) {
        this.error = 'Ошибка удаления ресурса'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})