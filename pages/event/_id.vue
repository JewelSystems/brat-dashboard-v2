<template>
    <v-card :loading="loading" class="mx-auto my-12" max-width="1200px">
        <v-img src="/userAvatars/Redd.png" max-height="200px" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" class="white--text align-end">
            <v-card-title class="font-weight-bold text-h3">{{eventsList[eventIndex].name}}</v-card-title>
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
        const eventIndex = 0

        return {
            eventIndex,
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
        this.$data.loading = true
        setTimeout(() => {
            const wsPayload = {"endpoint":"getEvents", "id":this.curReq}
            this.$store.commit('wss/SOCKET_SEND', wsPayload)
        }, 600);

        this.$data.loading = false
    },
    mounted (){
        const index = this.$store.state.wss.eventsList.map((e: { id: number }) => e.id).indexOf(this.$data.eventId);
        this.$data.eventIndex = this.eventsList[index]
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