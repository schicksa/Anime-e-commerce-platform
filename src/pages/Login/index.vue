<template>
  <div id="login-and-register">
    <div class="panel">
      <div class="panel-title">
        <h3>Login</h3>
      </div>
      <div class="panel-body">
        <div class="panel-item">
          <label for=""> Email: </label>
          <input
            type="text"
            name="email"
            v-model.trim="formData.email"
            v-validate="'required|email'"
            placeholder="Please enter your email address"
          />
        </div>
        <div class="errorMsg">
          <p>{{ errors.first("email") }}</p>
        </div>
        <div class="panel-item">
          <label for=""> Password: </label>
          <input
            type="password"
            name="pwd"
            v-model.trim="formData.pwd"
            v-validate="'required|min:6|max:16'"
            placeholder="Please enter your password"
          />
        </div>
        <div class="errorMsg">
          <p>{{ errors.first("password") }}</p>
        </div>
        <div class="errorMsg">
          <p>{{ errors.first("repeat password") }}</p>
        </div>
        <div class="panel-item">
          <label for=""> </label>
          <button
            @click="login"
            :disabled="isLogin"
            :style="{
              background: isLogin ? '#ddd' : '#08f',
              cursor: isLogin ? 'not-allowed' : 'pointer',
            }"
          >
            {{ loginText }}
          </button>
        </div>
      </div>
    </div>
    <Toast show :fade="isFade" :msg="msg" />
  </div>
</template>

<script>
import { loginHook } from "@/hooks/LoginHook";
import { mapActions,mapState } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      isFade: false,
      msg: "",
      formData: {
        email: "",
        pwd: "",
        cpwd: "",
      },
      isLogin: false,
      loginText: "Login",
    };
  },
  computed: {
    ...mapState("user",["token","userInfo"])
  },
  methods: {
    ...mapActions("user", ["genToken"]),
    login() {
      // Form validation
      this.$validator.validate().then(async (valid) => {
        if (true === valid) {
          this.isLogin = true;
          this.loginText = "logining...";
          let { data: user } = await loginHook(
            this.formData.email,
            this.formData.pwd
          );
          if (!user) {
            this.msg = "Network connection failed";
          } else {
            if (user.length > 0 && user[0].email === this.formData.email) {
              // Login successful. Since it is a JWT generation and validation done separately with
              // two different back-end servers NodeJs, we are going to request that we write our own Node server.
              // Not the JSONSERVER server
              // Strictly speaking, the fields stored by JWT set by the backend here are set here,
              // but we do not use our own backend to do the login function here and put it on the front end
              delete user.pwd;
              let res = await this.genToken(user[0]);
              if (res?.errMsg) {
                this.msg = "Network error";
              } else {
                this.msg = "Login successfully, jump to personal center after 1 second";
                this.isFade = true;
                setTimeout(()=>{
                    this.$router.push("/profile")
                },1000)
                return;
              }
            } else {
              this.msg = "The account number or password is incorrect";
            }
          }
          this.isFade = true;
          setTimeout(() => {
            this.isFade = false;
            this.isLogin = false;
            this.loginText = "Login";
          }, 1000);
        }
      });
    },
  },
  mounted() {
    if(this.$code || this.$code === 0){
      if(this.$code === 0){
       this.msg = "The login state expires";
      }
      if(this.$code === 1) {
       this.msg = "Invalid login state";
      }
      if(this.$code === -1) {
       this.msg = "Missing token";
      }
      this.isFade = true;
       setTimeout(()=>{
          this.isFade = false;
          delete this.$code ;
       },1000)
    }
    this.$emit("hiddenBody", true);
  },
  beforeRouteLeave(to, from, next) {
    this.$emit("hiddenBody", false);
    next();
  },
};
</script>
