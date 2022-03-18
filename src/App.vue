<template>
  <!-- <div id="app"></div> -->
  <van-tabbar v-model="active" @change="pageChange" v-show="tabbarShow">
    <!-- <van-tabbar-item name="home" icon="home-o">首页</van-tabbar-item> -->
    <van-tabbar-item name="forum" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item name="community" icon="friends-o">社区</van-tabbar-item>
    <van-tabbar-item name="my" icon="user-circle-o">我的</van-tabbar-item>
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
    if (["/community", "/forum", "/my"].includes(name)) {
      active.value = String(route.name);
      tabbarShow.value = true;
    } else {
      tabbarShow.value = false;
    }
  }
);
onMounted(() => {
  const name = route.path;
  if (["/community", "/forum", "/my"].includes(name)) {
    active.value = String(route.name);
    tabbarShow.value = true;
  } else {
    tabbarShow.value = false;
  }
});
const pageChange = () => {
  if (active.value === "community") {
    router.push({
      name: "community",
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
</script>

<style lang="scss">
.forum-popover {
  position: fixed !important;
  left: calc(100% - 105px) !important;
  top: calc(100% - 280px) !important;
  width: 100px;
  .van-popover__action {
    width: 80px;
    padding: 0px 0px;
    margin: auto;
  }
}
</style>
