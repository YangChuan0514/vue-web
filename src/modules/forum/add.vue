<template>
  <div>
    <van-form @submit="onFailed" class="form-type">
      <van-cell-group inset>
        <van-field
          v-model="addForum.title"
          name="title"
          :placeholder="`请填写${
            route.query.form == 1 ? '帖子' : '问题'
          }标题...`"
          :rules="[
            {
              required: true,
              message: `请填写${
                route.query.form == 1 ? '帖子' : '问题'
              }标题...`,
            },
          ]"
        />
        <van-field
          v-model="addForum.content"
          name="concent"
          type="textarea"
          autosize
          rows="1"
          :placeholder="`请填写${
            route.query.form == 1 ? '帖子' : '问题'
          }内容...`"
          :rules="[
            {
              required: true,
              message: `请填写${
                route.query.form == 1 ? '帖子' : '问题'
              }内容...`,
            },
          ]"
          class="textarea-type"
        />
        <van-field label="上传照片:">
          <template #input>
            <UploaderImg @ImgListChange="ImgListChange" />
          </template>
        </van-field>
        <van-field
          label="选择话题:"
          class="type-class"
          v-if="route.query.form != 2"
        >
          <template #input>
            <van-checkbox-group v-model="typeClass" direction="horizontal">
              <van-checkbox name="1" shape="square">日常</van-checkbox>
              <van-checkbox name="2" shape="square">撸猫</van-checkbox>
              <van-checkbox name="3" shape="square">生活</van-checkbox>
              <van-checkbox name="4" shape="square">训练</van-checkbox>
              <van-checkbox name="5" shape="square">医疗</van-checkbox>
              <van-checkbox name="6" shape="square">饲养</van-checkbox>
            </van-checkbox-group>
          </template>
        </van-field>
        <van-field class="video-auto" v-if="route.query.form != 2">
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
import { useRouter, useRoute } from "vue-router";
import { uploadImg, uploadFileVideo } from "../utils";
import Videos from "../../components/Video.vue";
import UploaderImg from "../../components/uploader-img.vue";
import { Notify } from "vant";
// import UpLoad from "./upLoad.vue";
const router = useRouter();
const route = useRoute();
const userId = document.cookie.split("=")[1];
const typeClass = ref([]);
const addForum: AddForum = reactive({
  userId,
  title: "",
  content: "",
  type: "",
  img: [],
  newTime: new Date().getTime() / 1000,
  count: 0,
  video: [],
  form: route.query.form,
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
  addForum.type = typeClass.value.join(",");
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
.type-class {
  display: flex;
  .van-checkbox {
    width: 80px;
    margin: 10px 10px;
  }
}
</style>
