import React, { useState } from 'react';
import cookie from 'js-cookie';
import { Result } from 'antd';
import { useInterval } from 'ahooks';
import { useHistory } from 'ice';

const Logout = () => {

  cookie.remove('tianpeng-token');

  const history = useHistory();
  const [count, setCount] = useState(5);
  useInterval(() => {

    if (count <=1) {
      history.push('login');
    }else{
      setCount(count - 1);
    }
  }, 1000);

  return (
    <Result
      status="success"
      title="您已成功退出登录!"
      subTitle={`稍候返回到登录页，剩余${count}秒。`}
    />
  );
};

export default Logout;
