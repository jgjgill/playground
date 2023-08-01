<template>
  <h2>Child@@ / {{ msg }}</h2>
</template>

<script>
export default {
  inject: ['msg'],
  mounted() {
    console.log(this.msg)
  },
}
</script>
