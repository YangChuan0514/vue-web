<template>
  <div>
    <van-nav-bar :title="title" left-arrow @click-left="onClickLeft" />
    <showForum :forumType="forumType" />
  </div>
</template>
<script lang="ts" setup>
import showForum from "../forum/show.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const param = route.params.forumType
  ? String(route.params.forumType)
  : "userId";
const forumType = ref(param);
const onClickLeft = () => {
  window.history.back(-1);
};
const titleContent = (val: string) => {
  switch (val) {
    case "winDZ":
      return "喜欢我的";
    case "attention":
      return "我的关注";
    case "fans":
      return "我的粉丝";
    case "userId":
      return "我的作品";
    case "userIdDz":
      return "我喜欢的";
    case "userIdCt":
      return "我收藏的";
  }
};
const title = ref(titleContent(forumType.value));
</script>
<style lang="scss" scoped></style>
