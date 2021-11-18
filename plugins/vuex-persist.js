// eslint-disable-next-line import/no-named-as-default
import * as Cookies from 'js-cookie'
import cookie from 'cookie'
import VuexPersistence from 'vuex-persist';

export default ({ store, req, isDev }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      key: 'brat_vuex',
      modules: ['userSettings'],
      restoreState: (key, storage) =>process.client ? Cookies.getJSON(key) : cookie.parse(req.headers.cookie||'')[key],
      saveState: (key, state, storage) =>
      Cookies.set(key, value, { expires: 365, secure: !isDev }),
    }).plugin(store);
  });
};