import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: undefined,
    snackText: '',
  },
  mutations: {
    login: (state, user) => state.user = user,
    showSnack: (state, text) => {
      state.snackText = text;
    },
  },
  actions: {
    showSnack: (context, text) => {
      context.commit('showSnack', '');
      setTimeout(() => context.commit('showSnack', text));
    },
  },
});
