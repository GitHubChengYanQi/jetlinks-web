import React, {useEffect, useRef, useState} from 'react';
import {Button, Card, Checkbox, Col, Descriptions, List, Row, Space, Table as AntTable} from 'antd';
import ProSkeleton from '@ant-design/pro-skeleton';
import {pendingProductionByOrder} from '@/pages/Production/Url';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';
import Note from '@/components/Note';
import {useRequest} from '@/util/Request';
import Coding from '@/pages/Erp/tool/components/Coding';

const {Column} = AntTable;

const OrderList = ({checkedSkus, setCheckedSkus, refresh}) => {

  const [orderKeys, setOrderKeys] = useState([]);

  const tableRef = useRef();

  const {loading, data} = useRequest(pendingProductionByOrder);

  useEffect(() => {
    if (refresh) {
      setOrderKeys([]);
      tableRef.current.submit();
    }
  }, [refresh]);

  if (loading) {
    return <ProSkeleton type="descriptions" />;
  }

  const onChecked = (checked, rowItem, orderItem) => {
    if (checked) {
      const orderDetails = checkedSkus.filter((item) => {
        return item.orderId === rowItem.orderId;
      });
      if (orderDetails.length + 1 === orderItem.detailResults.length) {
        setOrderKeys([...orderKeys, rowItem.orderId]);
      }
      setCheckedSkus([...checkedSkus, rowItem]);
    } else {
      const array = checkedSkus.filter((item) => {
        return item.detailId !== rowItem.detailId;
      });
      setCheckedSkus(array);
      const orders = orderKeys.filter((item) => {
        return item !== rowItem.orderId;
      });
      setOrderKeys(orders);
    }
  };

  return <>
    <div style={{maxWidth: 1250, margin: 'auto'}}>
      <List
        bordered={false}
        dataSource={data}
        renderItem={(orderItem) => (
          <div style={{margin: '16px 0'}}>
            <Card
              type="inner"
              title={<Space size={24}>
                <div>
                  <Checkbox checked={orderKeys.includes(orderItem.orderId)} onChange={(value) => {
                    if (value.target.checked) {
                      setOrderKeys([...orderKeys, orderItem.orderId]);
                      setCheckedSkus([...checkedSkus, ...orderItem.detailResults]);
                    } else {
                      const array = orderKeys.filter((item) => {
                        return item !== orderItem.orderId;
                      });
                      setOrderKeys(array);
                      const skus = checkedSkus.filter((item) => {
                        return array.includes(item.orderId);
                      });
                      setCheckedSkus(skus);
                    }
                  }} />
                </div>
                <div>订单号 / {orderItem.coding}</div>
                <div>客户 / {orderItem && orderItem.acustomer && orderItem.acustomer.customerName}</div>
              </Space>}
              bodyStyle={{padding: 0}}
              extra={<Space size={24}>
                <div>
                  创建时间 / {orderItem.createTime}
                </div>
                <div>
                  交货时间 /{orderItem.deliveryDate}
                </div>
              </Space>}
            >
              <List
                bordered={false}
                dataSource={orderItem.detailResults}
                renderItem={(rowItem) => {
                  const skuResult = rowItem.skuResult || {};
                  return <div style={{padding: 24,borderBottom:'solid #eee 1px'}}>
                    <Space size={24}>
                      <Checkbox
                        checked={checkedSkus.map(item => item.detailId).includes(rowItem.detailId)}
                        onChange={(value) => {
                          onChecked(value.target.checked, rowItem, orderItem);
                        }} />
                      <Space direction="vertical" style={{cursor: 'pointer'}} onClick={()=>{
                        onChecked(!checkedSkus.map(item => item.detailId).includes(rowItem.detailId), rowItem, orderItem);
                      }}>
                        <div>
                          物料编码 / {skuResult && skuResult.standard}
                        </div>
                        <Button type="link" style={{padding: 0}}>
                          <SkuResultSkuJsons skuResult={skuResult} />
                        </Button>
                      </Space>
                      <div>
                        × {rowItem.purchaseNumber}
                      </div>
                    </Space>
                    <div style={{float: 'right', lineHeight: '62px'}}>
                      <SkuResultSkuJsons describe skuResult={skuResult} />
                    </div>
                  </div>;
                }} />
            </Card>
          </div>
        )}
      />
    </div>
  </>;
};

export default OrderList;
