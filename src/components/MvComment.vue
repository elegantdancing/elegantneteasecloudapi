<template>
  <div class="big">
    <div class="item" v-for="item in comment.comments  " :key="item.commentId">
      <img class="itemImg" v-lazy="item.user.avatarUrl" alt="">
      <div class="itemContent">
        <div class="itemCommentTop">
          <span class="itemContentName">{{ item.user.nickname }}</span>：{{ item.content }}
          <span class="itemContentReply" v-show="item.beReplied.length > 0">
            <span style="color: #0c73c2;">{{ item.beReplied[0]?.user.nickname }}</span>
            :{{ item.beReplied[0]?.content }}
          </span>
        </div>
        <div class="itemCommentBottom">
          <span class="itemDate">{{ item.timeStr }}</span>
          <div class="commentAll">
            <svg :class="`${item.liked ? 'icon like' : 'icon hov'}`" aria-hidden="true" @click="svgLiked(item.commentId)">
              <use xlink:href="#icon-dianzan"></use>
            </svg>
            <span class="likedCount">{{ item.likedCount ? `(${item.likedCount})` : '' }}</span>
            <span class="sp1">|</span>
            <a class="reply">回复</a>
          </div>
        </div>
      </div>
    </div>
    <el-pagination :page-size="comment.comments.length" :pager-count="9" background layout="prev, pager, next"
      :total="parseInt(comment.count)" @current-change="paginationChange" />
  </div>
</template>
<script setup>
import { reqMvCommenliked } from '../axios/video'
import { useRoute } from 'vue-router'
let route = useRoute()
const Vid = route.params.Vid
const emit = defineEmits(['paginationChange'])
const props = defineProps({
  comment: Object
})
function paginationChange(val) {
  emit('paginationChange', val)
}
async function svgLiked(cid) {
  try {
    let item = props.comment.comments.find(i => i.commentId === cid);
    await reqMvCommenliked(Vid, cid, `${item.liked ? 0 : 1}`, 1)
    if (item) {
      item.liked ? item.likedCount-- : item.likedCount++
      item.liked = !item.liked;
    }
  } catch (error) {
    console.log(error);
  }
}
console.log(props.comment);
</script>
<style lang="less" scoped>
.big {
  display: flex;
  flex-direction: column;
  align-items: center;

  .item {
    display: flex;
    padding: 15px 0;
    border-top: 1px dotted #ccc;
    flex-direction: row;

    .itemImg {
      width: 60px;
      height: 60px;
    }

    .itemContent {
      display: flex;
      padding-left: 10px;
      flex-direction: column;
      justify-content: space-between;
      width: 650px;

      .itemCommentTop {

        font-size: 13px;

        .itemContentName {
          color: #0c73c2;
          margin-right: 5px
        }

        .itemContentReply {
          box-sizing: border-box;
          display: block;
          width: 100%;
          height: 50px;
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 15px;
          margin-top: 6px;
          background-color: #f5f5f5;
        }
      }

      .itemCommentBottom {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .itemDate {
          color: gray;
          font-size: 13px;
        }

        .commentAll {


          .like {
            color: red;
            cursor: pointer;

            &:hover~.likedCount {
              border-bottom: 1px solid black;

            }
          }

          .icon {
            width: 25px;
            height: 25px;
          }

          .hov:hover {
            color: #0c73c2;
          }

          .sp1 {
            margin: 0 8px;
            color: #ccc;
          }

          .reply {
            cursor: pointer;

            &:hover {
              border-bottom: 1px solid black;
            }
          }
        }
      }
    }
  }
}
</style>