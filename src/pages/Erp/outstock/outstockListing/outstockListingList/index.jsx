/**
 * 出库清单列表页
 *
 * @author cheng
 * @Date 2021-09-15 11:15:44
 */

import React, {useRef, useState} from 'react';
import {Descriptions, Table as AntTable} from 'antd';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import Form from '@/components/Form';
import {outstockListingList} from '../outstockListingUrl';
import OutstockListingEdit from '../outstockListingEdit';
import * as SysField from '../outstockListingField';
import Table from '@/components/Table';
import {createFormActions} from '@formily/antd';
import {request, useRequest} from '@/util/Request';
import TreeSelectSee from '@/pages/Erp/TreeSelectSee';
import {storehousePositionsTreeView} from '@/pages/Erp/storehouse/components/storehousePositions/storehousePositionsUrl';

const {Column} = AntTable;
const {FormItem} = Form;

const formActionsPublic = createFormActions();

const OutstockListingList = (props) => {

  const {value} = props;

  const [key, setKey] = useState([]);

  const [data, setData] = useState();

  const {data: storehouseposition} = useRequest(storehousePositionsTreeView);

  const ref = useRef(null);
  const tableRef = useRef(null);
  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          ref.current.open(false);
        }} />
      </>
    );
  };

  const searchForm = () => {
    return (
      <>
        <FormItem label="出库时间" name="time" component={SysField.Time} />
        <FormItem label="出库数量" name="number" component={SysField.Number} />
        <FormItem label="出库价格" name="price" component={SysField.Price} />
        <FormItem label="品牌id" name="brandId" component={SysField.BrandId} />
        <FormItem label="部门编号" name="deptId" component={SysField.DeptId} />
        <FormItem label="产品id" name="itemId" component={SysField.ItemId} />
        <FormItem label="出库状态" name="state" component={SysField.State} />
        <FormItem label="出库单号" name="outstockOrderId" value={value || ' '} component={SysField.OutstockOrderId} />
        <FormItem label="发货申请" name="outstockApplyId" component={SysField.OutstockApplyId} />
      </>
    );
  };

  return (
    <div>
      <Table
        noPagination
        api={outstockListingList}
        rowKey="outstockListingId"
        searchForm={searchForm}
        expandable={{
          expandedRowKeys: key,
          onExpand: async (expand, record) => {
            if (expand) {
              const data = await request({
                url: '/stockDetails/list',
                method: 'POST',
                data: {
                  skuId: record.skuId,
                  storehouseId: record.storehouseId,
                  brandId: record.brandId,
                },
              });
              setData(data);
              setKey([record.outstockListingId]);
            } else {
              setKey([]);
            }

          },
          expandedRowRender: (record) => {
            return <>
              {
                data && data.map((items, index) => {
                  return <div key={index}>
                    <Descriptions bordered column={2}>
                      <Descriptions.Item
                        labelStyle={{width:100}}
                        contentStyle={{width: 150, backgroundColor: '#fff'}}
                        label="库位">
                        <TreeSelectSee data={storehouseposition} value={items.storehousePositionsId} />
                      </Descriptions.Item>
                      <Descriptions.Item
                        labelStyle={{width: 100}}
                        contentStyle={{width: 150, backgroundColor: '#fff'}}
                        label="数量">
                        × {items.number}
                      </Descriptions.Item>
                    </Descriptions>
                  </div>;
                })
              }

            </>;
          },
        }}
        rowSelection
        formActions={formActionsPublic}
        bodyStyle={{padding: 0}}
        bordered={false}
        contentHeight
        headStyle={{display: 'none'}}
        showSearchButton={false}
        ref={tableRef}
      >
        <Column title="产品" render={(text, record) => {
          return (
            <>
              {record.sku && record.sku.skuName}
              &nbsp;/&nbsp;
              {record.spuResult && record.spuResult.name}
              &nbsp;&nbsp;
              <em style={{color: '#c9c8c8', fontSize: 10}}>
                (
                {
                  record.backSkus
                  &&
                  record.backSkus.map((items, index) => {
                    return (
                      <span key={index}>
                        {items.itemAttribute.attribute}：{items.attributeValues.attributeValues}
                      </span>
                    );
                  })
                }
                )
              </em>
            </>
          );

        }} sorter />
        <Column title="品牌" dataIndex="brandId" render={(value, record) => {
          return (
            <>
              {record.brandResult && record.brandResult.brandName}
            </>
          );
        }} />
        <Column title="总数量" dataIndex="delivery" width={100} align="center" />
        <Column title="剩余数量" dataIndex="number" width={100} align="center" />
      </Table>
      <Drawer width={800} title="编辑" component={OutstockListingEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </div>
  );
};

export default OutstockListingList;
