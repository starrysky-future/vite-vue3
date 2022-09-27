<template>
  <div>storeNum:{{ homeStore.num }}</div>
  <div>storeDouble:{{ homeStore.doubleNum }}</div>
  <el-button type="primary" @click="add">添加</el-button>
  <el-button type="primary" @click="reset">重置</el-button>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from "vue";
import { useHomeStore } from "@/store/homeStore";
export default defineComponent({
  name: "home",
  setup() {
    const homeStore = useHomeStore();
    const data = reactive({});

    const add = () => {
      homeStore.num++;
    };
    const reset = () => {
      homeStore.$reset();
    };
    return {
      ...toRefs(data),
      homeStore,
      add,
      reset,
    };
  },
});
</script>

<style lang="scss" scoped></style>
