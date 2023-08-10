<script setup lang="ts">
import { ref, onMounted } from 'vue'

const inputEl = ref<HTMLInputElement | null>(null)

onMounted(() => {
  if (inputEl.value) {
    inputEl.value.focus()
  }
})
</script>

<template>
  <input ref="inputEl" />
</template>
