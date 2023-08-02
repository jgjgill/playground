<template>
  <h1>Hello.vue</h1>
  <div>{{ count }}</div>
  <button @click="increaseCount">+</button>
  <button @click="decreaseCount">-</button>
  <div>{{ message }} / {{ reversedMessage }}</div>
  <button @click="fetchTodo">Fetch Todo!</button>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('count', ['count']),
    ...mapState('message', ['message']),
    ...mapGetters('message', ['reversedMessage']),
  },
  methods: {
    ...mapMutations('count', ['increaseCount', 'decreaseCount']),
    ...mapActions('message', ['fetchTodo']),
  },
}
</script>

<style scoped lang="scss">
$color: red;
h1 {
  color: $color;
}

textarea {
  width: 100%;
  height: 100px;
  box-sizing: border-box;
}
</style>
