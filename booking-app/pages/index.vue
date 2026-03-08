<template>
  <div>
    <v-row>
      <v-col>
        <h1 class="text-h4 mb-4">Бронирование ресурсов</h1>
        <v-card>
          <v-card-text>
            <Calendar />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import Calendar from '~/components/booking/Calendar.vue'
</script>