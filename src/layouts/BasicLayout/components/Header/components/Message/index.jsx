import React from 'react';
import {Empty, List, Space, Typography} from 'antd';

const Message = ({data}) => {

  if (data){
    return (
      <div style={{maxHeight: 100, overflow: 'auto'}}>
        <List
          size="small"
          dataSource={data}
          renderItem={(item) => {
            if (!item.time && item.type !== '代办') {
              return <List.Item>
                <Space direction="vertical">
                  <Space>
                    <Typography.Text strong>分类: </Typography.Text>{item.categoryName}
                    <Typography.Text strong>跟进类型：</Typography.Text>{item.type}
                  </Space>
                  <Space>
                    <Typography.Text strong>跟进内容：</Typography.Text>{item.note}
                  </Space>
                </Space>
              </List.Item>;
            }
          }}
        />
      </div>
    );
  }else {
    return <Empty />;
  }
};

export default Message;
