<template>
  <div>
    <van-nav-bar
      :title="title"
      right-text="保存"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <template v-if="editType === 'nickName'">
      <div>
        <div class="text">我的昵称</div>
        <van-field
          v-model="nickName"
          placeholder="请填写昵称"
          class="name-type"
          :clearable="true"
        />
        <span class="text-num">{{ nickName ? nickName.length : 0 }}/20</span>
      </div>
    </template>
    <template v-else-if="editType === 'information'">
      <div>
        <div class="text">个人简历</div>
        <div>
          <textarea
            v-model="information"
            cols="30"
            rows="10"
            class="inf-type"
            placeholder="你可以填写兴趣爱好，心情愿望，有趣的介绍能让被关注的概率变高噢！"
          ></textarea>
        </div>
        <span class="inf-num"
          >{{ information ? information.length : 0 }}/300</span
        >
      </div>
    </template>
    <template v-else-if="editType === 'school'">
      <div>
        <div class="text">我的学校</div>
        <van-field
          v-model="school"
          placeholder="请填写您的学校"
          class="name-type"
          :clearable="true"
        />
        <span class="text-num">{{ school ? school.length : 0 }}/30</span>
      </div>
    </template>
    <template v-else-if="editType === 'qq'">
      <div>
        <div class="text">我的QQ</div>
        <van-field
          v-model="qq"
          placeholder="请填写您的QQ"
          class="name-type"
          :clearable="true"
        />
        <span class="text-num">{{ qq ? qq.length : 0 }}/11</span>
      </div>
    </template>
    <template v-else-if="editType === 'wx'">
      <div>
        <div class="text">我的微信</div>
        <van-field
          v-model="wx"
          placeholder="请填写您的微信"
          class="name-type"
          :clearable="true"
        />
        <span class="text-num">{{ wx ? wx.length : 0 }}/30</span>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { updateMessageService } from "../../services/user/index";
import { Notify } from "vant";
export default defineComponent({
  props: {},
  setup() {
    const router = useRouter();
    const route = useRoute();
    const userDate = route.params;
    const editType = route.query.editType;

    const nickName = ref("");
    nickName.value = userDate.nickName;

    const information = ref("");
    information.value = userDate.information;

    const school = ref("");
    school.value = userDate.school;

    const qq = ref("");
    qq.value = userDate.qq;

    const wx = ref("");
    wx.value = userDate.wx;

    const titleContent = () => {
      if (editType === "nickName") {
        return "修改昵称";
      }
      if (editType === "qq") {
        return "修改QQ";
      }
      if (editType === "wx") {
        return "修改微信";
      }
      if (editType === "information") {
        return "修改简介";
      }
      if (editType === "school") {
        return "修改学校";
      }
    };
    const title = titleContent();
    const updateName = async () => {
      if (!nickName.value) {
        Notify({ type: "warning", message: "昵称不能为空" });
        return;
      } else if (nickName.value === userDate.nickName) {
        Notify({ type: "warning", message: "新昵称不能与旧昵称相同" });
        return;
      } else if (nickName.value.length > 20) {
        Notify({ type: "warning", message: "昵称字数不能超过20个" });
        return;
      }
      await updateMessageService({
        uId: Number(userDate.uId),
        nickName: nickName.value,
      });
      router.push({
        name: "userMessage",
      });
    };
    const updateInformation = async () => {
      if (information.value === userDate.information) {
        Notify({ type: "warning", message: "新简介不能与旧简介相同" });
        return;
      } else if (nickName.value.length > 20) {
        Notify({ type: "warning", message: "简介字数不能超过300个" });
        return;
      }
      await updateMessageService({
        uId: Number(userDate.uId),
        information: information.value,
      });
      router.push({
        name: "userMessage",
      });
    };
    const updateSchool = async () => {
      if (school.value === userDate.school) {
        Notify({ type: "warning", message: "新学校名称不能与旧学校名称相同" });
        return;
      } else if (school.value.length > 30) {
        Notify({ type: "warning", message: "学校名称字数不能超过30个" });
        return;
      }
      await updateMessageService({
        uId: Number(userDate.uId),
        school: school.value,
      });
      router.push({
        name: "userMessage",
      });
    };
    const updateQQ = async () => {
      if (qq.value === userDate.qq) {
        Notify({ type: "warning", message: "新QQ不能与旧QQ相同" });
        return;
      } else if (qq.value.length > 11) {
        Notify({ type: "warning", message: "QQ的长度不能超过11" });
        return;
      }
      await updateMessageService({
        uId: Number(userDate.uId),
        qq: qq.value,
      });
      router.push({
        name: "userMessage",
      });
    };
    const updateWx = async () => {
      if (wx.value === userDate.wx) {
        Notify({ type: "warning", message: "新微信号不能与旧微信号相同" });
        return;
      } else if (wx.value.length > 30) {
        Notify({ type: "warning", message: "微信号的长度不能超过30" });
        return;
      }
      await updateMessageService({
        uId: Number(userDate.uId),
        wx: wx.value,
      });
      router.push({
        name: "userMessage",
      });
    };
    const onClickLeft = () => history.back();
    const onClickRight = async () => {
      if (editType === "nickName") {
        await updateName();
      }
      if (editType === "information") {
        await updateInformation();
      }
      if (editType === "school") {
        await updateSchool();
      }
      if (editType === "qq") {
        await updateQQ();
      }
      if (editType === "wx") {
        await updateWx();
      }
    };
    return {
      nickName,
      title,
      editType,
      information,
      school,
      qq,
      wx,
      onClickLeft,
      onClickRight,
    };
  },
});
</script>
<style lang="scss" scoped>
.name-type {
  border-bottom: 1px solid #f3f3ef;
}
.text,
.text-num {
  font-size: 14px;
  margin-left: 16px;
  color: #333;
}
.text-num {
  float: right;
  margin: 5px 10px 0 0;
}
.inf-type {
  width: 90%;
  margin: 10px 5%;
  background: #f7f3f3;
  border: none;
}
.inf-num {
  font-size: 14px;
  color: #333;
  float: right;
  margin: 0 5% 0 0;
}
</style>
