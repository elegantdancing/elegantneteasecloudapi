<template>
  <div class="big">
    <div class="CreatePlaylists">
      <div class="title">
        <span>听歌排行 <h4>积累听歌{{ user.listenSongs }}首</h4></span>
        <div>
          <a class="aClick" ref="a1" @click="AllOrWeek(1)">最近一周</a>
          <div class="line"></div>
          <a ref="a2" @click="AllOrWeek(0)">所有时间</a>
        </div>
      </div>
      <ul class="songList" v-if="Object.keys(songList).length > 0">
        <li class="item" v-for="(item, index) in songList" :key="item.song.id">
          <span class="number">{{ index + 1 }}.</span>
          <svg class="icon" aria-hidden="true" @click.stop="playSong(item.song.id)">
            <use xlink:href="#icon-bofanganniu"></use>
          </svg>
          <span class="name" @click="pushSongdetails(item.song.id)">{{ item.song.name }}</span>-
          <a @click="pushSinger(item.song.ar[0].id)">{{ item.song.ar[0].name }}</a>
          <div class="active" :style="{ width: (0.5 * item.score) + '%' }"></div>
        </li>
      </ul>
      <div v-else class="revSongList">暂无数据</div>
    </div>
    <SongSheet :SheetList="songSheetList.create" :user="user"></SongSheet>
    <SongSheet :SheetList="songSheetList.collect" :user="user"></SongSheet>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { reqUserPlayRecord, reqUserPlaylist } from '../../axios/user'
import { useRoute, useRouter } from 'vue-router'
import { getSongList } from '../../utils/SingleClickPlaylist'
import SongSheet from './components/SongSheet.vue'
const route = useRoute()
const router = useRouter()
const a1 = ref(null)
const a2 = ref(null)
const userId = ref()
// 歌单数据
let songSheetList = reactive({
  // 自己创建
  create: {
    title: "创建的歌单",
    list: []
  },
  // 收藏
  collect: {
    title: "收藏的歌单",
    list: []
  }
})
let songList = ref({})
const props = defineProps({
  user: Object
})
async function getData(id) {
  // 最近一周
  let { data } = await reqUserPlayRecord(id, 1)
  songList.value = data.weekData.slice(0, 10)
  let { data: Playlist } = await reqUserPlaylist(id)
  HandPlaylists(Playlist)
}
// 切换数据
async function AllOrWeek(type) {
  if (type == 1) {
    try {
      let { data } = await reqUserPlayRecord(userId.value, 1)
      songList.value = data.weekData.slice(0, 10)
      a1.value.classList.add('aClick');
      a2.value.classList.remove('aClick')
    } catch (error) {
      alert(error.response.data.msg);
    }
  }
  if (type == 0) {
    try {
      let { data } = await reqUserPlayRecord(userId.value, 0)
      songList.value = data.allData.slice(0, 10)
      a2.value.classList.add('aClick');
      a1.value.classList.remove('aClick')
    } catch (error) {
      alert(error.response.data.msg);
    }
  }
}
// 跳转页面
function pushSongdetails(songId) {
  router.push({
    name: 'SongDetailsId',
    params: { songId }
  })
}
function pushSinger(singerId) {
  router.push({
    name: 'Singer',
    params: { singerId }
  })
}
// 单曲播放
function playSong(id) {
  getSongList(id)
}
// 歌单数据处理
function HandPlaylists(List) {
  List.playlist.filter(item => {
    if (item.creator.userId == userId.value) {
      songSheetList.create.list.push(item)
    } else {
      songSheetList.collect.list.push(item)
    }
  }
  )

}
onMounted(() => {
  userId.value = route.params.userId
  getData(userId.value)
})
</script>

<style lang="less" scoped>
.big {
  width: 100%;

  .CreatePlaylists {
    margin-bottom: 30px;

    .title {
      display: flex;
      padding-bottom: 5px;
      border-bottom: 3px solid #d63434;
      align-items: center;
      justify-content: space-between;
      flex-direction: row;
      flex-wrap: nowrap;

      h4 {
        display: inline-block;
        font-size: 16px;
        margin-top: 5px;
        margin-left: 10px;
        line-height: 26px;
        font-weight: 400;
        color: #666;
      }

      .line {
        display: inline-block;
        width: 1px;
        margin: 0 10px;
        height: 12px;
        margin-top: 7px;
        background-color: #999;
      }

      span {
        font-size: 23px;
      }

      a {
        cursor: pointer;
      }

      .aClick {
        font-weight: 600;
      }
    }

    .songList {
      border: 1px solid #e2e2e2;
      border-top: none;

      .item:nth-child(2n+1) {
        background-color: #f7f7f7
      }

      .item {
        box-sizing: border-box;
        position: relative;
        padding-left: 20px;
        height: 50px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        width: 100%;

        .icon {
          padding: 0px 9px;
          width: 25px;
          height: 25px;

          &:hover {
            cursor: pointer;
          }
        }

        .number {
          width: 30px;
          text-align: right;
          font-size: 20px;
          color: #666;
        }

        .name {
          margin-right: 10px;
          font-weight: 600;
          cursor: pointer;

          &:hover {
            border-bottom: 1px solid black;
          }
        }

        a {
          margin-left: 10px;
          font-size: 15px;
          color: #aeaeae;
          cursor: pointer;

          &:hover {
            border-bottom: 1px solid black;
          }
        }

        .active {
          position: absolute;
          left: 50%;
          width: 50%;
          height: 100%;
          background-color: rgb(78, 180, 245);
          opacity: 0.1;
        }
      }
    }

    .revSongList {
      height: 100px;
      width: 100%;
      text-align: center;
      line-height: 100px;
      font-size: 50px;
    }
  }

}
</style>