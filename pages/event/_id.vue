<template v-on:listEvent="listEvent">
    <v-card :loading="loading" class="mx-auto my-12" max-width="1200px">
        <v-img src="/userAvatars/Redd.png" max-height="200px" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" class="white--text align-end">
            <v-card-title class="font-weight-bold text-h3">{{eventInfo.name}}</v-card-title>
        </v-img>
        <v-divider></v-divider>
        <v-card-title class="justify-center">
            Agenda
        </v-card-title>
        <v-simple-table>

        </v-simple-table>
    </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters} from 'vuex'

export default Vue.extend({
    asyncData ({params}){
        const eventId = params.id
        return { eventId }
    },
    data () {
        const loading = false
        const eventInfo:any = {
            name: '',
            donation_link: '',
            start: '',
            end: ''
        }

        return {
            eventInfo,
            loading,
        }
    },
    computed: {
        ...mapGetters('wss', [
        'eventsList',
        'curReq'
        ]),
     },
    created(){
        setTimeout(() => {
            const wsPayload = {"endpoint":"getEvent", "id":this.curReq, "info": { "id" : this.$data.eventId }}
            this.$store.commit('wss/SOCKET_SEND', wsPayload)
        }, 500);
    },
    mounted() {
        this.$root.$on("listEvent",  (payload:any) => {
            this.eventInfo = payload[0]
        })
    }
})
</script>

<style>

.card-gradient-color{
    transition: opacity .2s ease-in-out;
    opacity: 30%;
    background-image: linear-gradient(to top right, rgba(97, 200, 98,.33), rgba(25,32,72,.8))
}

</style>