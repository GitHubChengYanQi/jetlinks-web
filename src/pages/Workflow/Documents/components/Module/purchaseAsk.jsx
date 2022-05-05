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
  setAddLoading,
  addRef,
  value,
  data = {},
  onSuccess,
}) => {

  setModalProps({
    width: '70vw',
    title: '创建采购申请单',
  });

  setDocument(<PurchaseAskEdit
    skus={data.skus}
    value={value}
    ref={addRef}
    loading={setAddLoading}
    onSuccess={() => {
      Message.success('创建采购申请单成功！');
      onSuccess();
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
}) => {

  setDocument(<PurchaseListingList value={res.formId} />);

  setModalProps({
    title: '采购申请单',
    width: '50vw',
  });
};

export const PurchaseAskFooter = ({
  addLoading,
  addRef,
  value,
  modalRef,
  createDocument,
  run,
  currentNode = [],
  res,
}) => {

  if (createDocument) {
    return <Space>
      <Button loading={addLoading} type="primary" onClick={() => {
        addRef.current.submit();
      }}>{value ? '修改' : '创建'}</Button>
      <Button onClick={() => {
        modalRef.current.close();
      }}>取消</Button>
    </Space>;
  }

  const buttons = () => {
    const actions = [];
    currentNode.map((item) => {
      if (item.logResult && Array.isArray(item.logResult.actionResults)) {
        return item.logResult.actionResults.map((item) => {
          return actions.push(item.action);
        });
      }
      return null;
    });
    return <Space>
      <AuditButton res={res} taskId={res.processTaskId} refresh={() => {
        run({params: {taskId: res.processTaskId},});
      }} />
      <Button type="primary" ghost hidden={!actions.includes('perform')}>执行采购</Button>
    </Space>;
  };

  return <Space>
    {buttons()}
    <Button onClick={() => {
      modalRef.current.close();
    }}>取消</Button>
  </Space>;

};
