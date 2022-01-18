import React, {useImperativeHandle, useRef, useState} from 'react';
import {Button, Card, Descriptions, Empty, InputNumber, message, Select, Space, Spin} from 'antd';
import {useSetState} from 'ahooks';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';
import Modal from '@/components/Modal';
import PurchaseQuotationList from '@/pages/Purshase/purchaseQuotation/purchaseQuotationList';
import {useRequest} from '@/util/Request';
import Customer from '@/pages/Purshase/procurementPlan/components/procurementPlanDetal/components/Customer';


const CreateProcurementOrder = ({value, palnId, onSuccess}, ref) => {

  const [items, setItems] = useSetState({
    data: value && value.map((item) => {
      return {
        status: 99,
        skuResult: item.skuResult,
        skuId: item.skuId,
        number: item.total,
        detailId: item.detailId
      };
    })
  });

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
    const noCustomer = items.data.filter((item) => {
      return !item.customerId;
    });
    if (noCustomer.length > 0) {
      return message.warn('请选择供应商！');
    }
    createOrder(
      {
        data: {
          detailParams: items.data,
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

  const customerRef = useRef();

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
        items.data.map((item, index) => {
          const th = index === 0 || null;
          return <Descriptions key={index} column={5} layout="vertical" bordered>
            <Descriptions.Item label={th && '物料'} style={{width: 500}}>
              <SkuResultSkuJsons skuResult={item.skuResult} />
            </Descriptions.Item>
            <Descriptions.Item label={th && '数量'} style={{width: 100}}>
              {item.number}
            </Descriptions.Item>
            <Descriptions.Item label={th && '供应商'}>
              <Space>
                <Select
                  style={{width: 200}}
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
                    const array = items.data;
                    array[index] = {...array[index], customerId: null, customerName: null, brandId: null};
                    setItems({data: array});
                  }}
                  filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  onChange={(value, option) => {
                    const array = items.data;
                    array[index] = {
                      ...array[index],
                      customerId: value,
                      customerName: option && option.label,
                      brandId: option && option.id
                    };
                    setItems({data: array});
                  }}
                />
                {item.customerId && <Button type="link" onClick={()=>{
                  customerRef.current.open({...item,key:item.skuId});
                }}>完善信息</Button>}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label={th && '总价'} style={{width: 100}}>
              <InputNumber min={0} value={item.price} onChange={(value) => {
                const array = items.data;
                array[index] = {
                  ...array[index],
                  price: value,
                };
                setItems({data: array});
              }} />
            </Descriptions.Item>
            <Descriptions.Item style={{width: 100}} contentStyle={{textAlign: 'center'}}>
              <Button type="link" onClick={() => {
                quotationRef.current.open({
                  skuId: item.skuId,
                  customerId: item.customerId,
                  check: true,
                  name: <Space><SkuResultSkuJsons skuResult={item.skuResult} />{item.customerName}</Space>
                });
              }}>报价信息</Button>
            </Descriptions.Item>
          </Descriptions>;
        })
      }
    </Card>

    <Modal
      width={1700}
      ref={quotationRef}
      action
      component={PurchaseQuotationList}
      onSuccess={async (res) => {
        let supplys = [];
        if (skuId !== res.skuId) {
          setSkuId(res.skuId);
          supplys = await run({
            params: {
              skuId: res.skuId
            }
          });
        }
        const array = items.data.map((item) => {
          if (item.skuId === res.skuId) {
            return {
              ...item,
              customerId: res.customerId,
              brandId: supplys.filter((item) => {
                return item.customerId === res.customerId;
              })[0],
              customerName: res.customerResult.customerName,
              price: parseInt(item.number, 0) * parseInt(res.price, 0)
            };
          } else {
            return item;
          }
        });
        setItems({data: array});
        quotationRef.current.close();
      }} />

    <Modal
      headTitle='完善信息'
      width={300}
      ref={customerRef}
      component={Customer}
      onSuccess={(res) => {
        const array = items.data.map((item) => {
          if (item.skuId === res.key) {
            return {
              ...item,
              ...res,
            };
          } else {
            return item;
          }
        });
        setItems({data: array});
        customerRef.current.close();
      }} />
  </>;
};

export default React.forwardRef(CreateProcurementOrder);
