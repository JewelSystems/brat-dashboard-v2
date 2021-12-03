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
        >
            <!--eslint-disable-next-line vue/valid-v-slot-->
            <template #item.avatar="{item}">
                <v-img :src="item.avatar !== null ? parseAvatar(item.avatar) : '/Brat_logo.png' " class="fill-height image-mask" :aspect-ratio="1.77" max-height="60px">
                </v-img>
            </template>
        </v-data-table>
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
            {text: '', value: 'avatar', sortable: false, filterable: false, cellClass: 'tableAvatar', width: '144'},
            {text: 'Usuário', value: 'username', cellClass: 'tableUser'},
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
        setTimeout(() => {
            const wsPayload = {"endpoint":"getUsers", "id":this.curReq};
            this.$store.commit('wss/SOCKET_SEND', wsPayload);
        }, 600)
    },
    methods: {
        goToUser (payload: any) {
            return this.$nuxt.$options.router?.push('/user/'+payload.id)
        },
        parseAvatar (c:string){
            const i = process.env.BASE_URL || 'http://localhost:3001' + '/cdn/images/' + c
            return i
        }
    }
})
</script>

<style>

.tableUser{
    cursor: pointer;
}

.tableAvatar{
    padding: 0px !important;
}

.image-mask{
    opacity: 100%;
    --l1: linear-gradient(120deg, red 0 40%, transparent 80% 100%);
    mask: var(--l1);
}

</style>