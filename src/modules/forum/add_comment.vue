<template>
  <div>
    <van-field
      v-model="data.commentContent"
      placeholder="请填写评价"
      class="comment-input"
    />
    <UploaderImg @ImgListChange="imageListChange" />
    <div class="comment-btn">
      <van-button type="default" @click="onCancel">取消</van-button>
      <van-button type="primary" @click="onComment">评论</van-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { reactive, ref } from "vue";
import { addCommentService } from "../../services/forum/index";
import UploaderImg from "../../components/uploader-img.vue";
import { uploadImg } from "../utils";
import { Notify } from 'vant';
const route = useRoute();
const router = useRouter();
const data = reactive({
  userId: document.cookie.split("=")[1],
  commentForumId: Number(route.query.id),
  commentContent: "",
  commentImg: [],
  newTime: Date.now() / 1000,
});
const fileList = ref([]);
const onCancel = () => {
  router.push({
    name: "forum",
  });
};
const ImgList = ref([]);
const onComment = async () => {
  if(!ImgList.value.length && !data.commentContent){
    Notify({ type: 'warning', message: '评论不能为空！' });
    return
  }
  const promiseImgs: any = [];
  ImgList.value.forEach((item) => {
    const img = new Promise((res) => {
      res(uploadImg(item.file));
    });
    promiseImgs.push(img);
  });
  data.commentImg = await Promise.all(promiseImgs);
  await addCommentService(data);
  onCancel();
};
const qiniuUrl = "http://upload-as0.qiniup.com";
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
