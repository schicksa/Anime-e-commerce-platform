<template>
    <div id="header">
        <ul class="nav">
            <router-link active-class="active" tag="li" to="/home"> Home </router-link>
            <router-link active-class="active" tag="li" to="/search"> Search </router-link>
            <router-link active-class="active" tag="li" to="/goods"> Product menu </router-link>
            <router-link active-class="active" tag="li" to="/banner"> Slideshow </router-link>
            <router-link active-class="active" tag="li" v-if="token !== ''" to="/cart"> Shopping cart </router-link>
            <router-link active-class="active" tag="li" v-if="token !== ''" to="/favorites"> Collect </router-link>
            <router-link active-class="active" tag="li" to="/commdity"> Product list </router-link>
            <router-link active-class="active" tag="li" to="/magnifer"> Product information </router-link>
            <router-link active-class="active" tag="li" v-if="token === ''" to="/login"> Login </router-link>
            <router-link active-class="active" tag="li" v-if="token === ''" to="/register"> Register </router-link>
            <router-link active-class="active" tag="li" v-if="token !== ''" to="/profile"> Personal center </router-link>
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
         justify-content: center;
         border-bottom:1px solid #ddd;
         .nav{
             display: flex;
             align-items: center;
             height: 100%;
             list-style-type: none;
             li{
                 width:60px;
                 text-align: center;
                 text-decoration: none;
                 color:#111;
                 &:hover{
                     text-decoration: underline;
                     cursor: pointer;
                 }
             }
         }
     }
</style>