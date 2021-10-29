// eslint-disable-next-line import/no-named-as-default
import VuexPersistence from 'vuex-persist';

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      /* your options */
      key: 'brat_vuex'
    }).plugin(store);
  });
};