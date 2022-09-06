<template>
  <div id="profile">
    <h2 v-if="token === ''">Temporarily not login</h2>
    <h1 style="color:#fff">Personal Information</h1>
    <div class="id">
      ID:<b>{{ userInfo.id }}</b>
    </div>
    <div class="nickName">
      Nickname:<span style="color:#AFEEEE"><b> {{ userInfo.nickName }}</b></span>
    </div>
    <div class="email">
      Email:
      <b>{{ userInfo.email }}</b>
    </div>
    <div class="email">
      Registration time:
      <b>{{ userInfo.r_date | formatRDate }}</b>
    </div>
    <div class="email">
      Logon state expiration time - This is related to the time specified in the config.js:
      <b>{{ userInfo.expire | formatRDate }}</b>
      Current time
      <span style="color:red;"> {{ nowData }} </span>
    </div>
    <div class="logout">
         <button @click="clearTokenHandler"> Log out </button>
    </div>
  </div>
</template>

<script>
import { mapState,mapActions } from "vuex";

export default {
  name: "Profile",
  data() {
      return {
          nowData:new Date().toLocaleString() 
      }
  },
  mounted() {
      setInterval(() => {
       this.nowData =  new Date().toLocaleString() 
      }, 1000);
  },
  methods: {
      ...mapActions("user",["cleanToken","deleteUserInfo"]),
      clearTokenHandler(){
           if(confirm("Are you sure you want to sign out?")){
                this.cleanToken();
                this.deleteUserInfo
                this.$router.push("/login")
           }
      }
  },
  computed: {
    ...mapState("user", ["userInfo", "token"]),
  },
  filters:{
      formatRDate(v){
          return new Date(v).toLocaleString()
      }
  }
};
</script>

<style lang="less" scoped>
#profile {
  width: 1000px;
  margin: 0 auto;
  text-align: center;
  div {
    margin: 5px;
    font-size:18px;
    b{
        font-size:16px;
    }
  }
}
</style>
