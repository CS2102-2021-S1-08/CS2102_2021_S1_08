<template>
  <div class="register">
    <h1>Register</h1>

    <input
      type="text"
      name="Username"
      v-model="username"
      placeholder="Username"/>
    <br>
    <input
      type="text"
      name="Password"
      v-model="password"
      placeholder="Password"/>
    <br>
    <button
      @click="register">Register</button>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async register () {
      const response = await AuthenticationService.register({
        username: this.username,
        password: this.password
      })
      console.log(response.data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
