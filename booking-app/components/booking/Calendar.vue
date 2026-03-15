<template>
  <div>
    <FullCalendar ref="calendar" :options="calendarOptions" />
    
    <v-dialog v-model="showBookingModal" max-width="600px">
      <v-card>
        <v-card-title>Новое бронирование</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-select
              v-model="formData.resourceId"
              :items="resources"
              item-title="name"
              item-value="id"
              label="Выберите ресурс"
              required
              :rules="[v => !!v || 'Выберите ресурс']"
            ></v-select>
            
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="formData.startTime"
                  label="Дата и время начала"
                  type="datetime-local"
                  required
                  :rules="[v => !!v || 'Укажите дату']"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="formData.endTime"
                  label="Дата и время окончания"
                  type="datetime-local"
                  required
                  :rules="[v => !!v || 'Укажите дату']"
                ></v-text-field>
              </v-col>
            </v-row>
            
            <v-combobox
              v-model="formData.participants"
              label="Участники"
              multiple
              chips
              hint="Введите имена участников"
            ></v-combobox>
            
            <v-textarea
              v-model="formData.comment"
              label="Комментарий"
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="showBookingModal = false">Отмена</v-btn>
          <v-btn color="primary" :disabled="!valid" :loading="saving" @click="saveBooking">Забронировать</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useResourcesStore } from '~/stores/resources'
import { useBookingStore } from '~/stores/booking'
import type { BookingFormData } from '~/types'

const resourcesStore = useResourcesStore()
const bookingStore = useBookingStore()
const { resources } = storeToRefs(resourcesStore)

const showBookingModal = ref(false)
const valid = ref(false)
const saving = ref(false)
const form = ref<any>(null)

const formData = ref<BookingFormData>({
  resourceId: '',
  startTime: '',
  endTime: '',
  participants: [],
  comment: ''
})

const { bookings } = storeToRefs(bookingStore)

const calendarEvents = computed(() => {
  return bookings.value.map(booking => ({
    id: booking.id,
    title: booking.resourceName || 'Бронирование',
    start: booking.startTime,
    end: booking.endTime,
    extendedProps: {
      resourceId: booking.resourceId,
      participants: booking.participants,
      comment: booking.comment
    }
  }))
})

const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'timeGridWeek',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  events: calendarEvents,
  select: (info: any) => {
    formData.value = {
      resourceId: '',
      startTime: info.startStr.slice(0, 16),
      endTime: info.endStr.slice(0, 16),
      participants: [],
      comment: ''
    }
    showBookingModal.value = true
  },
  eventClick: (info: any) => {
    if (confirm('Удалить бронирование?')) {
      bookingStore.deleteBooking(info.event.id)
    }
  }
})

const saveBooking = async () => {
  if (!valid.value) return
  
  saving.value = true
  try {
    const resource = resources.value.find(r => r.id === formData.value.resourceId)
    await bookingStore.createBooking({
      ...formData.value,
      resourceId: formData.value.resourceId,
      participants: formData.value.participants || []
    })
    showBookingModal.value = false
    form.value?.reset()
  } finally {
    saving.value = false
  }
}

await Promise.all([
  resourcesStore.fetchResources(),
  bookingStore.fetchBookings()
])
</script>

<style>
.fc {
  max-width: 100%;
  margin: 0 auto;
}
</style>