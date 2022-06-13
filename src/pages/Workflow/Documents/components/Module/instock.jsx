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
  setAddLoading,
  addRef,
  value,
  onSuccess
}) => {

  setModalProps({
    width: '70vw',
    title: '创建入库申请单',
  });

  setDocument(<InstockEdit
    value={value}
    ref={addRef}
    loading={setAddLoading}
    onSuccess={() => {
      Message.success('创建入库单成功！');
      onSuccess();
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
}) => {

  setDocument(<Instock value={res.formId} />);

  setModalProps({
    title: '采购申请单',
    width: '50vw',
  });
};

export const CreateInstockFooter = ({
  addLoading,
  addRef,
  value,
  createDocument,
  run,
  modalRef,
  res
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

  return <Space>
    <AuditButton res={res} taskId={res.processTaskId} refresh={() => {
      run({params: {taskId: res.processTaskId},});
    }} />
    <Button onClick={() => {
      modalRef.current.close();
    }}>取消</Button>
  </Space>;

};


