<template>
    <div id="header">
      <div class="logo">
        <img src="img/logo.jpg">
      </div>
        <ul class="nav">
            <router-link active-class="active" tag="li" to="/home"> Home </router-link>
<!--            <router-link active-class="active" tag="li" to="/search"> Slide </router-link>-->
<!--            <router-link active-class="active" tag="li" to="/goods"> Goods </router-link>-->
            <router-link active-class="active" tag="li" to="/banner"> Search </router-link>
            <router-link active-class="active" tag="li" v-if="token !== ''" to="/cart"> Cart </router-link>
            <router-link active-class="active" tag="li" v-if="token !== ''" to="/favorites"> Favorites </router-link>
            <router-link active-class="active" tag="li" to="/commdity"> Commodity </router-link>
<!--            <router-link active-class="active" tag="li" to="/magnifer"> Detail </router-link>-->
            <router-link active-class="active" tag="li" v-if="token === ''" to="/login"> Login </router-link>
            <router-link active-class="active" tag="li" v-if="token === ''" to="/register"> Register </router-link>
            <router-link active-class="active" tag="li" v-if="token !== ''" to="/profile"> Profile </router-link>
           <li><a href=""  style="color: #AFEEEE;">Switch</a></li> <!-- target="_blank"-->
        </ul>
    </div>
</template>

<script>

import { mapState } from "vuex"

export default {
    name: 'Header',
    computed: {
        ...mapState("user",["token"])
    },

};
</script>

<style lang="less" scoped>
#header{
  display: flex;
  height: 40px;
  width:1200px;
  margin: auto;
  justify-content: center;
  blackgroud-color:white;
  //border-bottom:1px solid #ddd;
  .logo{
    float: left;
    width: 198px;
    height: 40px;
    img{
      margin-top: 5px;
      float: right;
      width: 70px;
      height: 42px;
    }
  }
  .nav{
    margin: 5px;
    display: flex;
    align-items: center;
    height: 100%;
    list-style-type: none;
    transition: transformer 0.5s;
    //background-color: black;
    li{
      display: inline-block;
      width:100px;
      text-align: center;
      text-decoration: none;
      color: #ffffff;
      margin: 15px;
      border: 1px solid transparent;
      transition: .6s ease;
      border-radius: 20px;
      font-size: 15px;
      a{
        text-decoration: none;
        color: #000;
        padding: 5px 20px;
        border: 1px solid transparent;
        transition: .6s ease;
        border-radius: 20px;
      }
      &.active{
        padding:5px;
      }
      &:hover{
        text-decoration: none;
        cursor: pointer;
        background-color: white;
        color: black;
      }
    }
  }
}
//ul li a:hover{
//  background-color: #fff;
//  color: #000;
//}

</style>
