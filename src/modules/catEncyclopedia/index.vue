<template>
  <div>
    <header class="header-type">
      <div>宠物百科</div>
      <span class="search-type">
        <van-search
          v-show="searchShow"
          class="search-forum"
          v-model="home_search"
          placeholder="请输入搜索关键词"
          :clearable="false"
          @keypress="
            (e) => {
              if (e.keyCode === 13) {
                onFuzzySearch(home_search);
              }
            }
          "
        />
        <i class="iconfont icon-sousuo" @click="searchShow = !searchShow"></i>
      </span>
    </header>
    <main>
      <template v-for="item in dataList" :key="item.id">
        <div class="item-type" @click="deilClick(item.id)">
          <van-image class="image-type" :src="item.image" />
          <div>{{ item.name }}</div>
        </div>
      </template>
    </main>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { catDataFindAll, catDataFind } from "../../services/home/index";
const searchShow = ref(false);
const home_search = ref("");
const onFuzzySearch = async (val: string) => {
  const res = await catDataFind({ search: val });
  dataList.value = res.data;
};
const router = useRouter();
const dataList = ref([]);
onMounted(async () => {
  const res = await catDataFindAll({});
  dataList.value = res.data;
});
const deilClick = (val: string) => {
  router.push({
    name: "catDetails",
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
  margin: 20px 20px;
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
  margin: 12px;
  display: flex;
  flex-wrap: wrap;
}
.item-type {
  display: flex;
  margin: 6px;
  border-radius: 10px;
  border: 1px rgb(209, 205, 205) solid;
  :deep .van-image__img {
    width: 100px;
    height: 100px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  div {
    width: 100%;
    text-align: center;
  }
}
</style>
