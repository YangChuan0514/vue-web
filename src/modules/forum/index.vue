<template>
  <div class="header">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in images" :key="image">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>
    <van-search
      class="search-forum"
      v-model="forum_search"
      placeholder="请输入搜索关键词"
      @keypress="
        (e) => {
          if (e.keyCode === 13 && forum_search) {
            onFuzzySearch(forum_search);
          }
        }
      "
    />
    <van-button class="news" round type="primary" @click="onWarn"
      >消息</van-button
    >
  </div>
  <div class="popover-type">
    <van-popover
      v-model:show="showPopover"
      :actions="actions"
      placement="top"
      class="forum-popover"
      @select="onSelect"
    >
      <template #reference>
        <van-button type="primary" icon="plus" class="forum-type"></van-button>
      </template>
    </van-popover>
  </div>
  <van-tabs v-model:active="activeName">
    <van-tab title="全部" name="a">
      <ShowForum class="index-xia" />
    </van-tab>
    <van-tab title="精选" name="b">
      <ShowForum class="index-xia" />
    </van-tab>
    <van-tab title="校训" name="c">
      <ShowForum class="index-xia" />
    </van-tab>
  </van-tabs>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import ShowForum from "./show.vue";
import { fuzzySearch } from "../../services/forum";
const showPopover = ref(false);
const router = useRouter();
const activeName = ref("a");
const actions = [
  { text: "论坛", icon: "add-o" },
  { text: "评论", icon: "music-o" },
  { text: "点赞", icon: "more-o" },
];
const onSelect = (val: { text: string; icon: string }) => {
  console.log(val.text);
  if (val.text === "论坛") {
    router.push({
      name: "addForum",
    });
  }
  if (val.text === "评论") {
    router.push({
      name: "",
    });
  }
  if (val.text === "点赞") {
    router.push({
      name: "",
    });
  }
};
const forum_search = ref("");
const images = reactive([
  "http://yangchuan.club/pageapi_1646290348470.png",
  "http://yangchuan.club/pageapi_1646290349036.png",
  "http://yangchuan.club/pageapi_1646290349602.png",
]);
const onWarn = () => {
  router.push({
    name: "warn",
  });
};
const onFuzzySearch = async (val: string) => {
  router.push({
    name: "forumSearch",
    query: {
      search: val,
    },
  });
};
</script>
<style lang="scss" scoped>
.header {
  height: 200px;
  width: 100%;
  img {
    width: 100%;
    height: 200px;
  }
  .search-forum {
    position: absolute;
    top: 10px;
    left: 10px;
  }
  .news {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  // background: red;
  // display: flex;
  .van-search {
    background: none;
    width: 80%;
    height: 60px;
  }
  .van-button {
    margin-top: 10px;
  }
}
.forum-type {
  position: fixed;
  bottom: 70px;
  right: 20px;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  z-index: 100000;
}
.popover-type {
  height: 0px;
}
.index-xia {
  margin-bottom: 60px;
}
</style>
