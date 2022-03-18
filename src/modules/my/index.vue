<template>
  <div>
    <div
      class="header-type"
      :style="{
        backgroundImage: 'url(' + userDate.background + ')',
      }"
    >
      <div class="header">
        <div>
          <img :src="userDate.headImg" class="head-img" />
          <span class="user-name">{{ userDate.nickName }}</span>
        </div>
        <van-button type="primary" class="btn-edit" @click="updateMessage"
          >编辑资料</van-button
        >
      </div>
      <div class="information-type" @click="updateMessage">
        个人宣言：{{ userDate.information }}
      </div>
      <div class="tags" @click="updateMessage">
        <van-tag plain type="primary" class="tag-type" v-if="userDate.sex">{{
          userDate.sex
        }}</van-tag>
        <van-tag
          plain
          type="primary"
          class="tag-type"
          v-if="userDate.location"
          >{{ typeJson(userDate.location) }}</van-tag
        >
        <van-tag
          plain
          type="primary"
          class="tag-type"
          v-if="userDate.birthday"
          >{{ time(Number(userDate.birthday)) }}</van-tag
        >
        <van-tag plain type="primary" class="tag-type" v-if="userDate.school">{{
          userDate.school
        }}</van-tag>
      </div>
      <div class="user-num">
        <div>
          <div>获赞</div>
          {{ winDZ }}
        </div>
        <div>
          <div>关注</div>
          {{ attention }}
        </div>
        <div>
          <div>粉丝</div>
          {{ fans }}
        </div>
      </div>
    </div>
    <van-tabs v-model:active="activeName">
      <van-tab title="作品" name="a">
        <showForum :forumType="'userId'" />
      </van-tab>
      <van-tab title="喜欢" name="b">
        <showForum :forumType="'userIdDz'" />
      </van-tab>
      <van-tab title="收藏" name="c">
        <showForum :forumType="'userIdCt'" />
      </van-tab>
    </van-tabs>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import dayjs from "dayjs";
import showForum from "../forum/show.vue";import {
  getUserAttentionMessage,
  getUserDianzanNum,
  getUserAttentionTMessage,
} from "../../services/forum/index";
import { getMessageService } from "../../services/user/index";
import { useRouter } from "vue-router";
const id = document.cookie.split("=")[1];
const winDZ = ref("0");
const attention = ref("0");
const fans = ref("0");
const activeName = ref("a");
const userDate = ref({
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
onMounted(async () => {
  let promeiseAll = [];
  promeiseAll.push(
    new Promise((res) => {
      res(getUserAttentionMessage({ userId: Number(id) }));
    })
  );
  promeiseAll.push(
    new Promise((res) => {
      res(getUserDianzanNum({ userId: Number(id) }));
    })
  );
  promeiseAll.push(
    new Promise((res) => {
      res(getUserAttentionTMessage({ userId: Number(id) }));
    })
  );
  promeiseAll.push(
    new Promise((res) => {
      res(getMessageService({ userId: Number(id) }));
    })
  );
  const numList = await Promise.all(promeiseAll);
  attention.value = numList[0]?.data?.length || 0;
  winDZ.value = numList[1]?.data?.length || 0;
  fans.value = numList[2]?.data?.length || 0;
  userDate.value = numList[3]?.data[0];
});

const router = useRouter();
const updateMessage = () => {
  router.push({
    name: "userMessage",
    params: userDate.value,
  });
};
const typeJson = (val: string) => {
  const date = (val = JSON.parse(val));
  return date?.map((item) => item.name).join("-");
};
const time = (val: number) => {
  return dayjs(val * 1000).format("YYYY-MM-DD HH:mm:ss");
};
</script>
<style lang="scss" scoped>
.header-type {
  width: 100%;
  height: 300px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.header {
  display: flex;
  justify-content: space-between;
  height: 130px;
  .btn-edit {
    margin: 70px 10px;
  }
}
.head-img {
  display: inline-block;
  margin: 60px 0px 0px 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.user-name {
  font-size: 18px;
  margin: 0px 20px;
  position: relative;
  top: -25px;
}
.information-type {
  margin-left: 30px;
}
.tag-type {
  height: 20px;
  font-size: 12px;
  margin: 3px 0px;
}
.tags {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-left: 30px;
}
.user-num {
  width: 200px;
  display: flex;
  justify-content: space-between;
  margin: 10px 0 0 30px;
}
</style>
