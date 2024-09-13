<template>
  <div class="rmgedanfeli">
    <div class="title">用户列表</div>
    <tr class="big">
      <td class="item" v-for="user in searchData.SongData.userprofiles" :key="user.userId">
        <div class="left">
          <img v-lazy="user.avatarUrl" @click="toUser(user.userId)" />
          <div class="name">
            <span>
              <a style="padding-right: 5px;" @click="toUser(user.userId)">{{ user.nickname }}</a>
              <img v-lazy="user.avatarDetail?.identityIconUrl" alt="">
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="user.gender == 1 ? '#icon-xingbie-nan' : '#icon-xingbie-nv'"></use>
              </svg>
            </span>
            <span class="signature">{{ user.signature }}</span>
          </div>
        </div>
        <div class="right">
          <button :disabled="user.followed" @click="isFollow(user.userId)">{{ user.followed ? '已关注'
            : '关注'
          }}</button>
          <span>歌单：{{ user.playlistCount }}</span>
          <span style="width: 150px; margin-right: 10px;">粉丝：{{ user.followeds }}</span>
        </div>
      </td>
      <el-pagination v-if="pagination.total > 30" background layout="prev, pager, next" :page-size="pagination.pageSize"
        :total="parseInt(pagination.total)" :current-page="currentPage" @current-change="paginationChange" />
    </tr>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { reqFollow } from '../../axios/user'
import router from '../../router';
const props = defineProps({
  searchData: Object,
  pagination: Object
})
let currentPage = ref(1)
const emit = defineEmits(['paginationChange'])
// 分页点击
function paginationChange(val) {
  currentPage.value = val
  emit('paginationChange', val)
}
// 跳转用户界面
function toUser(userId) {
  router.push({
    name: 'UserHome',
    params: { userId: userId }
  })
}
console.log(props.searchData);
// 是否关注
async function isFollow(id) {
  try {
    await reqFollow(id, 1)
    let item = props.searchData.SongData.userprofiles.find(i => i.userId === id);
    item.followed = true
  } catch (error) {
    console.log('reqFollow', error);
  }
}
</script>

<style lang="less" scoped>
.ppp {
  width: 200px;
  height: 200px;
  display: flex;
}

.rmgedanfeli {
  width: 1200px;

  .title {
    margin: 10px 50px;
    font-size: 23px;
    padding-bottom: 10px;
    border-bottom: 3px solid #d63434;
  }

  .big {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .item {
    display: flex;
    flex-wrap: wrap;
    width: 1080px;
    margin-top: 10px;
    margin-left: 25px;
    padding-bottom: 20px;
    justify-content: space-between;
    border-bottom: 1px dashed black;

    .left {
      display: flex;

      img {
        width: 70px;
        height: 70px;
        cursor: pointer;
      }

      .name {
        margin-left: 10px;
        padding-top: 10px;
        display: flex;
        flex-direction: column;

        img {
          width: 20px;
          height: 20px;
        }

        a {
          cursor: pointer;

          &:hover {
            border-bottom: 1px solid black;
          }
        }

        .icon {
          width: 20px;
          height: 20px;
          padding-left: 5px;
          margin-bottom: 7px;
        }

        .signature {
          padding-top: 5px;
          font-size: 13px;
          font-weight: 100;
          color: gray;
          cursor: pointer;
          white-space: nowrap;
          /* 防止换行 */
          overflow: hidden;
          /* 隐藏超出部分 */
          text-overflow: ellipsis;
          /* 显示省略号 */
          max-width: 500px;
          /* 设置最大宽度，可以根据需要调整 */
        }
      }
    }

    .right {
      display: flex;
      align-items: center;

      button {
        width: 60px;
        height: 25px;
        margin-right: 50px;
      }

      span {
        width: 100px;
        height: 25px;
        margin-right: 50px;
        color: gray;
      }
    }
  }
}
</style>