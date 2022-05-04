import {Button, Space} from 'antd';
import React from 'react';
import PurchaseAskEdit from '@/pages/Purshase/purchaseAsk/purchaseAskEdit';
import Message from '@/components/Message';
import PurchaseListingList from '@/pages/Purshase/purchaseListing/purchaseListingList';
import AuditButton from '@/pages/Workflow/Documents/components/AuditButton';

export const createPurcaseAsk = ({
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
    title: '创建采购申请单',
    footer: <Space>
      <Button loading={addLoading} type="primary" onClick={() => {
        purchaseAskAddRef.current.submit();
      }}>{value ? '修改' : '创建'}</Button>
      <Button onClick={() => {
        modalRef.current.close();
      }}>取消</Button>
    </Space>
  });

  setDocument(<PurchaseAskEdit
    value={value}
    ref={purchaseAskAddRef}
    loading={setLoading}
    onSuccess={() => {
      Message.success('创建采购申请单成功！');
      modalRef.current.close();
    }}
    onError={() => {
      Message.success('创建采购申请单失败！');
    }}
  />);
};


export const actionPurchaseAsk = ({
  setModalProps,
  setDocument,
  res,
  run,
  modalRef
}) => {

  setDocument(<PurchaseListingList value={res.formId} />);

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
