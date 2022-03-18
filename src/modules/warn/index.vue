<template>
  <div>
    <van-nav-bar title="消息" left-arrow @click-left="onClickLeft" />
    <div class="warns-type">
      <div class="icon-text" @click="likeSelect">
        <van-icon name="like-o" class="icon-type" :badge="dzWarnNum" />
        <p>点赞</p>
      </div>
      <div class="icon-text" @click="starSelect">
        <van-icon name="star-o" class="icon-type" :badge="starWarnNum" />
        <p>关注</p>
      </div>
      <div class="icon-text" @click="chatSelect">
        <van-icon name="chat-o" class="icon-type" :badge="chatWarnNum" />
        <p>评论</p>
      </div>
    </div>
    <div class="message">
      <template v-for="(item, index) in List" :key="index">
        <div class="message-once">
          <template v-if="item.Id">
            <div class="user-messagess">
              <van-image
                class="head-img"
                fit="cover"
                round
                :src="item.userMessage ? item.userMessage.headImg : ''"
              />
              <span class="nick-name">
                <span>
                  {{ item.userMessage && item.userMessage.nickName }}
                </span>
                <div>关注了你</div>
                <span>{{ time(item.newTime) }}</span>
              </span>
              <van-button
                v-if="!item.gz"
                type="danger"
                class="icon-type-gc"
                @click="warnCollet(item.userattId, item.userId)"
                >回关</van-button
              >
              <van-button
                v-else
                type="default"
                class="icon-type-gc"
                @click="warnDelCollet(item.userattId, item.userId)"
                >互相关注</van-button
              >
            </div>
          </template>
          <template v-else-if="item.dianzanId">
            <div class="user-messagess">
              <van-image
                round
                class="head-img"
                fit="cover"
                :src="item.userMessage ? item.userMessage.headImg : ''"
              />
              <span class="nick-name">
                <span>
                  {{ item.userMessage && item.userMessage.nickName }}
                </span>
                <div>赞了你的作品</div>
                <span>{{ time(item.newTime) }}</span>
              </span>
              <van-icon
                name="like-o"
                class="icon-type-like"
                @click="onForum(item.dzForumId)"
              />
            </div>
          </template>
          <template v-else-if="item.commentId">
            <div class="user-messagess">
              <van-image
                class="head-img"
                fit="cover"
                round
                :src="item.userMessage ? item.userMessage.headImg : ''"
              />
              <span class="nick-name">
                <span>
                  {{ item.userMessage && item.userMessage.nickName }}
                </span>
                <div>评价了你：{{ item.commentContent }}</div>
                <span>{{ time(item.newTime) }}</span>
              </span>
              <van-icon
                name="chat-o"
                class="icon-type-chat"
                @click="onForum(item.commentForumId)"
              />
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import dayjs from "dayjs";
import {
  getUserAttentionTMessage,
  getUserDianzanNum,
  getUserForumComment,
  addUserAttention,
  deleteUserAttention,
  updateUserAttWarn,
  updateDianzanWarn,
  updateUserForumComment,
} from "../../services/forum/index";
const router = useRouter();
const id = document.cookie.split("=")[1];
let List: any[] = ref([]);
const dzWarnNum = ref("");
const starWarnNum = ref("");
const chatWarnNum = ref("");
const ListDate = async () => {
  const dz = new Promise((res) => {
    res(getUserDianzanNum({ userId: Number(id) }));
  });
  const At = new Promise((res) => {
    res(getUserAttentionTMessage({ userId: Number(id) }));
  });
  const Uc = new Promise((res) => {
    res(getUserForumComment({ userId: Number(id), o: 1, l: 50 }));
  });
  let res: any[] = await Promise.all([dz, At, Uc]);
  const dzDate = res[0]?.data;
  const atDate = res[1]?.data;
  const ucDate = res[2]?.data?.rows;
  dzWarnNum.value = dzDate.filter((item) => !item.warn).length;
  starWarnNum.value = atDate.filter((item) => !item.warn).length;
  chatWarnNum.value = ucDate.filter((item) => !item.warn).length;
  res = [].concat(dzDate, atDate, ucDate);
  List.value = res.sort((a, b) => {
    return b.newTime - a.newTime;
  });
};
onMounted(async () => {
  ListDate();
});
const onClickLeft = () => {
  router.push({
    name: "forum",
  });
};
const likeSelect = async () => {
  if (Number(dzWarnNum.value) > 0) {
    await updateDianzanWarn({ userId: Number(id) });
  }
  const res = await getUserDianzanNum({ userId: Number(id) });
  List.value = res?.data?.sort((a, b) => {
    return b.newTime - a.newTime;
  });
  dzWarnNum.value = List.value.filter((item) => !item.warn).length;
};
const starSelect = async () => {
  if (Number(starWarnNum.value) > 0) {
    await updateUserAttWarn({ userId: Number(id) });
  }
  const res = await getUserAttentionTMessage({ userId: Number(id) });
  List.value = res?.data?.sort((a, b) => {
    return b.newTime - a.newTime;
  });
  starWarnNum.value = List.value.filter((item) => !item.warn).length;
};
const chatSelect = async () => {
  if (Number(chatWarnNum.value) > 0) {
    await updateUserForumComment({ userId: Number(id), o: 1, l: 50 });
  }
  const res = await getUserForumComment({ userId: Number(id), o: 1, l: 50 });
  List.value = res?.data?.rows?.sort((a, b) => {
    return b.newTime - a.newTime;
  });
  chatWarnNum.value = List.value.filter((item) => !item.warn).length;
};
const time = (val: number) => {
  return dayjs(val * 1000).format("MM-DD HH:mm:ss");
};
const onForum = (val) => {
  router.push({
    name: "forumDetails",
    query: {
      id: val,
    },
  });
};
const warnCollet = async (userattId: number, userId: number) => {
  await addUserAttention({
    userId: Number(userattId),
    userattId: Number(userId),
    newTime: Date.now() / 1000,
  });
  ListDate();
};
const warnDelCollet = async (userattId: number, userId: number) => {
  await deleteUserAttention({
    userId: Number(userattId),
    userattId: Number(userId),
  });
  ListDate();
};
</script>
<style lang="scss" scoped>
.icon-type {
  font-size: 40px;
  color: red;
}
.warns-type {
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
}
.icon-text {
  text-align: center;
}
.nick-name {
  font-size: 16px;
  margin-left: 10px;
}
.user-messagess {
  display: flex;
}
.head-img {
  width: 40px;
  height: 40px;
  margin-top: 10px;
}
.message {
  margin: 10px 30px;
}
.message-once {
  min-height: 80px;
  width: 100%;
}
.icon-type-chat,
.icon-type-like {
  display: block;
  margin-top: 10px;
  margin-left: auto;
  font-size: 30px;
  color: aqua;
}
.icon-type-like {
  color: red;
}
.icon-type-gc {
  margin-left: auto;
  margin-top: 10px;
  margin-right: -20px;
  height: 30px;
}
</style>
