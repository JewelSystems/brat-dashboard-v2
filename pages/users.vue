<template>
    <v-card class="mx-auto">
        <v-card-title>
            <v-text-field
                v-model="search"
                label="Usuário"
                single-line
                hide-details
            ></v-text-field>
        </v-card-title>
        <v-data-table
            :headers="header"
            :items="userList"
            :search="search"
            @click:row="goToUser"
        ></v-data-table>
    </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters} from 'vuex'
export default Vue.extend({
    data() {
        let ws:any
        const search = ''
        const connected = 0

        const header = [
            {text: '', value: '', sortable: false,},
            {text: 'Usuário', value: 'username'},
        ]

        return{
            header,
            search,
            connected,
            ws
        }
    },
    computed: {
        ...mapGetters('wss', [
        'userList',
        'curReq'
        ]),
     },
    created(){
        const wsPayload = {"endpoint":"getUsers", "id":this.curReq};
        this.$store.commit('wss/SOCKET_SEND', wsPayload);
    },
    methods: {
        goToUser (payload: any) {
            return this.$nuxt.$options.router?.push('/user/'+payload.id)
        }
    }
})
</script>