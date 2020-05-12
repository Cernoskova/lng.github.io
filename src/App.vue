<template>
  <v-app>
    <v-content>
      <router-view/>
    </v-content>
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

<style lang="scss">

@import "../assets/fonts/stylesheet.css";
@import "../_sass/materialize/components/_color.scss";
@import "../_sass/materialize/components/_variables.scss";
@import "../_sass/materialize/components/_typography.scss";

// .v-application {
//   font-family: "Simplifica", "Avenir Next LT Pro" ,"Roboto", sans-serif !important;
//   line-height: 1.5;
// }
</style>
