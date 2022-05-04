import {Button, Space} from 'antd';
import React from 'react';
import Message from '@/components/Message';
import AuditButton from '@/pages/Workflow/Documents/components/AuditButton';
import InstockEdit from '@/pages/Erp/instock/InstockEdit';
import Instock from '@/pages/Erp/instock/InstockEdit/components/Instock';


export const createInstockAsk = ({
  setModalProps,
  setDocument,
  modalRef,
  addLoading,
  setLoading,
  purchaseAskAddRef,
  value
}) => {

  setModalProps({
    width: '70vw',
    title: '创建入库申请单',
    footer: <Space>
      <Button loading={addLoading} type="primary" onClick={() => {
        purchaseAskAddRef.current.submit();
      }}>{value ? '修改' : '创建'}</Button>
      <Button onClick={() => {
        modalRef.current.close();
      }}>取消</Button>
    </Space>
  });

  setDocument(<InstockEdit
    value={value}
    ref={purchaseAskAddRef}
    loading={setLoading}
    onSuccess={() => {
      Message.success('创建入库单成功！');
      modalRef.current.close();
    }}
    onError={() => {
      Message.success('创建入库请单失败！');
    }}
  />);
};


export const actionInstockAsk = ({
  setModalProps,
  setDocument,
  res,
  run,
  modalRef
}) => {

  setDocument(<Instock value={res.formId} />);

  setModalProps({
    title: '采购申请单',
    width: '50vw',
    footer: <Space>
      <AuditButton res={res} taskId={res.processTaskId} refresh={() => {
        run({params: {taskId: res.processTaskId},});
      }} />
      <Button onClick={() => {
        modalRef.current.close();
      }}>取消</Button>
    </Space>
  });
};
