<template>
    <div>
        {{msg || 'NoData'}}
    </div>
</template>

<script>
export default {
    name: 'NoData',
    props:["msg"]
};
</script>

<style lang="less" scoped>
      div{
          height: 400px;
          width:100%;
          font-size: 50px;
          text-align: center;
          line-height: 400px;
      }
</style>