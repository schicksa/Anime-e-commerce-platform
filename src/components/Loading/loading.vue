<template>
    <div class="loading">
    </div>
</template>

<script>
export default {
    name: 'Loading',
};
</script>

<style lang="less" scoped>

.loading{
    width:30px;
    height: 30px;
    border-radius: 50%;
    border:3px solid #333;
    border-top-color:transparent;
    animation: rotate 0.5s infinite linear;
}

@keyframes rotate {
    to{
        transform: rotate(360deg);
    }
}

</style>