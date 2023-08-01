<template>
  <h1>Parent!</h1>
  <ChildTemp />
</template>

<script>
import ChildTemp from '~/components/ChildTemp'

export default {
  components: { ChildTemp },
}
</script>

<style scoped lang="scss">
$color: red;
h1 {
  color: $color;
}
</style>
