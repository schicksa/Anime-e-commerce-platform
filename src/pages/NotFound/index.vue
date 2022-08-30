<template>
    <div>
         404 Not Found
         <small>
             <router-link  to="/home"> Home </router-link>
         </small>
    </div>
</template>

<script>
export default {
    name: 'NotFound',
};
</script>

<style lang="less" scoped>
      div{
          height: 400px;
          font-size: 50px;
          text-align: center;
          line-height: 400px;
          small{
              font-size: 16px;
              a{
                  color:#333;
              }
          }
      }
</style>