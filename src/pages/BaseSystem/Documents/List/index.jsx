import React from 'react';
import {Button, Card, Divider} from 'antd';
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
              style={{textAlign: 'center', width: '20%',padding:0}}
            >
              <div style={{padding:24}}>
                {item.name}
              </div>
              <Divider style={{margin:0}} />
              <div style={{display:'flex'}}>
                <Button
                  type="link"
                  style={{padding: 0,flexGrow:1}}
                  onClick={() => {
                    history.push(`/BASE_SYSTEM/documents/setting?type=${item.type}`);
                  }}>设置</Button>
              </div>
            </Card.Grid>;
          })
        }
      </div>
    </Card>

  </>;
};

export default List;
