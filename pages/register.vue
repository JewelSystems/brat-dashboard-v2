<template>
  <v-card max-width="700px" class="mx-auto">
    <v-card-title primary-title>
      <v-spacer />
      <div>
        <h1 class="headline mb-0 mx-auto">Cadastro</h1>
      </div>
      <v-spacer />
    </v-card-title>
    <v-form ref="loginForm" v-model="valid" lazy-validation>
      <v-row class="mx-8" dense no-gutters justify="space-between">
        <v-col md="5" cols="12">
          <v-text-field
            v-model="registerData.first_name"
            label="Nome"
            :rules="[v => !!v || 'Nome não pode estar vazio!']"
            required
          ></v-text-field>
        </v-col>
        <v-col md="5" cols="12">
          <v-text-field
            v-model="registerData.last_name"
            label="Sobrenome"
            :rules="[v => !!v || 'Sobrenome não pode estar vazio!']"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-text-field
        v-model="registerData.username"
        label="Usuário"
        :rules="[v => !!v || 'Usuário não pode estar vazio!']"
        required
        class="mx-8"
      ></v-text-field>
      <v-text-field
        v-model="registerData.password1"
        :rules="[v => (v && v.length >= 8) || 'Senha precisa de pelo menos 8 caractéres!']"
        :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPass ? 'text' : 'password'"
        label="Senha"
        required
        class="mx-8"
        hint="Mínimo de 8 caractéres"
        @click:append="showPass = !showPass"
      ></v-text-field>
      <v-text-field
        v-model="registerData.password2"
        :rules="[v => (v && v.length >= 8) || 'Senha precisa de pelo menos 8 caractéres!']"
        :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPass ? 'text' : 'password'"
        label="Confirmação de senha"
        required
        class="mx-8"
        hint="Mínimo de 8 caractéres"
        @click:append="showPass = !showPass"
      ></v-text-field>
      <v-text-field
        v-model="registerData.email"
        label="E-mail"
        :rules="[
          v => !!v || 'Email não pode estar vazio!',
          v => /.+@.+\..+/.test(v) || 'E-mail precisa ter um formato válido',
        ]"
        required
        class="mx-8"
      ></v-text-field>
      <v-row class="mx-8" dense no-gutters justify="space-between">
        <v-col md="6" cols="8">
          <v-text-field
            v-model="registerData.nickname"
            label="Apelido"
            :rules="[v => !!v || 'Apelido não pode estar vazio!']"
            required
          ></v-text-field>
        </v-col>
        <v-col md="4" cols="3">
          <v-select
            :items="genderOptions"
            label="Gênero"
          ></v-select>
        </v-col>
      </v-row>
    </v-form>
    <v-card-actions>
      <v-btn text color="primary" :to="'/login'">Login</v-btn>
      <v-spacer />
      <v-btn color="primary" :disabled="!valid">Cadastrar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    const valid:boolean = false
    const showPass:boolean = false
    const registerData = {
      first_name: '',
      last_name: '',
      username: '',
      nickname: '',
      email: '',
      gender: 'M',
      birthday: '',
      phone_number: '',
      password1: '',
      password2: '',
      stream_link: '',
      twitch: 'https://www.twitch.tv/',
      twitter: 'https://twitter.com/',
      facebook: 'https://www.facebook.com/',
      instagram: 'https://www.instagram.com/',
      youtube: 'https://www.youtube.com/',
    }
    const genderOptions = [
        { text: 'Masculino', value: 'M' },
        { text: 'Feminino', value: 'F' },
        { text: 'Não-Binário', value: 'N' },
        { text: 'Outro', value: 'O' }
      ]
    return{
      valid,
      showPass,
      registerData,
      genderOptions
    }
  },
})
</script>