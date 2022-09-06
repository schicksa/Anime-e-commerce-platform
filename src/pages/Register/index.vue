<template>
  <div id="login-and-register">
    <div class="panel">
      <div class="panel-title">
        <h3>Register</h3>
      </div>
      <div class="panel-body">
        <div class="panel-item">
          <label for=""> ID(<small>*read</small>): </label>
          <input
            type="text"
            placeholder="Automatically generated"
            readonly
            v-model="formData.id"
          />
        </div>
        <div class="panel-item">
          <label for=""> Email: </label>
          <input
            type="text"
            name="email"
            v-model.trim="formData.email"
            v-validate="'required|email'"
            placeholder="Please enter the email address"
          />
        </div>
        <div class="errorMsg">
          <p>{{ errors.first("email") }}</p>
        </div>
        <div class="panel-item">
          <label for=""> nickname: </label>
          <input
            type="text"
            v-model.trim="formData.nickName"
            v-validate="'required|min:3|max:8'"
            name="nickname"
            placeholder="Please enter the nickname"
          />
        </div>
        <div class="errorMsg">
          <p>{{ errors.first("nickName") }}</p>
        </div>
        <div class="panel-item">
          <label for=""> password: </label>
          <input
            type="password"
            name="pwd"
            v-model.trim="formData.pwd"
            v-validate="'required|min:6|max:16'"
            placeholder="Please enter the password"
          />
        </div>
        <div class="errorMsg">
          <p>{{ errors.first("pwd") }}</p>
        </div>
        <div class="panel-item">
          <label for=""> Confirm: </label>
          <input
            type="password"
            name="cpwd"
            v-model.trim="formData.cpwd"
            v-validate="'required|min:6|max:16|confirmed:pwd'"
            placeholder="Confirm the password"
          />
        </div>
        <div class="errorMsg">
          <p>{{ errors.first("cpwd") }}</p>
        </div>
        <div class="panel-item">
          <label for=""> Captcha: </label>
          <input
            name="code"
            type="text"
            v-model.trim="formData.code"
            v-validate="{ required: true, regex: /(.){6}/ }"
            placeholder="Please enter the captcha"
          />
          <a
            href="javascript:void(0)"
            @click="
              formData.code = (Math.random() * 0xffffff)
                .toString(16)
                .split('.')[1]
                .slice(0, 6)
            "
          >
            Generate a captcha
          </a>
        </div>
        <div class="errorMsg">
          <p>{{ errors.first("code") }}</p>
        </div>
        <div class="panel-item">
          <label for=""> </label>
          <button :disabled="isRegSuc" :style="{background: isRegSuc ? '#eee' : '#08f'
          ,cursor:isRegSuc ? 'not-allowed' : 'pointer' }" @click="register">register</button>
        </div>
      </div>
    </div>
    <Toast show :fade="isFade" :msg="msg" />
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import { registerUserHook, checkUserIsExistsHook } from "@/hooks/RegisterHook";

const message = {
  custom: {
    cpwd: {
      confirmed: () => "The passwords were inconsistent twice",
    },
    code: {
      regex: () => "The verification code must be 6 digits",
    },
  },
};

let time = 3;

export default {
  name: "Register",
  data() {
    return {
      isFade: false,
      msg: "",
      formData: {
        id: nanoid(),
        email: "",
        nickName: "",
        pwd: "",
        r_date: Date.now(),
        cpwd: "",
        code: "",
      },
      isExisis: false,
      isRegSuc:false
    };
  },
  methods: {
    register() {
      // Form validation
      this.$validator.validate().then(async (valid) => {
        if (true === valid) {
          if (!this.isExisis) {
            if ((await checkUserIsExistsHook(this.formData.email?.trim())).data.length !== 0 ) {
              this.msg = "The email address is registered, please login will jump to " +
                  "the login page after "+time+"seconds";
              this.isExisis = true;
             } else {
              this.$delete(this.formData, "cpwd");
              this.$delete(this.formData, "code");
              let user = await registerUserHook(this.formData);
              if (!user.data.errMsg) {
                this.msg = "Registration is successful, you will be redirected to the login page after "+time+" seconds";
                this.$set(this.formData, "cpwd", "");
                this.$set(this.formData, "code", "");
                this.formData.id = nanoid();
              }
            }
          }
          this.isRegSuc = true;
          this.isFade = true;
          setTimeout(()=>{
             this.isFade = false;
             this.$router.push("/login")
          },3000)
        }
        // else {
        // console.log(this.$validator.errors.all());
        // }
      });
    },
  },
  mounted() {
    this.$validator.localize("zh_CN", message);
    this.$emit("hiddenBody", true);
  },
  beforeRouteLeave(to, from, next) {
    this.$emit("hiddenBody", false);
    next();
  },
  watch: {
    "formData.email":function(){
       this.isExisis = false;
    }
  },
};
</script>
