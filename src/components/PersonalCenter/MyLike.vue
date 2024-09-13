<template>
  <div class="MyLike">
    <div
      class="MyLike-box"
      v-for="(item, index) in UserLike?.allSong"
      :key="index"
      :class="index % 2 == 0 ? 'dan' : 'shuang'"
    >
      <div class="aaa-box">
        <div class="box-img" @click="toSong(item?.id)">
          <img v-lazy="item?.al?.picUrl" alt="" />
        </div>
        <div class="box-text">
          <div @click="toSong(item?.id)" class="box-name">
            {{ item?.name }}
          </div>
          <!--作者 -->
          <div class="zuozhe">
            <span v-for="(arr, index2) in item?.ar" :key="index2">
              {{ arr.name }}</span
            >
          </div>
        </div>
      </div>
      <!-- 一些按钮和其他 -->
      <div class="anniu">
        <!-- 专辑 -->
        <div class="zhuanji">
          <span class="title">专辑</span>
          <span class="neirong" @click="toCollection(item?.al?.id)">{{
            item?.al?.name
          }}</span>
        </div>
        <!-- 加入喜欢 -->
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-aixin"></use>
          </svg>
        </div>
        <!-- 播放 -->
        <div @click="PlaySong(item?.id)">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofang"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reqUserLike, reqSongDetail } from "../../axios/songListOrSong";
import useUserStore from "../../pinia/user";
import { ref, onMounted, reactive } from "vue";
import PlaySong from "../../plugins/method/PlaySong.js";

import toSong from "../../utils/toSong";
import { useRouter } from "vue-router";

// 路由
const router = useRouter();
// 仓库
const userStore = useUserStore();

const UserLike = reactive({
  allSong: [],
});

// 获取用户喜欢的歌曲
async function getUserLike() {
  const { data: a } = await reqUserLike(userStore.myProfile.userId);
  const { data: b } = await reqSongDetail(a.ids);
  UserLike.allSong = b.songs;
}
// 跳转专辑
function toCollection(id) {
  router.push({
    path: "/collection/" + id,
  });
}
onMounted(() => {
  getUserLike();
  console.log(UserLike);
});
</script>

<style lang="less" scoped>
.MyLike {
  width: calc(100vw - 240px);
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  .MyLike-box {
    width: calc(100% - 60px);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px 10px 10px 50px;
    &:hover {
      background-color: #999999;
    }
    .aaa-box {
      display: flex;
      flex-direction: row;
      align-items: center;
      .box-img {
        width: 100px;
        height: 100px;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50px;
        }
      }
      .box-text {
        margin-left: 20px;
        .box-name {
          font-size: 30px;
          font-weight: 600;
          width: 400px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          cursor: pointer;
        }
        .zuozhe {
          font-size: 20px;
          margin-right: 5px;
          width: 400px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    .anniu {
      display: flex;
      flex-direction: row;
      padding-right: 30px;
      cursor: pointer;
      .zhuanji {
        width: 400px;
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        .title {
          font-size: 15px;
        }
        .neirong {
          font-size: 25px;
          font-weight: 600;
          align-items: flex-start;
          white-space: nowrap; /* 防止文字换行 */
          overflow: hidden; /* 隐藏超出部分 */
          text-overflow: ellipsis; /* 用省略号代替超出部分 */
        }
      }
      div {
        margin-right: 10px;
      }
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
}
</style>
