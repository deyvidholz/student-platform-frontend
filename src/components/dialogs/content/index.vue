<template>
  <v-dialog
    v-model="opened"
    :width="width"
    :fullscreen="fullscreen"
    :scrollable="scrollable"
    persistent
  >
    <v-card>
      <v-toolbar color="primary" dark max-height="71px">
        <v-toolbar-title>{{ title }}</v-toolbar-title>

        <v-spacer />

        <v-btn icon @click="fullscreen = !fullscreen">
          <v-icon>{{ fullscreenIcon }}</v-icon>
        </v-btn>

        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text
        v-if="$slots.default"
        :style="`min-height: ${minHeight}; max-height: ${contentMaxHeight}`"
      >
        <slot />
      </v-card-text>

      <div v-if="$slots.footer">
        <slot name="footer" />
      </div>
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
    setAsFullscreen: {
      type: Boolean,
      default: false,
    },
    scrollable: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '480px',
    },
    minHeight: {
      type: String,
      default: '0px',
    },
    contentMaxHeight: {
      type: String,
      default: '480px',
    },
  },

  data: () => ({
    fullscreen: false,
  }),

  computed: {
    opened: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },

    fullscreenIcon() {
      return this.fullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen';
    },
  },

  created() {
    this.fullscreen = this.setAsFullscreen;
  },

  methods: {
    close() {
      this.opened = false;
      this.$emit('close');
    },

    confirm() {
      this.close();
      this.$emit('confirm');
    },
  },
};
</script>
