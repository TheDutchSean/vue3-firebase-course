<template>
  <div id="app">
    <navigation />
    <router-view class="container" />
  </div>
</template>

<script>
// imports
import navigation from "@/components/Navigation"


// requires

export default {
  name: "App",
  components: {
    navigation
  },
  mounted(){

  }
}

</script>

<style lang="scss">

</style>
