<template>
  <div>
    <van-field
      v-model="data.content"
      placeholder="请填写留言"
      class="comment-input"
    />
    <UploaderImg @ImgListChange="imageListChange" />
    <div class="comment-btn">
      <van-button type="default" @click="onCancel">取消</van-button>
      <van-button type="primary" @click="onComment">留言</van-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRoute } from "vue-router";
import { reactive, ref } from "vue";
import UploaderImg from "../../components/uploader-img.vue";
import { addLeaveMessage } from "../../services/user/index";
import { uploadImg } from "../utils";
import { Notify, Toast } from "vant";
const route = useRoute();
const id = document.cookie.split("=")[1];
const data = reactive({
  userId: id,
  userLMId: Number(route.query.id),
  content: "",
  img: [],
  newTime: Date.now() / 1000,
});
const onCancel = () => {
  window.history.back(-1);
};
const ImgList = ref([]);
const onComment = async () => {
  if (!ImgList.value.length && !data.content) {
    Notify({ type: "warning", message: "留言不能为空！" });
    return;
  }
  const promiseImgs: any = [];
  ImgList.value.forEach((item) => {
    const img = new Promise((res) => {
      res(uploadImg(item.file));
    });
    promiseImgs.push(img);
  });
  data.img = await Promise.all(promiseImgs);
  const res = await addLeaveMessage(data);
  if (res.status === 200) {
    Toast.success("留言成功！");
    window.history.back(-1);
  } else {
    Toast.success("留言失败，请重试！");
  }
  console.log(res);
};
const imageListChange = (val: string[]) => {
  ImgList.value = val;
};
</script>
<style lang="scss" scoped>
.comment-input {
  height: 200px;
  border-radius: 10px;
  border: 1px solid #f4f5f5;
  width: 98%;
  margin: 1% auto;
}
.comment-btn {
  display: flex;
  width: 98%;
  margin: 1% auto;
  justify-content: space-between;
}
.comment-up-img {
  margin: 0 1%;
}
</style>
