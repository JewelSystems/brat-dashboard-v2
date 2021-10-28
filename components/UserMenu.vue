<template>
    <v-menu offset-y bottom transition="slide-y-transition">
        <template v-slot:activator="{ on, attrs }">
            <v-card v-bind="attrs" v-on="on">
                <v-card-text class="d-none d-md-inline">
                    {{userInfo.name}}
                </v-card-text>
                <v-avatar color="green" size="30" style="margin: 5px">
                    <img v-if="userInfo.image != ''" :src="userInfo.image" alt="">
                    <v-icon v-else>mdi-account-circle</v-icon>
                </v-avatar>
            </v-card>
        </template>
            <v-list>
                <v-list-item-group v-for="(item, i) in userRoutes" :key="i">
                    <v-list-item :to="item.route">{{item.name}}</v-list-item>
                </v-list-item-group>
            </v-list>
    </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data () {
        const isLoggedIn: boolean = false;
        const userInfo = {name: 'convidado', image: ''};
        const userRoutes = [
            {name: 'Login', route: '/login'},
            {name: 'Registro', route: '/register'}
        ]
        return{
            isLoggedIn,
            userInfo,
            userRoutes
        }
    }
})
</script>