<template>
  <div class="complaint-main">
    <van-nav-bar title="举报" left-arrow @click-left="onClickLeft" />
    <div class="header">
      <span>请选择举报理由</span>
      <van-checkbox-group v-model="checked">
        <template v-for="item in checkedList" :key="item.value">
          <van-checkbox :name="item.value" shape="square">{{ item.label }}</van-checkbox>
        </template>
      </van-checkbox-group>
    </div>
    <div class="content">
      <span>请输入您的详细举报理由，方便更好的处理</span>
      <van-cell-group inset>
        <van-field
          v-model="content"
          type="textarea"
          placeholder="请输入详细举报理由"
        />
      </van-cell-group>
    </div>
    <van-button type="primary" class="btn" @click="submit">提交</van-button>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
import { addComplaintData } from "../../services/forum/index";
import { Notify, Toast } from "vant";
const route = useRoute();
const forumId = route.query.id;
const forumUserId = route.query.userId;
const checked = ref([]);
const checkedList = [
  { label: "色情低俗", value: "1" },
  { label: "广告骚扰", value: "2" },
  { label: "虚假欺骗", value: "3" },
  { label: "侵权", value: "4" },
  { label: "违禁内容", value: "5" },
  { label: "其他", value: "6" },
];
const content = ref("");
const onClickLeft = () => {
  window.history.back(-1);
};
const submit = async () => {
  if (!checked.value.length && !content.value) {
    Notify({
      type: "warning",
      message: "举报提交必须选择一个举报理由或者填写举报理由！",
    });
    return;
  }
  const res = await addComplaintData({
    userId: document.cookie.split("=")[1],
    userCLId: forumUserId,
    forumId: forumId,
    content: content.value,
    type: checked.value.join(","),
    newTime: Date.now() / 1000,
  });
  if (res.status === 200) {
    Toast.success("举报成功！");
    window.history.back(-1);
  } else {
    Toast.fail("举报失败，请重试！");
  }
};
</script>
<style lang="scss" scoped>
.complaint-main {
  margin: 10px 20px;
  .header {
    margin-top: 20px;
    border: 1px solid #f4f5f5;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 20px;
    font-size: 14px;
    :deep .van-checkbox-group {
      display: flex;
      flex-wrap: wrap;
      margin-right: 10px;
      .van-checkbox {
        min-width: 100px;
        margin: 10px 0px;
        .van-checkbox__icon {
          font-size: 14px;
        }
      }
    }
  }
  .content {
    border: 1px solid #f4f5f5;
    border-radius: 4px;
    padding: 10px;
    font-size: 14px;
  }
  .btn {
    width: 200px;
    margin: 40px auto 0px auto;
    display: block;
  }
}
</style>
