<template>
  <div>
    <header class="header-type">
      <div>首页</div>
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
    <van-swipe :loop="true" :show-indicators="false" :autoplay="3000">
      <van-swipe-item
        v-for="image in images"
        :key="image"
        class="van-swpie-type"
      >
        <van-image
          width="90vw"
          height="150"
          fit="fill"
          position="left"
          :src="image"
        />
      </van-swipe-item>
    </van-swipe>
    <main>
      <div class="cat-secret">
        <i class="iconfont icon-shu"></i>
        <span>宠酱秘籍</span>
      </div>
      <div class="cat-cyclopedia">
        <i class="iconfont icon-jiankangbaike"></i>
        <span>宠酱百科</span>
      </div>
      <div class="cat-topic">
        <i class="iconfont icon-huati"></i>
        <span>宠酱话题</span>
      </div>
      <div class="cat-identify" @click="catIdentify">
        <i class="iconfont icon-saomiao"></i>
        <span>宠酱识别</span>
      </div>
    </main>
    <div class="tip-type">
      <div class="title">
        <span style="color: #333333">宠酱</span>
        <span style="color: #efb229">百科</span>
      </div>
      <div>热量高的食物对宠酱好不好？</div>
      <i class="iconfont icon-anniu-jiantouxiangyou_o"></i>
    </div>
    <footer class="home-footer">
      <div class="daily-topic">
        <span> 每日话题 </span>
        <span class="topic-look">查看更多 <van-icon name="arrow" /></span>
      </div>
      <van-swipe
        :loop="true"
        :autoplay="3000"
        class="van-swpie"
        :indicator-color="'#efbe50'"
      >
        <van-swipe-item v-for="n in 3" :key="n" style="color: red">
          {{ n }}11111111111
        </van-swipe-item>
      </van-swipe>
    </footer>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const catIdentify = () => {
  router.push({
    name: "catIdentification",
  });
};
const images = ref([
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT78chIMo3-5iYGEmXEJYjsHZI0Gnx1LrJUzQ&usqp=CAU",
  "https://image.biaobaiju.com/uploads/20190624/13/1561354056-IMlrFWGHLY.jpg",
  "http://p5.itc.cn/q_70/images03/20210416/6758ea1d0fef4698bb48936cb946dc95.png",
  "data:image/jpeg;base64,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",
]);
const searchShow = ref(false);
const home_search = ref("");
const onFuzzySearch = (val: string) => {
  console.log(val);
};
</script>
<style lang="scss" scoped>
:deep .van-search {
  padding: 0;
  height: 25px;
}
:deep .van-image__img {
  border-radius: 10px;
}
.header-type {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 20px;
  font-size: 18px;
}
.van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  height: 150px;
  text-align: center;
}
main {
  margin: 20px 10px;
  display: flex;
  justify-content: space-around;
  font-size: 12px;
  color: #333;
  .iconfont {
    font-size: 35px;
  }
  .icon-jiankangbaike {
    color: #ffcf4c;
  }
  .icon-shu {
    color: #a87dff;
  }
  .icon-huati {
    color: #1082ff;
    font-size: 35px;
  }
  .icon-saomiao {
    color: #3dd240;
  }
  .cat-secret,
  .cat-cyclopedia,
  .cat-topic,
  .cat-identify {
    display: flex;
    flex-direction: column;
    text-align: center;
    height: 65px;
    justify-content: space-around;
  }
}
.tip-type {
  margin: 10px 20px;
  display: flex;
  justify-content: space-between;
  color: #666666;
  align-items: center;
  .iconfont {
    font-size: 22px;
  }
  .title {
    font-size: 18px;
  }
}
.home-footer {
  background: #eeeeee;
  height: calc(100vh - 380px);
  overflow: hidden;
  .daily-topic {
    display: flex;
    justify-content: space-between;
    margin: 20px 0px;
    padding: 10px 20px;
    align-items: center;
    background: #fff;
    .topic-look {
      font-size: 12px;
      color: #666666;
    }
  }
}
.van-swpie {
  height: calc(100vh - 510px);
  margin: 20px;
  background: #fff;
  border-radius: 10px;
}
:deep .van-swipe__indicator--active {
  width: 8px;
  height: 8px;
}
:deep .van-swipe__indicator {
  background: #aaaaaa;
}
.search-type {
  display: flex;
  align-items: center;
  i {
    margin-left: 20px;
  }
}
</style>
