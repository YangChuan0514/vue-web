<template>
  <van-nav-bar title="详情" left-arrow @click-left="onClickLeft" />
  <div>
    <header>
      <div v-if="detailsData.baseInfo">
        {{ baseInfoHead(detailsData.baseInfo) }} : {{ detailsData.name }}
      </div>
      <div class="baseInfo" v-if="detailsData.baseInfo">
        <div class="info">
          <template
            v-for="(item, index) in baseInfoContent(detailsData.baseInfo)"
            :key="index"
          >
            <div class="base-info">{{ item }}</div>
          </template>
        </div>
        <van-image class="image-type" :src="detailsData.image" />
      </div>
    </header>
    <footer>
      <template v-if="detailsData.data">
        <div>
          <template
            v-for="(item, index) in onDataChange(detailsData.data)"
            :key="index"
          >
            <div class="title">
              {{ index + 1 + "、" }} {{ onDataChangeZero(item) }}
            </div>
            <template v-for="(data, num) in onDataChangeOne(item)" :key="num">
              <div v-if="data && !['undefined', '(', ')', ') '].includes(data)">
                <div v-if="data && data.indexOf('http') !== -1">
                  <van-image
                    class="image-type"
                    :src="data.replace('&nbsp;', '')"
                  />
                </div>
                <div v-else class="data-content">
                  {{ data }}
                </div>
              </div>
            </template>
          </template>
        </div>
      </template>
    </footer>
  </div>
</template>
<script lang="ts" setup>
import { catDataFindAll } from "../../services/home/index";
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const detailsData = ref({});
onMounted(async () => {
  const res = await catDataFindAll({ id: route.query.id });
  detailsData.value = res?.data[0];
});

const onClickLeft = () => {
  router.go(-1);
};
const baseInfoHead = (val: string) => {
  return val?.split("$$")[0];
};
const baseInfoContent = (val: string) => {
  return val?.split("$$")[1]?.split("&&");
};
const onDataChange = (val: string) => {
  if (val) {
    const listArr = val.split("####");
    listArr.splice(1, 0, listArr[listArr.length - 1]);
    listArr.pop();
    return listArr;
  }
};
const onDataChangeZero = (val: string) => {
  if (val) {
    return val.split("&&")[0];
  }
};
const onDataChangeOne = (val: string) => {
  if (val) {
    return val.split("&&")[1].split("$$$$");
  }
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
}
.baseInfo {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0px;
  .info {
    font-size: 14px;
  }
  :deep .van-image__img {
    width: 100px;
    height: 100px;
  }
}
footer {
  width: 90%;
  margin: 20px auto;
  font-size: 14px;
  .title {
    font-weight: bold;
    margin: 10px 0px;
  }
}
</style>
