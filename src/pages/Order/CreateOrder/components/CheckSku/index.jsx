import React, {useImperativeHandle, useRef} from 'react';
import {Input, Table as AntTable} from 'antd';
import {createFormActions} from '@formily/antd';
import {useSetState} from 'ahooks';
import InputNumber from '@/components/InputNumber';
import Table from '@/components/Table';
import Form from '@/components/Form';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';
import {toBuyPlanList} from '@/pages/Purshase/ToBuyPlan/Url';
import SelectSku from '@/pages/Erp/sku/components/SelectSku';
import {supplyList} from '@/pages/Crm/supply/supplyUrl';

const {Column} = AntTable;
const {FormItem} = Form;

const formActionsPublic = createFormActions();

const CheckSku = ({
  value = [],
  type,
  customerId,
}, ref) => {

  const [skus, setSkus] = useSetState({
    data: value && value.map((item) => {
      return {
        ...item,
        key: item.skuId + item.brandId
      };
    }) || []
  });

  const tableRef = useRef(null);

  const change = () => {
    return skus.data;
  };

  const check = () => {
    return skus.data;
  };

  useImperativeHandle(ref, () => ({
    change,
    check
  }));

  const searchForm = () => {

    return (
      <>
        <FormItem
          label="物料"
          name="skuId"
          placeholder="请选择物料"
          component={SelectSku}
        />
        <FormItem
          label="库存数量低于"
          name="number"
          component={InputNumber}
        />
        <FormItem
          hidden
          name="customerId"
          value={customerId}
          component={Input}
        />
      </>
    );
  };

  const result = (record) => {
    return {
      key: record.key,
      skuId: record.skuId,
      coding: record.skuResult.standard,
      skuResult: record.skuResult,
      brandId: record.brandId,
      defaultBrandResult: record.brandResult && record.brandResult.brandName,
      preordeNumber: record.applyNumber,
      unitId: record.unitId,
    };
  };

  const key = (item) => {
    return item.skuId + item.brandId;
  };

  return (
    <>
      <Table
        noPagination={type === 'sku' && {
          defaultCurrent: 1,
          defaultPageSize: 5,
        }}
        title={<h2>添加物料</h2>}
        api={type === 'sku' ? toBuyPlanList : supplyList}
        NoChildren
        contentHeight
        branch={(data) => {
          return data && data.map((item) => {
            return {
              ...item,
              key: key(item),
            };
          });
        }}
        formActions={formActionsPublic}
        rowKey="key"
        pageSize={5}
        noSort
        searchForm={searchForm}
        ref={tableRef}
        rowSelection={{
          selectedRowKeys: skus.data.map((item) => {
            return item.key;
          }),
          onSelect: (record, selected) => {
            if (selected) {
              const array = skus.data;
              array.push(result(record));
              setSkus({data: array});
            } else {
              const array = skus.data.filter((item) => {
                return item.key !== key(record);
              });
              setSkus({data: array});
            }
          },
          onSelectAll: (selected, selectedRows, changeRows) => {
            if (selected) {
              const ids = skus.data.map((item) => {
                return item.key;
              });
              const array = selectedRows.filter((item) => {
                return item && !ids.includes(key(item));
              }).map((item) => {
                return result(item);
              });
              setSkus({data: skus.data.concat(array)});
            } else {
              const deleteIds = changeRows.map((item) => {
                return key(item);
              });
              const array = skus.data.filter((item) => {
                return !deleteIds.includes(item.key);
              });
              setSkus({data: array});
            }
          }
        }
        }
      >
        <Column title="序号" width={70} align="center" render={(value, record, index) => {
          return <>{index + 1}</>;
        }} />
        <Column title="物料编号" width={120} dataIndex="skuResult" render={(value) => {
          return value && value.standard;
        }} />
        <Column
          title="物料"
          sorter={(a, b) => {
            const aSort = a.spuResult && a.spuResult.spuClassificationResult && a.spuResult.spuClassificationResult.name;
            const bSort = b.spuResult && b.spuResult.spuClassificationResult && b.spuResult.spuClassificationResult.name;
            return aSort.length - bSort.length;
          }}
          dataIndex="skuResult"
          render={(value) => {
            return <SkuResultSkuJsons skuResult={value} />;
          }} />
        <Column
          title="品牌 / 厂家"
          dataIndex="brandResult"
          render={(value) => {
            return value ? value.brandName : '无指定品牌';
          }} />
        <Column title="库存数量" width={100} dataIndex="stockNumber" />
        <Column title="在途数量" width={100} dataIndex="stockNumber" />
        <Column title="预购数量" width={100} dataIndex="applyNumber" />
        <Column
          title="单位"
          width={100}
          dataIndex="skuResult"
          render={(value) => {
            return value && value.spuResult && value.spuResult.unitResult && value.spuResult.unitResult.unitName;
          }} />

      </Table>
    </>
  );
};

export default React.forwardRef(CheckSku);
