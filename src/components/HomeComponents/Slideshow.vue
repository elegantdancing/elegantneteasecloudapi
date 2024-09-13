<template>
  <div class="text-center">
    <!-- 内容 -->
    <el-carousel
      class="swiper"
      :interval="6000"
      type="card"
      height="300px"
      trigger="click"
    >
      <el-carousel-item
        class="swiper-item"
        v-for="(item, index) in songList"
        :key="index"
      >
        <div
          :style="{
            backgroundImage: `url(${item.pic})`,
            height: '100%',
            width: '100%',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }"
        ></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import useUserStore from "../../pinia/user";
import { getHomeData } from "../../axios/home";
import { useRouter } from "vue-router";

// Pinia仓库
const userStore = useUserStore();
// 路由
const router = useRouter();

// 获取轮播图数据
let songList = ref([]);

onMounted(async () => {
  songList.value = (await getHomeData()).data.data.blocks.find(
    (item) => item.blockCode === "HOMEPAGE_BANNER"
  ).extInfo.banners;
  console.log(songList.value[0].pic);
});
</script>

<style lang="less" scoped>
.text-center {
  width: 1100px;
  margin-top: 10px;
  .swiper {
    .swiper-item {
      display: flex;
      flex-direction: row;
      justify-content: center;
      div {
        width: 300px;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
