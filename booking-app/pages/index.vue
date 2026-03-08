<!-- pages/index.vue -->
<template>
  <div>
    <v-row>
      <v-col>
        <h1 class="text-h4 mb-4">Бронирование ресурсов</h1>
        <v-card>
          <v-card-text>
            <!-- Здесь будет календарь (со 2-й недели) -->
            <v-alert type="info">
              Календарь появится на следующей неделе
            </v-alert>
            
            <!-- Временный список ресурсов -->
            <v-list v-if="resources.length">
              <v-list-item
                v-for="resource in resources"
                :key="resource.id"
              >
                <template v-slot:prepend>
                  <v-icon :icon="getResourceIcon(resource.type)"></v-icon>
                </template>
                
                <v-list-item-title>{{ resource.name }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ getResourceTypeName(resource.type) }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import type { Resource } from '~/types'

// Временные моковые данные (пока нет бэкенда)
const resources = ref<Resource[]>([
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
])

// Функция для иконок
const getResourceIcon = (type: string) => {
  const icons = {
    photographer: 'mdi-camera',
    'conference-room': 'mdi-sofa',
    equipment: 'mdi-projector',
    other: 'mdi-help-circle'
  }
  return icons[type as keyof typeof icons] || icons.other
}

// Функция для названий
const getResourceTypeName = (type: string) => {
  const names = {
    photographer: 'Фотограф',
    'conference-room': 'Конференц-зал',
    equipment: 'Оборудование',
    other: 'Другое'
  }
  return names[type as keyof typeof names] || names.other
}
</script>