<template>
  <v-card>
    <v-card-title>
      <v-icon v-if="icon" class="mr-2">{{ icon }}</v-icon>

      <span>{{ pluralTitle }}</span>

      <v-spacer></v-spacer>

      <v-text-field
        append-icon="mdi-magnify"
        label="Pesquisar"
        hide-details
        outlined
        dense
        @keyup="emitSearch($event.target.value)"
      />

      <tooltip text="Criar">
        <v-btn color="green" class="ml-3" dark tile @click="openCreateDialog()">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </tooltip>
    </v-card-title>

    <slot />

    <content-dialog
      v-model="dialogsProxy.manage.show"
      :icon="icon"
      :title="getSaveDialogTitle"
      @saveButtonClick="save"
      @closeButtonClick="closeProxyDialog()"
      :save-button="{ icon: 'mdi-content-save', text: 'Salvar' }"
      :set-as-fullscreen="true"
    >
      <v-container fluid>
        <v-form ref="form">
          <slot name="form" />
        </v-form>
      </v-container>
    </content-dialog>
  </v-card>
</template>

<script>
import Tooltip from '@/components/tooltip';
import ContentDialog from '@/components/dialogs/content';
import LazyLoadingMixin from '@/mixins/LazyLoadingMixin';

export default {
  components: { ContentDialog, Tooltip },
  mixins: [LazyLoadingMixin],

  props: {
    title: {
      type: [String, Object],
      required: true,
    },
    icon: {
      type: String,
      default: null,
    },
    headers: {
      type: Array,
      default: () => [],
    },
    defaultDialogs: {
      type: Object,
      default: () => ({ create: { show: false } }),
    },
    save: {
      type: Function,
    },
    openCreateDialog: {
      type: Function,
    },
    openEditDialog: {
      type: Function,
    },
    isEditing: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    searchTimeout: null,
  }),

  computed: {
    pluralTitle() {
      return this.title?.plural || this.title;
    },

    singularTitle() {
      return this.title?.singular || this.title;
    },

    getSaveDialogTitle() {
      return `${this.isEditing ? 'Editar' : 'Criar'} ${this.singularTitle}`;
    },

    dialogsProxy: {
      get() {
        return this.defaultDialogs;
      },
      set(value) {
        this.$emit('update:dialogs', value);
      },
    },
  },

  methods: {
    closeProxyDialog() {
      this.dialogsProxy.manage.show = false;
      this.$emit('close-dialog', 'manage');
    },

    emitSearch(value) {
      if (this.$route.query.search === value) return;

      clearTimeout(this.searchTimeout);

      this.searchTimeout = setTimeout(async () => {
        this.$router.push({
          query: { ...this.$route.query, search: value },
        });

        this.$emit('search', value);
      }, 500);
    },
  },
};
</script>
