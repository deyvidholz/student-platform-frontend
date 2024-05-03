<template>
  <v-container class="fullscreen centralize">
    <v-card width="490px" color="grey lighten-4">
      <card-header />

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
        <v-btn
          color="blue"
          :dark="isStateLoading ? false : true"
          :disabled="isStateLoading"
          @click="redirect('Home')"
          tile
          text
        >
          <v-icon class="mr-1">mdi-login</v-icon>
          Login
        </v-btn>

        <v-btn
          :dark="isStateLoading ? false : true"
          :loading="isStateLoading"
          :disabled="isStateLoading"
          @click="signUp"
          color="teal"
          tile
        >
          <v-icon class="mr-1">mdi-account-plus</v-icon>
          Cadastrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import UserService from '@/services/UserService';
import CardHeader from './components/header';

export default {
  name: 'SignUp',

  components: { CardHeader },

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

    async signUp() {
      const { username, password } = this.payload;

      if (!username?.length || !password?.length)
        return this.showWarningSnackbar(
          'Por favor, preencha os campos <b>Nome de Usuário</b> e <b>Senha</b>'
        );

      try {
        const { data } = await UserService.create(this.payload);
        this.redirect('Home', { username: data.username });
      } catch (error) {
        this.logError(error);
        this.showErrorSnackbar('O Nome de Usuário escolhido já está em uso');
      }
    },
  },
};
</script>
