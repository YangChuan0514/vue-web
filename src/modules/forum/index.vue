<template>
  <div class="header">
    <div class="search-type">
      <div>喵星球</div>
      <van-search
        v-show="searchShow"
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
      <i class="iconfont icon-sousuo" @click="searchShow = !searchShow"></i>
    </div>
    <div>
      <van-tabs v-model:active="activeName">
        <van-tab title="推荐" name="recommend">
          <ShowForum class="index-xia" />
        </van-tab>
        <van-tab title="关注" name="attention">
          <ShowForum class="index-xia" />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import ShowForum from "./show.vue";
import { fuzzySearch } from "../../services/forum";
const router = useRouter();
const activeName = ref("recommend");
const searchShow = ref(false);
const forum_search = ref("");
const images = reactive([
  "http://yangchuan.club/pageapi_1646290348470.png",
  "http://yangchuan.club/pageapi_1646290349036.png",
  "http://yangchuan.club/pageapi_1646290349602.png",
]);
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
:deep .van-tabs__wrap {
  width: 30vw;
}
.header {
  width: 100%;
  margin-bottom: 60px;
  img {
    width: 100%;
    height: 200px;
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
    padding: 0px;
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
.search-type {
  margin: 20px 14px 10px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
:deep .van-tabs__line {
  background: #efb229;
}
:deep .van-tabs__line {
  width: 15px;
}
</style>
