<template>
  <van-nav-bar title="详情" left-arrow @click-left="onClickLeft" />
  <div>
    <header>
      <van-image class="image-type" :src="detailsData.image" />
      <div class="text">
        <div class="title">{{ detailsData.title }}</div>
        <div class="content">"{{ detailsData.content }}"</div>
      </div>
    </header>
    <footer>
      <template
        v-for="(item, index) in onDataChange(detailsData.data)"
        :key="index"
      >
        <div v-if="item && item.indexOf('http') !== -1">
          <van-image class="image-type" :src="item.replace('&nbsp;', '')" />
        </div>
        <div v-else class="data-content">
          {{ item }}
        </div>
      </template>
    </footer>
  </div>
</template>
<script lang="ts" setup>
import { catCheatDataFindAll } from "../../services/home/index";
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const detailsData = ref({});
onMounted(async () => {
  const res = await catCheatDataFindAll({ id: route.query.id });
  detailsData.value = res?.data[0];
});

const onClickLeft = () => {
  router.go(-1);
};
const onDataChange = (val: string) => {
  let dataList = val?.split("$$$$");
  return dataList;
};
</script>
<style lang="scss" scoped>
:deep .van-icon-arrow-left:before {
  content: "\e668";
  color: #333;
}
header {
  width: 90%;
  margin: 0px auto;
  position: relative;
  .image-type {
    width: 100%;
    height: 250px;
  }
  .text {
    margin-top: -100px;
    position: relative;
    z-index: 1;
    background: #fff;
    font-size: 14px;
    .title {
      text-align: center;
      font-weight: bold;
      font-size: 16px;
      padding: 10px 0px;
    }
    .content {
      padding: 0px 6px;
      color: #666;
    }
  }
}
footer {
  width: 90%;
  margin: 0px auto;
  font-size: 14px;
  .image-type {
    width: 100%;
  }
  .data-content {
    text-indent: 1em;
    margin: 10px;
  }
}
</style>
