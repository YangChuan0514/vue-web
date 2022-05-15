<template>
  <div>
    <header class="header-type">
      <div>问答专区</div>
      <span class="search-type">
        <van-search
          v-show="searchShow"
          class="search-forum"
          v-model="home_search"
          placeholder="请输入搜索关键词"
          :clearable="false"
          @keypress="
            (e) => {
              if (e.keyCode === 13 && home_search) {
                onFuzzySearch(home_search);
              }
            }
          "
        />
        <i class="iconfont icon-sousuo" @click="searchShow = !searchShow"></i>
      </span>
    </header>
    <main>
      <van-tabs v-model:active="activeName" class="tabs-type">
        <van-tab title="全部" name="recommend">
          <ShowForum :form="'2'" />
        </van-tab>
        <van-tab title="关注" name="attention">
          <ShowForum :form="'2'" />
        </van-tab>
        <van-tab title="精华" name="essence"> </van-tab>
      </van-tabs>
    </main>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import ShowForum from "../forum/show.vue";
const searchShow = ref(false);
const home_search = ref("recommend");
const onFuzzySearch = (val: string) => {
  console.log(val);
};
const router = useRouter();
const activeName = ref("");
</script>
<style lang="scss" scoped>
.header-type {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 20px 0px 20px;
  font-size: 18px;
}
:deep .van-search {
  padding: 0;
  height: 25px;
}
.search-type {
  display: flex;
  align-items: center;
  i {
    margin-left: 20px;
  }
}
main {
  margin: 5px 12px;
  display: block;
}
:deep .van-tabs__line {
  background: #efb229;
}
.tabs-type {
  margin-bottom: 20px;
  width: 100%;
  :deep .van-tabs__wrap {
    display: block;
    width: 100%;
  }
}
</style>
