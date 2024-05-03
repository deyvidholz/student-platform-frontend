export default {
  computed: {
    isStateLoading() {
      return this.$store.state.isLoading;
    },

    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    }
  },

  methods: {
    redirect(routeName, queryString = {}) {
      this.$router.push({ name: routeName, query: queryString });
    },

    logError(error) {
      console.error(error.message, '\n\n', error.stack);
    }
  },
};
