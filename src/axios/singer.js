import requests from "./axios";
//获取歌手详情
export const reqArtistDetail = (id) => requests({ url: `/artist/detail?id=${id}`, method: 'get' });
// 歌手描述
export const reqArtistDesc = (id) => requests({ url: `/artist/desc?id=${id}`, method: 'get' });