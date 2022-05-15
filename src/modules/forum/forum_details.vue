<template>
  <div class="forum-details">
    <van-nav-bar
      :title="form != 2 ? '帖子详情' : '问题详情'"
      left-arrow
      @click-left="onClickLeft"
    />
    <h2>{{ dataDetails.title }}</h2>
    <div class="user-info">
      <div class="img-name">
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
      </div>
      <div>
        <span class="tou-su" v-if="showTS" @click="touClick">举报</span>
        <span
          class="tou-su"
          v-if="showTS && (dataDetails.userId == id || type == 2)"
          @click="deleteClick"
          >删除</span
        >
        <van-icon name="ellipsis" @click="showTS = !showTS" />
      </div>
    </div>
    <div>
      <p>{{ dataDetails.content }}</p>
      <p class="forum-type" v-if="form != 2">
        <template v-if="dataDetails.type">
          <template
            v-for="(item, index) in dataDetails.type.split(',')"
            :key="index"
          >
            <span> #{{ typeShow(item) }}#</span>
          </template>
        </template>
      </p>
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
          v-if="form != 2"
          :name="isTrue(dataDetails.collects) ? 'star' : 'star-o'"
          @click="collect(dataDetails)"
          :class="[
            'icon-type',
            isTrue(dataDetails.collects) ? 'icon-color-collect' : '',
          ]"
        />
        <van-icon
          v-if="form != 2"
          :name="isTrue(dataDetails.dianzans) ? 'like' : 'like-o'"
          @click="dianzan(dataDetails)"
          :class="[
            'icon-type',
            isTrue(dataDetails.dianzans) ? 'icon-color-like' : '',
          ]"
        />
        <span class="text-num" v-if="form != 2">{{
          dataDetails.dianzans ? dataDetails.dianzans.length : 0
        }}</span>
      </div>
    </div>
    <van-cell-group inset class="comment-input">
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
    <template v-if="dataDetails.comments">
      <template v-for="item in dataDetails.comments" :key="item.commentId">
        <div class="user-id-comment">
          <span class="name">
            <template v-if="item.userMessage">
              <van-image
                round
                width="20px"
                height="20px"
                fit="cover"
                :src="item.userMessage.headImg"
              />
            </template>
            {{ item.userMessage ? item.userMessage.nickName : "新用户" }}:
          </span>
          <span class="comment-content">{{ item.commentContent }}</span>
          <span class="reply" @click="replyClick(item)">回复</span>
        </div>
        <template v-if="item.commentImg.length">
          <Images :images="item.commentImg" :imagesType="'comment'" />
        </template>
        <div v-if="item.commentReplies.length">
          <template v-for="reply in item.commentReplies" :key="reply.id">
            <div class="reply-type">
              <span class="nick-name">{{ reply.userIdMessage.nickName }}</span>
              <span>回复</span>
              <span class="nick-name">{{
                reply.cruserIdMessage.nickName
              }}</span>
              <span class="reply" @click="replyClick(reply)"
                ><van-icon name="chat-o"
              /></span>
            </div>
            <div class="comment-reply">
              {{ reply.content }}
            </div>
          </template>
        </div>
      </template>
    </template>
  </div>
</template>
<script lang="ts" setup>
import Images from "../../components/Image.vue";
import Videos from "../../components/Video.vue";
import { useRoute, useRouter } from "vue-router";
import {
  deleteForum,
  deletDZService,
  addDZService,
  addCollectService,
  deleteCollectService,
  addCommentService,
  getForumIdService,
} from "../../services/forum/index";
import { addNotificationData } from "../../services/user/index";
import { ref, reactive, onMounted } from "vue";
import { Notify, Toast } from "vant";
const route = useRoute();
const router = useRouter();
const forumId = route.query.id;
const dataDetails = ref({});
const userId = ref("");
const type = localStorage.getItem("type");
onMounted(async () => {
  const res = await getForumIdService(Number(route.query.id));
  dataDetails.value = res.data[0];
});
const showTS = ref(false);
const form = route.query.form;
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
const replyClick = (val) => {
  router.push({
    name: "addComment",
    params: {
      ...val,
      type: "commentReply",
    },
  });
  console.log(val);
};
const touClick = () => {
  router.push({
    name: "complaint",
    query: {
      id: dataDetails.value.id,
      userId: dataDetails.value.userId,
    },
  });
};
const typeShow = (val: string) => {
  switch (val) {
    case "1":
      return "日常";
    case "2":
      return "撸猫";
    case "3":
      return "生活";
    case "4":
      return "训练";
    case "5":
      return "医疗";
    case "6":
      return "饲养";
  }
};
const deleteClick = async () => {
  if (dataDetails.value.userId == id) {
    await deleteForum({ id: dataDetails.value.id });
    Toast.success("删除成功！");
    window.history.back(-1);
  } else {
    await addNotificationData({
      userId: dataDetails.value.userId,
      content: "您的帖子违规被删除",
      newTime: Date.now() / 1000,
    });
    await deleteForum({ id: dataDetails.value.id });
    Toast.success("删除成功！");
    window.history.back(-1);
  }
};
const onClickLeft = () => {
  window.history.back(-1);
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
  width: 94vw;
  margin: 8px 0px;
  display: flex;
  position: relative;
  align-items: start;
  .name {
    margin: 0px 3px;
    font-size: 14px;
    display: flex;
    align-items: center;
    .van-image {
      margin-right: 4px;
    }
  }
  .comment-content {
    margin: 0px 10px;
    font-size: 14px;
    word-wrap: break-word;
    width: 60%;
  }
  .reply {
    position: absolute;
    right: 0px;
    font-size: 14px;
    color: #0ca3fa;
  }
}
.forum-content {
  font-size: 14px;
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
  margin: 10px 15px;
}
.comment-input {
  margin: 0px;
  width: 100%;
}
.user-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .img-name {
    display: flex;
    align-items: center;
  }
}
.reply-type {
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  align-items: center;
  margin-left: 40px;
  position: relative;
  .reply {
    position: absolute;
    right: 0px;
    font-size: 14px;
    color: #0ca3fa;
  }
}
.comment-reply {
  margin-left: 45px;
  word-wrap: break-word;
}
.tou-su {
  margin-right: 10px;
  color: red;
}
.forum-type {
  color: #efb229;
  font-size: 14px;
}
:deep .van-icon-arrow-left:before{
  color: #333;
}
</style>
