<template>
  <v-alert
    type="warning"
    variant="tonal"
    class="mb-3"
    closable
  >
    <div class="font-weight-bold mb-2">Обнаружены конфликты:</div>
    <div v-for="conflict in conflicts" :key="conflict.id" class="ml-2">
      • {{ conflict.resourceName }} с {{ formatTime(conflict.startTime) }} до {{ formatTime(conflict.endTime) }}
    </div>
  </v-alert>
</template>

<script setup lang="ts">
import { getTimeFromDate } from '~/utils/dateHelpers'

defineProps({
  conflicts: {
    type: Array,
    required: true
  }
})

const formatTime = (date: string) => {
  return getTimeFromDate(date)
}
</script>