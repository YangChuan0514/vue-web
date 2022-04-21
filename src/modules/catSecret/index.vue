<template>
  <div>
    <header class="header-type">
      <div>宠物秘籍</div>
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
      <div @click="listChange(1)">
        <span class="iconfont icon-zhinengsiwei zhinengsiwei"></span>
        <span>宠酱饲养</span>
      </div>
      <div @click="listChange(2)">
        <span class="iconfont icon-chongwuxunlian chongwuxunlian"></span>
        <span>宠酱训练</span>
      </div>
      <div @click="listChange(3)">
        <span class="iconfont icon-yiliao yiliao"></span>
        <span>宠酱医疗</span>
      </div>
    </main>
    <footer>
      <template v-for="item in dataList" :key="item.id">
        <div class="item-type" @click="deilClick(item.id)">
          <van-image class="image-type" :src="item.image" />
          <div class="item-text">
            <div class="name">{{ item.title }}</div>
            <div>{{ item.content }}</div>
          </div>
        </div>
      </template>
    </footer>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { catCheatDataFindAll, catCheatDataFind } from "../../services/home/index";
const router = useRouter();
const searchShow = ref(false);
const home_search = ref("");
const onFuzzySearch = async (val: string) => {
  const res = await catCheatDataFind({ search: val });
  dataList.value = res?.data;
};
const dataList = ref([]);
onMounted(async () => {
  const res = await catCheatDataFindAll({});
  dataList.value = res?.data;
});

const deilClick = (val: string) => {
  router.push({
    name: "dataDetails",
    query: {
      id: val,
    },
  });
};
const listChange = async (val: string) => {
  const res = await catCheatDataFindAll({ type: val });
  dataList.value = res?.data;
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
  display: flex;
  justify-content: space-around;
  .zhinengsiwei {
    font-size: 30px;
    color: rgb(44, 212, 86);
  }
  .chongwuxunlian {
    font-size: 32px;
    color: rgb(238, 120, 228);
  }
  .yiliao {
    font-size: 30px;
    color: rgb(24, 191, 241);
  }
  div {
    font-size: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.item-type {
  display: flex;
  height: 120px;
  align-items: center;
  margin: 20px 10px 0px 10px;
  border-radius: 10px;
  border: 1px rgb(209, 205, 205) solid;
  .image-type {
    :deep .van-image__img {
      width: 100px;
      height: 100px;
    }
    margin-left: 10px;
  }
  .item-text {
    margin: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    .name {
      font-size: 16px;
      margin-bottom: 10px;
    }
    font-size: 12px;
  }
}
footer{
  margin-bottom: 20px;
}
</style>
