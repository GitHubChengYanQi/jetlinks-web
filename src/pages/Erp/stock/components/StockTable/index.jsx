/**
 * 仓库总表列表页
 *
 * @author
 * @Date 2021-07-15 11:13:02
 */

import React, {useEffect, useRef, useState,} from 'react';
import {Button, Checkbox, Table as AntTable} from 'antd';
import {MegaLayout} from '@formily/antd-components';
import {createFormActions, FormButtonGroup, Submit} from '@formily/antd';
import {SearchOutlined} from '@ant-design/icons';
import {useBoolean} from 'ahooks';
import {useHistory} from 'ice';
import Icon from '@/components/Icon';
import Breadcrumb from '@/components/Breadcrumb';
import Form from '@/components/Form';
import Table from '@/components/Table';
import {stockList} from '../../StockUrl';
import * as SysField from '../../StockField';


const {Column} = AntTable;
const {FormItem} = Form;
const formActionsPublic = createFormActions();
const StockTable = (props) => {

  const {choose, state, ...other} = props;
  const tableRef = useRef(null);
  const history = useHistory();

  const [allStock, {setTrue, setFalse}] = useBoolean();

  useEffect(() => {
    if (state) {
      tableRef.current.formActions.setFieldValue('storehouseId', state ? state[0] : null);
      tableRef.current.submit();
    }
  }, [state]);

  const searchForm = () => {

    return (
      <>
        <FormItem hidden name="storehouseId" value={state} component={SysField.Storehouse} />
        <FormItem placeholder="物料" name="skuId" component={SysField.Sku} />
        <FormItem
          placeholder="品牌"
          name="brandId"
          component={SysField.BrandId}
        />
        <FormItem label="所有库存" name="stockNumber" component={SysField.Stock} />
      </>
    );
  };


  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={stockList}
        isModal={false}
        formActions={formActionsPublic}
        rowKey="stockId"
        searchForm={searchForm}
        ref={tableRef}
        rowSelection
        {...other}
      >
        <Column title="物料" render={(text, record) => {
          return (
            <>
              {record.spuResult && record.spuResult.spuClassificationResult && record.spuResult.spuClassificationResult.name}
              &nbsp;/&nbsp;
              {record.spuResult && record.spuResult.name}
              &nbsp;&nbsp;
              {record.backSkus && record.backSkus.length > 0 && <em style={{color: '#c9c8c8', fontSize: 10}}>
                (
                {
                  record.backSkus.map((items, index) => {
                    return <span key={index}>{items.itemAttribute.attribute}
                      ：
                      {items.attributeValues.attributeValues}</span>;
                  })
                }
                )
              </em>}
            </>
          );

        }} sorter />
        <Column title="品牌" width={200} render={(text, record) => {
          return (
            <>
              {record.brandResult && record.brandResult.brandName}
            </>
          );
        }} />
        <Column title="供应商" width={200} render={(text, record) => {
          return (
            <>
              {record.brandResult && record.brandResult.brandName}
            </>
          );
        }} />
        <Column title="仓库名称" render={(text, record) => {
          return (
            <>
              {record.storehouseResult && record.storehouseResult.name}
            </>
          );
        }} />
        <Column title="数量" width={120} align="center" sorter dataIndex="inventory" />
        <Column title="操作" fixed="right" align="center" width={100} render={(value, record) => {
          return <Button type="link" onClick={() => {
            history.push(`/ERP/stock/detail?stockId=${record.stockId}`);
          }}>查看库存详情</Button>;
        }} />

      </Table>
    </>
  );
};

export default StockTable;
