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

/* enter processing */
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
  background-color: #fff;
  color: black !important;
}

// Common styles for registration and login
#login-and-register {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  padding: 0 25px;
  background: url(http://v.bootstrapmb.com/2021/3/84yc69856/images/loginback.png);
  position: relative;
  .panel {
    padding: 20px;
    width: 450px;
    min-height: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1.2);
    background-color: white;
    .panel-body {
      height: auto;
      width: 100%;
      .errorMsg {
        text-align: right;
        color: red;
      }
      .panel-item {
        height: 40px;
        line-height: 40px;
        display: flex;
        align-items: center;
        button {
          margin-left: 21px;
          flex: 1;
          background-color: #08f;
          color: white;
          border: none;
          outline: none;
          font-size: 12px;
          padding: 10px 0;
          cursor: pointer;
        }
        label {
          width: 60px;
          text-align: right;
        }
        input {
          font-size: 12px;
          padding-left: 1em;
          border: 1px solid #ccc;
          flex: 1;
          height: 30px;
          margin-left: 20px;
          margin-right: 5px;
          outline: none;
          transition: border, box-shadow 0.5s;
          &:focus {
            border: 1px solid #999;
            box-shadow: 0 2px 5px #ccc;
          }
        }
      }
    }
    .panel-title {
      text-align: center;
      height: 50px;
      line-height: 50px;
      font-size: 20px;
    }
  }
}
</style>
