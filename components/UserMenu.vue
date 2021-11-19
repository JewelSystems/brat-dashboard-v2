<template>
    <v-menu offset-y bottom transition="slide-y-transition">
        <template #activator="{ on, attrs }">
            <v-card v-bind="attrs" v-on="on">
                <v-card-text class="d-none d-md-inline">
                    {{userData.username}}
                </v-card-text>
                <v-avatar color="green" size="30" style="margin: 5px">
                    <img v-if="userData.image != ''" :src="userData.image" alt="">
                    <v-icon v-else>mdi-account-circle</v-icon>
                </v-avatar>
            </v-card>
        </template>
            <v-list>
                <v-list-item-group v-for="(item, i) in routes" :key="i">
                    <v-list-item v-if="item.auth === auth" :to="item.route">{{item.name}}</v-list-item>
                </v-list-item-group>
                <v-list-item-group>
                    <v-list-item v-if="auth" @click.stop="logout">Logout</v-list-item>
                </v-list-item-group>
            </v-list>
    </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters} from 'vuex'

export default Vue.extend({
    data () {
            const routes = [
                {name: 'Login', route: '/login', auth: false},
                {name: 'Registro', route: '/signup', auth: false},
                {name: 'Perfil', route: '/user/'+this.$store.state.userSettings.userData.id, auth: true },
            ]
        return{
            routes
        }
    },
    computed:{
        ...mapGetters("userSettings", [
            'userData',
            'auth'
        ]),
        logout(){
            this.$store.dispatch('userSettings/logout')
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            return this.$nuxt.$options.router?.push('/')
        }
    },
})
</script>