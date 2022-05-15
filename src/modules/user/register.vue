<template>
  <van-form @submit="onRegister">
    <van-cell-group inset>
      <van-field
        v-model="register.accountNumber"
        name="用户名"
        label="用户名"
        placeholder="请填写用户名"
        :rules="[
          { required: true, message: '请填写用户名' },
          {
            validator: accountNumberRules,
            message: '用户名长度为6-18位，请正确填写',
          },
        ]"
      />
      <van-field
        v-model="register.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="请填写密码"
        :rules="[
          { required: true, message: '请填写密码' },
          {
            validator: passwordRules,
            message: '密码长度为6-18位，请正确填写',
          },
        ]"
      />
      <van-field
        v-model="register.repetitionPassword"
        type="password"
        name="重输密码"
        label="重输密码"
        placeholder="请重新填写密码"
        :rules="[
          { required: true, message: '请重新填写密码' },
          {
            validator: repetitionPasswordRules,
            message: '密码长度为6-18位，请正确填写',
          },
        ]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        注册
      </van-button>
      <van-button
        round
        block
        type="primary"
        @click="onLogin"
        class="register-type"
      >
        前往登录
      </van-button>
    </div>
  </van-form>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { RegisterType } from "../../type/user";
import { registerService } from "../../services/user";
import { useRouter } from "vue-router";
import { checkoutRules } from "./checkout";
import { Notify } from "vant";
const router = useRouter();
const register: RegisterType = reactive({
  accountNumber: "",
  password: "",
  repetitionPassword: "",
});
const accountNumberRules = () => checkoutRules(register.accountNumber);
const passwordRules = () => checkoutRules(register.password);
const repetitionPasswordRules = () =>
  checkoutRules(register.repetitionPassword);
const onRegister = async () => {
  const res = await registerService(register);
  if (res?.data?.code === 0) {
    register.accountNumber = "";
    register.password = "";
    register.repetitionPassword = "";
    Notify({ type: "success", message: "注册成功，可以前往登录" });
    router.push({
      name: "login",
    });
  } else {
    Notify({ type: "warning", message: res?.data?.data });
    return;
  }
};

const onLogin = () => {
  router.push({
    name: "login",
  });
};
</script>
<style lang="scss" scoped>
.van-form {
  border: 1px solid #333;
  border-radius: 10px;
  margin: calc((100vh - 335px) / 2) 20px 0 20px;
}
.register-type {
  margin-top: 16px;
}
</style>
