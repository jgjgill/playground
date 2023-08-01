<template>
  <h1 @click="msg += '!!'">
    {{ msg }}
  </h1>
  <ParentTemp />
</template>

<script>
import ParentTemp from '~/components/ParentTemp'
import { computed } from 'vue'

export default {
  components: { ParentTemp },
  provide() {
    return { msg: computed(() => this.msg) }
  },
  data() {
    return {
      isShow: false,
      msg: 'Hello Vue',
    }
  },
}
</script>
