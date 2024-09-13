<template>
  <div class="CloudDisk">
    <!-- 云盘一个用云盘数据的内容播放 -->
    <div
      v-for="(item, index) in UserCloud?.allSong"
      :key="index"
      class="neirong"
      :class="index % 2 == 0 ? 'dan' : 'shuang'"
    >
      <!-- 左 图片，歌名，歌手 -->
      <div class="neirong-l">
        <div class="songIndex">{{ index + 1 }}</div>
        <!-- 图片 -->
        <div class="l-imgdiv">
          <img v-lazy="item?.simpleSong?.al?.picUrl" alt="" />
        </div>
        <div class="wzi">
          <!-- 歌名 -->
          <div>{{ item?.songName }}</div>
          <!-- 歌手 -->
          <div>
            <span
              v-for="(item2, index2) in item?.simpleSong?.ar"
              :key="index2"
              >{{ item2.name }}</span
            >
          </div>
        </div>
      </div>
      <!-- 中 专辑 -->
      <div class="neirong-c">{{ item?.simpleSong?.al?.name }}</div>
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
    <!-- 加载更多 -->
    <div class="jzgd">
      <button @click="getUserCloud()">加载更多</button>
    </div>
  </div>
</template>

<script setup>
import { reqUserCloud } from "../../axios/songListOrSong";
import { reqCloud } from "../../axios/Other";
import useUserStore from "../../pinia/user";
import { ref, onMounted, reactive } from "vue";
import PlaySong from "../../plugins/method/PlaySong.js";

// 仓库
const userStore = useUserStore();

const UserCloud = reactive({
  // 获取到的云盘歌曲基本数据
  allSong: [],
  // 获取到的云盘歌曲id
  allSongId: [],
  // 获取到的云盘歌曲完整数据
  allSongData: [],
});

// 获取云盘数据
async function getUserCloud() {
  // 云盘歌曲基本信息
  const { data: a } = await reqCloud(200, UserCloud.allSong.length);
  console.log(a);
  // 云盘歌曲id
  let CloudSongId = a.data.map((item) => item.songId);
  // 云盘歌曲详细信息
  const { data: b } = await reqUserCloud(CloudSongId);

  UserCloud.allSong = [...UserCloud.allSong, ...a.data];
  UserCloud.allSongId = [...UserCloud.allSongId, ...CloudSongId];
  UserCloud.allSongData = [...UserCloud.allSongData, ...b.data];
  console.log(UserCloud);
}

onMounted(() => {
  getUserCloud();
});
</script>

<style lang="less" scoped>
.CloudDisk {
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
