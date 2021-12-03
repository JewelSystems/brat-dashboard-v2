<template>
    <div>
        <v-card
        :loading="loading"
        class="mx-auto my-12"
        max-width="1200px">
            <v-btn v-if="userId === userData.id " fab absolute right class="mt-2" :to="'/edit/user/' + userId"><v-icon>mdi-pencil-outline</v-icon></v-btn>
            <v-row no-gutters>
                <v-col cols="12" md="4" >
                    <v-img :src="userInfo.avatar !== null ? parseAvatar() : '/Brat_logo.png' " height="100%" class="rounded"></v-img>
                </v-col>
                <v-col cols="12" md="6" align-self="center">
                    <v-card-title primary-title>
                        {{userInfo.username}} | {{userInfo.gender}}
                    </v-card-title>
                    <v-card-text class="card_text">
                        Link de transmissão: <a :href="userInfo.stream_link">{{userInfo.stream_link}}</a> 
                    </v-card-text>
                    <v-card-text class="card_text">
                        Twitch: <a :href="userInfo.twitch">{{userInfo.twitch}}</a> 
                    </v-card-text>
                    <v-card-text class="card_text">
                        Youtube: <a :href="userInfo.youtube">{{userInfo.youtube}}</a> 
                    </v-card-text>
                    <v-card-text class="card_text">
                        Twitter: <a :href="userInfo.twitter">{{userInfo.twitter}}</a>  
                    </v-card-text>
                    <v-card-text class="card_text">
                        Intagram: <a :href="userInfo.instagram">{{userInfo.instagram}}</a>  
                    </v-card-text>
                </v-col>
            </v-row>
        </v-card>
        <v-card class="mx-auto" max-width="1200px">
            <v-card-title primary-title class="mx-auto justify-center">
                Eventos
            </v-card-title>
            <v-divider></v-divider>
            <v-tabs v-model="tab">
                <v-tab v-for="item in events" :key="item.name">
                    {{item.name}}
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item  v-for="item  in events" :key="item.name">
                    <v-simple-table>
                        <template #default>
                            <thead>
                                <tr>
                                    <th>
                                        Jogo
                                    </th>
                                    <th>
                                        Categoria
                                    </th>
                                    <th>
                                        Estimate
                                    </th>
                                    <th>
                                        VOD
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(content, j) in item.content" :key="j">
                                    <td>{{content.name}}</td>
                                    <td>{{content.cat}}</td>
                                    <td>{{content.estimate}}</td>
                                    <td><a :href=content.vod>Link</a></td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters} from 'vuex'

export default Vue.extend({
    asyncData ({params}){
        const userId = params.id
        const userInfo = {}
        return {
            userId,
            userInfo
        }
    },
    data() {
        const tab = null
        const loading = false
        const events = [
            { name: 'event a',  content: [
                {name: 'jogo 1', cat: 'any %', estimate: 'xx:xx:xx', vod: 'http://youtube.com'},
                {name: 'jogo 2', cat: 'any %', estimate: 'xx:xx:xx', vod: 'http://youtube.com'},
                {name: 'jogo 3', cat: 'any %', estimate: 'xx:xx:xx', vod: 'http://youtube.com'}
            ]},
            { name: 'event b',  content: [
                {name: 'jogo 1', cat: 'any %', estimate: 'xx:xx:xx', vod: 'http://youtube.com'},
                {name: 'jogo 2', cat: 'any %', estimate: 'xx:xx:xx', vod: 'http://youtube.com'}
            ]}
        ]
        return{
            tab,
            events,
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
            'userData'
        ])
    },
    methods: {
        parseAvatar (){
            const i = (process.env.BASE_URL || 'http://localhost:3001') + '/cdn/images/' + this.$data.userInfo.avatar
            return i
        }
    }
})
</script>

<style>
    .card_text{
        padding-bottom: 4px;
    }
</style>