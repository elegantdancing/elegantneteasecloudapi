import requests from "./axios";

// 热门歌单分类
export const reqRemengGedan = () =>
  requests({ url: `/playlist/hot`, method: "get" });
// 获取精品歌单
export const reqCompetitiveGedan = (sum, cat) =>
  requests({
    url: `/top/playlist/highquality?limit=${sum}&cat= ${cat}`,
    method: "get",
  });
// 获取歌单详情 能获取歌单里的歌
export const reqSongListDetail = (id) =>
  requests({
    url: `/playlist/detail?id=${id}&timestamp=${+new Date()}`,
    method: "get",
  });
// 获取歌曲详情
export const reqSongDetail = (id) =>
  requests({ url: `/song/detail?ids=${id}`, method: "get" });
// 歌单评论  可选参数 : limit: 取出评论数量 , 默认为 20 ,offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
export const reqSongListComment = (id, limit = 20, offset = 1) =>
  requests({
    url: `/comment/playlist?id=${id}&limit=${limit}&offset=${offset}`,
    method: "get",
  });
// 歌曲评论  可选参数 : limit: 取出评论数量 , 默认为 20 ,offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
export const reqSongComment = (id, limit = 20, offset = 1) =>
  requests({
    url: `/comment/music?id=${id}&limit=${limit}&offset=${offset}`,
    method: "get",
  });
// 获取音乐 url
export const reqSongUrl = (id) =>
  requests({ url: `/song/url/v1?id=${id}&level=standard`, method: "get" });
// 获取歌词
export const reqLyric = (id) =>
  requests({ url: `/lyric?id=${id}`, method: "get" });
// 所有榜单
export const reqToplist = () => requests({ url: `/toplist`, method: "get" });
// 最近播放歌曲
export const reqRecordRecent = (limit) =>
  requests({ url: `/record/recent/song?limit=${limit}`, method: "get" });
// 我的喜欢
export const reqUserLike = (uid) =>
  requests({ url: `/likelist?uid=${uid}`, method: "get" });
// 获取用户歌单
export const reqUserPlaylist = (uid, limit = 30, offset = 0) =>
  requests({
    url: `/user/playlist?uid=${uid}&limit=${limit}&offset=${offset}`,
    method: "get",
  });
// 云盘数据详情
export const reqUserCloud = (songid) =>
  requests({ url: `/user/cloud/detail?id=${songid}`, method: "get" });
// 已购单曲
export const reqSongPurchased = (limit = 30, offset = 0) =>
  requests({
    url: `/song/purchased?limit=${limit}&offset=${offset}`,
    method: "get",
  });

// 获取每日推荐歌曲
export const reqRecommendSongs = () =>
  requests({ url: `/recommend/songs`, method: "get" });
