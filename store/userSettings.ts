// eslint-disable-next-line import/named
import { MutationTree, ActionTree, GetterTree } from 'vuex'

export const state = () => ({
    bDarkMode: true,
    auth: false,
    userData: {
        username: 'convidado',
        jwt: '',
        id:'',
        image: '',
    },

})

export type UserSettingsModuleState = ReturnType<typeof state>

export const getters: GetterTree <UserSettingsModuleState, UserSettingsModuleState> = {
    auth: state => state.auth,
    userData: state => state.userData,
    bDarkMode: state => state.bDarkMode
}

export const mutations: MutationTree <UserSettingsModuleState> = {
    setDarkMode (state, e: boolean) {
        state.bDarkMode = e
    },
    setCredentials (state, e) {
        state.auth = true
        state.userData.id = e.id
        state.userData.jwt = e.token
        state.userData.username = e.username
    },
    logout (state){
        state.auth = false
        state.userData = {
            username: 'convidado',
            jwt: '',
            id:'',
            image: '',
        }
    }
}

export const actions: ActionTree <UserSettingsModuleState, UserSettingsModuleState> = {
    async login ({ commit }, { username, password }) {
        const response = await this.$axios.$post('/login', {
            username,
            password,
        }).catch(function (error){
            if(error.response){
                return error.response;
            }
        });
        // console.log(response)
        const user = await this.$axios.$get('/user/'+response.id)

        const data ={
            id: response.id,
            token: response.token,
            username: user.res[0].username
        }
        commit('setCredentials', data)

        return response;
    },
    logout ( {commit} ){
        commit ('logout')
    }
}