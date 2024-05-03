<template>
  <v-snackbar
    v-model="$store.state.snackbar.show"
    :timeout="timeout"
    :color="color"
    tile
    dark
  >
    <span v-html="text" />

    <template v-slot:action="{ attrs }">
      <v-btn :color="handledColor" :bind="attrs" icon @click="close()" dark>
        <v-icon dark color="white">mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'Snackbar',

  props: {
    timeout: {
      type: Number,
      default: 5250,
    },
    color: {
      type: String,
      default: 'grey darken-4',
    },
    text: {
      type: String,
      default: '',
    },
  },

  computed: {
    handledColor() {
      if (this.color.match(/red/g)) return 'grey darken-4';
      if (this.color.match(/green/g)) return 'grey darken-4';

      return 'grey darken-4';
    },
  },

  methods: {
    close() {
      this.$store.state.snackbar.show = false;
    },
  },
};
</script>
