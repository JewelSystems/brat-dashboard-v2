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
  }
}
</script>
