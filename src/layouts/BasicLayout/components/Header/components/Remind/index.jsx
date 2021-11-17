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
            return <List.Item>
              <Space direction="vertical">
                <Space>
                  {item.title}
                  {item.time}
                </Space>
                <Space>
                  {item.content}
                </Space>
              </Space>
            </List.Item>;
          }
          }
        />
      </div>
    );
  } else {
    return <Empty />;
  }
};

export default Remind;
