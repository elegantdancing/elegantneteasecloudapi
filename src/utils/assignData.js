//数据自动整合
// 处理多数据赋值 
export const assignData = (data, obj) => {
  Object.keys(obj).forEach((key) => {
    if (data[key]) {
      obj[key] = data[key];
    }
  });
}