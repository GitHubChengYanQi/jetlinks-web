import React, {useEffect, useState} from 'react';
import {Table as AntTable} from 'antd';
import {createFormActions} from '@formily/antd';
import Table from '@/components/Table';
import {pendingProductionPlan} from '@/pages/Production/Url';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';

const {Column} = AntTable;


const PlanList = ({searchForm, actions,checkedSkus,setCheckedSkus}) => {

  const formActionsPublic = createFormActions();

  const [skuKeys, setSkuKeys] = useState([]);


  useEffect(() => {
    if (checkedSkus.length === 0) {
      setSkuKeys([]);
    }
  }, [checkedSkus]);


  return <>
    <Table
      formActions={formActionsPublic}
      noSort
      actions={actions()}
      tableKey="planList"
      searchForm={searchForm}
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
      api={pendingProductionPlan}
      rowKey="key"
      branch={(data) => {
        const array = [];
        data.map((item, index) => {
          if (item.skuResult) {
            array.push({
              ...item,
              key: index,
              children: null,
              allSkus: item.children.map(item => {
                return {...item, key: index};
              }),
            });
          }
          return null;
        });
        return array;
      }}
      rowSelection={{
        selectedRowKeys: skuKeys,
        onSelect: (record, selected) => {
          if (selected) {
            setSkuKeys([...skuKeys, record.key]);
            setCheckedSkus([...checkedSkus, ...record.allSkus]);
          } else {
            const array = skuKeys.filter((item) => {
              return item !== record.key;
            });
            setSkuKeys(array);
            const skus = checkedSkus.filter((item) => {
              return array.includes(item.key);
            });
            setCheckedSkus(skus);
          }
        },
        onSelectAll: (selected, rows) => {
          if (selected) {
            const skus = [];
            setSkuKeys(rows.map((item) => {
              item.allSkus.map(item => skus.push(item));
              return item.key;
            }));
            setCheckedSkus(skus);
          } else {
            setSkuKeys([]);
            setCheckedSkus([]);
          }
        },
      }}
      expandable={{
        expandedRowRender: skuRecord => {
          return <div style={{border: '1px solid rgb(233 227 227)'}}>
            <AntTable
              style={{margin: 16}}
              pagination={false}
              dataSource={skuRecord.allSkus}
              rowKey="detailId"
              rowSelection={{
                hideSelectAll: true,
                selectedRowKeys: checkedSkus.map(item => item.detailId),
                onSelect: (record, selected) => {
                  if (selected) {
                    const skuDetails = checkedSkus.filter((item) => {
                      return item.key === record.key;
                    });
                    if (skuDetails.length + 1 === skuRecord.allSkus.length) {
                      setSkuKeys([...skuKeys, skuRecord.key]);
                    }
                    setCheckedSkus([...checkedSkus, record]);
                  } else {
                    const array = checkedSkus.filter((item) => {
                      return item.detailId !== record.detailId;
                    });
                    setCheckedSkus(array);
                    const skus = skuKeys.filter((item) => {
                      return item !== skuRecord.key;
                    });
                    setSkuKeys(skus);
                  }
                },
              }}
            >
              <Column title="数量" dataIndex="purchaseNumber" />
              <Column title="交货日期" dataIndex="deliveryDate" />
            </AntTable>
          </div>;
        },
      }}
    >
      <Column title="物料编码" key={0} dataIndex="skuResult" render={(value) => {
        return value && value.standard;
      }} />
      <Column title="物料名称" key={1} dataIndex="skuResult" render={(value) => {
        return value && value.spuResult && value.spuResult.name;
      }} />
      <Column title="规格 / 型号" key={2} dataIndex="skuResult" render={(value) => {
        return `${value.skuName}${value.specifications ? ` / ${value.specifications}` : ''}`;
      }} />
      <Column title="物料描述" key={3} dataIndex="skuResult" render={(value) => {
        return <SkuResultSkuJsons describe skuResult={value} />;
      }} />
    </Table>
  </>;
};

export default PlanList;
