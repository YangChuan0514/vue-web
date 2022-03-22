<template>
  <div>
    <div class="text">
      <div class="user-header" @click="userDetails">
        <span class="user-id">
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
        </span>
        <span class="time">{{ time(data.newTime) }}</span>
      </div>
      <template v-if="data.img">
        <Images :images="data.img" class="image-black" />
      </template>
      <div @click="onDetails(data)" class="text-content">
        <span>
          {{ data.title }}
        </span>
        <span>{{ data.content }}</span>
      </div>
    </div>
    <div class="floor-type">
      <div class="forum-type">
        #撸猫#
        <span v-if="data.type">#{{ data.type }}#</span>
      </div>
      <div>
        <span class="time">阅读量：{{ data.count }}</span>
        <span class="time">评论{{ data.comments.length }}</span>
        <span class="time">收藏{{ data.collects.length }}</span>
        <span class="time">获赞：{{ data.dianzans.length }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import Images from "./Image.vue";
import { onTime } from "../modules/utils";
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
    const time = onTime;
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
.content {
  display: flex;
}
.forum-type {
  color: #efb229;
  font-size: 14px;
}
.user-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nick-name {
  margin-left: 10px;
  color: #333333;
  font-size: 16px;
}
.image-black {
  min-width: 100%;
  white-space: nowrap;
  height: 140px;
  overflow: auto;
}
.text-content {
  margin-top: 10px;
}
.text {
  flex: 1;
  font-size: 14px;
  color: #3f3f3f;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.floor-type {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
}
.time {
  margin-left: 10px;
  font-size: 12px;
  color: #b2b2b2;
}
.head-img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
.user-id {
  display: flex;
  align-items: center;
}
</style>
