<template>
    <div>
        <v-card
        :loading="loading"
        class="mx-auto my-12 rounded-xl">
            <v-row no-gutters>
                <v-col cols="12" md="4" >
                    <v-img :src="'/userAvatars/'+userInfo.username+'.png'" height="100%" class="rounded-xl"></v-img>
                </v-col>
                <v-col cols="12" md="6" align-self="center">
                    <v-card-title primary-title>
                        {{userInfo.username}} - {{userInfo.gender}}
                    </v-card-title>
                    <v-card-text class="card_text">
                        Link de transmissão: {{userInfo.stream_link}}
                    </v-card-text>
                    <v-card-text class="card_text">
                        Twitch: {{userInfo.twitch}}
                    </v-card-text>
                    <v-card-text class="card_text">
                        Youtube: {{userInfo.youtube}}
                    </v-card-text>
                    <v-card-text class="card_text">
                        Twitter: {{userInfo.twitter}}
                    </v-card-text>
                    <v-card-text class="card_text">
                        Intagram: {{userInfo.instagram}}
                    </v-card-text>
                </v-col>
            </v-row>
        </v-card>
        <v-card>
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
                    <v-card v-for="(content, j) in item.content" :key="j" flat class="mx-auto my-4" style="paddin-left: 4px">
                        <v-row justify="space-between" class="ml-2">
                            <v-col cols="8" md="6">{{content.name}}</v-col>
                            <v-col cols="4" md="2">{{content.cat}}</v-col>
                            <v-spacer></v-spacer>
                            <v-col cols="6" md="2">est: {{content.estimate}}</v-col>
                            <v-col cols="4" md="1"><a :href=content.vod>Link</a></v-col>
                        </v-row>
                        <v-divider class="my-1"></v-divider>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    asyncData ({params}){
        const userId = params.id
        return {userId}
    },
    data() {
        const tab = null
        const userInfo = {}
        const loading = false
        const events = [
            { name: 'event_a',  content: [
                {name: 'jogo 1', cat: 'any %', estimate: 'xx:xx:xx', vod: 'http://youtube.com'},
                {name: 'jogo 2', cat: 'any %', estimate: 'xx:xx:xx', vod: 'http://youtube.com'},
                {name: 'jogo 3', cat: 'any %', estimate: 'xx:xx:xx', vod: 'http://youtube.com'}
            ] },
            { name: 'event_b',  content: [
                {name: 'jogo 1', cat: 'any %', estimate: 'xx:xx:xx', vod: 'http://youtube.com'},
                {name: 'jogo 2', cat: 'any %', estimate: 'xx:xx:xx', vod: 'http://youtube.com'}
            ]}
        ]
        return{
            tab,
            events,
            loading,
            userInfo
        }
    },
    async fetch (){
        this.loading = true
        const fetchData = await this.$axios.$get('/user/'+this.$data.userId)
        this.userInfo = fetchData.res[0]
        console.log(this.userInfo)
        this.loading = false
    }
})
</script>

<style>
    .card_text{
        padding-bottom: 4px;
    }
</style>