<template>
  <v-row fill-height justify="center">
      <v-card class="my-16">
        <v-img src="/Brat_logo.png" max-height="20vh" contain></v-img>
        <v-card-title class="headline justify-center">
          Sejam bem-vindos ao site da BrAT!
        </v-card-title>
        <v-card-title class="justify-center">
          Por favor confira nossas informações pelas mídias sociais e assista o evento no nosso canal da Twitch!
        </v-card-title>
        <v-card-actions class="justify-center">
          <v-btn
                v-for="(social, i) in socials"
                :key="i"
                :color="social.color"
                :href="social.link"
                class="white--text"
                fab
                icon
            >
            <v-icon>{{ social.icon }}</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      socials: [
        {
          icon: 'mdi-twitch',
          color: 'purple darken-1',
          link: 'https://www.twitch.tv/brat',
        },
        {
          icon: 'mdi-youtube',
          color: 'red darken-1',
          link: 'https://www.youtube.com/c/BrATSpeedruns',
        },
        {
          icon: 'mdi-facebook',
          color: 'indigo',
          link: 'https://www.facebook.com/bratspeedruns/',
        },
        {
          icon: 'mdi-twitter',
          color: 'cyan darken-1',
          link: 'https://twitter.com/bratspeedruns',
        },
        {
          icon: 'mdi-instagram',
          color: 'red lighten-3',
          link: 'https://www.instagram.com/bratspeedruns/',
        },
      ],
    }),
  }
</script>