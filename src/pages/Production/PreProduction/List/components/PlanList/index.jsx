import React, {useEffect, useState} from 'react';
import {Card, Checkbox, List, Space} from 'antd';
import ProSkeleton from '@ant-design/pro-skeleton';
import {pendingProductionPlan} from '@/pages/Production/Url';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';
import {useRequest} from '@/util/Request';


const PlanList = ({checkedSkus, setCheckedSkus, refresh}) => {

  const [skuKeys, setSkuKeys] = useState([]);

  const {loading, data, refresh: planResh} = useRequest(pendingProductionPlan);

  useEffect(() => {
    if (refresh) {
      setSkuKeys([]);
      planResh();
    }
  }, [refresh]);

  if (loading) {
    return <ProSkeleton type="descriptions" />;
  }

  const onChecked = (checked, rowItem, skuRecord) => {
    if (checked) {
      const skuDetails = checkedSkus.filter((item) => {
        return item.skuId === rowItem.skuId;
      });
      if (skuDetails.length + 1 === skuRecord.children.length) {
        setSkuKeys([...skuKeys, skuRecord.skuId]);
      }
      setCheckedSkus([...checkedSkus, rowItem]);
    } else {
      const array = checkedSkus.filter((item) => {
        return item.detailId !== rowItem.detailId;
      });
      setCheckedSkus(array);
      const skus = skuKeys.filter((item) => {
        return item !== skuRecord.skuId;
      });
      setSkuKeys(skus);
    }
  };

  return <>
    <div style={{maxWidth: 1250, margin: 'auto'}}>
      <List
        bordered={false}
        dataSource={data}
        renderItem={(skuItem) => {
          const skuResult = skuItem.skuResult || {};

          return <div style={{margin: '16px 0'}}>
            <Card
              type="inner"
              title={<Space size={24}>
                <Checkbox checked={skuKeys.includes(skuItem.skuId)} onChange={(value) => {
                  if (value.target.checked) {
                    setSkuKeys([...skuKeys, skuItem.skuId]);
                    setCheckedSkus([...checkedSkus, ...skuItem.children]);
                  } else {
                    const array = skuKeys.filter((item) => {
                      return item !== skuItem.skuId;
                    });
                    setSkuKeys(array);
                    const skus = checkedSkus.filter((item) => {
                      return array.includes(item.skuId);
                    });
                    setCheckedSkus(skus);
                  }
                }}>
                  <Space size={24} style={{paddingLeft: 16}}>
                    <div>物料编码 / {skuResult.standard}</div>
                    <div>{skuResult.spuResult && skuResult.spuResult.name} / {skuResult.skuName} / {skuResult.specifications || '无'}</div>
                  </Space>
                </Checkbox>
              </Space>}
              bodyStyle={{padding: 0}}
              extra={<div>描述 / <SkuResultSkuJsons describe skuResult={skuResult} /></div>}
            >
              <List
                bordered={false}
                dataSource={skuItem.children}
                renderItem={(rowItem) => {
                  return <div style={{padding: 24, borderBottom: 'solid #eee 1px'}}>
                    <Space size={24}>
                      <Checkbox
                        checked={checkedSkus.map(item => item.detailId).includes(rowItem.detailId)}
                        onChange={(value) => {
                          onChecked(value.target.checked, rowItem, skuItem);
                        }} />
                      <Space size={24} style={{cursor: 'pointer'}} onClick={() => {
                        onChecked(!checkedSkus.map(item => item.detailId).includes(rowItem.detailId), rowItem, skuItem);
                      }}>
                        <div>
                          数量 / {rowItem.purchaseNumber}
                        </div>
                        <div>
                          交货日期 / {rowItem.deliveryDate}
                        </div>
                      </Space>
                    </Space>
                  </div>;
                }} />
            </Card>
          </div>;
        }}
      />
    </div>
  </>;
};
export default PlanList;
