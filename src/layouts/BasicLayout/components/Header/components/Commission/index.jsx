import React from 'react';
import {Empty, List, Space, Typography} from 'antd';

const Commission = ({data}) => {

  if (data){
    return (
      <div style={{maxHeight: 100, overflow: 'auto'}}>
        <List
          size="small"
          dataSource={data}
          renderItem={(item) => {
            if (item.type === '代办') {
              return <List.Item>
                <Space direction="vertical">
                  <Space>
                    <Typography.Text strong>事项: </Typography.Text>{item.note}
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

export default Commission;
