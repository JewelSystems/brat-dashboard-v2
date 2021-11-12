import { Middleware } from '@nuxt/types'

const guestOnly: Middleware = (context) => {
    return new Promise(resolve => {
        if(context.store.getters['userSettings/auth']){
            context.redirect('/')
        }
        else {
            resolve()
        }
    })
}

export default guestOnly