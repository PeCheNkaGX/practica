<template>
  <div>
    <v-row>
      <v-col>
        <h1 class="text-h4 mb-4">Управление ресурсами</h1>
        
        <v-btn color="primary" prepend-icon="mdi-plus" class="mb-4" @click="openCreateDialog">
          Добавить ресурс
        </v-btn>
        
        <v-progress-linear v-if="loading" indeterminate></v-progress-linear>
        
        <v-card v-else>
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
                  <v-btn icon="mdi-pencil" size="small" variant="text" @click="editResource(resource)"></v-btn>
                  <v-btn icon="mdi-delete" size="small" variant="text" color="error" @click="deleteResource(resource.id)"></v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>{{ editingResource ? 'Редактировать' : 'Создать' }} ресурс</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-select v-model="formData.type" :items="resourceTypes" label="Тип ресурса" required :rules="[v => !!v || 'Обязательное поле']"></v-select>
            <v-text-field v-model="formData.name" label="Название" required :rules="[v => !!v || 'Обязательное поле']"></v-text-field>
            <v-text-field v-model="formData.responsiblePerson" label="Ответственный"></v-text-field>
            <v-textarea v-model="formData.description" label="Описание"></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="closeDialog">Отмена</v-btn>
          <v-btn color="primary" :disabled="!valid" :loading="saving" @click="saveResource">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { useResourcesStore } from '~/stores/resources'
import { useResourceHelpers } from '~/composables/useResourceHelpers'

const resourcesStore = useResourcesStore()
const { getResourceIcon, getResourceTypeName, resourceTypes } = useResourceHelpers()

const { resources, loading } = storeToRefs(resourcesStore)

await resourcesStore.fetchResources()

const dialog = ref(false)
const valid = ref(false)
const saving = ref(false)
const editingResource = ref<any>(null)
const form = ref<any>(null)

const formData = ref({
  name: '',
  type: 'photographer',
  responsiblePerson: '',
  description: ''
})

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

const editResource = (resource: any) => {
  editingResource.value = resource
  formData.value = {
    name: resource.name,
    type: resource.type,
    responsiblePerson: resource.responsiblePerson || '',
    description: resource.description || ''
  }
  dialog.value = true
}

const deleteResource = async (id: string) => {
  if (confirm('Вы уверены?')) {
    await resourcesStore.deleteResource(id)
  }
}

const closeDialog = () => {
  dialog.value = false
  form.value?.reset()
}

const saveResource = async () => {
  if (!valid.value) return
  
  saving.value = true
  try {
    if (editingResource.value) {
      await resourcesStore.updateResource(editingResource.value.id, formData.value)
    } else {
      await resourcesStore.createResource(formData.value)
    }
    closeDialog()
  } finally {
    saving.value = false
  }
}
</script>