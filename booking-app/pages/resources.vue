<!-- pages/resources.vue -->
<template>
  <div>
    <v-row>
      <v-col>
        <h1 class="text-h4 mb-4">Управление ресурсами</h1>
        
        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          class="mb-4"
          @click="openCreateDialog"
        >
          Добавить ресурс
        </v-btn>
        
        <v-card>
          <v-table>
            <thead>
              <tr>
                <th>Тип</th>
                <th>Название</th>
                <th>Ответственный</th>
                <th>Описание</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="resource in resources" :key="resource.id">
                <td>
                  <v-icon :icon="getResourceIcon(resource.type)" class="mr-2"></v-icon>
                  {{ getResourceTypeName(resource.type) }}
                </td>
                <td>{{ resource.name }}</td>
                <td>{{ resource.responsiblePerson || '-' }}</td>
                <td>{{ resource.description || '-' }}</td>
                <td>
                  <v-btn
                    icon="mdi-pencil"
                    size="small"
                    variant="text"
                    @click="editResource(resource)"
                  ></v-btn>
                  <v-btn
                    icon="mdi-delete"
                    size="small"
                    variant="text"
                    color="error"
                    @click="deleteResource(resource.id)"
                  ></v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- Модальное окно для создания/редактирования -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          {{ editingResource ? 'Редактировать' : 'Создать' }} ресурс
        </v-card-title>
        
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-select
              v-model="formData.type"
              :items="resourceTypes"
              label="Тип ресурса"
              required
              :rules="[v => !!v || 'Обязательное поле']"
            ></v-select>
            
            <v-text-field
              v-model="formData.name"
              label="Название"
              required
              :rules="[v => !!v || 'Обязательное поле']"
            ></v-text-field>
            
            <v-text-field
              v-model="formData.responsiblePerson"
              label="Ответственный"
            ></v-text-field>
            
            <v-textarea
              v-model="formData.description"
              label="Описание"
            ></v-textarea>
          </v-form>
        </v-card-text>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="closeDialog">Отмена</v-btn>
          <v-btn
            color="primary"
            :disabled="!valid"
            @click="saveResource"
          >
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import type { Resource } from '~/types'

// Реактивные данные
const resources = ref<Resource[]>([
  // Копируем те же моковые данные
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

const dialog = ref(false)
const valid = ref(false)
const editingResource = ref<Resource | null>(null)
const form = ref<any>(null)

const resourceTypes = [
  { title: 'Фотограф', value: 'photographer' },
  { title: 'Конференц-зал', value: 'conference-room' },
  { title: 'Оборудование', value: 'equipment' },
  { title: 'Другое', value: 'other' }
]

const formData = ref({
  name: '',
  type: 'photographer',
  responsiblePerson: '',
  description: ''
})

// Функции для иконок и названий (копируем с главной)
const getResourceIcon = (type: string) => {
  const icons = {
    photographer: 'mdi-camera',
    'conference-room': 'mdi-sofa',
    equipment: 'mdi-projector',
    other: 'mdi-help-circle'
  }
  return icons[type as keyof typeof icons] || icons.other
}

const getResourceTypeName = (type: string) => {
  const names = {
    photographer: 'Фотограф',
    'conference-room': 'Конференц-зал',
    equipment: 'Оборудование',
    other: 'Другое'
  }
  return names[type as keyof typeof names] || names.other
}

// Методы
const openCreateDialog = () => {
  editingResource.value = null
  formData.value = {
    name: '',
    type: 'photographer',
    responsiblePerson: '',
    description: ''
  }
  dialog.value = true
}

const editResource = (resource: Resource) => {
  editingResource.value = resource
  formData.value = {
    name: resource.name,
    type: resource.type,
    responsiblePerson: resource.responsiblePerson || '',
    description: resource.description || ''
  }
  dialog.value = true
}

const deleteResource = (id: string) => {
  if (confirm('Вы уверены?')) {
    resources.value = resources.value.filter(r => r.id !== id)
  }
}

const closeDialog = () => {
  dialog.value = false
  form.value?.reset()
}

const saveResource = async () => {
  if (!valid.value) return
  
  if (editingResource.value) {
    // Обновляем существующий
    const index = resources.value.findIndex(r => r.id === editingResource.value!.id)
    if (index !== -1) {
      resources.value[index] = {
        ...editingResource.value,
        ...formData.value,
        updatedAt: new Date().toISOString()
      }
    }
  } else {
    // Создаем новый
    const newResource: Resource = {
      id: Date.now().toString(), // временная генерация ID
      ...formData.value,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    resources.value.push(newResource)
  }
  
  closeDialog()
}
</script>