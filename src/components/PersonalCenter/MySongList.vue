<template>
  <div class="MySongList">
    <div v-for="(item2, index2) in UserPlaylist?.type" :key="index2">
      <ComponentsTitle>{{
        index2 == "mySongList" ? "我的歌单" : "我的收藏"
      }}</ComponentsTitle>
      <div class="MySongList-box-wai">
        <div v-for="(item, index) in item2" :key="index" class="MySongList-box">
          <!--图片 -->
          <div class="box-div-img" @click="toSongList(item.id)">
            <img :src="item?.coverImgUrl" alt="" />
          </div>
          <div class="box-div-text">
            <!-- 歌名 -->
            <div @click="toSongList(item.id)">
              <span>{{ item?.name }}</span>
            </div>
            <!-- 数据 -->
            <div>
              <!-- 有多少首歌 -->
              <span>{{ item?.trackCount }}首</span>
              <!-- 播放量 -->
              <span>{{ item?.playCount }}次</span>
            </div>
            <!-- 时间 -->
            <div>
              <!-- 创建时间 -->
              <span>创建时间：{{ changeTime(item?.createTime) }} </span>
              <!-- 更新时间 -->
              <span>更新时间：{{ changeTime(item?.updateTime) }}</span>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reqUserPlaylist } from "../../axios/songListOrSong";
import useUserStore from "../../pinia/user";
import { ref, onMounted, reactive } from "vue";
import ComponentsTitle from "../ComponentsTitle.vue";
import changeTime from "../../plugins/Time";
import toSongList from "../../utils/toSongList";

// 仓库
const userStore = useUserStore();

const UserPlaylist = reactive({
  allSongList: [],
  type: {
    // 我的歌单
    mySongList: [],
    // 我收藏的歌单
    mySubscribedSongList: [],
  },
});

// 获取最近播放歌曲
async function getUserPlaylist() {
  const { data: a } = await reqUserPlaylist(
    userStore.myProfile.userId,
    30,
    UserPlaylist.allSongList.length
  );
  UserPlaylist.allSongList = a.playlist;
  // 分类歌单
  // 我的歌单
  UserPlaylist.type.mySongList = UserPlaylist.allSongList.filter(
    (item) => item.subscribed == false
  );
  // 我收藏的歌单
  UserPlaylist.type.mySubscribedSongList = UserPlaylist.allSongList.filter(
    (item) => item.subscribed
  );
  console.log(UserPlaylist);
}
onMounted(() => {
  getUserPlaylist();
});
</script>

<style lang="less" scoped>
.MySongList {
  width: calc(100vw - 240px);
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  .MySongList-box-wai {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    .MySongList-box {
      min-width: 400px;
      width: calc(50% - 100px);
      margin: 10px 20px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      .box-div-img {
        position: relative;
        width: 200px;
        height: 200px;
        &:hover {
          &:before {
            content: ""; /* 伪元素需要content属性，这里使用空字符串 */
            position: absolute; /* 确保蒙版位于内容之上 */
            top: 0;
            left: 0;
            width: 100%; /* 宽度为100%，以覆盖整个内容 */
            height: 100%; /* 高度为100%，以覆盖整个内容 */
            background: rgba(
              0,
              0,
              0,
              0.5
            ); /* 半透明的黑色背景，你可以根据需要调整颜色和透明度 */
          }
        }
        cursor: pointer;
        img {
          width: 200px;
          height: 200px;
        }
      }
      .box-div-text {
        width: calc(100% - 300px);
        height: 200px;
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;
        div:nth-child(1) {
          font-size: 30px;
          font-weight: 600;
          cursor: pointer;
        }
        div:nth-child(2) {
          font-size: 20px;
          span {
            margin-right: 10px;
          }
        }
        div:nth-child(3) {
          font-size: 13px;
          color: #999;
          span {
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>
