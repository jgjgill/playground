<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  mounted() {
    if (this.$refs.inputEl) {
      ;(this.$refs.inputEl as HTMLInputElement).focus()
    }
  }
})
</script>

<template>
  <input ref="inputEl" />
</template>
