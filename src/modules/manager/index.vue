<template>
  <div>
    <van-nav-bar title="管理员页面" left-arrow @click-left="onClickLeft" />
    <div class="manager-main">
      <van-sidebar v-model="active">
        <van-sidebar-item title="权限申请" :badge="complaintNum" />
        <van-sidebar-item title="用户投诉" :badge="complaintNum" />
      </van-sidebar>
      <div class="content">
        <template v-for="item in data" :key="item.id">
          <div class="complain" @click="complainShow(item.id)">
            <div class="img-name">
              <van-image
                round
                width="30px"
                height="30px"
                fit="cover"
                :src="item.userMessage.headImg"
              />
              <span class="nick-name">{{ item.userMessage.nickName }}</span>
              <span>投诉帖子：</span>
            </div>
            <div class="forum-title" v-if="item.forum">{{ item.forum.title }}</div>
            <div class="forum-title">
              投诉类型：
              <template v-for="key in String(item.type).split(',')" :key="key">
                {{ typeShow(key) }}
              </template>
            </div>
            <div class="forum-title">
              投诉理由：
              {{ item.content }}
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup>
import { complaintMessageFindAll } from "../../services/manager";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const active = ref(0);
const router = useRouter();
const onClickLeft = () => {
  window.history.back(-1);
};
const typeShow = (val) => {
  switch (val) {
    case "1":
      return "色情低俗,";
    case "2":
      return "广告骚扰,";
    case "3":
      return "虚假欺骗,";
    case "4":
      return "侵权,";
    case "5":
      return "违禁内容,";
    case "6":
      return "其他,";
  }
};
const data = ref({});
const complaintNum = ref("0");
onMounted(async () => {
  const res = await complaintMessageFindAll();
  data.value = res.data;
  complaintNum.value = res.data.filter((item) => !item.warn).length;
});
const complainShow = (val) => {
  router.push({
    name: "managerComplaint",
    query: {
      id: val,
    },
  });
};
</script>
<style lang="scss" scoped>
:deep .van-icon-arrow-left:before {
  color: #333;
}
.manager-main {
  position: relative;
  width: 100vw;
  :deep .van-sidebar {
    width: 80px;
  }
  .content {
    margin-left: 90px;
    position: absolute;
    top: 0px;
    width: calc(100vw - 100px);
    word-break: break-all;
  }
}
.img-name {
  display: flex;
  line-height: 30px;
  .nick-name {
    margin-left: 5px;
  }
}
.forum-title {
  margin-left: 35px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.complain {
  margin: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f4f5f5;
}
</style>
