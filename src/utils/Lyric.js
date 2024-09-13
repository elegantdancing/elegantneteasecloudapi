function ChangeSong(lyrics = "") {
  if (lyrics) {
    const regexFirst = /\[(.*?)\]/g;
    const regexSecond = /\](.*?)\n/g;

    // 歌词
    const secondArray = [];
    // 时间
    const firstArray = [];
    // 时间转化后
    const firstArrayMiao = [];

    let matchFirst;
    while ((matchFirst = regexFirst.exec(lyrics)) !== null) {
      firstArray.push(matchFirst[1]);
      firstArrayMiao.push(convertToSeconds(matchFirst[1]));
    }
    let matchSecond;
    while ((matchSecond = regexSecond.exec(lyrics)) !== null) {
      secondArray.push(matchSecond[1]);
    }

    return { secondArray, firstArray, firstArrayMiao };
  } else {
    return {
      secondArray: ["暂时无法获取歌词"],
      firstArray: [],
      firstArrayMiao: [],
    };
  }
}

function convertToSeconds(time) {
  const [timeString, milliseconds] = time.split(".");
  const [minutes, seconds] = timeString.split(":").map(Number);
  let totalSeconds = minutes * 60 + seconds;
  totalSeconds += Number(milliseconds) / 1000; // 将毫秒转换为秒并加到总和中
  return totalSeconds;
}

export default ChangeSong;
