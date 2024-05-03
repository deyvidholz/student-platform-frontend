<template>
  <v-row justify="center">
    <v-dialog
      v-model="show"
      :width="width"
      :fullscreen="fullscreen"
      scrollable
      persistent
    >
      <v-card tile>
        <v-card-title class="indigo justify-center white--text">
          <v-icon class="mr-2" color="white" v-if="icon">
            {{ icon }}
          </v-icon>

          <span>{{ title }}</span>

          <v-spacer />

          <v-btn @click="fullscreen = !fullscreen" icon dark>
            <v-icon>{{ fullscreenIcon }}</v-icon>
          </v-btn>

          <v-btn icon @click="close" dark>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider />

        <v-card-text>
          <slot />
        </v-card-text>

        <v-spacer />
        <v-divider />

        <v-card-actions class="justify-center align-end">
          <v-btn
            :color="saveButton.color || 'green'"
            class="min-w-200px"
            large
            dark
            @click="save"
            :disabled="disableSaveButton"
          >
            <v-icon class="mr-2" v-if="saveButton.icon">
              {{ saveButton.icon }}
            </v-icon>

            {{ saveButton.text || 'Done' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'ContentDialog',

  props: {
    value: {
      type: Boolean,
      required: true,
    },
    icon: {
      type: [String, null],
      default: null,
    },
    title: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '720px',
    },
    setAsFullscreen: {
      type: Boolean,
      default: false,
    },
    saveButton: {
      type: Object,
      default: () => ({
        color: 'indigo',
        icon: null,
        text: 'OK',
      }),
    },
    disableSaveButton: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    fullscreen: true,
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

    fullscreenIcon() {
      if (this.fullscreen) return 'mdi-fullscreen-exit';
      return 'mdi-fullscreen';
    },
  },

  methods: {
    close() {
      this.$emit('closeButtonClick');
    },
    save() {
      this.$emit('saveButtonClick');
    },
  },

  created() {
    this.fullscreen = this.setAsFullscreen;

    document.querySelector('body').addEventListener('keyup', (event) => {
      if (event.code !== 'Escape' || !this.show) return;
      this.close();
    });
  },
};
</script>
