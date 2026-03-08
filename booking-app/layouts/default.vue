<!-- layouts/default.vue -->
<template>
  <v-app>
    <!-- Навигационная панель сверху -->
    <v-app-bar color="primary" density="comfortable">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      
      <v-app-bar-title>Booking App</v-app-bar-title>
      
      <v-spacer></v-spacer>
      
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      
      <v-btn icon>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Сайдбар (меню слева) -->
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <v-list-item
          prepend-icon="mdi-calendar"
          title="Бронирование"
          to="/"
          exact
        ></v-list-item>
        
        <v-list-item
          prepend-icon="mdi-cog"
          title="Управление ресурсами"
          to="/resources"
        ></v-list-item>
        
        <v-list-item
          prepend-icon="mdi-account"
          title="Профиль"
          to="/profile"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Основной контент -->
    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const drawer = ref(false)
</script>