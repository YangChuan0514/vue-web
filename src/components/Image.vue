<template>
  <div>
    <span v-for="(item, index) in images" :key="index">
      <van-image
        :src="item"
        :class="
          imagesType === 'comment'
            ? 'image-comment'
            : imagesType === 'headImg'
            ? 'image-head'
            : imagesType === 'forum'
            ? 'image'
            : 'image-forum'
        "
        @click="imgBig(index)"
        :round="imagesType === 'headImg' ? true : false"
      />
    </span>
    <van-image-preview
      v-model:show="show"
      :images="images"
      @change="onChange"
      :startPosition="numImg"
    >
      <template v-slot:index>第{{ numImg + 1 }}页</template>
    </van-image-preview>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent } from "vue";
import { ImagePreview } from "vant";
export default defineComponent({
  props: {
    images: Array,
    imagesType: String,
  },
  setup(props) {
    const VanImagePreview = ImagePreview.Component;
    const numImg = ref(0);
    const show = ref(false);
    const imgBig = (index: number) => {
      numImg.value = index;
      show.value = true;
    };
    const onChange = (newIndex: number) => {
      numImg.value = newIndex;
    };
    const images = props.images;
    const imagesType = props.imagesType;
    return {
      numImg,
      show,
      imgBig,
      onChange,
      VanImagePreview,
      images,
      imagesType,
    };
  },
});
</script>
<style lang="scss" scoped>
.image-forum {
  width: 110px;
  margin: 5px;
  height: 110px;
  position: relative;
  top: 10px;
  :deep .van-image__img {
    border-radius: 5px;
  }
}
.image-comment {
  width: 40px;
  margin: 2px;
  height: 40px;
}
.image-head {
  width: 60px;
  margin: 2px;
  height: 60px;
  border-radius: 50%;
}
.image {
  width: 30%;
  height: 150px;
  margin: 5px 1.5%;
}
</style>
