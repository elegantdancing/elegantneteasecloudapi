// 毫秒转具体分钟
export const formattedTime = (milliseconds) => {
  const minutes = Math.floor(milliseconds / 1000) / 60;
  return minutes.toFixed(2).replace(/\./g, ':'); // 保留两位小数  
}
// 热度处理
export const getHeat = (playTime) => {
  if (playTime < 100000) return playTime
  let result = (playTime / 10000).toFixed(1);
  if (result.split('.')[1] == '0') return `${Math.floor(result)}万`
  return `${result}万`
}
// 时间戳转换具体时间、
export const formattedDate = (timestamp) => {
  const date = new Date(timestamp * 1000); // 时间戳需要乘以1000转换为毫秒  
  const year = date.getFullYear();
  const now = new Date().getFullYear();

  if (year === now) {
    const month = padZero(date.getMonth() + 1); // 月份从0开始，需要加1并使用padZero方法补零  
    const day = padZero(date.getDate());
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const formattedDateTime = `${month}-${day} ${hours}:${minutes}`;
    return formattedDateTime;
  } else {
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
    return formattedDateTime;
  }
}
function padZero(value) {
  return value.toString().padStart(2, '0'); // 使用padStart方法补零，确保是两位数  
}