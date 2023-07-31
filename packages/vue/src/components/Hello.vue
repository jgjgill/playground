<template>
  <h1>haha??</h1>
</template>

<script>
export default {
  inheritAttrs: false,
  mounted() {
    console.log(this.$attrs)
  },
}
</script>

<style scoped lang="scss">
$color: orange;

h1 {
  color: $color;
}
</style>
