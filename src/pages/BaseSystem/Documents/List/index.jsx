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
    {name: '采购申请单', type: 'PURCHASE'},
    {name: '采购单', type: 'PURCHASEORDER'},
    {name: '入库单', type: 'INSTOCK'},
    {name: '入库异常', type: 'INSTOCKERROR'},
    {name: '出库单', type: 'OUTSTOCK'},
    {name: '质检单', type: 'QUALITY'},
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
                    processRef.current.open(item.type);
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
      noTitle
      headTitle="流程管理"
      width={1000}
      component={ProcessList}
      ref={processRef}
    />

  </>;
};

export default List;
