import { LoginType, RegisterType, ChangePassWord } from "../../type/user";
import axios from "axios";
export async function loginService(obj: LoginType) {
  let data = {};
  await axios.post("/api/login", obj).then((res) => {
    data = res;
  });
  return data;
}
export async function registerService(obj: RegisterType) {
  let data = {};
  await axios
    .post("/api/register", {
      accountNumber: obj.accountNumber,
      password: obj.password,
    })
    .then((res) => {
      data = res;
    });
  return data;
}
export async function changePasswordService(obj: ChangePassWord) {
  let data = {};
  await axios.post("/api/changePassword", obj).then((res) => {
    data = res;
  });
  return data;
}
// 获取用户信息
export async function getMessageService(obj: { userId: number }) {
  let data = {};
  await axios.post("/api/getUserMessage", obj).then((res) => {
    data = res;
  });
  return data;
}
// 更新用户信息
export async function updateMessageService(obj: any) {
  let data = {};
  await axios.post("/api/updateUserMessage", obj).then((res) => {
    data = res;
  });
  return data;
}
