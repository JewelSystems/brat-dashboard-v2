<template>
    <v-card></v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters} from 'vuex'
export default Vue.extend({
    data() {
        let ws:any
        const connected = 0
        return{
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
        // const wsPayload = {"endpoint":"getUsers", "id":this.curReq};
        // this.$store.commit('wss/SOCKET_SEND', wsPayload);
    }
})
</script>