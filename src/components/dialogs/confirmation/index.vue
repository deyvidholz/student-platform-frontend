<template>
  <v-dialog v-model="show" :width="width" style="z-index: 10000">
    <v-card>
      <v-toolbar color="indigo" dark>
        <v-toolbar-title>{{ title }}</v-toolbar-title>

        <v-spacer />

        <v-btn icon @click="cancel">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text v-if="$slots.default">
        <slot />
      </v-card-text>

      <v-card-actions
        :class="{
          'justify-end': $slots.leftActions,
          'justify-center': !$slots.leftActions,
          'mt-5': true,
        }"
      >
        <slot name="left-actions" />

        <span
          class="red--text font-not-default"
          v-if="errorMessage && !$slots.leftActions && showErrorMessage"
        >
          {{ errorMessage }}
        </span>

        <v-spacer v-if="$slots.leftActions" />

        <v-btn color="red" class="font-not-default" text @click="cancel" dark>
          {{ btnCancelText }}
        </v-btn>

        <v-btn color="indigo" class="font-not-default" @click="confirm" dark>
          {{ btnConfirmText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: 'Confirmar ação?',
    },
    btnConfirmText: {
      type: String,
      default: 'Confirmar',
    },
    btnCancelText: {
      type: String,
      default: 'Cancel',
    },
    width: {
      type: String,
      default: '480px',
    },
    showErrorMessage: {
      type: Boolean,
      default: true,
    },
    /**
     * This will be returned once the user confirms the action.
     */
    data: {
      required: false,
    },
    /**
     * This will be called once the user confirms the action.
     */
    handler: {
      type: Function,
      required: false,
    },
    /**
     * Dialog will pop up if handler function is changed.
     * By using that, it is not necessary to update the v-model.
     */
    popUpOnHandlerChange: {
      type: Boolean,
      default: true,
    },
    /**
     * Dialog will be automatically closed once user confirms
     * the action.
     */
    closeOnConfirm: {
      type: Boolean,
      default: true,
    },
  },

  data: () => ({
    errorMessage: null,
  }),

  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },

  methods: {
    close() {
      this.show = false;
      this.$emit('cancel');
    },

    cancel() {
      this.close();
    },

    async confirm() {
      if (this.handler) {
        try {
          await this.handler();
        } catch (error) {
          this.errorMessage = this.getErrorMessage(error, 'Error:');
          this.$emit('error:confirm', { data: this.data, error });
        } finally {
          if (this.closeOnConfirm) this.show = false;
        }
      }
      this.show = false;
      this.$emit('confirm', this.data);
    },
  },

  created() {
    /**
     * @note adding shortcuts (Y to confirm and N to cancel)
     */
    document.querySelector('body').addEventListener('keyup', (event) => {
      if (!this.show) return;

      event.preventDefault();
      event.stopPropagation();

      if (event.code === 'KeyY') {
        this.confirm();
        return;
      }

      if (event.code === 'KeyN') {
        this.cancel();
      }
    });
  },

  watch: {
    handler() {
      if (this.popUpOnHandlerChange) this.show = true;
    },
  },
};
</script>

<style></style>
