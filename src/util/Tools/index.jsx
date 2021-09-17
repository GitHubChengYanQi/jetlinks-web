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

export {
  randomString
};
