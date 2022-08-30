<template>
  <div :style="hiddenBody">
    <Header />
    <div :class="{ main: addCalssMain }">
      <transition>
        <router-view @hiddenBody="hiddenBodyHandler"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  data() {
    return {
      hiddenBody: {},
      addCalssMain: true,
    };
  },
  components: {
    Header,
    Footer,
  },
  methods: {
    hiddenBodyHandler(is) {
      if (is) {
        this.hiddenBody = {
          overflow: "hidden",
          width: "100vw",
          height: "100vh",
        };
        this.addCalssMain = false;
        return;
      }
      this.hiddenBody = {};
      this.addCalssMain = true;
    },
  },
};
</script>

<style lang="less">
#nprogress .bar {
  background: @barBgColor !important;
}

.main {
  padding: 10px;
  height: auto;
}

/* in process */
.v-enter-active {
  animation: animate 1s;
}

@keyframes animate {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.active {
  background-color: #333;
  color: white !important;
}

</style>
