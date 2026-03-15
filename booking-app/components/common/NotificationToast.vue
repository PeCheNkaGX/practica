<template>
  <v-snackbar
    v-for="notification in notifications"
    :key="notification.id"
    v-model="showNotifications[notification.id]"
    :color="notification.type"
    :timeout="notification.timeout"
    location="top right"
    multi-line
  >
    {{ notification.message }}
    <template v-slot:actions>
      <v-btn color="white" variant="text" @click="removeNotification(notification.id)">
        Закрыть
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { useNotificationsStore } from '~/stores/notifications'

const notificationsStore = useNotificationsStore()
const { notifications } = storeToRefs(notificationsStore)
const { removeNotification } = notificationsStore

const showNotifications = ref<Record<string, boolean>>({})

watch(notifications, (newNotifications) => {
  newNotifications.forEach(n => {
    showNotifications.value[n.id] = true
  })
}, { deep: true })
</script>