<template>
  <div>
    <data-table-container
      :icon="icon"
      :title="title"
      :headers="headers"
      :save="save"
      :is-editing="isEditing"
      :open-create-dialog="openCreateDialog"
      :open-edit-dialog="openEditDialog"
      :default-dialogs="defaultDialogs"
      @search="updateSearch"
      @close-dialog="$emit('close-dialog', $event)"
    >
      <v-data-table
        :headers="headers"
        :items="items"
        :search.sync="search"
        hide-default-footer
      >
        <template #item.createdAt="{ item }">
          {{ formatDate(item.createdAt, '-') }}
        </template>

        <template #item.updateAt="{ item }">
          {{ formatDate(item.updateAt, '-') }}
        </template>

        <template #item.__actions="{ item }">
          <div class="d-flex flex-wrap">
            <tooltip :text="`Editar ${item.name}`">
              <v-btn icon color="blue" dark @click="openEditDialog(item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </tooltip>

            <tooltip :text="`Apagar ${item.name}`">
              <v-btn
                icon
                color="red"
                dark
                @click="openConfirmationDialog(item)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </tooltip>
          </div>
        </template>

        <template #footer>
          <pagination
            v-model="page"
            :total-pages="totalPages"
            :items-per-page="itemsPerPage"
            :total-items="totalItems"
            :title="title"
          />
        </template>
      </v-data-table>

      <template #form>
        <v-row dense>
          <v-col cols="12" md="6">
            <v-text-field v-model="payload.name" label="Nome" outlined dense />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="payload.email"
              label="Email"
              outlined
              dense
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="payload.studentId"
              label="Registro Acadêmico (RA)"
              outlined
              dense
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="payload.document"
              label="CPF"
              outlined
              dense
            />
          </v-col>
        </v-row>
      </template>
    </data-table-container>

    <confirmation-dialog
      title="Por favor, confirme sua ação"
      v-model="dialogs.confirmation.show"
      :handler="dialogs.confirmation.handler"
      @cancel="onCancelConfirmation"
    />
  </div>
</template>

<script>
import Service from '@/services/StudentService';
import DataTableContainer from '@/components/data-table-container/index.vue';
import DataTableContainerMixin from '@/components/data-table-container/DataTableContainerMixin';
import DateFormatMixin from '@/mixins/DateFormatMixin';
import WordVariantMixin from '@/mixins/WordVariantMixin';
import Tooltip from '@/components/tooltip';
import Pagination from '@/components/pagination';
import ConfirmationDialog from '@/components/dialogs/confirmation';
import { required } from '@/validation';

export default {
  components: {
    ConfirmationDialog,
    DataTableContainer,
    Tooltip,
    Pagination,
  },

  mixins: [DataTableContainerMixin, DateFormatMixin, WordVariantMixin],

  data: () => ({
    Service,
    title: { singular: 'Estudante', plural: 'Estudantes' },
    icon: 'mdi-account-multiple',
    search: '',
    headers: [
      { text: 'Nome', value: 'name' },
      { text: 'Email', value: 'email' },
      { text: 'RA', value: 'studentId' },
      { text: 'CPF', value: 'document' },
      { text: '', value: '__actions', sort: false },
    ],

    fields: {
      name: {
        rules: [required],
      },
    },

    dialogs: {
      confirmation: {
        show: false,
        handler: () => null,
      },
    },

    api: {
      permissions: [],
    },
  }),

  methods: {
    onCancelConfirmation() {
      this.dialogs.confirmation.show = false;
    },

    openConfirmationDialog(item) {
      this.dialogs.confirmation.show = true;
      this.dialogs.confirmation.handler = () => {
        this.showWarningSnackbar(`Permissão <b>${item.name}</b> removido`);
      };
    },
  },
};
</script>
