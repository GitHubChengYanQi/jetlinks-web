import React, {useEffect, useRef, useState} from 'react';
import {Button, Card, Divider, Input, message, Modal as AntModal, notification, Space, Table as AntTable} from 'antd';
import {addProcurement, toBuyPlanList} from '@/pages/Purshase/ToBuyPlan/Url';
import Breadcrumb from '@/components/Breadcrumb';
import {useRequest} from '@/util/Request';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';
import Modal from '@/components/Modal';
import Quote from '@/pages/Purshase/Quote';
import PurchaseQuotationList from '@/pages/Purshase/purchaseQuotation/purchaseQuotationList';
import InquiryTaskEdit from '@/pages/Purshase/inquiryTask/inquiryTaskEdit';

const {Column} = AntTable;

const ToBuyPlanList = () => {

  const [skus, setSkus] = useState([]);

  const addQuoteRef = useRef();

  const snameSkus = (value) => {
    let array = [];

    const skuBrand = value.map((item) => {
      return {
        skuId:item.skuId,
        brandId:item.brandId,
      };
    });
    console.log(value);

    const oneSkus = [];
    let sname = [];

    value.map((item) => {
      if (
        skuBrand.filter((value) => {
          return item.skuId === value.skuId && item.brandId === value.brandId;
        }).length === 1
      ) {
        oneSkus.push(item);
      } else {
        let snameSku = null;
        const sku = [];
        sname.map((value) => {
          if (value.skuId === item.skuId && value.brandId === item.brandId) {
            snameSku = value;
          } else {
            sku.push(value);
          }
          return null;
        });
        if (snameSku) {
          sname = [...sku, {...snameSku, applyNumber: snameSku.applyNumber + item.applyNumber}];
        } else {
          sname.push(item);
        }
      }
      return array = [...oneSkus, ...sname];
    });
    return array;
  };


  const {loading, data, run, refresh} = useRequest(
    toBuyPlanList,
    {
      manual: true,
      onSuccess: (res) => {
        const allSku = [];
        if (Array.isArray(res)) {
          res.map((item) => {
            return item.children.map((value) => {
              return allSku.push(value);
            });
          });
        }
        setSkus(allSku);
      }
    });

  const [visible, setVisible] = useState();

  const quoteRef = useRef();

  const inquiryRef = useRef();

  const quotationRef = useRef();

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

    if (checked) {
      array.push(key);
    } else {
      array = keys.filter((value) => {
        return value !== key;
      });
    }

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
    if (checked) {
      setKeys(keys.concat(array));
    } else {
      setKeys(array);
    }
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
        disabled={keys.length === 0}
        onClick={() => {
          const array = skus.filter((item) => {
            return keys.includes(item.purchaseListingId);
          });
          inquiryRef.current.open(snameSkus(array));
        }}>指派询价任务</Button>
      <Button
        type="default"
        onClick={() => {
          let array = [];
          if (keys.length > 0) {
            array = skus.filter((item) => {
              return keys.includes(item.purchaseListingId);
            });
          } else {
            array = skus;
          }
          const skuArray = snameSkus(array);

          quoteRef.current.open(
            {
              skus: skuArray.map((item) => {
                return {
                  skuId: item.skuId,
                  skuResult: item.skuResult,
                  number: item.applyNumber,
                  brandId: item.brandId,
                  brandResult: item.brandResult,
                };
              }),
              sourceId: 0,
              source: 'toBuyPlan'
            });
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
        <Column title="品牌" dataIndex="brandResult" render={(value) => {
          return value ? value.brandName : '无指定品牌';
        }} />
        <Column title="数量" dataIndex="applyNumber" />
        <Column title="申请人" dataIndex="user" render={(value) => {
          return <>{value && value.name}</>;
        }} />
        <Column title="申请时间" dataIndex="createTime" />
        <Column title="历史报价" dataIndex="skuId" render={(value, record) => {
          if (record.purchaseListingId.indexOf('mainKey:') !== -1) {
            return <Button type="link" onClick={() => {
              quotationRef.current.open({
                skuId: record.skuId,
                check: true,
                name: <SkuResultSkuJsons skuResult={record.skuResult} />
              });
            }}>
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

    <Modal
      headTitle="添加报价信息"
      width={2100}
      compoentRef={addQuoteRef}
      footer={<Button
        type="primary"
        style={{marginTop: 8}}
        onClick={() => {
          addQuoteRef.current.submit();
        }}>添加报价</Button>}
      ref={quoteRef}
      component={Quote}
      onSuccess={() => {
        quoteRef.current.close();
      }} />

    <Modal
      headTitle="指派询价任务"
      width={1200}
      ref={inquiryRef}
      component={InquiryTaskEdit}
      onSuccess={() => {
        notification.success({
          message: '创建询价任务成功！',
        });
        inquiryRef.current.close();
      }} />

    <Modal
      width={1600}
      ref={quotationRef}
      component={PurchaseQuotationList}
      onSuccess={() => {
        quotationRef.current.close();
      }} />


  </div>;
};

export default ToBuyPlanList;
