// eslint-disable-next-line import/named
import { MutationTree } from 'vuex'

export const state = () => ({
    bDarkMode: true as boolean,
    aUserData: {
        username: '' as string,
        jwt: '' as string,
        avatar: '' as string,

    },

})

export type UserSettingsModuleState = ReturnType<typeof state>

export const mutations: MutationTree <UserSettingsModuleState> = {
    setDarkMode (state, e: boolean) {
        state.bDarkMode = e
    }
}