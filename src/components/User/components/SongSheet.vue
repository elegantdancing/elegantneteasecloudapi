<template>
  <div class="Playlists">
    <div class="title">
      <span>{{ user.nickname + SheetList.title + '(' + SheetList.list.length + ')' }}</span>
    </div>
    <div class="container">
      <div v-for="item in SheetList.list" :key="item.id" class="item">
        <img v-lazy="item.coverImgUrl" alt="" @click="ToSongList(item.id)">
        <span class="name">{{ item.name }}</span>
        <a class="play-button" @click.stop="PlaySongList(item.id)">
          <svg class="icon " aria-hidden="true">
            <use xlink:href="#icon-playCircle"></use>
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import toSongList from '../../../utils/toSongList'
import { PlaySingles } from '../../../utils/PlaySinglesAlbums'
const props = defineProps({
  SheetList: Object,
  user: Object
})
console.log(props.SheetList);
// 跳转
function ToSongList(id) {
  toSongList(id)
}
// 播放
function PlaySongList(id) {
  PlaySingles(id)
}
</script>

<style lang="less" scoped>
.Playlists {
  padding-top: 30px;

  .title {
    font-size: 23px;
    padding-bottom: 5px;
    border-bottom: 3px solid #d63434;
  }

  .container {
    padding-top: 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;

    .item {
      width: 200px;
      height: 200px;
      margin: 0px 0px 40px 50px;
      position: relative;
      box-shadow: 2px 2px 8px rgba(109, 109, 109, 0.795);
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-start;

      &:nth-child(5n+1) {
        margin-left: 0px;
      }

      img {
        cursor: pointer;
        width: 100%;
        height: 100%;
        box-shadow: 2px 2px 8px rgba(109, 109, 109, 0.795);
        border: 0.5px solid black;

        &:hover~.play-button {
          display: block;
        }
      }

      .name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 20px;
      }

      .play-button {
        display: none;
        cursor: pointer;
        position: absolute;
        bottom: -4px;
        right: -4px;

        &:hover {
          display: block;
        }
      }
    }
  }
}
</style>