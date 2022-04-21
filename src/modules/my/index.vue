<template>
  <div>
    <header class="headers">
      <div>我的</div>
      <div class="icon-type-header">
        <van-icon name="setting-o" color="#333333" />
        <van-icon name="bell" color="#333333" />
      </div>
    </header>
    <div class="header-type">
      <div class="header">
        <div>
          <img :src="userDate.headImg" class="head-img" />
          <span class="user-name">{{ userDate.nickName }}</span>
        </div>
        <div>
          <van-icon name="arrow" color="#999999" @click="updateMessage" />
        </div>
      </div>
      <div class="information-type" @click="updateMessage">
        个人简介：{{ userDate.information }}
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
      <div>
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
        <div class="user-num">
          <div class="num-text-type" @click="ClickMyShowForum('userId')">
            <div>作品</div>
            {{ userForum }}
          </div>
          <div class="num-text-type" @click="ClickMyShowForum('userIdDz')">
            <div>喜欢</div>
            {{ userLike }}
          </div>
          <div class="num-text-type" @click="ClickMyShowForum('userIdCt')">
            <div>收藏</div>
            {{ userCollect }}
          </div>
        </div>
      </div>
    </div>
    <footer>
      <div class="footer-title">我的宠物</div>
      <div class="footer-icon" @click="addCat">
        <van-icon name="add-o" color="#333333" />
        <span>添加宠酱</span>
      </div>
    </footer>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import dayjs from "dayjs";
import {
  getUserAttentionMessage,
  getUserDianzanNum,
  getUserAttentionTMessage,
  getUserForumService,
  getDianzanForum,
  getCollectForumService,
} from "../../services/forum/index";
import { getMessageService } from "../../services/user/index";
import { useRouter } from "vue-router";
const id = document.cookie.split("=")[1];
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
  promeiseAll.push(
    new Promise((res) => {
      res(getCollectForumService({ userId: Number(id) }));
    })
  );
  const numList = await Promise.all(promeiseAll);
  attention.value = numList[0]?.data?.length || 0;
  winDZ.value = numList[1]?.data?.length || 0;
  fans.value = numList[2]?.data?.length || 0;
  userDate.value = numList[3]?.data[0];
  userForum.value = numList[4]?.data?.length || 0;
  userLike.value = numList[5]?.data?.length || 0;
  userCollect.value = numList[6]?.data?.length || 0;
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
</script>
<style lang="scss" scoped>
.headers {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 20px;
  font-size: 18px;
}
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
  width: 60vw;
  margin: 20px auto 0px auto;
  display: flex;
  justify-content: space-between;
  .num-text-type {
    text-align: center;
    div {
      color: #999999;
      font-size: 12px;
      margin-bottom: 5px;
    }
  }
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
</style>
