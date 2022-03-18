<template>
  <van-uploader
    :action="qiniuUrl"
    v-model="ImgList"
    @delete="deleteImg"
    multiple
  ></van-uploader>
</template>
<script lang="ts">
import { ref, watch, defineComponent } from "vue";
export default defineComponent({
  setup(props, context) {
    const qiniuUrl = "http://upload-as0.qiniup.com";
    const ImgList = ref([]);
    const deleteImg = (event: any) => {
      ImgList.value.forEach((item, index) => {
        if (item === event) {
          ImgList.value.splice(index, 1);
        }
      });
    };
    watch(
      () => ImgList.value,
      (newValue, oldValue) => {
        context.emit("ImgListChange", ImgList.value);
      }
    );
    return {
      qiniuUrl,
      ImgList,
      deleteImg,
    };
  },
});
</script>
