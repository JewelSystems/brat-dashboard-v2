import { Middleware } from '@nuxt/types'

const adminOnly: Middleware = ({store, redirect}) => {
    if (!store.state.userSettings.auth || !store.state.userSettings.isAdmin){
      return redirect('/')
    }
  }

export default adminOnly