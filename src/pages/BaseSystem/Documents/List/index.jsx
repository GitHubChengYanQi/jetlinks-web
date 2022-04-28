import React from 'react';
import {Button, Card} from 'antd';
import {useHistory} from 'ice';
import Breadcrumb from '@/components/Breadcrumb';

const List = () => {

  const history = useHistory();

  const dataSource = [
    {name: '采购申请单', type: 'purchaseAsk'},
    {name: '采购单', type: 'PO'},
    {name: '销售单', type: 'SO'},
    {name: '入库申请单', type: 'instockAsk'},
    {name: '入库异常', type: 'instockError'},
    {name: '领料单', type: 'outstock'},
    {name: '付款申请单', type: 'payAsk'},
    {name: '入厂检', type: 'inQuality'},
    {name: '生产检查', type: 'productionQuality'},
  ];

  return <>
    <Card title={<Breadcrumb />}>
      <div style={{maxWidth: 1200, margin: 'auto'}}>
        {
          dataSource.map((item, index) => {
            return <Card.Grid
              key={index}
              style={{textAlign: 'center', cursor: 'pointer', width: '15%', padding: 0}}
            >
              <Card
                // bordered={false}
                actions={[
                  <Button
                    type="link"
                    style={{padding: 0}}
                    onClick={() => {
                      history.push(`/BASE_SYSTEM/documents/setting?type=${item.type}`);
                    }}>编辑</Button>,
                ]}
              >
                {item.name}
              </Card>
            </Card.Grid>;
          })
        }
      </div>
    </Card>

  </>;
};

export default List;
