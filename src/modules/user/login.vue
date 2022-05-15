<template>
  <van-form @submit="onLogin">
    <van-cell-group inset>
      <van-field
        v-model="login.accountNumber"
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
        v-model="login.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="请填写密码"
        :rules="[
          { required: true, message: '请填写密码' },
          { validator: passwordRules, message: '密码长度为6-18位，请正确填写' },
        ]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
      <van-button
        round
        block
        type="primary"
        @click="onRegister"
        class="register-type"
      >
        注册
      </van-button>
      <van-button class="change-password" @click="onChangePassword">
        修改密码
      </van-button>
    </div>
  </van-form>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { LoginType } from "../../type/user";
import { loginService } from "../../services/user";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { checkoutRules } from "./checkout";
import { Notify } from "vant";
const accountNumberRules = () => checkoutRules(login.accountNumber);
const passwordRules = () => checkoutRules(login.password);
const router = useRouter();
const store = useStore();
const login: LoginType = reactive({
  accountNumber: "",
  password: "",
});
const onLogin = async () => {
  const res = await loginService(login);
  if (res?.data?.code === 0) {
    login.accountNumber = "";
    login.password = "";
    Notify({ type: "success", message: "登录成功" });
    store.dispatch("userEdit", res.data.id);
    setCookie(res.data.id, res.data.type);
    router.push({
      name: "homePage",
    });
  } else {
    Notify({ type: "warning", message: res?.data?.data });
    return;
  }
};
const setCookie = (id: number, type: string) => {
  let d = new Date();
  d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000); // 将当前登录的时间加上七天，就是cookie过期的时间，也就是保存的天数
  // 字符串拼接cookie,因为cookie存储的形式是name=value的形式
  window.document.cookie = "id" + "=" + id + ";" + "expires=" + d.toGMTString();
  window.localStorage.setItem("type", type);
};
const onChangePassword = () => {
  router.push({
    name: "changePassword",
  });
};
const onRegister = () => {
  console.log(111);
  router.push({
    name: "register",
  });
};
</script>
<style lang="scss" scoped>
.van-form {
  border: 1px solid #333;
  border-radius: 10px;
  margin: calc((100vh - 335px) / 2) 20px 0 20px;
}
.change-password {
  border: none;
  display: flex;
  margin-left: auto;
}
.register-type {
  margin-top: 16px;
}
</style>
