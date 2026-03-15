<template>
  <div>
    <v-row>
      <v-col>
        <v-btn
          prepend-icon="mdi-arrow-left"
          variant="text"
          class="mb-4"
          @click="$router.back()"
        >
          Назад
        </v-btn>
        
        <v-card v-if="booking">
          <v-card-title>Детали бронирования</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon>mdi-camera</v-icon>
                </template>
                <v-list-item-title>Ресурс</v-list-item-title>
                <v-list-item-subtitle>{{ booking.resourceName }}</v-list-item-subtitle>
              </v-list-item>
              
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon>mdi-calendar</v-icon>
                </template>
                <v-list-item-title>Дата и время</v-list-item-title>
                <v-list-item-subtitle>
                  {{ formatDate(booking.startTime) }} - {{ formatDate(booking.endTime) }}
                </v-list-item-subtitle>
              </v-list-item>
              
              <v-list-item v-if="booking.participants?.length">
                <template v-slot:prepend>
                  <v-icon>mdi-account-group</v-icon>
                </template>
                <v-list-item-title>Участники</v-list-item-title>
                <v-list-item-subtitle>
                  {{ booking.participants.join(', ') }}
                </v-list-item-subtitle>
              </v-list-item>
              
              <v-list-item v-if="booking.comment">
                <template v-slot:prepend>
                  <v-icon>mdi-comment</v-icon>
                </template>
                <v-list-item-title>Комментарий</v-list-item-title>
                <v-list-item-subtitle>{{ booking.comment }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" variant="text" @click="editBooking">
              Редактировать
            </v-btn>
            <v-btn color="error" variant="text" @click="showDeleteDialog = true">
              Отменить бронирование
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    
    <ConfirmDialog
      v-model="showDeleteDialog"
      title="Отмена бронирования"
      message="Вы уверены, что хотите отменить это бронирование?"
      @confirm="deleteBooking"
    />
  </div>
</template>

<script setup lang="ts">
import { useBookingStore } from '~/stores/booking'
import { useNotificationsStore } from '~/stores/notifications'
import { formatDate } from '~/utils/dateHelpers'
import ConfirmDialog from '~/components/common/ConfirmDialog.vue'

const route = useRoute()
const router = useRouter()
const bookingStore = useBookingStore()
const notificationsStore = useNotificationsStore()

const showDeleteDialog = ref(false)

const booking = computed(() => {
  return bookingStore.getBookingById(route.params.id as string)
})

if (!booking.value) {
  notificationsStore.error('Бронирование не найдено')
  router.push('/')
}

const editBooking = () => {
  router.push(`/bookings/${route.params.id}/edit`)
}

const deleteBooking = async () => {
  try {
    await bookingStore.deleteBooking(route.params.id as string)
    notificationsStore.success('Бронирование отменено')
    router.push('/')
  } catch {
    notificationsStore.error('Ошибка при отмене бронирования')
  }
}
</script>