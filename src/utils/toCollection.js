
import router from "../router/index";

function toCollection(id) {
  if (id) {
    router.push({ path: `/collection/${id}` });
    console.log(id);
  }
}

// 跳转歌单页面
export default toCollection;
