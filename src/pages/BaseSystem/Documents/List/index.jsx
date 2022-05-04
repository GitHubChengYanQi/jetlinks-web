import React, {useRef} from 'react';
import {Button, Card} from 'antd';
import {useHistory} from 'ice';
import Breadcrumb from '@/components/Breadcrumb';
import Modal from '@/components/Modal';
import ProcessList from '@/pages/Workflow/Process/processList';

const List = () => {

  const history = useHistory();

  const processRef = useRef();

  const dataSource = [
    {name: '采购申请单', type: 'purchaseAsk'},
    {name: '采购单', type: 'purchaseOrder'},
    {name: '入库申请单', type: 'createInstock'},
    {name: '入库异常', type: 'instockError'},
    {name: '入厂检', type: 'inQuality'},
    {name: '出厂检', type: 'outQuality'},
    {name: '生产检', type: 'productionQuality'},
  ];

  return <>
    <Card title={<Breadcrumb />}>
      <div style={{maxWidth: 1200, margin: 'auto'}}>
        {
          dataSource.map((item, index) => {
            return <Card.Grid
              key={index}
              style={{textAlign: 'center', width: '20%', padding: 0}}
            >
              <div style={{padding: 24}}>
                {item.name}
              </div>
              <div style={{display: 'flex'}}>
                <Button
                  type="link"
                  style={{padding: 0, flexGrow: 1}}
                  onClick={() => {
                    processRef.current.open(false);
                  }}>流程设置</Button>
                <Button
                  type="link"
                  style={{padding: 0, flexGrow: 1}}
                  onClick={() => {
                    history.push(`/BASE_SYSTEM/documents/setting?type=${item.type}`);
                  }}>状态设置</Button>
              </div>
            </Card.Grid>;
          })
        }
      </div>
    </Card>

    <Modal
      width={1000}
      component={ProcessList}
      ref={processRef}
    />

  </>;
};

export default List;
