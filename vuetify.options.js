import colors from 'vuetify/es5/util/colors';
import pt from 'vuetify/es5/locale/pt';
import en from 'vuetify/es5/locale/en';

export default {
    lang: {
        locales: { en, pt },
        current: 'pt',
    },
    theme: {
        options: {
            customProperties: true,
        },
        dark: true,
        themes: {
            dark: {
                primary: colors.green.darken2,
                accent: colors.grey.darken3,
                secondary: colors.amber.darken3,
                info: colors.teal.lighten1,
                warning: colors.amber.base,
                error: colors.deepOrange.accent4,
                success: colors.green.accent3,
            },
            light: {
                primary: colors.green.darken1, // #E53935
                secondary: colors.red.lighten4, // #FFCDD2
                accent: colors.indigo.base, // #3F51B5
                background: '#fff'
            },
        }
    }
}