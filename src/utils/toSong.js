
import router from "../router/index";

function toSong(songId) {
  if (songId) {
    router.push({ path: `/songdetails/${songId}` });
    console.log(songId);
  }
}

// 跳转歌曲页面
// 必须且只传入歌曲id
export default toSong;
