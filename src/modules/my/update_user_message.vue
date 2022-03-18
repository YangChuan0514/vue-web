<template>
  <div>
    <div class="head-img">
      <van-image
        round
        width="60px"
        height="60px"
        fit="cover"
        :src="userMessage.headImg"
        @click="updateImage"
      />
      <p @click="updateImage">点击更换头像</p>
    </div>
    <van-field
      v-model="userMessage.nickName"
      is-link
      readonly
      name="name"
      label="昵称"
      placeholder="请填写您的昵称"
      @click="editName('nickName')"
      input-align="right"
    />
    <van-field
      v-model="userMessage.information"
      is-link
      readonly
      name="information"
      label="简介"
      placeholder="请填写您的简介"
      @click="editName('information')"
      input-align="right"
    />
    <van-field
      v-model="userMessage.sex"
      is-link
      readonly
      name="sex"
      label="性别"
      placeholder="点击选择您的性别"
      @click="updateSex"
      input-align="right"
    />
    <van-field
      v-model="birthdayDate"
      is-link
      readonly
      name="birthday"
      label="生日"
      placeholder="点击选择您的生日"
      @click="updateBirthday"
      input-align="right"
    />
    <van-field
      v-model="locationDate"
      is-link
      readonly
      name="location"
      label="所在地"
      placeholder="点击选择您所在的省市区"
      @click="updateLocation"
      input-align="right"
    />
    <van-field
      v-model="userMessage.school"
      is-link
      readonly
      name="school"
      label="学校"
      placeholder="请填写您的学校"
      @click="editName('school')"
      input-align="right"
    />
    <van-field
      v-model="userMessage.qq"
      is-link
      readonly
      name="QQ"
      label="QQ"
      placeholder="请填写您的qq"
      @click="editName('qq')"
      input-align="right"
    />
    <van-field
      v-model="userMessage.wx"
      is-link
      readonly
      name="wx"
      label="微信"
      placeholder="请填写您的微信"
      @click="editName('wx')"
      input-align="right"
    />
    <van-field
      is-link
      readonly
      name="wx"
      label="主页背景"
      placeholder="更换主页背景"
      @click="updateBackground"
      input-align="right"
    />
    <van-overlay
      :show="showHeaderImage"
      @click="showHeaderImage = false"
      class="head-Img-click"
    >
      <div @click.stop>
        <van-image width="80%" :src="userMessage.headImg" />
        <van-uploader
          v-model="headImageUrl"
          :after-read="headImageChange"
          :preview-image="false"
        >
          <van-button class="uploader-updateImg">更换头像照片</van-button>
        </van-uploader>
      </div>
    </van-overlay>
    <van-overlay
      :show="backgroundImage"
      @click="backgroundImage = false"
      class="head-Img-click"
    >
      <div @click.stop>
        <van-image width="80%" :src="userMessage.background" />
        <van-uploader
          v-model="backgroundImageUrl"
          :after-read="backgroundImageChange"
          :preview-image="false"
        >
          <van-button class="uploader-updateImg">更换背景照片</van-button>
        </van-uploader>
      </div>
    </van-overlay>
    <van-popup
      v-model:show="showDate"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirmDate"
        @cancel="cancelDate"
        @change="dateChange"
      />
    </van-popup>
    <van-popup
      v-model:show="showArea"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <van-area
        :area-list="areaLists"
        value="110101"
        confirm-button-text="确认"
        cancel-button-text="取消"
        @confirm="confirmArea"
        @cancel="cancelArea"
        @change="changeArea"
      />
    </van-popup>
    <van-action-sheet
      v-model:show="showSex"
      :actions="actionsSex"
      @select="onSelectSex"
    />
  </div>
</template>
<script lang="ts" setup>
import { uploadImg } from "../utils";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Toast } from "vant";
import { areaList } from "@vant/area-data";
import dayjs from "dayjs";
import {
  getMessageService,
  updateMessageService,
} from "../../services/user/index";
const router = useRouter();
const id = document.cookie.split("=")[1];
const userMessage = ref({
  background: "",
  birthday: "",
  headImg: "",
  information: "",
  location: "",
  nickName: "",
  qq: "",
  school: "",
  sex: "",
  uId: "",
  userId: "",
  wx: "",
});
let locationDate = ref("");
let birthdayDate = ref("");
onMounted(async () => {
  const res = await getMessageService({ userId: Number(id) });
  userMessage.value = res.data[0];
  locationDate.value = JSON.parse(userMessage.value?.location)
    .map((item) => item.name)
    .join("-");
  birthdayDate.value = dayjs(userMessage.value.birthday * 1000).format(
    "YYYY-MM-DD"
  );
});

const editName = (val: string) => {
  router.push({
    name: "userMessageEdit",
    params: userMessage.value,
    query: {
      editType: val,
    },
  });
};
const showHeaderImage = ref(false);
const updateImage = () => {
  showHeaderImage.value = true;
};
const backgroundImage = ref(false);
const updateBackground = () => {
  backgroundImage.value = true;
};
const backgroundImageUrl = ref([]);
const backgroundImageChange = async () => {
  const promiseImgs: any = [];
  backgroundImageUrl.value.forEach((item) => {
    const img = new Promise((res) => {
      res(uploadImg(item.file));
    });
    promiseImgs.push(img);
  });
  const res = await Promise.all(promiseImgs);
  userMessage.value.background = res[res.length - 1];
  await updateMessageService({
    uId: Number(userMessage.value.uId),
    background: userMessage.value.background,
  });
  backgroundImage.value = false;
  Toast.success("更换背景照片成功");
};
const headImageUrl = ref([]);
const headImageChange = async () => {
  const promiseImgs: any = [];
  headImageUrl.value.forEach((item) => {
    const img = new Promise((res) => {
      res(uploadImg(item.file));
    });
    promiseImgs.push(img);
  });
  const res = await Promise.all(promiseImgs);
  userMessage.value.headImg = res[res.length - 1];
  await updateMessageService({
    uId: Number(userMessage.value.uId),
    headImg: userMessage.value.headImg,
  });
  showHeaderImage.value = false;
  Toast.success("更换头像成功");
};
const currentDate = ref(new Date(2021, 0, 17));
const minDate = new Date(1940, 0, 1);
const maxDate = new Date(2025, 10, 1);
const showDate = ref(false);
const updateBirthday = () => {
  showDate.value = true;
};
const cancelDate = () => {
  showDate.value = false;
};
const confirmDate = async () => {
  await updateMessageService({
    uId: Number(userMessage.value.uId),
    birthday: Number(userMessage.value.birthday),
  });
  showDate.value = false;
};
const dateChange = (a: any) => {
  userMessage.value.birthday = dayjs(a).valueOf() / 1000;
};

const areaLists = areaList;
const showArea = ref(false);
const updateLocation = () => {
  showArea.value = true;
};
const confirmArea = async () => {
  showArea.value = false;
  await updateMessageService({
    uId: Number(userMessage.value.uId),
    location: userMessage.value.location,
  });
};
const cancelArea = () => {
  showArea.value = false;
};
const changeArea = (a: any) => {
  userMessage.value.location = JSON.stringify(a);
  locationDate.value = a.map((item) => item.name).join("-");
};

const showSex = ref(false);
const updateSex = () => {
  showSex.value = true;
};
const actionsSex = [{ name: "男" }, { name: "女" }];
const onSelectSex = async (item: { name: string }) => {
  userMessage.value.sex = item.name;
  await updateMessageService({
    uId: Number(userMessage.value.uId),
    sex: userMessage.value.sex,
  });
  showSex.value = false;
};
</script>
<style lang="scss" scoped>
.head-img {
  margin-top: 30px;
  text-align: center;
}
.head-Img-click {
  display: flex;
  align-items: center;
  text-align: center;
}
.uploader-updateImg {
  background: rgb(151, 148, 148);
  border: none;
  color: #fff;
  margin-top: 50px;
}
</style>
