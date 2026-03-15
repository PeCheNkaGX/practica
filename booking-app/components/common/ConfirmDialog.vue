<template>
  <v-dialog v-model="show" max-width="400px">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="text" @click="cancel">Отмена</v-btn>
        <v-btn color="error" variant="text" @click="confirm">Подтвердить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: Boolean,
  title: { type: String, default: 'Подтверждение' },
  message: { type: String, default: 'Вы уверены?' }
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const show = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const confirm = () => {
  emit('confirm')
  show.value = false
}

const cancel = () => {
  emit('cancel')
  show.value = false
}
</script>