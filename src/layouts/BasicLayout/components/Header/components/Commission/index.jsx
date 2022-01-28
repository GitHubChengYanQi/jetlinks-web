import React from 'react';
import {Card, Space} from 'antd';
import {useHistory} from 'ice';
import Empty from '@/components/Empty';

const Commission = ({data,onClose=()=>{}}) => {

  const history = useHistory();

  if (!data) {
    return <Empty />;
  }

  return (
    <Card bordered={false} bodyStyle={{padding: 0}}>
      {
        data.map((item, index) => {
          return <Card.Grid
            style={{width: '100%', cursor: 'pointer'}}
            key={index}
            onClick={() => {
              switch (item.source) {
                case 'instock':
                  history.push('/ERP/instock');
                  break;
                case 'processTask':
                  history.push(`/process/action/${item.sourceId}`);
                  break;
                default:
                  break;
              }
              onClose();
            }}
          >
            <Space direction="vertical">
              {item.title}
              {item.content}
              <em style={{color: '#9b9999'}}>{item.time}</em>
            </Space>
          </Card.Grid>;
        })
      }
    </Card>
  );

};

export default Commission;
