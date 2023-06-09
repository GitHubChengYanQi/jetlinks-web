const  randomString=(len)=>{
  len = len || 32;

  // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1

  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  const maxPos = $chars.length;
  let str = '';
  for (let i = 0; i < len; i++) {
    str += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return str;
};

// 返回空对象
const isObject = (object) => {
  return (object && typeof object === 'object') ? object : {};
};

// 返回空集合
const isArray = (array) => {
  return Array.isArray(array) ? array : [];
};

// 查找字符串返回 true / false
const queryString = (value='', string) => {
  if (value.includes('\\')){
    value = value.replaceAll('\\','|');
  }
  const patt = new RegExp(value, 'i');
  return patt.test(string);
};


export {
  randomString,
  isObject,
  isArray,
  queryString
};
