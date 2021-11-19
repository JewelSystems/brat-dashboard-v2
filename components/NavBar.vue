<template>
    <div>
      <v-app-bar dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <img src="/BrAT_logo.png" style="height:80%; margin-right: 5px">
        <v-toolbar-title v-text="title" />
        <v-spacer />
        <UserMenu />
      </v-app-bar>
      <v-navigation-drawer
        v-model="drawer"
        absolute
        height="100vh"
        temporary
        class="mx-auto"
      >
        <v-list nav dense>
          <v-list-item v-for="item in routes" :key='item.name' link :to=item.route>
            <v-list-item-content style="margin-bottom: 2px">
              <v-list-item-title>{{item.name}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <template #append>
          <div class="pa-2">
            <v-row justify="center"><v-icon class="mr-3">mdi-white-balance-sunny</v-icon><v-switch v-model="dark" dense flat ></v-switch><v-icon>mdi-weather-night</v-icon></v-row>
            <v-btn v-if="!auth" block to="/login">Login</v-btn>
            <v-btn v-if="auth" block @click.stop="logout">Logout</v-btn>
          </div>
        </template>
      </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters} from 'vuex'

export default Vue.extend({
  data () {
    const title: string = 'BrAT';
    const drawer: boolean = false;
    const routes = [
        {name: 'Home', route: '/'},
        {name: 'Usuários', route: '/users'},
        {name: 'Eventos', route: '/events'},
    ]
    return{
      drawer,
      routes,
      title
    }
  },
  computed:{
    ...mapGetters("userSettings", [
      'userData',
      'auth'
    ]),
    logout() {
      this.$store.dispatch('userSettings/logout')
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return this.$nuxt.$options.router?.push('/')
    },
    dark: {
      get () {
        return this.$store.state.userSettings.bDarkMode
      },
      set (i) {
        this.$store.commit('userSettings/setDarkMode', i)
      }
    },
  },
  watch: {
    dark (newDark) {
      this.$vuetify.theme.dark = newDark
    }
  },
})
</script>