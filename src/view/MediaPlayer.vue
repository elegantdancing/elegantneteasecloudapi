<template>
  <div class="MediaPlayer">
    <div
      class="MediaPlayer-neirong"
      :style="`background-image: url(${MediaPlayer?.songData?.al?.picUrl});`"
    >
      <div class="neirong-data">
        <!--返回 -->
        <div class="title">
          <!-- 左边 -->
          <div>
            <svg class="icon" aria-hidden="true" @click="ReturnPage">
              <use xlink:href="#icon-tuichu1"></use>
            </svg>
          </div>
          <!-- 中间 -->
          <div></div>
          <!-- 右边 -->
          <div></div>
        </div>
        <!-- 图片 歌词 -->
        <div class="neirong-data-shang">
          <!-- 图片 -->
          <div class="div-img div-img-yy">
            <img
              class="imga"
              :class="{ xuanzhuan: !counterStore.PdSong }"
              :src="MediaPlayer?.songData?.al?.picUrl"
              alt=""
            />
          </div>
          <!-- 歌词 -->
          <div class="div-text">
            <span
              class="div-text-geci"
              :class="{
                'lyric-activate':
                  MediaPlayer.SongNewTime >
                    MediaPlayer.lyricYouhua.firstArrayMiao[index] &&
                  MediaPlayer.SongNewTime <
                    MediaPlayer.lyricYouhua.firstArrayMiao[index + 1],
              }"
              v-for="(item, index) in MediaPlayer.lyricYouhua.secondArray"
              :key="index"
              >{{ item }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="neirong-data-button">
      <!-- 左 -->
      <div class="btn-div-l"></div>
      <!-- 中 -->
      <div class="btn-div-c">
        <!-- 上一首 -->
        <div @click="emitter.emit('playerChangeSong', -1)">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shangyishou"></use>
          </svg>
        </div>
        <!-- 播放 -->
        <div @click="bofang()">
          <!-- icon-bofang icon-zanting1 -->
          <svg class="icon" aria-hidden="true">
            <use
              :xlink:href="
                counterStore.PdSong ? '#icon-bofang1' : '#icon-zanting2'
              "
            ></use>
          </svg>
        </div>
        <!-- 下一首 -->
        <div @click="emitter.emit('playerChangeSong', 1)">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiayishou2"></use>
          </svg>
        </div>
      </div>
      <!-- 右 -->
      <div class="btn-div-r"></div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, watch } from "vue";
import useCounterStore from "../pinia/counter";
import { useRouter, useRoute } from "vue-router";
import { reqSongDetail, reqLyric } from "../axios/songListOrSong";
import emitter from "../plugins/Bus";
import ChangeSong from "../utils/Lyric";

// 路由
const router = useRouter();
// Pinia仓库
const counterStore = useCounterStore();

// Pinia仓库

// 全部数据
const MediaPlayer = reactive({
  // 歌曲数据
  songData: {},
  // 歌词数据
  lyricData: {},
  // 歌词优化后数据
  lyricYouhua: {},
  // 当前播放时间
  SongNewTime: null,
});

//返回上一个页面
function ReturnPage() {
  router.back();
  emitter.emit("showShengjiang", true);
}

// 获取歌曲数据
async function getSongData() {
  const { data: a } = await reqSongDetail(counterStore?.lastPlayerSongId);
  MediaPlayer.songData = a.songs[0];
}
// 获取歌词
async function getLyric() {
  const { data: a } = await reqLyric(counterStore?.lastPlayerSongId);
  MediaPlayer.lyricData = a;
  MediaPlayer.lyricYouhua = ChangeSong(a?.lrc?.lyric);
}

// 播放或者暂停音乐
function bofang() {
  emitter.emit("BofangOrZantingSong");
}

// 第一次进入页面或者歌曲id更新
function upData() {
  // 获取歌曲数据
  getSongData();
  // 获取歌词
  getLyric();
  //   隐藏
  emitter.emit("showShengjiang", false);
  console.log(MediaPlayer);
}

emitter.on("SongNewTime", (e) => {
  MediaPlayer.SongNewTime = e;
  // 获取 container 和 child 的位置信息
  const Father = document.querySelector(".div-text");
  const Son = document.querySelector(".lyric-activate"); //这个是上一个歌词  目前激活的歌词是这个歌词的下个
  if (Father && Son) {
    Father.scrollTop = Son.offsetTop - Father.offsetTop - 30;
  }
});

watch(
  () => counterStore?.lastPlayerSongId,
  () => {
    upData();
  }
);

onMounted(() => {
  upData();
});
</script>

<style lang="less" scoped>
@keyframes xuanzhuan {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.xuanzhuan {
  animation: xuanzhuan 80s linear infinite;
}

.MediaPlayer {
  min-height: 100vh;
  position: absolute;
  top: 0;
  z-index: 4;
  padding: 0 0;
  .MediaPlayer-neirong {
    position: relative;
    width: 100vw;
    // height: 100vh;
    // min-height: 100vh;
    background-size: 100%;
    margin-bottom: 120px;
    .neirong-data {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      backdrop-filter: blur(20px);
      background: transparent;
      .title {
        width: 100%;
        height: 60px;

        border-bottom: 1px solid #867f7f;
        box-shadow: 0 0 15px rgb(90, 90, 90);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        div {
          svg {
            font-size: 30px;
            padding: 10px;
            border-radius: 15px;
            cursor: pointer;
            margin: 0 10px;
            background-color: #cacaca82;
            &:hover {
              background-color: #9d9d9d;
            }
          }
        }
      }
      .neirong-data-shang {
        width: 100%;
        min-height: 100vh;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: space-around;
        margin-top: 30px;
        transition: width 0.3s ease, height 0.3s ease; /* 可选 */
        .div-img-yy {
          transition: width 0.3s ease, height 0.3s ease; /* 可选 */
          margin-bottom: 20px;
          .imga {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-shadow: 0 0 16px black;
          }
        }
        .div-text {
          width: 50%;
          height: 600px;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow: auto;
          // border: 1px solid black;
          border-radius: 10px;
          box-shadow: 0 0 16px black;
          background-color: #43434357;
          margin-bottom: 20px;
          /* 修改滚动条宽度 */
          &::-webkit-scrollbar {
            width: 0px;
          }

          /* 修改滚动条轨道样式 */
          &::-webkit-scrollbar-track {
            background: #dddddd;
          }

          /* 修改滚动滑块样式 */
          &::-webkit-scrollbar-thumb {
            background: #797878;
            border-radius: 5px;
          }

          /* 添加鼠标悬停时的滚动滑块样式 */
          &::-webkit-scrollbar-thumb:hover {
            background: #424141;
          }
          span {
            width: 90%;
            font-size: 20px;
            font-weight: 600;
            color: #a6a6a6;
            margin: 5px 10px;
            text-align: center;
            word-wrap: break-word;
          }

          .lyric-activate {
            font-size: 28px;
            font-weight: 600;
            color: #ffffff;
          }
        }

        @media screen and (max-width: 620px) {
          .div-img {
            width: 300px;
            height: 300px;
          }
          .div-text {
            width: 90%;
            height: 500px;
            .div-text-geci {
              font-size: 20px;
              font-weight: 600;
            }
          }
        }
        @media screen and (min-width: 600px) and (max-width: 800px) {
          .div-img {
            width: 400px;
            height: 400px;
          }
          .div-text {
            width: 90%;
            height: 500px;
            .div-text-geci {
              font-size: 20px;
              font-weight: 600;
            }
          }
        }
        @media screen and (min-width: 800px) and (max-width: 1450px) {
          .div-img {
            width: 500px;
            height: 500px;
          }
          .div-text {
            width: 90%;
            height: 400px;
            .div-text-geci {
              font-size: 18px;
              font-weight: 600;
            }
          }
        }
        @media screen and (min-width: 1450px) {
          .div-img {
            width: 600px;
            height: 600px;
          }
        }
      }
    }
  }
  .neirong-data-button {
    width: calc(100% - 100px);
    height: 120px;
    background-color: rgba(214, 214, 214, 0.575);
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border-radius: 20px;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    .btn-div-l {
      width: calc(25% - 100px);
      height: 85%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
    }
    .btn-div-c {
      width: calc(50% - 100px);
      height: 85%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      div {
        svg {
          font-size: 70px;
          color: rgb(0, 0, 0);
        }
        cursor: pointer;
      }
    }
    .btn-div-r {
      width: calc(25% - 100px);
      height: 85%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
    }
  }
}
</style>
