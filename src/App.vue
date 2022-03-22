<template>
  <!-- <div id="app"></div> -->
  <van-tabbar
    v-model="active"
    @change="pageChange"
    v-show="tabbarShow"
    class="van-tabbar-type"
    active-color="#f3c55e"
  >
    <van-tabbar-item name="homePage"
      ><div class="iconfont icon-shouyeshouye"></div>
      首页</van-tabbar-item
    >
    <van-tabbar-item name="forum">
      <div class="iconfont icon-quanzi"></div>
      喵星球</van-tabbar-item
    >
    <van-tabbar-item name="">
      <van-popover
        v-model:show="showPopover"
        :actions="actions"
        placement="top"
        class="forum-popover"
        @select="onSelect"
      >
        <template #reference>
          <van-icon name="add" class="add-type" />
        </template>
      </van-popover>
    </van-tabbar-item>
    <van-tabbar-item name="news">
      <div class="iconfont icon-xiaoxi"></div>
      消息</van-tabbar-item
    >
    <van-tabbar-item name="my">
      <div class="iconfont icon-wode"></div>
      我的</van-tabbar-item
    >
  </van-tabbar>
  <router-view></router-view>
</template>
<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";
import { ref, watch, onMounted } from "vue";
const active = ref("forum");
const tabbarShow = ref(true);
const route = useRoute();
const router = useRouter();
watch(
  () => route.path,
  () => {
    const name = route.path;
    if (["/homePage", "/news", "/forum", "/my"].includes(name)) {
      active.value = String(route.name);
      tabbarShow.value = true;
    } else {
      tabbarShow.value = false;
    }
  }
),
  watch(active, (newValue, oldValue) => {
    if (!newValue) {
      active.value = oldValue;
    }
  });
onMounted(() => {
  const name = route.path;
  if (["/homePage", "/news", "/forum", "/my"].includes(name)) {
    active.value = String(route.name);
    tabbarShow.value = true;
  } else {
    tabbarShow.value = false;
  }
});
const pageChange = () => {
  if (active.value === "homePage") {
    router.push({
      name: "homePage",
    });
  }
  if (active.value === "news") {
    router.push({
      name: "news",
    });
  }
  if (active.value === "forum") {
    router.push({
      name: "forum",
    });
  }
  if (active.value === "my") {
    router.push({
      name: "my",
    });
  }
};
const onSelect = (val: { text: string; icon: string }) => {
  if (val.text === "论坛") {
    router.push({
      name: "addForum",
    });
  }
  if (val.text === "话题") {
    router.push({
      name: "",
    });
  }
  if (val.text === "识别") {
    router.push({
      name: "catIdentification",
    });
  }
};
const actions = [
  { text: "论坛", icon: "add-o" },
  { text: "话题", icon: "chat-o" },
  { text: "识别", icon: "aim" },
];
const showPopover = ref(false);
</script>

<style lang="scss">
.van-tabbar-type {
  text-align: center;
  .iconfont {
    font-size: 20px;
  }
  :deep .van-tabbar-item--active .van-tabbar-item__text {
    .iconfont {
      font-size: 20px;
      color: #1989fa;
    }
  }
}
.add-type {
  font-size: 40px !important;
  color: #f3c55e;
}
.forum-popover :deep .van-popover__action-text {
  justify-content: center;
}
</style>
