<template>
  <v-form ref="form" v-model="valid">
    <v-select
      v-model="localData.resourceId"
      :items="resources"
      item-title="name"
      item-value="id"
      label="Выберите ресурс"
      required
      :rules="[v => !!v || 'Выберите ресурс']"
      @update:model-value="checkConflicts"
    ></v-select>
    
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="localData.startTime"
          label="Дата и время начала"
          type="datetime-local"
          required
          :rules="[v => !!v || 'Укажите дату']"
          @update:model-value="checkConflicts"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="localData.endTime"
          label="Дата и время окончания"
          type="datetime-local"
          required
          :rules="[v => !!v || 'Укажите дату']"
          @update:model-value="checkConflicts"
        ></v-text-field>
      </v-col>
    </v-row>
    
    <ConflictAlert
      v-if="conflicts.length"
      :conflicts="conflicts"
    />
    
    <v-combobox
      v-model="localData.participants"
      label="Участники"
      multiple
      chips
      hint="Введите имена участников"
    ></v-combobox>
    
    <v-textarea
      v-model="localData.comment"
      label="Комментарий"
    ></v-textarea>
  </v-form>
</template>

<script setup lang="ts">
import { useResourcesStore } from '~/stores/resources'
import { useBookingHelpers } from '~/composables/useBookingHelpers'
import type { BookingFormData } from '~/types'
import ConflictAlert from './ConflictAlert.vue'

const props = defineProps({
  modelValue: {
    type: Object as PropType<BookingFormData>,
    required: true
  },
  excludeBookingId: {
    type: String,
    default: undefined
  }
})

const emit = defineEmits(['update:modelValue', 'conflicts-change'])

const resourcesStore = useResourcesStore()
const { resources } = storeToRefs(resourcesStore)
const { getConflictingBookings, validateBooking } = useBookingHelpers()

const valid = ref(false)
const form = ref<any>(null)
const conflicts = ref<any[]>([])

const localData = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const checkConflicts = () => {
  if (localData.value.resourceId && localData.value.startTime && localData.value.endTime) {
    conflicts.value = getConflictingBookings(
      localData.value.resourceId,
      localData.value.startTime,
      localData.value.endTime,
      props.excludeBookingId
    )
    emit('conflicts-change', conflicts.value.length > 0)
  } else {
    conflicts.value = []
    emit('conflicts-change', false)
  }
}

defineExpose({
  validate: () => form.value?.validate(),
  valid
})
</script>