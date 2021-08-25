import React, {useState} from 'react';
import Select from '@/components/Select';
import {UserIdSelect} from '@/pages/UserInfo/openUserInfo/openUserInfoUrl';
import {Card, Image, Spin} from 'antd';
import {useRequest} from '@/util/Request';

const User = () => {

  const [value, setValue] = useState();

  const {loading, data, run} = useRequest({
    url: '/api/userinfo',
    method: 'POST'
  }, {manual: true});


  const img = `data:image/jpeg;base64,${data}`;


  return (
    <>
      <Card title="绑定用户" bordered={false} style={{textAlign: 'center'}}>
        <Select api={UserIdSelect} width="100%" value={value} placeholder="请选择系统用户进行绑定" onChange={async (value) => {
          await run(
            {
              data: {
                userId: value,
                page: ''
              }
            }
          );
          setValue(value);
        }} />

        {
          loading && <div style={{margin:20}}><Spin /></div>
        }

        {
          data && <Image style={{margin: 30}} src={img} preview={false} />
        }
      </Card>
    </>
  );
};

export default User;
