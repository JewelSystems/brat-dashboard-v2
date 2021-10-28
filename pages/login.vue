<template>
  <v-card max-width="700px" class="mx-auto">
    <v-card-title primary-title>
      <v-spacer />
      <div>
        <h1 class="headline mb-0 mx-auto">Login</h1>
      </div>
      <v-spacer />
    </v-card-title>
    <v-form ref="loginForm" v-model="valid" lazy-validation>
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
      <v-btn text color="primary" :to="'/register'">Registro</v-btn>
      <v-spacer />
      <v-btn color="primary" :disabled="!valid">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
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
      const response = await this.$axios.$post('/login', {
        username: this.loginData.username,
        password: this.loginData.password,
      }).catch(function (error){
        if(error.response){
          return error.response;
        }
      });
      // console.log(response);
      return response;
    },
    }
})
</script>