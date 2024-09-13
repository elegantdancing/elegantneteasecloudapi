<template>
  <div class="wai">
    <div class="myUserList">
      <!-- 歌单介绍 -->
      <div class="UserList">
        <!-- 图片 -->
        <div class="myImg">
          <img v-lazy="user.profile?.avatarUrl" alt="" />
        </div>
        <!-- 信息 -->
        <div class="UserListIntroduce">
          <div class="List">
            <span class="nickname">{{ user.profile?.nickname }}</span>
            <span class="grade">Lv:<span style="font-weight: 600;">{{ user.level }}</span></span>
            <button ref="textContent" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" @click="ContentClick">
              {{ user.followTimeContent || user.profile?.followTime || `未关注` }}</button>
          </div>
          <!-- 原创歌手信息 -->
          <div class="Originalsinger">
            <span><span>{{ user.AuthSinger?.desc }}</span></span>
          </div>
          <!--  音乐达人信息 -->
          <div class="Musician">
            <span>{{ user.AuthMusician?.desc }}</span>
            <span class="tags" v-for="(tag, index) in  user.AuthMusician?.tags" :key="index">
              {{ tag }}</span>
          </div>
          <!--  图文达人信息 -->
          <div class="imageText">
            <span>{{ user.AuthImageText?.desc }}</span>
          </div>
          <ul class="Auth">
            <li v-for="(auth, index) in user.Auth" :key="index" @click="Authpush(auth)"><strong>{{ auth.title
            }}</strong><span>{{ auth.type }}</span></li>
          </ul>
          <div>
          </div>
        </div>
      </div>
      <router-view :user="user"></router-view>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { reqUserDetails, reqUserLevel } from "../axios/user";
import { ref, onMounted, reactive } from "vue";
import { reqFollow } from '../axios/user'


// 路由
const Router = useRouter();
const Route = useRoute();
let textContent = ref(null)
// 用户信息
const user = reactive({
  // 用户名
  nickname: '',
  // 用户id
  userId: "",
  // 动态信息
  Auth: [],
  // 原创歌手
  AuthSinger: {},
  // 音乐达人信息
  AuthMusician: {},
  // 图文达人信息
  AuthImageText: {},
  // 关注信息
  newFollows: 0,
  // 动态
  eventCount: 0,
  // 粉丝数量
  followeds: 0,
  // 详细信息
  profile: {},
  // 等级
  level: 0,
  // 听歌数据
  listenSongs: 0,
  // 喜欢
  followed: false,
  // 返回的关注天数
  followTimeContent: undefined
});
function handleMouseEnter() {
  if (user.followed) {
    textContent.value.innerHTML = '取消关注'
  }
}
function handleMouseLeave() {
  if (textContent.value.innerHTML === '取消关注') {
    textContent.value.innerHTML = user.profile?.followTime || user.followTimeContent || `已关注`
  }
}
// 关注点击
async function ContentClick() {
  if (!user.followed) {
    await reqFollow(user.userId, 1).then((res) => {
      user.followed = true
      textContent.value.innerHTML = res.data.followTimeContent
      user.followTimeContent = res.data.followTimeContent
    }).catch((res) => {
      console.log(res);
    })
  } else {
    await reqFollow(user.userId, 0).then(() => {
      user.followed = false
      textContent.value.innerHTML = '未关注'
    }).catch((res) => {
      console.log(res);
    })
  }
}
// 所有数据
async function userData(userId) {
  try {
    const { data } = await reqUserDetails(userId);
    let { profile, level, listenSongs } = data
    user.profile = profile
    user.level = level
    user.listenSongs = listenSongs
    user.followed = profile.followed
    user.nickname = profile.nickname
    getAuthList(profile.allAuthTypes)
    getInformation(profile)
  } catch (error) {
    console.log(error)
  }
}
// 处理用户标签信息
function getAuthList(list) {
  if (list) {
    list.filter((item) => {
      if (item.type == 2) user.AuthSinger = item
      if (item.type == 4) user.AuthMusician = item
      if (item.type == 207) user.AuthImageText = item
    })
  }
}
// 处理用户动态信息
function getInformation(List) {
  user.Auth.push({ title: List.newFollows, type: "动态", path: "Trends" })
  user.Auth.push({ title: List.eventCount, type: "关注", path: "Follows" })
  user.Auth.push({ title: List.followeds, type: "粉丝", path: "Fans" })
}
function Authpush(auth) {
  Router.push({
    path: `/user/${user.userId}/${auth.path}`
  })
}
onMounted(() => {
  user.userId = Route.params.userId;
  userData(user.userId);
});
</script>

<style lang="less" scoped>
.wai {
  background-color: #e2e2e2d7;
  display: flex;
  flex-direction: column;
  align-items: center;

  .myUserList {
    width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffffd7;
    padding: 50px;

    .UserList {
      width: 1200px;
      height: 400px;
      border-bottom: 1px dashed #aaa;
      margin-bottom: 10px;
      display: flex;
      flex-direction: row;
      align-items: flex-start;

      .myImg {
        width: 250px;
        height: 250px;
        margin: 0 50px;
        border: 2px solid rgb(187, 186, 178);
        box-shadow: 3px 3px 5px #999;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .UserListIntroduce {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        .List {
          display: flex;
          align-items: center;
          flex-direction: row;
          flex-wrap: nowrap;

          .nickname {
            font-size: 30px;
            padding-right: 10px;
          }

          .grade {
            margin-right: 10px;
            box-sizing: border-box;
            padding-left: 5px;
            display: inline-block;
            width: 50px;
            height: 20px;
            border-radius: 15px 15px 15px 15px;
            border: 1.5px solid red;
            color: red;
          }

          button {
            cursor: pointer;
          }
        }

        .Musician {
          padding-top: 5px;
          display: flex;
          align-items: center;


          .tags {
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            box-sizing: border-box;
            padding: 2px;
            margin-left: 10px;
            height: 25px;
            border: 1px solid rgba(0, 0, 0, 0.4);
            color: rgba(0, 0, 0, 0.4);
            border-radius: 5px;
          }
        }

        .imageText {
          margin-top: 5px;
          display: flex;
          flex-direction: row;
          align-items: center;

          img {
            width: 25px;
            height: 25px;
          }
        }

        .Originalsinger {
          margin-top: 5px;
        }

        .Auth {
          width: 100%;
          border-top: 0.5px solid #ddd;
          padding-top: 20px;
          margin-top: 10px;

          li {
            font-size: 40px;
            padding-right: 25px;
            float: left;
            margin-right: 20px;
            border-right: 0.5px solid #ddd;
            line-height: 0.7;
            text-align: left;
            cursor: pointer;

            &:hover {
              color: cornflowerblue;
            }

            strong {
              display: block;
            }

            span {
              font-size: 15px;
            }
          }

          & li:last-child {
            border-right: none;
          }
        }


      }
    }
  }
}
</style>
