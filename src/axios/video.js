import requests from './axios'
// 获取相关视频内容
export const reqAlbumList = (id) => requests({ url: `/album?id=${id}`, method: 'get' });
// 视频(搜索的是MV)详细
export const reqVideoDetail = (id) => requests({ url: `/mv/detail?mvid=${id}`, method: 'post' })
// mv 视频播放地址
export const reqMvVideo = (id) => requests({ url: `mv/url?id=${id}`, method: 'post' })
// 资源点赞( MV,电台,视频)
export const reqMvResourceLike = (id, t) => requests({ url: `/resource/like?t=${t}&type=1&id=${id}`, method: 'post' })
// 获取 mv 点赞转发评论数数据
export const reqMyDetailInfo = (id) => requests({ url: `/mv/detail/info?mvid=${id}`, method: 'post' })
//收藏/取消收藏专辑
export const reqMvSub = (mvid, t) => requests({ url: `/mv/sub?t=${t}&mvid=${mvid}`, method: 'post' })
// 收藏的 MV 列表
export const reqMvSubList = () => requests({ url: `/mv/sublist`, method: 'get' })
// mv 评论
export const reqMvCommentList = (id, limit = 20, offset = 0, before) => requests({ url: `/comment/mv?id=${id}&limit=${limit}&offset=${offset}`, method: 'get' })
//给评论点赞cid : 评论 idt : 是否点赞 , 1 为点赞 ,0 为取消点赞 type: 0: 歌曲1: mv2: 歌单3: 专辑4: 电台节目5: 视频6: 动态7: 电台\
export const reqMvCommenliked = (id, cid, t, type) => requests({ url: `/comment/like?id=${id}&cid=${cid}&t=${t}&type=${type}`, method: 'post' })


