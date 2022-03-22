<template>
  <div>
    <div class="show-forum">
      <div v-if="!dataListDate.dataList.length">
        <van-empty description="当前没有相关论坛" />
      </div>
      <div v-else v-for="data in dataListDate.dataList" :key="data.id">
        <Forum :data="data" class="forum-type" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, defineComponent } from "vue";
import {
  getForumService,
  getCollectForumService,
  getUserForumService,
  getDianzanForum,
  fuzzySearch,
} from "../../services/forum/index";
import { onMounted } from "vue";
import Forum from "../../components/forum.vue";
export default defineComponent({
  props: {
    forumType: String,
    search: String,
  },
  components: {
    Forum,
  },
  setup(props, context) {
    const id = document.cookie.split("=")[1];
    const dataListDate: any = reactive({
      dataList: [],
    });
    onMounted(async () => {
      if (props.forumType === "userIdCt") {
        const res = await getCollectForumService({ userId: Number(id) });
        dataListDate.dataList = res.data;
      } else if (props.forumType === "userId") {
        const res = await getUserForumService({
          l: 50,
          o: 1,
          userId: Number(id),
        });
        dataListDate.dataList = res.data;
      } else if (props.forumType === "userIdDz") {
        const res = await getDianzanForum({ userId: Number(id) });
        dataListDate.dataList = res.data;
      } else if (props.forumType === "search") {
        console.log("111");
        const data = {
          search: props.search,
          o: 1,
          l: 50,
        };
        const res = await fuzzySearch(data);
        dataListDate.dataList = res.data;
      } else {
        const res = await getForumService({ l: 50, o: 1 });
        dataListDate.dataList = res.data;
      }
    });
    return {
      dataListDate,
    };
  },
});
</script>
<style lang="scss" scoped>
.show-forum {
  .forum-type {
    padding: 10px;
    margin: 10px 0;
  }
  margin-bottom: 60px;
}

.line {
  height: 10px;
  background: rgb(233, 233, 233);
}
</style>
