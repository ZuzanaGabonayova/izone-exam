<template>
  
  <div>
    <NavigationComponent />

    <div class="router-view-components">
    <Suspense>
      <router-view></router-view>
    </Suspense>
    </div>
    <FooterComponent />
  </div>

</template>

<script>
import NavigationComponent from "./components/NavigationComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";

export default {
  name: 'App',
  components: {
    NavigationComponent,
    FooterComponent
  },

  data: () => ({
    //
  }),
}
</script>

<style>
@import "./style/main.css";

.router-view-components{
  height: fit-content;
  margin-top: 80px;
  margin-bottom: 80px;
}

@media only screen and (max-width: 990px){
  .router-view-components{
    margin-top: 128px;
  }
}
</style>