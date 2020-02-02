<template>
  <div id="app" style="min-width: 100%; min-height: 100%">
    <div class="header" v-if="check">
      <p class="exit-btn"><Icon class="icon" type="ios-exit" @click="logout"/></p>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  computed:{
    check(){
      return this.$auth.check();
    } 
  },
  methods:{
    logout(){
      this.$auth.logout({
          makeRequest: false,
          params: {}, 
          success: function () {},
          error: function () {},
          redirect: '/login',
      });
    }
  },
  created(){

  }
}
</script>

<style scoped>
#app {
  margin: 0; 
  padding: 0; 
  min-width: 100%; 
  min-height: 100%;
  position: absolute;
  background-color: #E9EBEE
}
.header{
  background-color: #4267B2;
  padding: 10px;
  height: 50px;
}
.header > .exit-btn{
  color: #FFF;
  font-size: 150%;
  text-align: right;
  padding-left: 10px;
  padding-right: 10px;
}
.header > .exit-btn > .icon {
 cursor: pointer;
}

.header > .exit-btn > .icon:hover {
 font-size: 180%;
}
</style>