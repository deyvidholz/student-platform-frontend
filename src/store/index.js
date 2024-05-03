import Vue from 'vue'
import Vuex from 'vuex'

// Vuex Custom Modules
import snackbar from "@/store/modules/snackbar";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    isLoading: false,
  },
  mutations: {
    setLoading(state, isLoading) {
      state.isLoading = isLoading;
    }
  },
  modules: {
    snackbar
  }
})
