<template>
  <div class="RecentlyPlayed">
    <div
      class="RecentlyPlayed-box"
      v-for="(item, index) in RecordRecent?.allSong"
      :key="index"
      :class="index % 2 == 0 ? 'dan' : 'shuang'"
    >
      <div class="aaa-box">
        <div class="box-img" @click="toSong(item?.data?.id)">
          <img v-lazy="item?.data?.al?.picUrl" alt="" />
        </div>
        <div class="box-text">
          <div @click="toSong(item?.data?.id)" class="box-name">
            {{ item?.data?.name }}
          </div>
          <!--作者 -->
          <div class="zuozhe">
            <span v-for="(arr, index2) in item?.data?.ar" :key="index2">
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
          <span class="neirong" @click="toCollection(item?.data?.al?.id)">{{ item?.data?.al?.name }}</span>
        </div>
        <!-- 加入喜欢 -->
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-aixin"></use>
          </svg>
        </div>
        <!-- 播放 -->
        <div @click="PlaySong(item?.data?.id)">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofang"></use>
          </svg>
        </div>
      </div>
    </div>

    <div class="jiazaigduo">
      <button @click="RecentlyPlayed(RecordRecent?.allSong.length + 30)">
        加载更多
      </button>
    </div>
  </div>
</template>

<script setup>
import { reqRecordRecent } from "../../axios/songListOrSong";
import { ref, onMounted, reactive } from "vue";
import PlaySong from "../../plugins/method/PlaySong.js";

import toSong from "../../utils/toSong";
import { useRouter } from "vue-router";

// 路由
const router=useRouter()

const RecordRecent = reactive({
  allSong: [],
});

// 获取最近播放歌曲
async function RecentlyPlayed(limit = 30) {
  const { data: a } = await reqRecordRecent(limit);
  console.log(a);
  RecordRecent.allSong = a.data.list;
  console.log(RecordRecent);
}
// 跳转专辑
function toCollection(id){
  router.push({
    path:"/collection/"+id
  })
}
onMounted(() => {
  RecentlyPlayed();
});
</script>

<style lang="less" scoped>
.RecentlyPlayed {
  width: calc(100vw - 240px);
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  .RecentlyPlayed-box {
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
  .jiazaigduo {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 10px;
    button {
      cursor: pointer;
      width: 200px;
      height: 45px;
      background-color: rgb(255, 111, 111);
      border: none;
      color: white;
    }
  }
}
</style>
