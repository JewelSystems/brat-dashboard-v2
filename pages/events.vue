<template>
    <div>
        <h1>Eventos Ativos</h1>
        <v-row>
            <template v-for="event in events">
                <v-col v-if="event.active === 'A'" :key="event.id" cols="12" md="4">
                    <v-hover v-slot="{ hover }">
                        <v-card class="rounded-t-lg" :elevation="hover ? 4 : 1" :to="'/event/'+event.id">
                                <v-img :src="event.image != '' ? event.image : '/BrAT_logo.png' " class="rounded-t-lg" max-height="70px">
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
        <v-divider class="my-5"></v-divider>
        <h1>Eventos Finalizados</h1>
        <v-row>
            <template v-for="event in events">
                <v-col v-if="event.active === 'N'" :key="event.id" cols="12" md="4">
                    <v-hover v-slot="{ hover }">
                        <v-card class="rounded-t-lg" :elevation="hover ? 4 : 1" :to="'/event/'+event.id">
                                <v-img :src="event.image != '' ? event.image : '/BrAT_logo.png' " class="rounded-t-lg" style="filter: grayscale(100%);" max-height="70px">
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
export default Vue.extend({
    data (){
        const events = [
            { id: 0, name: 'Event A', image: '/userAvatars/Redd.png', date_start: '00/00/00', date_end: '11/11/11', active: 'A' },
            { id: 1, name: 'Event B', image: '', date_start: '00/00/00', date_end: '11/11/11', active: 'A' },
            { id: 2, name: 'Event C', image: '/userAvatars/Redd.png', date_start: '00/00/00', date_end: '11/11/11', active: 'N' },
            { id: 3, name: 'Event D', image: '/userAvatars/Redd.png', date_start: '00/00/00', date_end: '11/11/11', active: 'A' },
            { id: 4, name: 'Event F', image: '', date_start: '00/00/00', date_end: '11/11/11', active: 'N' },
        ]
        return{
            events
        }
    }
})
</script>

<style>

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
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