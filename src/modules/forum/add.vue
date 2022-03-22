<template>
  <div>
    <van-form @submit="onFailed" class="form-type">
      <van-cell-group inset>
        <van-field
          v-model="addForum.title"
          name="title"
          placeholder="请填写帖子标题..."
          :rules="[{ required: true, message: '请填写帖子标题' }]"
        />
        <van-field
          v-model="addForum.content"
          name="concent"
          type="textarea"
          autosize
          rows="1"
          placeholder="请填写帖子内容..."
          :rules="[{ required: true, message: '请填写帖子内容' }]"
          class="textarea-type"
        />
        <van-field label="上传照片:">
          <template #input>
            <UploaderImg @ImgListChange="ImgListChange" />
          </template>
        </van-field>
        <van-field label="选择话题:">
          <template #input>
            <van-checkbox-group v-model="addForum.type" direction="horizontal">
              <van-checkbox name="1" shape="square">复选框 1</van-checkbox>
              <van-checkbox name="2" shape="square">复选框 2</van-checkbox>
            </van-checkbox-group>
          </template>
        </van-field>
        <van-field class="video-auto">
          <template #input>
            <van-uploader
              :action="qiniuUrl"
              :before-read="uploadFileV"
              accept="video/*"
            >
              <span class="text">上传视频</span>
            </van-uploader>
            <p v-if="videoSrc.length">
              <Videos :videos="videoSrc" />
            </p>
          </template>
        </van-field>
        <!-- <UpLoad /> -->
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          发布
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { AddForum } from "../../type/forum/index";
import { addForumService } from "../../services/forum/index";
import { useRouter } from "vue-router";
import { uploadImg, uploadFileVideo } from "../utils";
import Videos from "../../components/Video.vue";
import UploaderImg from "../../components/uploader-img.vue";
// import UpLoad from "./upLoad.vue";
const router = useRouter();
const userId = document.cookie.split("=")[1];
const addForum: AddForum = reactive({
  userId,
  title: "",
  content: "",
  type: "",
  img: [],
  newTime: new Date().getTime() / 1000,
  count: 0,
  video: [],
});
const ImgList = ref([]);
const onFailed = async () => {
  addForum.userId = Number(addForum.userId);
  const promiseImgs: any = [];
  ImgList.value.forEach((item) => {
    const img = new Promise((res) => {
      res(uploadImg(item.file));
    });
    promiseImgs.push(img);
  });
  addForum.img = await Promise.all(promiseImgs);
  const promiseVideos: any = [];
  videoSrcList.value.forEach((item) => {
    const video = new Promise((res) => {
      res(uploadFileVideo(item));
    });
    promiseVideos.push(video);
  });
  addForum.video = await Promise.all(promiseVideos);
  const res = await addForumService(addForum);
  router.push({
    name: "forum",
  });
};
const videoSrc = ref([]);
const videoSrcList = ref([]);
const qiniuUrl = "http://upload-as0.qiniup.com";

const uploadFileV = async (event: any) => {
  videoSrcList.value.push(event);
  videoSrc.value.push(URL.createObjectURL(event));
};
const ImgListChange = (val: string[]) => {
  ImgList.value = val;
};
const VideoList = ref([]);
</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.form-type {
  margin-bottom: 50px;
}
.form-type .van-field {
  display: block;
}
.video-auto .van-uploader {
  width: 80px;
  height: 25px;
  overflow: hidden;
  position: absolute;
  top: 0px;
  background: #409eff;
  border-radius: 2px;
  .text {
    margin-left: 10px;
    color: #fff;
  }
}
.video-play {
  margin-top: 30px;
  width: 100%;
}
.textarea-type {
  min-height: 70px;
  width: 90%;
  border: 1px solid #dcdee0;
  margin: 3px auto;
  padding: 0px;
  :deep .van-field__control {
    min-height: 100% !important;
    height: 70px !important;
  }
}
</style>
