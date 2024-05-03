// This mixin is globally imported, no need to import it in your components

import { mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations({
      showErrorSnackbar: `snackbar/showErrorSnackbar`,
      showSuccessSnackbar: `snackbar/showSuccessSnackbar`,
      showWarningSnackbar: `snackbar/showWarningSnackbar`,
      showInfoSnackbar: `snackbar/showInfoSnackbar`,
    }),
  },
};
