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
// 关注
export async function addUserAttention(obj: any) {
  let data = await axios.post("/api/addUserAttention", obj);
  return data;
}
// 取关
export async function deleteUserAttentionData(obj: any) {
  let data = await axios.post("/api/deleteUserAttention", obj);
  return data;
}

// 添加留言
export async function addLeaveMessage(obj: any) {
  let data = await axios.post("/api/addLeaveMessage", obj);
  return data;
}
//修改 留言
export async function updateLeaveMessage(obj: any) {
  let data = await axios.post("/api/updateLeaveMessage", obj);
  return data;
}
//查找留言
export async function leaveMessageFindAll(obj: any) {
  let data = await axios.post("/api/leaveMessageFindAll", obj);
  return data;
}
//查找通知
export async function notificationFindAll(obj: any) {
  let data = await axios.post("/api/notificationFindAll", obj);
  return data;
}
//修改通知
export async function updateNotificationMessage(obj: any) {
  let data = await axios.post("/api/updateNotificationMessage", obj);
  return data;
}
// 添加通知
export async function addNotificationData(obj: any) {
  let data = await axios.post("/api/addNotificationData", obj);
  return data;
}
