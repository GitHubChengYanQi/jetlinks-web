import React, {useRef} from 'react';
import {useRequest} from '@/util/Request';
import {Button, Comment, List} from 'antd';
import {EditOutlined} from '@ant-design/icons';

const Dynamic = (props) => {


  const {value} = props;


  const {data, run} = useRequest({url: '/customerDynamic/list', method: 'POST', data: {customerId: value.customerId}});

  const datas = data ? data.map((value, index) => {
    return {
      actions: [<span onClick={()=>{}}>编辑</span>],
      author: value.user ? value.user.account : '--',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: (
        <>
          <p>
            <p style={{padding:10}}>{value.content}</p>
          </p>
        </>
      ),
      datetime: (
        <span>{value.createTime}</span>
      ),
    };
  }) : [];

  return (
    <div>
      <List
        header={`${datas.length} 条动态`}
        itemLayout="horizontal"
        dataSource={datas}
        renderItem={item => (
          <li>
            <Comment
              actions={item.actions}
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              datetime={item.datetime}
            />
          </li>
        )}
      />,
    </div>
  );
};

export default Dynamic;
