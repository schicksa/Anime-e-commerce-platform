<template>
    <div id="toast" v-if="show" :class="{fade:fade}">
        {{msg}}
    </div>
</template>

<script>
export default {
    name: 'Toast',
    props:{
        msg:{
            type:String,
            required:true
        },
        show:{
            type:Boolean,
            default:false
        },
        fade:{
            type:Boolean,
            default:false
        }
    }
};
</script>

<style lang="less" scoped>
     #toast{
         width: auto;
         padding:10px;
         background-color: black;
         border-radius: 5px;    
         color:#eee;
         position: fixed;
         top:50%;
         left:50%;
         z-index: -999;
         opacity: 0;
         transform: translate(-50%,-50%);
     }

     .fade{
         animation: fade 1s;
     }

     @keyframes fade {
           to{
               z-index: 999;
               opacity: 1;
           } 
     }
</style>