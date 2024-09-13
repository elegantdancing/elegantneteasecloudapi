<template>
  <div>
    歌手页面
    <div>当前歌手id:{{ route.params.singerId }}</div>
  </div>
</template>
    
<script setup  >
import { reqArtistDetail, reqArtistDesc } from '../axios/singer'
import { ref, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

// 路由
const router = useRouter();
const route = useRoute();
let singer = reactive({
  id: route.params.singerId
})
async function getData() {
  try {
    let { data: a } = await reqArtistDetail(singer.id)
    console.log("歌手信息", a);
  } catch (error) {
    console.log("歌手报错", error);
  }
}
onMounted(() => {
  getData()
});
</script>
    
<style lang="less" scoped></style>