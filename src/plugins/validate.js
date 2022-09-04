import VeeValidate, {Validator} from 'vee-validate';
import en from 'vee-validate/dist/locale/en';
import Vue from "vue"

Vue.use(VeeValidate, {
  dictionary: {
    en: en
  }
});

Validator.localize('en');