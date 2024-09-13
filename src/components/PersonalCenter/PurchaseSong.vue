<template>
  <div class="PurchaseSong">
    <div class="neirong" v-for="(item, index) in SongPurchased?.allSong" :key="index">
      <!-- 左 图片，歌名，歌手 -->
      <div class="neirong-l">
        <div class="songIndex">{{ index + 1 }}</div>
        <!-- 图片 -->
        <div class="l-imgdiv"  @click="toSong(item?.songId)">
          <img v-lazy="item?.picUrl" alt="" />
        </div>
        <div class="wzi">
          <!-- 歌名 -->
          <div @click="toSong(item?.songId)">{{ item?.name }}</div>
          <!-- 歌手 -->
          <div>
            <span v-for="(item2, index2) in item?.artistName" :key="index2">{{  item2 }}</span>
          </div>
        </div>
      </div>
      <!-- 中 专辑 -->
      <div class="neirong-c" @click="toCollection(item?.albumId)">{{ item?.albumName }}</div>
      <!-- 右 按钮-->
      <div class="neirong-r">
        <!-- 播放 -->
        <div @click="PlaySong(item?.songId)">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofang6"></use>
          </svg>
        </div>
      </div>
    </div>
    <div>
      <button
        class="jzgd"
        v-show="SongPurchased?.allSong.length != SongPurchased.data.count"
        @click="getSongPurchased()"
      >
        加载更多
      </button>
    </div>
  </div>
</template>

<script setup>
import { reqSongPurchased } from "../../axios/songListOrSong";
import useUserStore from "../../pinia/user";
import { ref, onMounted, reactive } from "vue";
import PlaySong from "../../plugins/method/PlaySong.js";
import toCollection from "../../utils/toCollection";
import toSong from "../../utils/toSong";



// 仓库
const userStore = useUserStore();

const SongPurchased = reactive({
  data: {},
  allSong: [],
});

// 获取购买歌曲
async function getSongPurchased() {
  const { data: a } = await reqSongPurchased(30, SongPurchased.allSong.length);
  SongPurchased.data = a.data;
  SongPurchased.allSong.push(...a.data.list);
}
onMounted(() => {
  getSongPurchased();
  console.log(SongPurchased);
});
</script>

<style lang="less" scoped>
.PurchaseSong {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px 20px;
  width: calc(100vw - 240px);
  .neirong {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    &:hover {
      background-color: #9b9b9b;
    }
    .neirong-l {
      display: flex;
      .songIndex {
        font-weight: 600;
        font-size: 15px;
        width: 3em;
        text-align: center;
        line-height: 100px;
      }
      .l-imgdiv {
        width: 100px;
        height: 100px;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
          border-radius: 20px;
        }
      }
      .wzi {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;
        margin-left: 20px;
        div:nth-child(1) {
          width: 400px;
          font-size: 25px;
          font-weight: 600;
          margin-right: 10px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          cursor: pointer;
        }
        div:nth-child(2) {
          width: 390px;
          font-size: 15px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          span {
            margin-right: 10px;
          }
        }
      }
    }
    .neirong-c {
      width: 300px;
      font-size: 25px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
    }
    .neirong-r {
      margin-right: 20px;
      cursor: pointer;
    }
  }
  // 单数
  .dan {
    background-color: rgb(153 153 153 / 47%);
  }
  // 双数
  .shuang {
    background-color: rgba(217, 217, 217, 0.821);
  }
  .jzgd {
    width: 100%;
    text-align: center;
    button {
      border: none;
      background-color: rgb(255, 116, 116);
      width: 200px;
      height: 60px;
      margin-top: 10px;
      color: white;
      cursor: pointer;
      &:hover {
        background-color: rgb(255, 63, 63);
      }
    }
  }
}
</style>
