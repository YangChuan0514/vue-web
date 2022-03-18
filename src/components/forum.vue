<template>
  <div>
    <div @click="onDetails(data)">
      <div class="title">
        {{ data.title }}
      </div>
      <div class="content">
        <div class="text">
          <div class="user-id" @click="userDetails">
            <template v-if="data.userMessage && data.userMessage.headImg">
              <img :src="data.userMessage.headImg" class="head-img" />
            </template>
            <template v-else>
              <img
                src="http://yangchuan.club/pageapi_1646276722923.png"
                class="head-img"
              />
            </template>
            <span class="nick-name">{{
              data.userMessage ? data.userMessage.nickName : "新用户"
            }}</span>
          </div>
          <div class="forum-content">
            <span v-if="data.type" class="forum-type">#{{ data.type }}#</span>
            <span>{{ data.content }}</span>
          </div>
        </div>
        <template v-if="data.img">
          <Images
          :images="data.img.length > 2 ? [data.img[0], data.img[1]] : data.img"
          class="image-black"
        />
        </template>
      </div>
    </div>
    <div class="floor-type">
      <div>
        <span class="time">获赞：{{ data.dianzans.length }}</span>
        <span class="time">阅读量：{{ data.count }}</span>
      </div>
      <span class="time">{{ time(data.newTime) }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import Images from "./Image.vue";
export default defineComponent({
  props: {
    data: Object,
  },
  components: {
    Images,
  },
  setup(props, context) {
    const router = useRouter();
    const data = props.data;
    const onDetails = (data: any) => {
      router.push({
        name: "forumDetails",
        query: {
          id: data.id,
        },
      });
    };
    const userDetails = (data: any) => {
      router.push({
        name: "userDetails",
      });
    };
    const id = document.cookie.split("=")[1];
    const time = (val: number) => {
      return dayjs(val * 1000).format("YYYY-MM-DD HH:mm:ss");
    };
    return {
      data,
      userDetails,
      onDetails,
      time,
    };
  },
});
</script>
<style lang="scss" scoped>
.title {
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.content {
  display: flex;
}
.nick-name {
  position: relative;
  top: -7px;
  margin-left: 4px;
  color: rgba(46, 42, 42, 0.644);
  font-size: 14px;
}
.image-black {
  width: 140px;
  text-align: center;
}
.text {
  flex: 1;
  font-size: 14px;
  color: rgba(46, 42, 42, 0.644);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.floor-type {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
}
.time {
  margin-right: 5px;
  font-size: 12px;
  color: rgba(46, 42, 42, 0.644);
}
.head-img {
  width: 25px;
  height: 25px;
  border-radius: 50%;
}
</style>
