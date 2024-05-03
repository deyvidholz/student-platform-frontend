<template>
  <v-container class="fullscreen centralize">
    <v-card width="490px" color="grey lighten-4">
      <v-card-title class="justify-center pb-0">
        <v-avatar size="90px" tile>
          <img :src="require('@/assets/imgs/logo.svg')" alt="logo" />
        </v-avatar>
      </v-card-title>

      <v-card-text class="text-center">
        Painel de Gerenciamento de Estudantes
      </v-card-text>

      <v-divider />

      <v-container>
        <v-row dense>
          <v-col cols="12">
            <v-text-field
              v-model="payload.username"
              label="Nome de Usuário"
              prepend-inner-icon="mdi-account"
              dense
              hide-details
              outlined
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="payload.password"
              label="Senha"
              :type="fields.password.type"
              :prepend-inner-icon="fields.password.icon"
              @click:prepend-inner="togglePasswordDisplay"
              dense
              hide-details
              outlined
            />
          </v-col>

          <v-col
            cols="12"
            class="text-center grey--text text--darken-1 fs-small"
            v-if="showTip"
          >
            <span class="blue--text">Dica:</span>
            Clique em
            <v-icon>{{ fields.password.options.hiddenIcon }}</v-icon> para
            mostrar a senha
          </v-col>
        </v-row>
      </v-container>

      <v-divider />

      <v-card-actions class="justify-space-between">
        <v-btn color="teal" tile dark text>
          <v-icon class="mr-1">mdi-account-plus</v-icon>
          Cadastrar
        </v-btn>

        <v-btn color="blue" tile dark>
          <v-icon class="mr-1">mdi-login</v-icon>
          Login
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    showTip: true,

    payload: {
      username: null,
      password: null,
    },

    fields: {
      password: {
        icon: 'mdi-eye-lock',
        type: 'password',
        options: {
          hiddenIcon: 'mdi-eye-lock',
          hiddenType: 'password',
          showingIcon: 'mdi-eye',
          showingType: 'text',
        },
      },
    },
  }),

  methods: {
    togglePasswordDisplay() {
      this.showTip = false;

      const isPasswordHidden = this.fields.password.type === 'password';

      const { hiddenIcon, hiddenType, showingIcon, showingType } =
        this.fields.password.options;

      const { icon, type } = {
        false: {
          icon: hiddenIcon,
          type: hiddenType,
        },
        true: {
          icon: showingIcon,
          type: showingType,
        },
      }[isPasswordHidden];

      this.fields.password.icon = icon;
      this.fields.password.type = type;
    },
  },
};
</script>
