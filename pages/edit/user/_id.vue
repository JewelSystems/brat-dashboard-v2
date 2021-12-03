<template>
  <v-card max-width="900px" class="mx-auto">
    <v-card-title primary-title>
      <v-spacer />
      <div>
        <h1 class="headline mb-0 mx-auto">Editar Usuário</h1>
      </div>
      <v-spacer />
    </v-card-title>
    <v-form ref="signUpForm" v-model="valid" lazy-validation>
      <v-row>
          <v-img :src="image.croppedImageURI != null ? image.croppedImageURI : parsedAvatar" contain class="mx-auto" max-height="100px" max-width="100px" @click.stop="showCrop=true">
            <v-hover v-slot="{ hover }">
              <div class="fill-height image-overlay white--text" :class="{'on-hover': hover}"><h3>Mudar avatar</h3></div>
            </v-hover>
          </v-img>
      </v-row>
      <AvatarCropper v-model="showCrop" @getCrop="getCrop" />
      <v-text-field
        v-model="userInfo.username"
        outlined
        flat disabled
        label="Usuário"
        :rules="[v => !!v || 'Usuário não pode estar vazio!']"
        required
        class="mx-8 mt-10"
      ></v-text-field>
      <v-text-field
        v-model="userInfo.email"
        outlined
        label="E-mail"
        :rules="[
          v => !!v || 'Email não pode estar vazio!',
          v => /.+@.+\..+/.test(v) || 'E-mail precisa ter um formato válido (ex:fulano@provedor.com)',
        ]"
        required
        class="mx-8"
      ></v-text-field>
      <v-row class="mx-8" dense no-gutters justify="space-between">
        <v-col md="5" cols="12">
          <v-text-field
            v-model="userInfo.first_name"
            outlined
            label="Nome"
            :rules="[v => !!v || 'Nome não pode estar vazio!']"
            required
          ></v-text-field>
        </v-col>
        <v-col md="5" cols="12">
          <v-text-field
            v-model="userInfo.last_name"
            outlined
            label="Sobrenome"
            :rules="[v => !!v || 'Sobrenome não pode estar vazio!']"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mx-8" dense no-gutters justify="space-between">
        <v-col md="5" cols="12">
          <v-text-field
            v-model="userInfo.phone_number"
            v-mask ="phoneMask"
            outlined
            label="Número de telefone"
            :rules="[v => v.length > 14 || 'Número de telefone inválido',]"
            required
          ></v-text-field>
        </v-col>
        <v-col md="5" cols="3">
          <v-select
            v-model="userInfo.gender"
            outlined
            :items="genderOptions"
            label="Gênero"
          ></v-select>
        </v-col>
      </v-row>
      <v-text-field
        v-model="userInfo.stream_link"
        outlined
        label="Link de transmissão"
        :rules="[v => v.length > 22 || 'Insira um link de transmissão válido']"
        placeholder="https://www.twitch.tv/"
        required
        class="mx-8"
      ></v-text-field>
      <v-row class="mx-8" dense no-gutters justify="space-between">
        <v-col md="5" cols="12">
          <v-text-field
            v-model="userInfo.youtube"
            outlined
            label="YouTube"
          ></v-text-field>
        </v-col>
        <v-col md="5" cols="12">
          <v-text-field
            v-model="userInfo.twitter"
            outlined
            label="Twitter"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mx-8" dense no-gutters justify="space-between">
        <v-col md="5" cols="12">
          <v-text-field
            v-model="userInfo.facebook"
            outlined
            label="Facebook"
          ></v-text-field>
        </v-col>
        <v-col md="5" cols="12">
          <v-text-field
            v-model="userInfo.instagram"
            outlined
            label="Instagram"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" :disabled="!valid" @click="submit">Salvar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters} from 'vuex'

export default Vue.extend({
    middleware: ['sameUser'],
    asyncData ({params}){
        const userId = params.id
        return {
            userId,
        }
    },
    data() {
        const valid = false
        const loading = false
        const phoneMask: string = '+##(##)####-####'
        const showCrop: boolean = false
        const genderOptions = [
            { text: 'M', value: 'M' },
            { text: 'F', value: 'F' },
            { text: 'NB', value: 'N' },
            { text: 'O', value: 'O' }
        ]
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
        const userInfo = {
            avatar: '',
            phone_number: '',
            stream_link: ''
        }
        const parsedAvatar = ''
        return{
            parsedAvatar,
            userInfo,
            image,
            showCrop,
            phoneMask,
            valid,
            genderOptions,
            loading,
        }
    },
    async fetch (){
        const fetchData = await this.$axios.$get('/user/'+this.$data.userId)
        this.$data.userInfo = fetchData.res[0]
        // console.log(this.userInfo)
    },
    computed: {
        ...mapGetters('userSettings',[
            'userData',
        ]),
        ...mapGetters('wss',[
            'curReq',
        ])
    },
    watch: {
        'userInfo.phone_number' (newPhone): string {
            if (newPhone.length > 16 ) {
                return (this.$data.phoneMask = '+##(##)#####-####')
            }
            else{
                return (this.$data.phoneMask = '+##(##)####-####')
            }
        },
        'userInfo.avatar' (){
            this.parseAvatar()
        }
    },
    methods: {
        parseAvatar (){
            const i = this.$data.userInfo.avatar == null ? '/Brat_logo.png' : process.env.BASE_URL || 'http://localhost:3001' + '/cdn/images/' + this.$data.userInfo.avatar
            this.$data.parsedAvatar = i
        },
        getCrop (payload: any){
            this.$data.image = payload
        },
        submit (){
          const wsPayload = {"endpoint":"updateUser", "id":this.curReq, "info": { 
            "user_id" : this.$data.userId,
            "username" : this.$data.userInfo.username,
            "first_name" : this.$data.userInfo.first_name,
            "last_name" : this.$data.userInfo.last_name,
            "email" : this.$data.userInfo.email,
            "avatar" : this.$data.image.croppedImageURI,
            "phone_number" : this.$data.userInfo.phone_number,
            "stream_link" : this.$data.userInfo.stream_link,
            "twitch" : this.$data.userInfo.stream_link,
            "twitter" : this.$data.userInfo.twitter,
            "facebook" : this.$data.userInfo.facebook,
            "instagram" : this.$data.userInfo.instagram,
            "youtube" : this.$data.userInfo.youtube,
            }}
          this.$store.commit('wss/SOCKET_SEND', wsPayload)
        }
    }
})
</script>

<style>
.image-overlay{
    transition: opacity .2s ease-in-out;
    opacity: 100%;
    background-image: linear-gradient(to top right, rgba(97, 200, 98,.33), rgba(25,32,72,.8));
    max-height: 100px;
    max-width: 100px;
    text-align: center;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.image-overlay:not(.on-hover){
    opacity: 0%;
}
</style>