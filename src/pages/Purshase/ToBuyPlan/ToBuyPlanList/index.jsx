import React, {useEffect, useRef, useState} from 'react';
import {Button, Card, Divider, Input, message, Modal as AntModal, notification, Space, Table as AntTable} from 'antd';
import {addProcurement, toBuyPlanList} from '@/pages/Purshase/ToBuyPlan/Url';
import Breadcrumb from '@/components/Breadcrumb';
import {useRequest} from '@/util/Request';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';
import Modal from '@/components/Modal';
import Quote from '@/pages/Purshase/Quote';

const {Column} = AntTable;

const ToBuyPlanList = () => {

  const {loading, data, run, refresh} = useRequest(toBuyPlanList, {manual: true});

  const [visible, setVisible] = useState();

  const quoteRef = useRef();

  const [createPlanData, setCreatePlanData] = useState({});

  const {loading: addPlanLoading, run: addPlan} = useRequest(
    addProcurement,
    {
      manual: true,
      onSuccess: () => {
        setVisible(false);
        refresh();
        notification.success({
          message: '创建采购计划成功！',
        });
      }
    });

  const dataSource = data && data.map((items) => {
    return {
      ...items,
      purchaseListingId: `mainKey:${items.children && items.children.map((items) => {
        return items.purchaseListingId;
      }).toString()}`,
    };
  });

  const [keys, setKeys] = useState([]);

  const getMainKey = (key) => {
    return key.replace('mainKey:', '').split(',');
  };


  // 操作key
  const selectKeys = (key, checked) => {
    let array = [];

    if (checked)
      array.push(key);
    else
      array = keys.filter((value) => {
        return value !== key;
      });

    if (key.indexOf('mainKey') !== -1) {
      getMainKey(key).map((items) => {
        if (checked)
          return array.push(items);
        else
          return array = array.filter((value) => {
            return value !== items;
          });
      });
    } else {
      const mainKeys = dataSource.filter((value) => {
        return getMainKey(value.purchaseListingId).filter((item) => {
          return item === key;
        }).length > 0;
      });

      if (mainKeys && mainKeys.length > 0) {
        if (checked) {
          const allKeys = getMainKey(mainKeys[0].purchaseListingId).filter((value) => {
            if (value === key) {
              return true;
            } else {
              return keys.filter((items) => {
                return items === value;
              }).length > 0;
            }
          });
          if (allKeys.length === getMainKey(mainKeys[0].purchaseListingId).length) {
            array.push(mainKeys[0].purchaseListingId);
          }
        } else {
          array = array.filter((items) => {
            return items !== mainKeys[0].purchaseListingId;
          });
        }
      }
    }
    if (checked)
      setKeys(keys.concat(array));
    else
      setKeys(array);
  };


  useEffect(() => {
    run();
  }, []);

  return <div>
    <div style={{padding: 16}}>
      <Breadcrumb />
    </div>
    <Divider style={{width: '100%', margin: 0}} />
    <Space style={{padding: 16}}>
      <Button
        disabled={keys.length === 0}
        type="default"
        onClick={() => {
          setVisible(true);
        }}>创建采购计划</Button>
      <Button
        type="default"
        onClick={() => {
          quoteRef.current.open(true);
        }}>添加报价</Button>
      <Divider style={{margin: '16px 0 0 0'}} />
    </Space>
    <Card bordered style={{margin: '0 16px'}}>
      <AntTable
        pagination={false}
        rowSelection={{
          selectedRowKeys: keys,
          onSelectAll: (selected, selectedRows) => {
            if (selected) {
              setKeys(selectedRows.map((items) => {
                return items && items.purchaseListingId;
              }));
            } else {
              setKeys([]);
            }
          },
          onSelect: (record, selected) => {
            selectKeys(record.purchaseListingId, selected);
          }
        }}
        dataSource={dataSource || []}
        loading={loading}
        rowKey="purchaseListingId"
      >
        <Column title="物料" dataIndex="skuResult" render={(value) => {
          return value && <SkuResultSkuJsons skuResult={value} />;
        }} />
        <Column title="数量" dataIndex="applyNumber" />
        <Column title="申请人" dataIndex="user" render={(value) => {
          return <>{value && value.name}</>;
        }} />
        <Column title="申请时间" dataIndex="createTime" />
        <Column title="历史报价" dataIndex="skuId" render={(value, record) => {
          if (record.purchaseListingId.indexOf('mainKey:') !== -1) {
            return <Button type="link">
              查看
            </Button>;
          }
        }} />
        <Column title="历史交货周期" />
        <Column title="交付日期" dataIndex="deliveryDate" />
        <Column title="操作" />
      </AntTable>
    </Card>

    <AntModal
      visible={visible}
      title="创建采购计划"
      onCancel={() => {
        setVisible(false);
      }}
      confirmLoading={addPlanLoading}
      onOk={async () => {
        if (createPlanData.procurementPlanName) {
          const addKeys = keys.filter((items) => {
            return items.indexOf('mainKey:') === -1;
          });
          await addPlan({
            data: {
              ...createPlanData,
              listingIds: addKeys
            }
          });
        } else {
          message.warn('请输入采购计划名称！');
        }
      }}>
      <Space direction="vertical" style={{width: '100%'}}>
        <Input placeholder="采购计划名称" onChange={(value) => {
          setCreatePlanData({...createPlanData, procurementPlanName: value.target.value});
        }} />
        <Input.TextArea placeholder="输入采购计划备注..." onChange={(value) => {
          setCreatePlanData({...createPlanData, remark: value.target.value});
        }} />
      </Space>
    </AntModal>

    <Modal headTitle='添加报价信息' skus={data && data.map((items)=>{
      return {
        value:items.skuId,
        label:<SkuResultSkuJsons skuResult={items.skuResult} />
      };
    })} width={1870} ref={quoteRef} component={Quote} onSuccess={() => {
      quoteRef.current.close();
    }} />


  </div>;
};

export default ToBuyPlanList;
