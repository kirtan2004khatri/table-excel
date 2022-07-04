<template>
  <v-app>
    <v-app-bar absolute temporary app dense class="green white--text">
      <v-toolbar-title class="font-weight-bold text-h5">Tabler</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn  text class="white--text" router to="/">Table</v-btn>
      <v-btn text class="white--text" router to="/about">Form</v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
