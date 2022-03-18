<template>
  <van-form @submit="onChangePassword">
    <van-cell-group inset>
      <van-field
        v-model="changePassword.accountNumber"
        name="用户名"
        label="用户名"
        placeholder="请填写用户名"
        :rules="[
          { required: true, message: '请填写用户名' },
          {
            validator: accountNumberRules,
            message: '请填写正确内容',
          },
        ]"
      />
      <van-field
        v-model="changePassword.password"
        type="password"
        name="旧密码"
        label="旧密码"
        placeholder="请填写旧密码"
        :rules="[
          { required: true, message: '请填写旧密码' },
          {
            validator: passwordRules,
            message: '请填写正确内容',
          },
        ]"
      />
      <van-field
        v-model="changePassword.newPassword"
        type="password"
        name="新密码"
        label="新密码"
        placeholder="请填写新密码"
        :rules="[
          { required: true, message: '请填写新密码' },
          {
            validator: newPasswordRules,
            message: '请填写正确内容',
          },
        ]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        修改密码
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
import { ChangePassWord } from "../../type/user";
import { changePasswordService } from "../../services/user";
import { useRouter } from "vue-router";
import { checkoutRules } from "./checkout";
import { Notify } from "vant";
const router = useRouter();
const changePassword: ChangePassWord = reactive({
  accountNumber: "",
  password: "",
  newPassword: "",
});
const accountNumberRules = () => checkoutRules(changePassword.accountNumber);
const passwordRules = () => checkoutRules(changePassword.password);
const newPasswordRules = () => checkoutRules(changePassword.newPassword);
const onChangePassword = async () => {
  if (changePassword.password === changePassword.newPassword) {
    Notify({ type: "warning", message: "新密码和旧密码不能相同" });
    return;
  }
  const res = await changePasswordService(changePassword);
  if (res?.data?.code === 0) {
    changePassword.accountNumber = "";
    changePassword.password = "";
    changePassword.newPassword = "";
    Notify({ type: "success", message: "修改密码成功，可以前往登录" });
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
