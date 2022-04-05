import React, {useImperativeHandle, useState} from "react";
import {Button, Descriptions, Input, Modal as AntModal, Select as AntSelect, Space} from "antd";
import Coding from "@/pages/Erp/tool/components/Coding";
import {useRequest} from "@/util/Request";
import {purchaseAskAdd} from "@/pages/Purshase/purchaseAsk/purchaseAskUrl";
import Message from "@/components/Message";

const PurchaseAsk = ({skus, ...porps}, ref) => {

  const [visible, setVisible] = useState();

  const {loading, run} = useRequest(purchaseAskAdd, {
    manual: true,
    onSuccess: () => {
      setVisible(false);
      Message.success('发起采购申请成功！');
    },
    onError: () => {
      Message.error('发起采购申请失败！');
    }
  });

  const [ask, setAsk] = useState({});


  useImperativeHandle(ref, () => ({
    open: setVisible
  }));

  return <>
    <AntModal
      zIndex={999}
      visible={visible}
      title='发起采购'
      onCancel={() => {
        setVisible(false);
      }}
      footer={<Space>
        <Button onClick={() => {
          setVisible(visible);
        }}>取消</Button>
        <Button loading={loading} type='primary' onClick={() => {
          run({
            data: {
              ...ask,
              purchaseListings: skus.map((item) => {
                return {
                  skuId: item.skuId,
                  applyNumber: item.lackNumber,
                };
              })
            }
          });
        }}>发起采购</Button>
      </Space>}>
      <Descriptions column={1} labelStyle={{width: 80, padding: 4}}>
        <Descriptions.Item
          label="采购编码">
          <Coding module={5} value={ask.coding} onChange={(coding) => {
            setAsk({...ask, coding});
          }}/></Descriptions.Item>
        <Descriptions.Item
          label="采购类型">
          <AntSelect style={{width: 200}} placeholder="请选择类型" options={[{
            label: '生产采购',
            value: '0',
          }, {
            label: '库存采购',
            value: '1',
          }, {
            label: '行政采购',
            value: '2',
          }, {
            label: '销售采购',
            value: '3',
          }, {
            label: '紧急采购',
            value: '4',
          },]} onChange={(value) => {
            setAsk({...ask, type: value});
          }}/>
        </Descriptions.Item>
        <Descriptions.Item
          label="采购备注">
          <Input placeholder="请输入采购备注" onChange={(string) => {
            setAsk({...ask, note: string.target.value});
          }}/>
        </Descriptions.Item>
      </Descriptions>
    </AntModal>
  </>;
};

export default React.forwardRef(PurchaseAsk);
