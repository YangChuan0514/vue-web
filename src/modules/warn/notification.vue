<template>
  <div>
    <van-nav-bar title="通告" left-arrow @click-left="onClickLeft" />
    <div class="leave_message">{{ data.content }}</div>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { updateNotificationMessage } from "../../services/user/index";
const route = useRoute();
const data = ref(JSON.parse(route.params.data));
onMounted(async () => {
  await updateNotificationMessage({
    id: data.value.id,
    warn: 1,
  });
});
const onClickLeft = () => {
  window.history.back(-1);
};
</script>
<style lang="scss" scoped>
.leave_message {
  margin: 20px;
}
</style>
