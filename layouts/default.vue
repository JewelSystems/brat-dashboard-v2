<template>
  <v-app>
    <NavBar />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      app
    >
      <span>Jewel Systems &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  computed:{
    dark: {
      get () {
        return this.$store.state.userSettings.bDarkMode
      },
    },
  },
  watch: {
    dark (newDark) {
      this.$vuetify.theme.dark = newDark
    }
  },
  mounted() {
    setTimeout(() => {
      const wsPayload = {"endpoint":"login", "id":this.$store.state.userSettings.userData.id, "info":{"token": this.$store.state.userSettings.userData.jwt}};
      this.$store.commit('wss/SOCKET_SEND', wsPayload);
    }, 300);
    
  }
}
</script>
