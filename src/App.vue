<template>
  <v-app>
    <toolbar v-if="isAuthenticated" />

    <v-main>
      <router-view />
    </v-main>

    <snackbar
      :timeout="$store.state.snackbar.timeout"
      :color="$store.state.snackbar.color"
      :text="$store.state.snackbar.text"
    />
  </v-app>
</template>

<script>
import Toolbar from '@/components/toolbar';
import Snackbar from '@/components/snackbar';

export default {
  name: 'App',

  components: { Toolbar, Snackbar },

  data: () => ({
    //
  }),
};
</script>
