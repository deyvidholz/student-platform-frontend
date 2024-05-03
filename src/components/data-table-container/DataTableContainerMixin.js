import cloneDeep from "clone-deep";

export default {
  props: {
    trigger: {
      type: String,
      default: null,
    },
  },

  data: () => ({
    primaryKeyField: "id",
    initialPayload: {},
    payload: {},
    isEditing: false,
    totalPages: 1,
    page: 1,
    itemsPerPage: 10,
    totalItems: 0,
    items: [],
    search: "",

    defaultDialogs: {
      manage: { show: false },
    },
  }),

  async created() {
    if (!this.Service) throw new Error("Service not found");

    if (!this.$route.query.page) {
      this.$router.push({
        query: { ...this.$route.query, page: 1, itemsPerPage: 25 },
      });
    }

    this.page = +this.$route.query.page;

    await this.getAll();
    this.setIsEditing();
  },

  mounted() {
    if (this.trigger) this.execute(this.trigger);
  },

  methods: {
    updateSearch() {
      this.getAll();
    },

    setIsEditing(value = null) {
      this.isEditing =
        value !== null ? value : !!this.payload[this.primaryKeyField];
    },

    resetPayload() {
      this.payload = Object.keys(this.initialPayload).length
        ? cloneDeep(this.initialPayload)
        : {};
    },

    setTotalItems(value) {
      if (value < this.itemsPerPage) {
        this.itemsPerPage = value;
      }

      this.totalItems = value;
    },

    openCreateDialog(item = {}) {
      this.payload = cloneDeep({ ...this.initialPayload, ...item });
      this.isEditing = false;
      this.defaultDialogs.manage.show = true;
    },

    openEditDialog(item = {}) {
      this.payload = cloneDeep({ ...this.initialPayload, ...item });
      this.isEditing = true;
      this.defaultDialogs.manage.show = true;
    },

    async getAll(
      options = { page: null, itemsPerPage: null, paginate: true, search: "" }
    ) {
      try {
        this.items = [];

        const params = {
          page: options.page || this.$route.query.page,
          itemsPerPage: options.itemsPerPage || this.$route.query.itemsPerPage,
          paginate: options.paginate || options.itemsPerPage !== -1,
          search: this.$route.query.search || options.search || undefined,
        };

        const {
          data: { items, totalItems, totalPages },
        } = await this.Service.getAll(params);

        this.setTotalItems(totalItems);
        this.totalPages = totalPages;
        this.items = items && Array.isArray(items) ? items : [];
      } catch (error) {
        console.error(error);
      }
    },

    async save() {
      let data = null;

      try {
        if (this.payload?.[this.primaryKeyField]) {
          data = (await this.Service.update(this.payload)).data;
          this.showInfoSnackbar("Alterações salvas com sucesso");
        } else {
          data = (await this.Service.create(this.payload)).data;
          this.showSuccessSnackbar("Item criado com sucesso");
        }

        await this.getAll();
      } catch (error) {
        this.showErrorSnackbar(error);
      }

      this.closeDialog();
      return data;
    },

    closeDialog(dialog = null) {
      if (!dialog) {
        this.defaultDialogs.manage.show = false;
        this.$emit("close-dialog", "manage");
        return;
      }

      if (this.defaultDialogs[dialog]?.show) {
        this.defaultDialogs[dialog].show = false;
      } else if (this.dialogs?.[dialog]?.show) {
        this.defaultDialogs[dialog].show = false;
      } else {
        throw new Error("No dialog defined");
      }

      this.$emit("close-dialog", dialog);
    },

    execute(method) {
      try {
        this[method].apply();
      } catch (error) {
        this.showErrorSnackbar(`Could not trigger ${method}`);
      }
    },

    savePayload() {
      if (!this.$options.name) {
        return this.showErrorSnackbar(
          "Could not save payload: form does not have a name"
        );
      }

      localStorage.setItem(
        `form.${this.$options.name}.payload`,
        JSON.stringify(this.payload)
      );
    },
  },

  watch: {
    totalItems(value) {
      this.setTotalItems(value);
    },
    async page(value) {
      await this.getAll({ page: value });
    },
  },
};
