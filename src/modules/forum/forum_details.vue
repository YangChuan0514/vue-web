<template>
  <div class="forum-details">
    <h2>{{ dataDetails.title }}</h2>
    <van-image
      round
      width="30px"
      height="30px"
      fit="cover"
      :src="
        dataDetails.userMessage
          ? dataDetails.userMessage.headImg
          : 'http://yangchuan.club/pageapi_1646276722923.png'
      "
    />
    <span class="nick-name">{{
      dataDetails.userMessage ? dataDetails.userMessage.nickName : "新用户"
    }}</span>
    <div>
      <p>{{ dataDetails.type }}</p>
      <p>{{ dataDetails.content }}</p>
      <template v-if="dataDetails.img && dataDetails.img.length">
        <Images :images="dataDetails.img" :imagesType="'forum'" />
      </template>
      <br />
      <Videos :videos="dataDetails.video" />
    </div>
    <div class="floor-type">
      <div>
        <van-icon
          name="chat-o"
          @click="comment(dataDetails.id)"
          class="icon-type"
        />
        <van-icon
          :name="isTrue(dataDetails.collects) ? 'star' : 'star-o'"
          @click="collect(dataDetails)"
          :class="[
            'icon-type',
            isTrue(dataDetails.collects) ? 'icon-color-collect' : '',
          ]"
        />
        <van-icon
          :name="isTrue(dataDetails.collects) ? 'like' : 'like-o'"
          @click="dianzan(dataDetails)"
          :class="[
            'icon-type',
            isTrue(dataDetails.dianzans) ? 'icon-color-like' : '',
          ]"
        />
        <span class="text-num">{{
          dataDetails.dianzans ? dataDetails.dianzans.length : 0
        }}</span>
      </div>
    </div>
    <van-cell-group inset>
      <van-field
        :id="`commentsRef${dataDetails.id}`"
        v-model="commentsValue[dataDetails.id]"
        placeholder="评论"
        @keypress="
          (e) => {
            if (e.keyCode === 13 && commentsValue[dataDetails.id]) {
              onClickInput(dataDetails);
            }
          }
        "
      />
    </van-cell-group>
    <div class="comments-type" v-if="dataDetails.comments">
      <span v-for="item in dataDetails.comments" :key="item.commentId">
        <div class="comment-item">
          <span class="user-id-comment">
            {{ item.userMessage ? item.userMessage.nickName : "新用户" }}</span
          >
          {{ item.commentContent }}
          <template v-if="item.commentImg.length">
            <Images :images="item.commentImg" :imagesType="'comment'" />
          </template>
        </div>
      </span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Images from "../../components/Image.vue";
import Videos from "../../components/Video.vue";
import { useRoute, useRouter } from "vue-router";
import {
  getForumService,
  deletDZService,
  addDZService,
  addCollectService,
  deleteCollectService,
  addCommentService,
  getForumIdService,
} from "../../services/forum/index";
import { ref, reactive, onMounted } from "vue";
const route = useRoute();
const router = useRouter();
const forumId = route.query.id;
const dataDetails = ref({});
onMounted(async () => {
  const res = await getForumIdService(Number(route.query.id));
  dataDetails.value = res.data[0];
  console.log(dataDetails.value);
});
const isTrue = (val: any) => {
  let bool = false;
  if (Array.isArray(val)) {
    val.forEach((v) => {
      if (v.userId === Number(id)) {
        bool = true;
      }
    });
  }
  return bool;
};
const id = document.cookie.split("=")[1];
const comment = (data: number) => {
  router.push({
    name: "addComment",
    query: {
      id: data,
    },
  });
};
let timerDz = true;
const dianzan = async (val: any) => {
  if (timerDz) {
    timerDz = false;
    const bool = isTrue(val.dianzans);
    if (bool) {
      await deletDZService({
        userId: Number(id),
        dzForumId: val.id,
      });
    } else {
      await addDZService({
        userId: Number(id),
        dzForumId: val.id,
        newTime: Date.now() / 1000,
      });
    }
    const res = await getForumIdService(Number(route.query.id));
    dataDetails.value = res.data[0];
    timerDz = true;
  }
};
let timerC = true;
const collect = async (val: any) => {
  if (timerC) {
    timerC = false;
    const bool = isTrue(val.collects);
    if (bool) {
      await deleteCollectService({
        userId: Number(id),
        collectForumId: val.id,
      });
    } else {
      await addCollectService({
        userId: Number(id),
        collectForumId: val.id,
        newTime: Date.now() / 1000,
      });
    }
    const res = await getForumIdService(Number(route.query.id));
    dataDetails.value = res.data[0];
    timerC = true;
  }
};
const commentsValue = reactive([]);

const onClickInput = async (data: any) => {
  const a = await addCommentService({
    userId: Number(id),
    commentForumId: data.id,
    commentContent: commentsValue[data.id],
    commentImg: [],
    newTime: Date.now() / 1000,
  });
  const res = await getForumIdService(Number(route.query.id));
  dataDetails.value = res.data[0];
  commentsValue[data.id] = "";
};
</script>
<style lang="scss" scoped>
.image-forum {
  width: 30%;
  margin: 3px 1.5%;
  height: 100px;
}
span {
  margin: 0px 5px;
}
.user-id {
  color: red;
  margin: 3px;
}
.user-id-comment {
  color: red;
  margin: 3px;
  font-size: 12px;
}
.forum-content {
  font-size: 14px;
}
.forum-type {
  padding: 10px;
}
.icon-type {
  font-size: 18px;
  margin: 0px 5px;
}
.floor-type {
  float: right;
  margin-top: -14px;
  display: flex;
  justify-content: space-between;
}
.icon-color-like {
  color: #ee0a24;
}
.icon-color-collect {
  color: #faab0c;
}
.van-cell-group--inset {
  margin: 0px;
  .van-cell {
    padding: 5px;
  }
}
.text-num {
  font-size: 14px;
  color: rgba(46, 42, 42, 0.644);
  margin-right: 10px;
  margin-left: -2px;
  position: relative;
  top: -1px;
}
.line {
  height: 10px;
  background: rgb(233, 233, 233);
}
.forum-details {
  margin-bottom: 60px;
}
</style>
