import requests from "./axios";

// 获取首页信息
export const getHomeData = () => {
  return requests.get("/homepage/block/page");
};
