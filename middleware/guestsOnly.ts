import { Middleware } from '@nuxt/types'

const guestsOnly: Middleware = ({store, redirect}) => {
    if (store.state.userSettings.auth) {
      return redirect('/')
    }
  }

export default guestsOnly