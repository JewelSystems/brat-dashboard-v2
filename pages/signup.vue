<template>
  <v-card max-width="700px" class="mx-auto">
    <v-card-title primary-title>
      <v-spacer />
      <div>
        <h1 class="headline mb-0 mx-auto">Cadastro</h1>
      </div>
      <v-spacer />
    </v-card-title>
    <v-form ref="signUpForm" v-model="valid" lazy-validation>
      <v-row>
          <v-btn v-if="image.croppedImageURI === null" large class="mx-auto" @click.stop="showCrop=true">Upload Avatar</v-btn>
          <v-img v-else :src="image.croppedImageURI" contain class="mx-auto" max-height="100px" max-width="100px" @click.stop="showCrop=true">
            <v-hover v-slot="{ hover }">
              <div class="fill-height image-overlay white--text" :class="{'on-hover': hover}"><h3>Mudar avatar</h3></div>
            </v-hover>
          </v-img>
      </v-row>
      <AvatarCropper v-model="showCrop" @getCrop="getCrop" />
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
        :rules="[
        v => (v && v.length >= 8) || 'Senha precisa de pelo menos 8 caractéres!',
        v => (v === registerData.password1) || 'As senhas não são iguais!',
        ]"
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
          v => /.+@.+\..+/.test(v) || 'E-mail precisa ter um formato válido (ex:fulano@provedor.cdn)',
        ]"
        required
        class="mx-8"
      ></v-text-field>
      <v-row class="mx-8" dense no-gutters justify="space-between">
        <v-col md="6" cols="12">
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
      <v-row class="mx-8" dense no-gutters justify="space-between">
        <v-col md="6" cols="8">
          <v-text-field
            v-model="registerData.nickname"
            label="Apelido"
            :rules="[v => !!v || 'Apelido não pode estar vazio!']"
            required
          ></v-text-field>
        </v-col>
        <v-col md="5" cols="3">
          <v-select
            v-model="registerData.gender"
            :items="genderOptions"
            label="Gênero"
          ></v-select>
        </v-col>
      </v-row>
      <v-row class="mx-8" dense no-gutters justify="space-between">
        <v-col md="6" cols="12">
          <v-text-field
            v-model="registerData.birthday"
            v-mask = "'####-##-##'"
            label="Data de nascimento"
            :rules="[v => !!v || 'Data de nascimento não pode estar vazia!',]"
            hint="AAAA-MM-DD"
            required
          ></v-text-field>
        </v-col>
        <v-col md="5" cols="12">
          <v-text-field
            v-model="registerData.phone_number"
            v-mask ="phoneMask"
            label="Número de telefone"
            :rules="[v => v.length > 14 || 'Número de telefone inválido',]"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-text-field
        v-model="registerData.stream_link"
        label="Link de transmissão"
        :rules="[v => v.length > 22 || 'Insira um link de transmissão válido']"
        placeholder="https://www.twitch.tv/"
        required
        class="mx-8"
      ></v-text-field>
      <v-row class="mx-8" dense no-gutters justify="space-between">
        <v-col md="5" cols="12">
          <v-text-field
            v-model="registerData.youtube"
            label="YouTube"
          ></v-text-field>
        </v-col>
        <v-col md="5" cols="12">
          <v-text-field
            v-model="registerData.twitter"
            label="Twitter"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mx-8" dense no-gutters justify="space-between">
        <v-col md="5" cols="12">
          <v-text-field
            v-model="registerData.facebook"
            label="Facebook"
          ></v-text-field>
        </v-col>
        <v-col md="5" cols="12">
          <v-text-field
            v-model="registerData.instagram"
            label="Instagram"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
    <v-card-actions>
      <v-btn text color="primary" :to="'/login'">Login</v-btn>
      <v-spacer />
      <v-btn color="primary" :disabled="!valid" @click="submit">Cadastrar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  middleware:['guestsOnly'],
  data() {
    const valid: boolean = false
    const showPass: boolean = false
    const phoneMask: string = '+##(##)####-####'
    const showCrop: boolean = false
    const image = {
      cropCoords: null,
      croppedFile: null,
      croppedImageURI: null,
      filename: null,
      flippedH: null,
      flippedV: null,
      originalFile: null,
      rotation: null,
    }
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
      stream_link: 'https://www.twitch.tv/',
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
      image,
      showCrop,
      phoneMask,
      valid,
      showPass,
      registerData,
      genderOptions
    }
  },
  watch: {
    'registerData.phone_number' (newPhone): string {
      if (newPhone.length > 16 ) {
        return (this.$data.phoneMask = '+##(##)#####-####')
      }
      else{
        return (this.$data.phoneMask = '+##(##)####-####')
      }
    }
  },
  methods: {
    async submit(){
      this.$data.registerData.twitch = this.$data.registerData.stream_link
      
      const response = await this.$axios.$post('/user', {
        first_name: this.$data.registerData.first_name,
        last_name: this.$data.registerData.last_name,
        username: this.$data.registerData.username,
        nickname: this.$data.registerData.nickname,
        email: this.$data.registerData.email,
        gender: this.$data.registerData.gender,
        birthday: this.$data.registerData.birthday,
        phone_number: this.$data.registerData.phone_number,
        password: this.$data.registerData.password1,
        avatar: this.$data.image.croppedImageURI,
        stream_link: this.$data.registerData.stream_link,
        twitch: this.$data.registerData.twitch,
        twitter: this.$data.registerData.twitter,
        facebook: this.$data.registerData.facebook,
        instagram: this.$data.registerData.instagram,
        youtube: this.$data.registerData.youtube,
      } ).catch(function(error){
        if (error.response){
          // eslint-disable-next-line no-console
          console.log(error.response)
          return error.response
        }
      })
      // console.log(response)
      return response
    },
    getCrop (payload: any){
      this.$data.image = payload
    }
  }
})
</script>

<style>
.image-overlay{
    transition: opacity .2s ease-in-out;
    opacity: 100%;
    background-image: linear-gradient(to top right, rgba(97, 200, 98,.33), rgba(25,32,72,.8));
    max-height: "100px";
    max-width: "100px";
    text-align: center;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.image-overlay:not(.on-hover){
    opacity: 0%;
}
</style>