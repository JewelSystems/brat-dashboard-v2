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
        temporary
      >
        <v-list nav dense>
          <v-list-item-group
            v-for="item in routes" :key='item.name'
          >
              <v-list-item :to=item.route style="margin-bottom: 2px">
                  <v-list-item-title>{{item.name}}</v-list-item-title>
              </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-row justify="center"><v-icon class="mr-3">mdi-white-balance-sunny</v-icon><v-switch v-model="dark" dense flat ></v-switch><v-icon>mdi-weather-night</v-icon></v-row>
      </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data () {
    const title: string = 'BrAT';
    const drawer: boolean = false;
    const routes = [
        {name: 'Home', route: '/'},
        {name: 'Inspire', route: '/inspire'},
        {name: 'Login', route: '/login'}
    ]
    return{
      drawer,
      routes,
      title
    }
  },
  computed:{
    dark: {
      get () {
        return this.$store.state.userSettings.bDarkMode
      },
      set (e) {
        this.$store.commit('userSettings/setDarkMode', e)
      }
    },
  },
})
</script>