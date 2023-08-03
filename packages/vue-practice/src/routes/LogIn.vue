<template>
  <form @submit.prevent>
    <input v-model="userID" placeholder="Your ID!" />
    <input v-model="userPW" type="password" placeholder="Your PW!" />
    <button @click="logIn">Log In!</button>
  </form>
</template>

<script>
export default {
  data() {
    return { userID: '', userPW: '' }
  },

  methods: {
    logIn() {
      this.$store.dispatch('user/logIn', { id: this.userID, pw: this.userPW })
    },
  },
}
</script>
