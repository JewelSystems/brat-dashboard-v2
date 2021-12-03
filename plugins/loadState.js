
export default ({store, $vuetify}) => {
    store.subscribe((mutation, state) => {
        if (mutation === 'base state')
            // if I remove this log the code stops functioning and I have no idea why
            console.log()
            $vuetify.theme.dark = state.userSettings.bDarkMode
    })
}