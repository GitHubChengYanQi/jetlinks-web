import React from 'react';
import {Empty, List, Space, Typography} from 'antd';


const Remind = ({data}) => {

  if (data) {
    return (
      <div style={{maxHeight: 100, overflow: 'auto'}}>
        <List
          size="small"
          dataSource={data}
          renderItem={(item) => {
            if (item.time && item.type !== '代办') {
              return <List.Item>
                <Space direction="vertical">
                  <Space>
                    <Typography.Text strong>提醒内容: </Typography.Text>{item.message}
                  </Space>
                  <Space>
                    <Typography.Text strong>提醒时间：</Typography.Text>{item.time}
                  </Space>
                </Space>
              </List.Item>;
            }
          }}
        />
      </div>
    );
  } else {
    return <Empty />;
  }
};

export default Remind;
