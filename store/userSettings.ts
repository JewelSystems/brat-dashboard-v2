// eslint-disable-next-line import/named
import { MutationTree, ActionTree, GetterTree } from 'vuex'

export const state = () => ({
    bDarkMode: true,
    auth: false,
    isAdmin: false,
    userData: {
        username: 'convidado',
        jwt: '',
        id:'',
        image: null,
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
        state.isAdmin = e.admin
        state.userData.id = e.id
        state.userData.jwt = e.token
        state.userData.username = e.username
        state.userData.image = e.image
    },
    logout (state){
        state.auth = false
        state.userData = {
            username: 'convidado',
            jwt: '',
            id:'',
            image: null,
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
        console.log(response)
        const user = await this.$axios.$get('/user/'+response.id)
        const parsedImage = user.res[0].avatar != null ? process.env.BASE_URL || 'http://localhost:3001' + '/cdn/images/'+user.res[0].avatar : null
        const isAdmin = user.res[0].permissions.split(',').includes('Admin') 

        const data ={
            id: response.id,
            admin: isAdmin,
            token: response.token,
            username: user.res[0].username,
            image: parsedImage
        }
        commit('setCredentials', data)

        return response;
    },
    logout ( {commit} ){
        commit ('logout')
    }
}