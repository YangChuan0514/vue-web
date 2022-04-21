<template>
  <div>
    <header class="header-type">
      <div>专家问答</div>
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
        <van-tab title="全部" name="recommend"> </van-tab>
        <van-tab title="精华" name="attention"> </van-tab>
      </van-tabs>
      <template v-for="item in dataList" :key="item.id">
        <div class="item-type" @click="deilClick(item.id)">
          <div>{{ item.name }}</div>
          <div class="answer-num">
            <van-icon name="chat-o" class="chat-o" />{{ item.answerNum }}
          </div>
        </div>
      </template>
    </main>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const searchShow = ref(false);
const home_search = ref("recommend");
const onFuzzySearch = (val: string) => {
  console.log(val);
};
const router = useRouter();
const activeName = ref("");
const dataList = ref([
  {
    id: "1",
    name: "苏格兰折耳猫",
    answerNum: "1",
  },
  {
    id: "2",
    name: "苏格兰折耳猫",
    answerNum: "1",
  },
  {
    id: "3",
    name: "苏格兰折耳猫",
    answerNum: "1",
  },
  {
    id: "4",
    name: "苏格兰折耳猫",
    answerNum: "1",
  },
]);
const deilClick = (val: string) => {
  router.push({
    name: "",
    query: {
      id: val,
    },
  });
};
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
}
.item-type {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px rgb(209, 205, 205) solid;
  font-size: 14px;
  .answer-num {
    width: 50px;
    .chat-o {
      margin-right: 4px;
    }
  }
}
:deep .van-tabs__wrap {
  width: 30vw;
}
:deep .van-tabs__line {
  background: #efb229;
}
:deep .van-tabs__line {
  width: 15px;
}
.tabs-type {
  margin-bottom: 20px;
}
</style>
