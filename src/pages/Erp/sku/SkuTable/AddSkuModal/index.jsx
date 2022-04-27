import React, {useImperativeHandle, useRef, useState} from 'react';
import {Button, Modal as AntModal} from 'antd';
import Modal from '@/components/Modal';
import SkuEdit from '@/pages/Erp/sku/skuEdit';
import {useRequest} from '@/util/Request';
import Message from '@/components/Message';

const AddSkuModal = ({
  tableRef,
  copy,
  edit,
  addRef,
  onSuccess = () => {
  },
}, ref) => {

  const formRef = useRef();

  const [loading, setLoading] = useState();

  const {loading: batchLoading, run: batchRun} = useRequest({url: '/sku/batchAdd', method: 'POST'}, {
    manual: true,
    onSuccess: () => {
      onSuccess();
      addRef.current.close();
      Message.success('保存成功！');
      if (tableRef) {
        tableRef.current.submit();
      }
    },
    onError: () => {
      Message.error('导入失败!');
    }
  });

  useImperativeHandle(ref, () => ({
    batchRun,
  }));

  return <>
    <Modal
      title="物料"
      compoentRef={formRef}
      loading={setLoading}
      component={SkuEdit}
      onRepeat={(oldData, newData) => {

        const describe = [];
        oldData.skuJsons && oldData.skuJsons.map((item) => {
          return describe.push({
            label: item.attribute && item.attribute.attribute,
            value: item.values && item.values.attributeValues
          });
        });
        newData.sku && newData.sku.map((item) => {
          return describe.push(item);
        });

        AntModal.confirm({
          centered: true,
          title: '发现重复物料,请选择操作方式',
          okButtonProps: {type: 'primary', ghost: true},
          cancelButtonProps: {type: 'primary', ghost: true, loading: batchLoading},
          okText: '合并物料',
          cancelText: '继续保存',
          onOk: () => {
            addRef.current.close();
            addRef.current.open({
              errKey: newData.errKey,
              ...oldData,
              specifications:newData.specifications || oldData.specifications,
              newCoding: newData.standard,
              merge: true,
              skuJsons: [],
              defaultValue: {
                sku: describe
              }
            });
          },
          onCancel: () => {
            batchRun({
              data: {
                skuParams: [newData]
              }
            });
          }
        });
      }}
      onSuccess={(res, action) => {
        onSuccess(action);
        if (action) {
          tableRef.current.refresh();
        } else {
          tableRef.current.submit();
        }
        addRef.current.close();
      }}
      ref={addRef}
      footer={<>
        {copy && <Button
          loading={loading}
          type="primary"
          ghost
          onClick={() => {
            formRef.current.copyAdd(true);
          }}
        >复制并拷贝BOM(工艺路线)</Button>}
        {!edit && <Button
          loading={loading}
          type="primary"
          ghost
          onClick={() => {
            formRef.current.nextAdd(true);
          }}
        >完成并添加下一个</Button>}
        <Button
          loading={loading}
          type="primary"
          onClick={() => {
            formRef.current.nextAdd(false);
          }}
        >完成</Button>
      </>} />
  </>;
};

export default React.forwardRef(AddSkuModal);
