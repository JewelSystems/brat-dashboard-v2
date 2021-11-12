<template>
  <v-card max-width="700px" class="mx-auto">
    <v-card-title primary-title>
      <v-spacer />
      <div>
        <h1 class="headline mb-0 mx-auto">Login</h1>
      </div>
      <v-spacer />
    </v-card-title>
    <v-form ref="loginForm" v-model="valid" lazy-validation @submit="login" @keyup.native.enter="login">
      <v-text-field
        v-model="loginData.username"
        label="Usuário"
        :rules="[v => !!v || 'Usuário não pode estar vazio!']"
        required
        class="mx-8"
      ></v-text-field>
      <v-text-field
        v-model="loginData.password"
        :rules="[v => (v && v.length >= 8) || 'Senha precisa de pelo menos 8 caractéres!']"
        :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPass ? 'text' : 'password'"
        label="Senha"
        required
        class="mx-8"
        hint="Mínimo de 8 caractéres"
        @click:append="showPass = !showPass"
      ></v-text-field>
    </v-form>
    <v-card-actions>
      <v-btn text color="primary" :to="'/signup'">Registro</v-btn>
      <v-spacer />
      <v-btn color="primary" :disabled="!valid" @click="login">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  middleware: [
    'guestOnly'
  ],
  data() {
    const valid:boolean = false
    const showPass:boolean = false
    const loginData = {
      username: '',
      password: ''
    }
    return{
      valid,
      showPass,
      loginData
    }
  },
  methods: {
    async login(){
      const username = this.loginData.username
      const password = this.loginData.password
      const loggedIn = await this.$store.dispatch('userSettings/login', { username, password })
      if (loggedIn.error){
        // return console.log(loggedIn)
      }
      else{
        const wsPayload = {"endpoint":"login", "id":this.$store.state.userSettings.userData.id, "info":{"token": this.$store.state.userSettings.userData.jwt}};
        this.$store.commit('wss/SOCKET_SEND', wsPayload);
        this.$router.push('/')
      }
    }
  }
})
</script>