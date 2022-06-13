import React, {useRef} from 'react';
import {Card, Space} from 'antd';
import {useHistory} from 'ice';
import Empty from '@/components/Empty';
import Documents from '@/pages/Workflow/Documents';

const Commission = ({
  data,
  onClose = () => {
  }
}) => {

  const history = useHistory();

  const documentRef = useRef();

  if (!data) {
    return <Empty />;
  }

  return (
    <div>
      <Card bordered={false} bodyStyle={{padding: 0}}>
        {
          data.map((item, index) => {
            return <Card.Grid
              style={{width: '100%', cursor: 'pointer'}}
              key={index}
              onClick={() => {
                switch (item.source) {
                  case 'processTask':
                    documentRef.current.action(item.sourceId);
                    break;
                  default:
                    break;
                }
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

      <Documents ref={documentRef} />

    </div>
  );

};

export default Commission;
