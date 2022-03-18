import React, {useEffect, useRef, useState} from 'react';
import {Table as AntTable} from 'antd';
import {createFormActions} from '@formily/antd';
import Table from '@/components/Table';
import {pendingProductionByOrder} from '@/pages/Production/Url';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';

const {Column} = AntTable;


const formActionsPublic = createFormActions();

const OrderList = ({searchForm, actions, checkedSkus, setCheckedSkus, refresh}) => {

  const [orderKeys, setOrderKeys] = useState([]);

  const tableRef = useRef();

  useEffect(() => {
    if (refresh) {
      console.log(111);
      setOrderKeys([]);
      tableRef.current.submit();
    }
  }, [refresh]);

  return <>
    <Table
      ref={tableRef}
      tableKey="orderList"
      formActions={formActionsPublic}
      searchForm={searchForm}
      noSort
      actions={actions()}
      noPagination={{
        defaultPageSize: 20,
        showTotal: (total) => {
          return `共${total}条`;
        },
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: [5, 10, 20, 50, 100],
        position: ['bottomRight']
      }}
      api={pendingProductionByOrder}
      rowKey="orderId"
      rowSelection={{
        selectedRowKeys: orderKeys,
        onSelect: (record, selected) => {
          if (selected) {
            setOrderKeys([...orderKeys, record.orderId]);
            setCheckedSkus([...checkedSkus, ...record.detailResults]);
          } else {
            const array = orderKeys.filter((item) => {
              return item !== record.orderId;
            });
            setOrderKeys(array);
            const skus = checkedSkus.filter((item) => {
              return array.includes(item.orderId);
            });
            setCheckedSkus(skus);
          }
        },
        onSelectAll: (selected, rows) => {
          if (selected) {
            const skus = [];
            setOrderKeys(rows.map((item) => {
              item.detailResults.map(item => skus.push(item));
              return item.orderId;
            }));
            setCheckedSkus(skus);
          } else {
            setOrderKeys([]);
            setCheckedSkus([]);
          }
        },
      }}
      expandable={{
        expandedRowRender: orderRecord => {
          return <div style={{border: '1px solid rgb(233 227 227)'}}>
            <AntTable
              style={{margin: 16}}
              pagination={false}
              dataSource={orderRecord.detailResults}
              rowKey="detailId"
              rowSelection={{
                hideSelectAll: true,
                selectedRowKeys: checkedSkus.map(item => item.detailId),
                onSelect: (record, selected) => {
                  if (selected) {
                    const orderDetails = checkedSkus.filter((item) => {
                      return item.orderId === record.orderId;
                    });
                    if (orderDetails.length + 1 === orderRecord.detailResults.length) {
                      setOrderKeys([...orderKeys, record.orderId]);
                    }
                    setCheckedSkus([...checkedSkus, record]);
                  } else {
                    const array = checkedSkus.filter((item) => {
                      return item.detailId !== record.detailId;
                    });
                    setCheckedSkus(array);
                    const orders = orderKeys.filter((item) => {
                      return item !== record.orderId;
                    });
                    setOrderKeys(orders);
                  }
                },
              }}
            >
              <Column title="物料编码" dataIndex="skuResult" render={(value) => {
                return value && value.standard;
              }} />
              <Column title="物料名称" dataIndex="skuResult" render={(value) => {
                return value && value.spuResult && value.spuResult.name;
              }} />
              <Column title="规格 / 型号" dataIndex="skuResult" render={(value) => {
                return `${value.skuName}${value.specifications ? ` / ${value.specifications}` : ''}`;
              }} />
              <Column title="物料描述" dataIndex="skuResult" render={(value) => {
                return <SkuResultSkuJsons describe skuResult={value} />;
              }} />
              <Column title="数量" dataIndex="purchaseNumber" />
            </AntTable>
          </div>;
        },
      }}
    >
      <Column title="订单编号" key={1} dataIndex="coding" />
      <Column title="客户" key={2} dataIndex="acustomer" render={(value) => {
        return value && value.customerName;
      }} />
      <Column title="交货日期" key={3} dataIndex="deliveryDate" />
    </Table>
  </>;
};

export default OrderList;
