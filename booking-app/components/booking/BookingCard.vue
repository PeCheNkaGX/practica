<template>
  <v-card variant="outlined" class="mb-2">
    <v-card-item>
      <div class="d-flex align-center">
        <v-icon :color="color" class="mr-2">mdi-calendar-clock</v-icon>
        <div>
          <div class="text-subtitle-1">{{ booking.resourceName }}</div>
          <div class="text-caption">{{ formatDate(booking.startTime) }} - {{ getTimeFromDate(booking.endTime) }}</div>
        </div>
        <v-spacer></v-spacer>
        <v-btn
          icon="mdi-pencil"
          size="small"
          variant="text"
          @click="edit"
        ></v-btn>
        <v-btn
          icon="mdi-delete"
          size="small"
          variant="text"
          color="error"
          @click="$emit('delete', booking.id)"
        ></v-btn>
      </div>
      <div v-if="booking.participants?.length" class="mt-2">
        <v-chip
          v-for="p in booking.participants"
          :key="p"
          size="x-small"
          class="mr-1"
        >
          {{ p }}
        </v-chip>
      </div>
      <div v-if="booking.comment" class="text-caption mt-1">
        {{ booking.comment }}
      </div>
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">
import type { Booking } from '~/types'
import { formatDate, getTimeFromDate } from '~/utils/dateHelpers'

const props = defineProps<{
  booking: Booking
}>()

const emit = defineEmits(['edit', 'delete'])

const color = computed(() => {
  const now = new Date()
  const end = new Date(props.booking.endTime)
  return end < now ? 'grey' : 'primary'
})

const edit = () => {
  emit('edit', props.booking)
}
</script>