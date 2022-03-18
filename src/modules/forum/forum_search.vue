<template>
  <div>
    <van-nav-bar
      title="搜索内容"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <showForum :search="search" :forumType="'search'" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import showForum from "../forum/show.vue";
export default defineComponent({
  components: {
    showForum,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const search = route.query.search;
    const onClickLeft = () => {
      router.push({
        name: "forum",
      });
    };
    return {
      search,
      onClickLeft,
    };
  },
});
</script>
