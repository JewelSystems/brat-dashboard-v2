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
                <v-list-item-group v-for="(item, i) in userRoutes" :key="i">
                    <v-list-item :to="item.route">{{item.name}}</v-list-item>
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
        const userRoutes = [
            {name: 'Login', route: '/login'},
            {name: 'Registro', route: '/signup'}
        ]
        return{
            userRoutes
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
            return this.$router.push('/')
        }
    },
    watch: {
        auth(newAuth){
            if (newAuth) {
                this.$data.userRoutes = [
                    {name: 'Perfil', route: '/user/'+this.userData.id },
                ]
            }
            else{
                this.$data.userRoutes = [
                    {name: 'Login', route: '/login'},
                    {name: 'Registro', route: '/signup'}
                ]
            }
        }
    }
})
</script>