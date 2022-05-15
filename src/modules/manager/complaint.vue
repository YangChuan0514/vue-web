<template>
  <div class="complaint-main">
    <div class="img-name" v-if="data.id">
      <van-image
        round
        width="30px"
        height="30px"
        fit="cover"
        :src="data.userMessage.headImg"
      />
      <span class="nick-name">{{ data.userMessage.nickName }}</span>
      <span>投诉帖子：</span>
    </div>
    <div
      class="forum-title"
      v-if="data.forum"
      @click="forumDetail(data.forum.id)"
    >
      {{ data.forum.title }}
    </div>
    <div class="forum-title">
      投诉类型：
      <template v-for="key in String(data.type).split(',')" :key="key">
        {{ typeShow(key) }}
      </template>
    </div>
    <div class="forum-title">
      投诉理由：
      {{ data.content }}
    </div>
    <div class="btn">
      <van-button type="primary" size="small" @click="noComplaint"
        >不违规</van-button
      >
      <van-button type="primary" size="small" @click="yesComplaint"
        >违规删除</van-button
      >
    </div>
  </div>
</template>
<script setup>
import { complaintMessageFindAll } from "../../services/manager";
import { deleteForum } from "../../services/forum/index";
import { addNotificationData } from "../../services/user";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { Toast } from "vant";
const route = useRoute();
const router = useRouter();
const id = route.query.id;
const data = ref({});
onMounted(async () => {
  const res = await complaintMessageFindAll({ id: id });
  console.log(res);
  data.value = res.data[0];
  console.log(data);
});
const typeShow = (val) => {
  switch (val) {
    case "1":
      return "色情低俗,";
    case "2":
      return "广告骚扰,";
    case "3":
      return "虚假欺骗,";
    case "4":
      return "侵权,";
    case "5":
      return "违禁内容,";
    case "6":
      return "其他,";
  }
};
const forumDetail = (val) => {
  router.push({
    name: "forumDetails",
    query: {
      id: val,
    },
  });
};
const noComplaint = async () => {
  await addNotificationData({
    userId: data.value.userId,
    content: `举报帖子${data.value.forum.title}，不违规`,
  });
  Toast.success("处理成功！");
  window.history.back(-1);
};
const yesComplaint = async () => {
  if (!data.value.forum) {
    Toast.success("已经处理！");
    return;
  }
  await deleteForum({
    id: data.value.forumId,
  });
  await addNotificationData({
    userId: data.value.userId,
    content: `举报帖子${data.value.forum.title}，违规，已删除`,
  });
  await addNotificationData({
    userId: data.value.userCLId,
    content: `帖子${data.value.forum.title}，违规，已删除`,
  });
  Toast.success("处理成功！");
  window.history.back(-1);
};
</script>
<style lang="scss" scoped>
.img-name {
  display: flex;
  line-height: 30px;
  .nick-name {
    margin-left: 5px;
  }
}
.forum-title {
  margin-left: 35px;
}
.complaint-main {
  margin: 20px;
}
.btn {
  display: flex;
  justify-content: space-between;
  margin: 20px 30px;
}
</style>
