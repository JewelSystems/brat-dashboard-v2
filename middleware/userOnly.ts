import { Middleware } from '@nuxt/types'

const userOnly: Middleware = ({redirect, store}) => {
  if (!store.state.userSettings.auth){
      return redirect('/login')
  }
}

export default userOnly