<template>
  <div class="MyGoodFriend">
    <div class="xuanze">
      <!-- 我的关注 粉丝 -->
      <div :class="{ jihuo: typeUser, typeBox: true }" @click="getToType(true)">
        我的关注
      </div>
      <div
        :class="{ jihuo: !typeUser, typeBox: true }"
        @click="getToType(false)"
      >
        我的粉丝
      </div>
    </div>
    <!-- 内容 -->
    <div class="neirong">
      <div
        class="neirong-box"
        v-for="(item, index) in typeUser ? userData.guanzhu : userData.fengsi"
        :key="index"
        :class="index % 2 == 0 ? 'dan' : 'shuang'"
      >
        <!-- 左侧 -->
        <div class="l-div-img">
          <img
            class="div-img"
            v-lazy="item.avatarUrl"
            alt=""
            @click="toUser(item.userId)"
          />
        </div>
        <!-- 右侧 -->
        <div class="r-div">
          <!-- 名称 -->
          <div @click="toUser(item.userId)">{{ item.nickname }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reqUserFollows, reqUserFolloweds } from "../../axios/user";
import { onMounted, reactive, ref } from "vue";
import useUserStore from "../../pinia/user";
import { useRouter } from "vue-router";

// 路由
const router = useRouter();

// 仓库
const userStore = useUserStore();

//当前为  关注：true  粉丝：false
let typeUser = ref(true);

const userData = reactive({
  // 关注
  guanzhu: [],
  // 粉丝
  fengsi: [],
});

async function getData(type = 0) {
  // type:0,1 0重新获取 1继续获取
  if (typeUser.value) {
    // 获取关注数据
    const { data: a } = await reqUserFollows(
      userStore.myProfile.userId,
      10,
      type * userData.guanzhu.length
    );
    userData.guanzhu = a.follow;
    // console.log(a);
  } else {
    // 获取粉丝数据
    const { data: a } = await reqUserFolloweds(
      userStore.myProfile.userId,
      10,
      type * userData.fengsi.length
    );
    userData.fengsi = a.followeds;
    // console.log(a);
  }

  console.log(userData);
}
// 跳转到关注或者粉丝 然后获取数据
async function getToType(pd) {
  if (typeUser.value != pd) {
    typeUser.value = pd;
    await getData(0);
  }
}
function toUser(userId) {
  router.push({
    path: "/user/" + userId,
  });
}

onMounted(() => {
  getData(0);
});
</script>

<style lang="less" scoped>
.MyGoodFriend {
  width: calc(100vw - 240px);
  margin: 10px 20px;
  display: flex;
  flex-direction: column;
  .xuanze {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 10px;
    .typeBox {
      width: 200px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      font-size: 18px;
      font-weight: 600;
      background-color: #e2e2e2;

      cursor: pointer;
      &:hover {
        background-color: #999;
      }
    }
    .jihuo {
      background-color: #999;
    }
  }
  .neirong {
    width: calc(100vw - 240px);
    display: flex;
    flex-direction: column;
    align-items: center;
    .neirong-box {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 200px;
      padding-left: 50vw;
      .l-div-img {
        width: 150px;
        cursor: pointer;
        .div-img {
          width: 150px;
          height: 150px;
          border-radius: 20px;
        }
      }
      .r-div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-size: 40px;
        font-weight: 600;
        cursor: pointer;
        margin-left: 20px;
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
}
</style>
