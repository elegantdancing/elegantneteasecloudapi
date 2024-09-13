
import router from "../router/index";

function toSongList(toSongListId) {
  if (toSongListId) {
    router.push({ path: `/songlistdetails/${toSongListId}` });
    console.log(songId);
  }
}

// 跳转歌单页面
export default toSongList;
