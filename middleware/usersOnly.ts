import { Middleware } from '@nuxt/types'

const userOnly: Middleware = ({store, redirect}) => {
    if (!store.state.userSettings.auth) {
      return redirect('/')
    }
  }

export default userOnly