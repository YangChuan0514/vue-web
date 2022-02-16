<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <svg-icon iconClass="bug"></svg-icon>
  <el-button type="primary" @click="addCount">count is: {{ count }}</el-button>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "./store/index";
import HelloWorld from "./components/HelloWorld.vue";
// console.log('import----', import.meta.env);
export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
  },
  setup() {
    const store = useStore();

    const count: any = computed({
      get() {
        return store.state.count;
      },
      set(value) {
        store.commit("increment", value);
      },
    });

    function addCount() {
      count.value += 1;
    }

    return {
      count,
      addCount,
    };
  },
});
</script>

<style></style>
