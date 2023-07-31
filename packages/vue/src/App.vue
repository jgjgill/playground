<template>
  <h1>{{ msg }}</h1>
  <Hello class="hello" style="font-size: 100px" @click="msg += '!'" />
</template>

<script>
import Hello from '~/components/Hello'

export default {
  components: { Hello },
  data() {
    return {
      msg: 'Hello Vue!',
    }
  },
  methods: {
    reverseMsg() {
      this.msg = this.msg.split('').reverse().join('')
    },
  },
}
</script>
