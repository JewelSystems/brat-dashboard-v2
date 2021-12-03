import { Middleware } from '@nuxt/types'

const sameUser: Middleware = ({store, redirect, params}) => {
    const sameID = store.state.userSettings.userData.id === params.id
    if (!store.state.userSettings.auth || !sameID){
      return redirect('/')
    }
  }

export default sameUser