import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
    bDarkMode: true as boolean
})

export type UserSettingsModuleState = ReturnType<typeof state>

export const mutations: MutationTree<UserSettingsModuleState> = {
    setDarkMode (state, e: boolean) {
        state.bDarkMode = e
    }
}