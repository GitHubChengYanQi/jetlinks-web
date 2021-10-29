/**
 * 出库清单列表页
 *
 * @author cheng
 * @Date 2021-09-15 11:15:44
 */

import React, {useRef} from 'react';
import {Card, Table as AntTable} from 'antd';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import Form from '@/components/Form';
import {outstockListingList} from '../outstockListingUrl';
import OutstockListingEdit from '../outstockListingEdit';
import * as SysField from '../outstockListingField';
import Table from '@/components/Table';

const {Column} = AntTable;
const {FormItem} = Form;

const OutstockListingList = (props) => {

  const {value} = props;

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
        <FormItem label="出库单号" name="outstockOrderId" value={value || ' '}  component={SysField.OutstockOrderId} />
        <FormItem label="发货申请" name="outstockApplyId" component={SysField.OutstockApplyId} />
      </>
    );
  };

  return (
    <div>
      <Table
        api={outstockListingList}
        rowKey="outstockListingId"
        searchForm={searchForm}
        rowSelection
        bodyStyle={{padding:0}}
        bordered={false}
        contentHeight
        headStyle={{display:'none'}}
        showSearchButton={false}
        ref={tableRef}
      >
        <Column title="产品" render={(text, record) => {
          return (
            <>
              {record.spuResult && record.spuResult.name}
              &nbsp;&nbsp;
              &lt;
              {
                record.backSkus && record.backSkus.map((items, index) => {
                  if (index === record.backSkus.length - 1) {
                    return <span key={index}>{items.attributeValues && items.attributeValues.attributeValues}</span>;
                  } else {
                    return <span
                      key={index}>{items.attributeValues && items.attributeValues.attributeValues}&nbsp;&nbsp;，</span>;
                  }

                })
              }
              &gt;
            </>
          );

        }} sorter />
        <Column title="品牌" dataIndex="brandId" render={(value,record)=>{
          return (
            <>
              {record.brandResult && record.brandResult.brandName}
            </>
          );
        }} />
        <Column title="出库数量" dataIndex="number" />
      </Table>
      <Drawer width={800} title="编辑" component={OutstockListingEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </div>
  );
};

export default OutstockListingList;
