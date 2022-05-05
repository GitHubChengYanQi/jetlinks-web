import {Button, Space} from 'antd';
import React from 'react';
import PurchaseListingList from '@/pages/Purshase/purchaseListing/purchaseListingList';
import AuditButton from '@/pages/Workflow/Documents/components/AuditButton';
import CreateOrder from '@/pages/Order/CreateOrder';
import Draft from '@/components/Form/components/Draft';


export const createPurcaseOrder = ({
  setModalProps,
  setDocument,
  modalRef,
  setAddLoading,
  addRef,
  data = {},
  onSuccess,
  title,
  orderModule,
}) => {

  setModalProps({
    width: '80vw',
    title,
  });

  setDocument(<CreateOrder
    modalRef={modalRef}
    orderModule={orderModule}
    skus={data.skus}
    ref={addRef}
    loading={setAddLoading}
    onSuccess={onSuccess}
  />);
};


export const actionPurcaseOrder = ({
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

export const PurchaseOrderFooter = ({
  addLoading,
  addRef,
  value,
  modalRef,
  createDocument,
  run,
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
      <Draft
        type="purcaseOrder"
        getValues={async () => {
          return await addRef.current.getFormState();
        }}
        onChange={(value) => {
          addRef.current.setFormState(value);
        }}
      />
    </Space>;
  }

  return <Space>
    <AuditButton res={res} taskId={res.processTaskId} refresh={() => {
      run({params: {taskId: res.processTaskId},});
    }} />
    <Button onClick={() => {
      modalRef.current.close();
    }}>取消</Button>
  </Space>;

};
