import React from 'react';
import {Avatar, Card, List} from 'antd';
import Empty from '@/components/Empty';

const Dynamic = () => {

  return (
    <Card title="动态">
      <Empty description='暂无动态' />
      {/*<List*/}
      {/*  itemLayout="horizontal"*/}
      {/*  dataSource={[1, 2, 3, 4, 5, 6]}*/}
      {/*  renderItem={item => (*/}
      {/*    <List.Item>*/}
      {/*      <List.Item.Meta*/}
      {/*        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}*/}
      {/*        title={<div>朱彦祖 <a href="https://ant.design">新建了客户</a></div>}*/}
      {/*        description="几秒前"*/}
      {/*      />*/}
      {/*    </List.Item>*/}
      {/*  )}*/}
      {/*/>*/}
    </Card>
  );
};

export default Dynamic;
