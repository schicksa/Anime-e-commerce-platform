<template>
  <div class="preview" :class="{show:show}">
    <div class="mask" @click="close"></div>
    <div class="close" @click="close">
      <svg
        t="1648843146640"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2870"
        width="30"
        height="30"
      >
        <path
          d="M818.1 872.1c-15.4 0-30.7-5.9-42.4-17.6l-613-612.9c-23.4-23.4-23.4-61.4 0-84.9 23.4-23.4 61.4-23.4 84.9 0l612.9 612.9c23.4 23.4 23.4 61.4 0 84.9a59.914 59.914 0 0 1-42.4 17.6z"
          fill="#ffffff"
          p-id="2871"
        ></path>
        <path
          d="M205.1 872.1c-15.4 0-30.7-5.9-42.4-17.6-23.4-23.4-23.4-61.4 0-84.9l612.9-612.9c23.4-23.4 61.4-23.4 84.9 0 23.4 23.4 23.4 61.4 0 84.9L247.6 854.5c-11.7 11.7-27.1 17.6-42.5 17.6z"
          fill="#ffffff"
          p-id="2872"
        ></path>
        <path
          d="M818.1 872.1c-15.4 0-30.7-5.9-42.4-17.6l-613-612.9c-23.4-23.4-23.4-61.4 0-84.9 23.4-23.4 61.4-23.4 84.9 0l612.9 612.9c23.4 23.4 23.4 61.4 0 84.9a59.914 59.914 0 0 1-42.4 17.6z"
          fill="#ffffff"
          p-id="2873"
        ></path>
        <path
          d="M205.1 872.1c-15.4 0-30.7-5.9-42.4-17.6-23.4-23.4-23.4-61.4 0-84.9l612.9-612.9c23.4-23.4 61.4-23.4 84.9 0 23.4 23.4 23.4 61.4 0 84.9L247.6 854.5c-11.7 11.7-27.1 17.6-42.5 17.6z"
          fill="#ffffff"
          p-id="2874"
        ></path>
        <path
          d="M818.1 872.1c-15.4 0-30.7-5.9-42.4-17.6l-613-612.9c-23.4-23.4-23.4-61.4 0-84.9 23.4-23.4 61.4-23.4 84.9 0l612.9 612.9c23.4 23.4 23.4 61.4 0 84.9a59.914 59.914 0 0 1-42.4 17.6z"
          fill="#ffffff"
          p-id="2875"
        ></path>
        <path
          d="M205.1 872.1c-15.4 0-30.7-5.9-42.4-17.6-23.4-23.4-23.4-61.4 0-84.9l612.9-612.9c23.4-23.4 61.4-23.4 84.9 0 23.4 23.4 23.4 61.4 0 84.9L247.6 854.5c-11.7 11.7-27.1 17.6-42.5 17.6z"
          fill="#ffffff"
          p-id="2876"
        ></path>
        <path
          d="M818.1 872.1c-15.4 0-30.7-5.9-42.4-17.6l-613-612.9c-23.4-23.4-23.4-61.4 0-84.9 23.4-23.4 61.4-23.4 84.9 0l612.9 612.9c23.4 23.4 23.4 61.4 0 84.9a59.914 59.914 0 0 1-42.4 17.6z"
          fill="#ffffff"
          p-id="2877"
        ></path>
        <path
          d="M205.1 872.1c-15.4 0-30.7-5.9-42.4-17.6-23.4-23.4-23.4-61.4 0-84.9l612.9-612.9c23.4-23.4 61.4-23.4 84.9 0 23.4 23.4 23.4 61.4 0 84.9L247.6 854.5c-11.7 11.7-27.1 17.6-42.5 17.6z"
          fill="#ffffff"
          p-id="2878"
        ></path>
      </svg>
    </div>
    <img @dblclick="isScale = !isScale" :class="{scale:isScale}" :src="url" alt="">
  </div>
</template>

<script>
export default {
  name: "Preview",
  data() {
    return {
      isScale: false,
    };
  },
  props:["url","show"],
  methods: {
    close(){
        this.isScale = false;
        this.$emit('close');
    }
  },
};
</script>

<style lang="less" scoped>

.show{
   animation: show 0.3s ease-in-out forwards;
}

@keyframes show {
  to{
    z-index: 999;
    opacity: 1;
  }
}

.preview {
  opacity: 0;
  z-index: -1000;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  color: white;
  cursor: pointer;
  .mask {
    width: 100%;
    height: 100%;
    z-index: 999;
    position: absolute;
    background-color: black;
    opacity: 0.8;
    filter: opacity(80%);
  }
  .close {
    font-size: 30px;
    z-index: 999;
    width: 30px;
    height: 30px;
    position: fixed;
    height: 20px;
    top: 20px;
    right:20px;
  }
  img {
    transition: 0.2s;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
  }
  img.scale {
    transform: scale(1.4) translate(-30%, -30%);
  }
}
</style>
