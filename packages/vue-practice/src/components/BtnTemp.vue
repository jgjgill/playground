<template>
  <button @click="log">
    <slot>Leon</slot>
  </button>
</template>

<script>
export default {
  methods: {
    log() {
      console.log('Click!')
    },
  },
}
</script>

<style scoped lang="scss">
button {
  padding: 10px 20px;
  &:hover {
    background-color: orange;
    transform: scale(1.2);
  }
}
</style>
