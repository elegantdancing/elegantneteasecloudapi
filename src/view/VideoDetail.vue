<template>
  <div class="bj">
    <div class="mySongList">
      <!-- 歌单介绍 -->
      <div class="VideoDetailData">
        <!-- MV -->
        <div class="mvModule">
          <div class="iconMV">
            <svg class="icon " aria-hidden="true">
              <use xlink:href="#icon-MV"></use>
            </svg>
            <h2 class="Vidname">{{ VideoDetails.name }}</h2>
            <a href="#" class="artistName"> {{ VideoDetails.artistName }}</a>
          </div>
          <video class="mv" :src=VideoDetails.address controls></video>
          <!-- 两个按钮 -->
          <div class="Likeoperate">
            <!-- 点赞 -->
            <button @click="MvResourceLike()" class="LikeButton">
              <svg class="icon dzan" aria-hidden="true">
                <use :xlink:href="VideoDetails.liked ? '#icon-dianzan-copy' : '#icon-dianzan'"></use>
              </svg>
              <span style="margin-right:5px;">({{ VideoDetails.likedCount }})</span>
            </button>
            <!-- 收藏 -->
            <button @click="MvSub()" class="LikeButton">
              <svg class="icon dzan" aria-hidden="true">
                <use :xlink:href="VideoDetails.isSub ? '#icon-shoucang1' : '#icon-shoucang'"></use>
              </svg>
              <span style="margin-right:5px;">({{ VideoDetails.isSub ? "已收藏" : "未收藏" }})</span>
            </button>
          </div>
          <!-- 评论 -->
          <div class="comment">
            <div class="commentSpan"><span class="commentSpan1">评论</span> <span class="commentSpan2">共{{ comment.count
            }}条评论</span></div>
            <MvComment :comment="comment" @paginationChange="MvCommentChange"></MvComment>
          </div>
        </div>
      </div>
      <!-- Mv介绍 -->
      <div class="MvIntroduction">
        <h3 class="Mvintroduce1">Mv介绍</h3>
        <!-- 歌单名称 -->
        <div class="Mvintroduce2">
          发布时间:<span>{{ VideoDetails.publishTime }}</span>
        </div>
        <!-- 作者信息 -->
        <div class="Mvintroduce2">
          播放次数:<span>{{ getHeat(VideoDetails.playCount) }}次</span>
        </div>
        <div class="desc">{{ VideoDetails.desc }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router'
import { reqVideoDetail, reqMvVideo, reqMvResourceLike, reqMyDetailInfo, reqMvSub, reqMvSubList, reqMvCommentList } from '../axios/video'
import MvComment from '../components/MvComment.vue'
// 处理热度数据
import { getHeat } from '../utils/TimeDate'
// 处理多数据赋值
import { assignData } from '../utils/assignData'
let VideoDetails = reactive({
  // 播放地址信息
  address: '',
  // 发布时间
  publishTime: '',
  // 播放量
  playCount: '',
  // 介绍
  desc: '',
  // mv名字
  name: '',
  // 作者名字
  artistName: '',
  // 作者id
  artistId: '',
  // 点赞数量
  likedCount: '',
  // 我是否点赞
  liked: null,
  // 是否收藏
  isSub: null
})
// 评论信息
let comment = reactive({
  // 总数
  count: '',
  // 评论数
  comments: '',
  // 热评
  hotComments: '',
})
let Vid = ref('')
// 点赞
async function MvResourceLike() {
  if (VideoDetails.liked) {
    try {
      await reqMvResourceLike(Vid, 0)
      VideoDetails.likedCount--
      VideoDetails.liked = !VideoDetails.liked
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      await reqMvResourceLike(Vid, 0)
      VideoDetails.likedCount++
      VideoDetails.liked = !VideoDetails.liked
    } catch (error) {
      console.log(error);
    }
  }
}
// 收藏
async function MvSub() {
  if (VideoDetails.isSub) {
    let req = await reqMvSub(Vid, 0)
    if (req.data.code == 200) {
      VideoDetails.isSub = !VideoDetails.isSub
    }
  } else {
    let req = await reqMvSub(Vid, 1)
    if (req.data.code == 200) {
      VideoDetails.isSub = !VideoDetails.isSub
    }
  }
}
const route = useRoute()
// 加载获取数据
async function getData() {
  Vid = route.params.Vid
  try {
    // 播放视频详细信息
    let { data: { data } } = await reqVideoDetail(Vid);
    assignData(data, VideoDetails)
  } catch (error) {
    console.log(error);
  }
  try {
    // 播放视频地址
    let { data: { data: { url } } } = await reqMvVideo(Vid)
    VideoDetails.address = url
  } catch (error) {
    console.log(error);
  }
  getlikeData(Vid)
  getMvSub()
  getMvCommentList()
}
//mv 点赞转发评论数数据
async function getlikeData(id) {
  try {
    let { data: { liked, likedCount, commentCount } } = await reqMyDetailInfo(id)
    VideoDetails.liked = liked
    VideoDetails.likedCount = likedCount
    comment.count = commentCount
  } catch (error) {
    console.log(error);
  }
}
// 获取是否收藏
async function getMvSub() {
  try {
    let req = await reqMvSubList()
    VideoDetails.isSub = false
    req.data.data.forEach(item => {
      if (item.vid == Vid) {
        VideoDetails.isSub = true
      }
    });
  } catch (error) {
    console.log(error);
  }

}
// 评论数据
async function getMvCommentList() {
  try {
    let { data: { comments, hotComments } } = await reqMvCommentList(Vid)
    comment.comments = comments
    comment.hotComments = hotComments
  } catch (error) {
    console.log(error);
  }
}
async function MvCommentChange(val) {
  try {
    let { data: { comments, hotComments } } = await reqMvCommentList(Vid, 20, (val - 1) * 20)
    comment.comments = comments
    comment.hotComments = hotComments
  } catch (error) {
    console.log(error);
  }
}
onMounted(() => {
  getData();
});
</script>

<style lang="less" scoped>
.bj {
  background-color: #e2e2e2d7;
  display: flex;
  flex-direction: column;
  align-items: center;

  .mySongList {
    width: 1200px;
    display: flex;
    flex-direction: row;
    background-color: #ffffffd7;
    flex-wrap: nowrap;

    .VideoDetailData {
      width: 1200px;
      margin-bottom: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;

      .mvModule {
        padding: 0 0 0 30px;

        .iconMV {
          display: flex;
          align-items: flex-end
        }

        .Vidname {
          font-weight: normal;
          font-size: 30px;
        }

        .artistName {
          margin-left: 10px;
          color: #0c73c2;
        }

        .mv {
          margin-top: 10px;
          width: 650px;
          height: 370px;
        }

        .Likeoperate {
          display: flex;
          margin: 11px 0 20px;
          align-items: center;
          flex-direction: row;

          .LikeButton {
            cursor: pointer;
            display: flex;
            align-items: center;
            margin-left: 10px;

            .dzan {
              width: 40px;
              height: 40px;
            }
          }

        }

        .comment {
          .commentSpan {
            height: 40px;
            border-bottom: 1px solid crimson;

            .commentSpan1 {
              font-size: 25px;
            }

            .commentSpan2 {
              color: gray;
            }
          }

        }
      }
    }

    .MvIntroduction {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 0 20px 0 30px;
      border-left: 2px solid gray;

      .Mvintroduce1 {
        padding-top: 30px;
        padding-bottom: 10px;
        width: 252px;
        border-bottom: 1px solid black;
      }

      .Mvintroduce2 {
        width: 252px;
        color: gray;
        padding-top: 5px;
      }

      .desc {
        width: 200px;
        margin-top: 8px;
      }
    }
  }


}
</style>