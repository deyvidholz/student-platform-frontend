<template>
  <v-row dense class="mx-5">
    <v-col cols="12" md="6" class="align-self-center">
      {{
        getWordVariant(
          `Mostrando ${itemsPerPage} de ${totalItems} {variant}`,
          totalItems,
          title.singular.toLowerCase(),
          title.plural.toLowerCase()
        )
      }}
    </v-col>

    <v-col cols="12" md="6">
      <v-pagination v-model="page" :length="totalPages" />
    </v-col>
  </v-row>
</template>

<script>
import WordVariantMixin from '@/mixins/WordVariantMixin';

export default {
  mixins: [WordVariantMixin],

  props: {
    value: {
      type: Number,
      required: true,
    },
    title: {
      type: Object,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      required: true,
    },
    totalItems: {
      type: Number,
      required: true,
    },
  },

  computed: {
    page: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },

  methods: {
    updateQuery(page) {
      this.$router.push({
        query: { ...this.$route.query, page },
      });
    },
  },

  watch: {
    page(value) {
      this.updateQuery(value);
    },
  },
};
</script>

<style></style>
