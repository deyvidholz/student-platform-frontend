export default {
  namespaced: true,

  state: {
    show: false,
    color: "grey darken-4",
    text: "",
    timeout: 5000,
  },

  mutations: {
    showErrorSnackbar(state, error) {
      state.show = true;
      state.color = "red darken-3";
      state.text = error?.message || error;
    },
    showSuccessSnackbar(state, message) {
      state.show = true;
      state.color = "green darken-1";
      state.text = message;
    },
    showWarningSnackbar(state, message) {
      state.show = true;
      state.color = "orange darken-2";
      state.text = message;
    },
    showInfoSnackbar(state, message) {
      state.show = true;
      state.color = "indigo";
      state.text = message;
    },
  },
};
