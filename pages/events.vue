<template>
    <div>
        <h1>Eventos Ativos</h1>
        <v-row class="event-row">
            <template v-for="event in events">
                <v-col v-if="event.active === 'A'" :key="event.id" cols="12" md="4">
                    <v-hover v-slot="{ hover }">
                        <v-card class="rounded-t-lg event-card" :elevation="hover ? 4 : 1" :to="'/event/'+event.id">
                                <v-img :src="event.image != null ? parseImage(event.image) : '/BrAT_logo.png' " class="rounded-t-lg" max-height="70px">
                                    <div class="fill-height card-gradient-color" :class="{'on-hover': hover}"></div>
                                </v-img>
                            <v-divider></v-divider>
                            <v-card-title>
                                {{event.name}}
                            </v-card-title>
                            <v-card-subtitle>
                                De {{event.start}} à {{event.end}}
                            </v-card-subtitle>
                        </v-card>
                    </v-hover>
                </v-col>
            </template>
        </v-row>
        <v-divider class="my-5"></v-divider>
        <h1>Eventos Finalizados</h1>
        <v-row class="event-row">
            <template v-for="event in events">
                <v-col v-if="event.active === 'N'" :key="event.id" cols="12" md="4">
                    <v-hover v-slot="{ hover }">
                        <v-card class="rounded-t-lg" :elevation="hover ? 4 : 1" :to="'/event/'+event.id">
                                <v-img :src="event.image != null ? parseImage(event.image) : '/BrAT_logo.png' " class="rounded-t-lg" style="filter: grayscale(100%);" max-height="70px">
                                    <div class="fill-height card-gradient-color" :class="{'on-hover': hover}"></div>
                                </v-img>
                            <v-divider></v-divider>
                            <v-card-title>
                                {{event.name}}
                            </v-card-title>
                            <v-card-subtitle>
                                De {{event.date_start}} à {{event.date_end}}
                            </v-card-subtitle>
                        </v-card>
                    </v-hover>
                </v-col>
            </template>
        </v-row>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters} from 'vuex'
export default Vue.extend({
    data (){
        const events: any[] = []
        return{
            events
        }
    },
    computed: {
        ...mapGetters('wss', [
        'eventsList',
        'curReq'
        ]),
     },
     watch: {
         'eventsList' (newList){
             this.$data.events = newList
         }
     },
    created(){
        setTimeout(() => {
            const wsPayload = {"endpoint":"getEvents", "id":this.curReq};
            this.$store.commit('wss/SOCKET_SEND', wsPayload);
        }, 50)
    },
    methods: {
        parseImage(c: string){
            const i = (process.env.BASE_URL || 'http://localhost:3001') + '/cdn/images/' + c
            return i
        }
    },
})
</script>

<style>

.event-row {
    justify-content: space-evenly;
}

.event-card {
    margin: auto;
    max-width: 400px;
}

.card-gradient-color{
    transition: opacity .2s ease-in-out;
    opacity: 30%;
    background-image: linear-gradient(to top right, rgba(97, 200, 98,.33), rgba(25,32,72,.8))
}

.card-gradient-color:not(.on-hover){
    opacity: 100%;
}

.card-gradient-BW{
    transition: opacity .2s ease-in-out;
    opacity: 30%;
    background-image: linear-gradient(to top right, rgba(97, 200, 98,.33), rgba(25,32,72,.8))
}

.card-gradient-BW:not(.on-hover){
    opacity: 100%;
}

</style>