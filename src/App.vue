<template>
  <v-app>


<!--    <v-navigation-drawer app color="#303F9F" v-if="this.router.currentRoute.path!=='/SignIn'&&this.router.currentRoute.path!=='/'">-->

<!--      <app-navigation ></app-navigation>-->

<!--    </v-navigation-drawer>-->

<!--    <v-app-bar app color="#303F9F" v-if="this.router.currentRoute.path!=='/SignIn'&&this.router.currentRoute.path!=='/'">-->

<!--      <app-bar ></app-bar>-->
<!--    </v-app-bar>-->

<!--    <v-main style="background-color: #C5CAE9">-->
<!--      <v-container fluid >-->

      <router-view/>

<!--      </v-container>-->
<!--    </v-main>-->

  </v-app>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script>
// import AppBar from "@/components/app-bar";
// import AppNavigation from "@/components/app-navigation";
import router from "@/router";
export default {
  data () {
    return {
      drawNavigation: true,
      router: router
    }
  },
  // components: {AppNavigation, AppBar},
  methods:{
    getRouter(){
      return this.router;
    }
  }
}
</script>
