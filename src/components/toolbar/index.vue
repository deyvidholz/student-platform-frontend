<template>
  <div style="margin-bottom: 69px">
    <v-app-bar
      color="deep-purple lighten-2"
      dark
      fixed
      style="z-index: 1002"
      height="69px"
    >
      <v-toolbar-title
        class="mouse-pointer no-selection"
        @click="redirect('Students')"
      >
        <v-avatar size="60px" tile>
          <img :src="require('@/assets/imgs/logo.svg')" alt="logo" />
        </v-avatar>
      </v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data: () => ({}),
};
</script>
