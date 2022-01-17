import React, {useImperativeHandle, useRef, useState} from 'react';
import {Button, Card, Descriptions, Empty, Input, InputNumber, message, Select, Spin} from 'antd';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';
import Modal from '@/components/Modal';
import PurchaseQuotationList from '@/pages/Purshase/purchaseQuotation/purchaseQuotationList';
import {useRequest} from '@/util/Request';


const CreateProcurementOrder = ({value, palnId, onSuccess}, ref) => {

  const [data, setData] = useState(value && value.map((item) => {
    return {
      status: 99,
      skuResult: item.skuResult,
      skuId: item.skuId,
      number: item.total,
      detailId: item.detailId
    };
  }));

  const {run: createOrder} = useRequest({
    url: '/procurementOrder/add',
    method: 'POST',
  }, {
    manual: true,
    onSuccess: () => {
      onSuccess();
    }
  });

  const create = () => {
    const noCustomer = data.filter((item) => {
      return !item.customerId;
    });
    if (noCustomer.length > 0) {
      return message.warn('请选择供应商！');
    }
    createOrder(
      {
        data: {
          detailParams: data,
          procurementPlanId: palnId,
          status: 99,
        }
      }
    );
  };

  useImperativeHandle(ref, () => ({
    create,
  }));

  const quotationRef = useRef();

  const {loading, data: brands, run} = useRequest({
    url: '/supplierBrand/getSupplierBySku',
    method: 'GET'
  }, {
    manual: true
  });

  const [skuId, setSkuId] = useState();

  const options = !loading ? brands && brands.map((item) => {
    return {
      value: item.customerId,
      id: item.brandResults && item.brandResults[0].brandId,
      label: item.customerName
    };
  }) : [];

  if (!Array.isArray(value)) {
    return <Empty />;
  }

  return <>
    <Card title="创建采购单">
      {
        data.map((item, index) => {
          const th = index === 0 || null;
          return <Descriptions key={index} column={5} layout="vertical" bordered>
            <Descriptions.Item label={th && '物料'} style={{width: 500}}>
              <SkuResultSkuJsons skuResult={item.skuResult} />
            </Descriptions.Item>
            <Descriptions.Item label={th && '数量'} style={{width: 100}}>
              {item.number}
            </Descriptions.Item>
            <Descriptions.Item label={th && '供应商'} style={{width: 300}}>
              <Select
                style={{width: '100%'}}
                options={options}
                value={item.customerId}
                showSearch
                onFocus={() => {
                  if (skuId !== item.skuId) {
                    setSkuId(item.skuId);
                    run({
                      params: {
                        skuId: item.skuId
                      }
                    });
                  }
                }}
                notFoundContent={loading && <div style={{textAlign: 'center', padding: 16}}><Spin /></div>}
                allowClear={() => {
                  const array = data;
                  array[index] = {...array[index], customerId: null};
                  setData(array);
                }}
                filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                onChange={(value, option) => {
                  const array = data;
                  array[index] = {...array[index], customerId: value, brandId: option.id};
                  setData(array);
                }}
              />
            </Descriptions.Item>
            <Descriptions.Item label={th && '总价'} style={{width: 100}}>
              <InputNumber />
            </Descriptions.Item>
            <Descriptions.Item style={{width: 100}} contentStyle={{textAlign: 'center'}}>
              <Button type="link" onClick={() => {
                quotationRef.current.open({skuId: item.skuId, check: true});
              }}>报价信息</Button>
            </Descriptions.Item>
          </Descriptions>;
        })
      }
    </Card>

    <Modal
      width={1600}
      ref={quotationRef}
      component={PurchaseQuotationList}
      onSuccess={() => {
        quotationRef.current.close();
      }} />
  </>;
};

export default React.forwardRef(CreateProcurementOrder);
