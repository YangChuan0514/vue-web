<template>
  <div class="video-play">
    <span v-for="item in videos" :key="item">
      <video
        preload="auto"
        webkit-playsinline="true"
        playsinline="true"
        x-webkit-airplay="allow"
        x5-video-player-type="h5-page"
        x5-video-orientation="portraint"
        style="object-fit: cover"
        class="video-type"
        controls
      >
        <source :src="item" type="video/mp4" />
      </video>
    </span>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    videos: Array,
  },
  setup(props) {
    const videos = props.videos;
    return {
      videos,
    };
  },
});
</script>
<style lang="scss" scoped>
.video-play {
  margin-top: 30px;
  width: 100%;
}
.video-type {
  width: 100%;
}
</style>
