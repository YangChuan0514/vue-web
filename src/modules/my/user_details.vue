<template>
  <div>
    <header class="headers">
      <van-nav-bar :title="userDate.nickName + '的主页'" left-arrow @click-left="onClickLeft" />
    </header>
    <div class="header-type">
      <div class="header">
        <div class="image-name">
          <img :src="userDate.headImg" class="head-img" />
          <div class="user-name">{{ userDate.nickName }}</div>
        </div>
        <div class="user-num">
          <div class="num-text-type" @click="ClickMyShowForum('winDZ')">
            <div>获赞</div>
            {{ winDZ }}
          </div>
          <div class="num-text-type" @click="ClickMyShowForum('attention')">
            <div>关注</div>
            {{ attention }}
          </div>
          <div class="num-text-type" @click="ClickMyShowForum('fans')">
            <div>粉丝</div>
            {{ fans }}
          </div>
        </div>
      </div>
      <div class="inform-type">
        <div class="information-type">{{ userDate.information }}</div>
        <div @click="leaveMessage">留言</div>
      </div>
      <div class="tags">
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
      <div class="attention-type">
        <van-button
          v-if="!isAttShow"
          type="danger"
          size="small"
          icon="plus"
          @click="attentionClick"
          >关注</van-button
        >
        <van-button v-else type="danger" size="small" @click="attentionUpdate"
          >已关注</van-button
        >
      </div>
    </div>
    <footer>
      <van-tabs v-model:active="active">
        <van-tab :title="'作品：' + userForum.length">
          <template v-for="(item, index) in userForum" ::key="item.id">
            <Forum v-if="index" :data="item" class="forum-type" />
          </template>
        </van-tab>
        <van-tab :title="'喜欢：' + userLike.length">
          <template v-for="item in userLike" ::key="item.id">
            <Forum :data="item" class="forum-type" />
          </template>
        </van-tab>
      </van-tabs>
    </footer>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import dayjs from "dayjs";
import { Notify } from "vant";
import Forum from "../../components/forum.vue";
import {
  getUserAttentionMessage,
  getUserDianzanNum,
  getUserAttentionTMessage,
  getUserForumService,
  getDianzanForum,
} from "../../services/forum/index";
import {
  getMessageService,
  addUserAttention,
  deleteUserAttentionData,
} from "../../services/user/index";
import { useRouter } from "vue-router";
const route = useRoute();
const id = route.query.id;
const winDZ = ref("0");
const attention = ref("0");
const fans = ref("0");
const userForum = ref("0");
const userLike = ref("0");
const userCollect = ref("0");
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
const onClickLeft = () => history.back();
const isAttShow = ref(false);
let isAtt = {};
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
      res(getUserAttentionTMessage({ userattId: Number(id) }));
    })
  );
  promeiseAll.push(
    new Promise((res) => {
      res(getMessageService({ userId: Number(id) }));
    })
  );
  promeiseAll.push(
    new Promise((res) => {
      res(getUserForumService({ userId: Number(id) }));
    })
  );
  promeiseAll.push(
    new Promise((res) => {
      res(getDianzanForum({ userId: Number(id) }));
    })
  );

  const numList = await Promise.all(promeiseAll);
  attention.value = numList[0]?.data?.length || 0;
  winDZ.value = numList[1]?.data?.length || 0;
  fans.value = numList[2]?.data?.length || 0;
  userDate.value = numList[3]?.data[0];
  userForum.value = numList[4]?.data || 0;
  userLike.value = numList[5]?.data || 0;
  const res = await getUserAttentionMessage({
    userId: Number(document.cookie.split("=")[1]),
  });
  isAtt = res.data.find((item) => Number(item.userattId) === Number(id));
  console.log(isAtt);
  if (isAtt.Id) {
    isAttShow.value = true;
  } else {
    isAttShow.value = false;
  }
});

const router = useRouter();
const typeJson = (val: string) => {
  const date = (val = JSON.parse(val));
  return date?.map((item) => item.name).join("-");
};
const time = (val: number) => {
  return dayjs(val * 1000).format("YYYY-MM-DD HH:mm:ss");
};
const ClickMyShowForum = (val: string) => {
  router.push({
    name: "myShowForum",
    params: {
      forumType: val,
    },
  });
};
const addCat = () => {
  router.push({
    name: "userCatMessage",
  });
};
const active = ref(0);
const attentionClick = async () => {
  const res = await addUserAttention({
    userId: document.cookie.split("=")[1],
    userattId: id,
    newTime: Date.now() / 1000,
  });
  if (res.status === 200) {
    Notify({ type: "success", message: "关注成功" });
    isAttShow.value = true;
  }
};
const attentionUpdate = async () => {
  const res = await deleteUserAttentionData({ id: isAtt.Id });
  if (res.status === 200) {
    Notify({ type: "success", message: "取消关注成功" });
    isAttShow.value = false;
  }
};
const leaveMessage = () => {
  router.push({
    name: "addLeaveMessage",
    query: {
      id: id,
    },
  });
};
</script>
<style lang="scss" scoped>
.headers {
  :deep .van-icon-arrow-left:before {
    color: #666;
  }
}
.header-type {
  width: 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.user-num {
  flex: 1;
  width: 60vw;
  margin: 0 10px;
  display: flex;
  justify-content: space-between;
  .num-text-type {
    flex: 1;
    text-align: center;
    div {
      color: #999999;
      font-size: 12px;
      margin-bottom: 5px;
    }
  }
}
.header {
  display: flex;
  justify-content: space-between;
  height: 90px;
  margin: 10px 20px;
  align-items: center;
  .btn-edit {
    margin: 70px 10px;
  }
}
.head-img {
  display: inline-block;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.icon-type-header {
  font-size: 18px;
  .van-icon {
    margin-left: 10px;
  }
}
.image-name {
  text-align: center;
}
.user-name {
  font-size: 18px;
  margin: 0px 20px;
}
.inform-type {
  margin: 10px 30px;
  display: flex;
  justify-content: space-between;
}
.information-type {
  max-width: 100px;
  max-height: 100px;
  word-break: break-word;
  overflow: auto;
}
.tag-type {
  height: 20px;
  font-size: 12px;
  margin: 4px 4px 0 0;
}
.tags {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0px 30px;
}

.footer-title {
  margin: 20px;
  font-size: 16px;
  font-weight: 500;
}
.footer-icon {
  color: #666;
  display: flex;
  align-items: center;
  margin: 20px;
  .van-icon {
    font-size: 50px;
    color: #d5d5d5 !important;
    margin-right: 10px;
  }
}
.attention-type {
  margin: 10px 30px;
  :deep .van-button {
    width: 100%;
  }
}
.forum-type {
  margin: 10px 30px;
}
footer {
  :deep .van-tabs__line {
    width: 50vw;
  }
}
</style>
