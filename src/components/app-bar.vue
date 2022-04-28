<template>
  <v-toolbar-items>
    <v-btn depressed flat style="background-color: #303F9F" class="icon" @click.stop="drawer = !drawer">
      <v-icon  style="color: white">mdi-menu</v-icon>
    </v-btn>
  </v-toolbar-items>
</template>

<script>
export default {
  name: "app-bar"
}
</script>

<style scoped>

</style>
