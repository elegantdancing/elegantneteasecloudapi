<template>
  <div class="rmgedanfeli">
    <div class="title">歌手列表</div>
    <div class="big">
      <div class="artists" v-if="searchData.SongData.artists">
        <div class="artist" v-for="artist in searchData.SongData.artists" :key="artist.id" @click="goArtist(artist.id)">
          <img v-lazy="artist.img1v1Url" alt />
          <a>{{ artist.name }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
const router = useRouter()
const props = defineProps({
  searchData: Object
});
function goArtist(singerId) {
  router.push({
    name: 'Singer',
    params: { singerId }
  })
}
console.log(props.searchData);
</script>

<style lang="less" scoped>
.rmgedanfeli {
  width: 1200px;

  .title {
    margin: 10px 50px;
    font-size: 23px;
    padding-bottom: 10px;
    border-bottom: 3px solid #d63434;
  }

  .big {
    display: flex;
    flex-direction: column;
    align-items: center;

    .artists {
      display: flex;
      flex-wrap: wrap;
      width: 1190px;
      margin-top: 25px;
      margin-left: 25px;
      margin-bottom: 20px;

      .artist {
        position: relative;
        width: 165px;
        height: 165px;
        margin: 0px 30px 30px 30px;
        box-shadow: 2px 2px 8px rgba(109, 109, 109, 0.795);
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-start;
      }

      a {
        // 自适应宽度
        width: fit-content;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
        margin-top: 2px;

        &:hover {
          border-bottom: 1px solid black;
        }
      }

      img {
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }
  }
}
</style>