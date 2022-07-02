import React, {useRef} from 'react';
import {Button, Card} from 'antd';
import {useHistory} from 'ice';
import Breadcrumb from '@/components/Breadcrumb';
import Modal from '@/components/Modal';
import ProcessList from '@/pages/Workflow/Process/processList';
import {DocumentEnums} from '@/pages/BaseSystem/Documents/Enums';

const List = () => {

  const history = useHistory();

  const processRef = useRef();

  const dataSource = [
    {name: '采购申请单', type: DocumentEnums.purchaseAsk},
    {name: '采购单', type: DocumentEnums.purchaseOrder},
    {name: '入库单', type: DocumentEnums.instockOrder},
    {name: '异常单', type: DocumentEnums.instockError},
    {name: '出库单', type: DocumentEnums.outstockOrder},
    {name: '盘点单', type: DocumentEnums.stocktaking},
    {name: '养护单', type: DocumentEnums.maintenance},
    {name: '质检单', type: DocumentEnums.quality},
  ];

  return <>
    <Card title={<Breadcrumb />}>
      <div style={{maxWidth: 1200, margin: 'auto'}}>
        {
          dataSource.map((item, index) => {
            return <Card.Grid
              key={index}
              style={{textAlign: 'center', width: '20%', padding: 0,display:'inline-block'}}
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
                <Button
                  type="link"
                  style={{padding: 0, flexGrow: 1}}
                  onClick={() => {
                    history.push(`/BASE_SYSTEM/documents/permissions?type=${item.type}`);
                  }}>权限设置</Button>
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
