/**
 * 仓库产品明细表列表页
 *
 * @author
 * @Date 2021-07-15 11:13:02
 */

import React, {useRef, useState} from 'react';
import Table from '@/components/Table';
import {Button, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Form from '@/components/Form';
import Breadcrumb from '@/components/Breadcrumb';
import {stockDetailsList} from "@/pages/Erp/stockDetails/StockDetailsUrl";
import {customerBatchDelete} from '@/pages/Crm/customer/CustomerUrl';
import {MegaLayout} from '@formily/antd-components';
import {FormButtonGroup, Submit} from '@formily/antd';
import {SearchOutlined} from '@ant-design/icons';
import Icon from '@/components/Icon';
import * as SysField from '../StockDetailsField';
import {ItemId} from "../StockDetailsField";

const {Column} = AntTable;
const {FormItem} = Form;

const StockDetailsList = () => {
  const ref = useRef(null);
  const tableRef = useRef(null);
  const actions = () => {
    return (
      <>

      </>
    );
  };

  const [search, setSearch] = useState(false);

  const searchForm = () => {

    const formItem = () => {
      return (
        <>
          <FormItem mega-props={{span: 1}} placeholder="仓库名称" name="storehouseId" component={SysField.Storehouse} />
          <FormItem mega-props={{span: 1}} placeholder="入库时间" name="storageTime" component={SysField.StorageTime} />
          <FormItem mega-props={{span: 1}} placeholder="产品价格" name="price" component={SysField.Price} />
        </>
      );
    };

    return (
      <div style={{maxWidth:800}}>
        <MegaLayout responsive={{s: 1,m:2,lg:2}} labelAlign="left" layoutProps={{wrapperWidth:200}} grid={search} columns={4} full autoRow>
          <FormItem mega-props={{span: 1}} placeholder="产品名称" name="itemId" component={SysField.ItemId} />
          {search ? formItem() : null}
        </MegaLayout>

      </div>
    );
  };


  const Search = () => {
    return (
      <>
        <MegaLayout>
          <FormButtonGroup>
            <Submit><SearchOutlined />查询</Submit>
            <Button title={search ? '收起高级搜索' : '展开高级搜索'} onClick={() => {
              if (search) {
                setSearch(false);
              } else {
                setSearch(true);
              }
            }}>  <Icon type={search ? 'icon-shouqi' : 'icon-gaojisousuo'} />{search ? '收起' : '高级'}</Button>
          </FormButtonGroup>
        </MegaLayout>
      </>
    );
  };


  const [ids, setIds] = useState([]);

  const footer = () => {
    /**
     * 批量删除例子，根据实际情况修改接口地址
     */
    return (<DelButton api={{
      ...customerBatchDelete
    }} onSuccess={() => {
      tableRef.current.refresh();
    }} value={ids}>批量删除</DelButton>);
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={stockDetailsList}
        rowKey="stockItemId"
        searchForm={searchForm}
        actions={actions()}
        footer={footer}
        SearchButton={Search()}
        layout={search}
        onChange={(keys) => {
          setIds(keys);
        }}
        ref={tableRef}
      >
        {/*<Column title="库存编号" dataIndex="stockId"/>*/}
        <Column title="仓库名称" dataIndex="pname" render={(text, record) => {
          return (
            <>
              {record.storehouseResult.name}
            </>
          );
        }} sorter />
        <Column title="产品名称" dataIndex="iname" render={(text, record) => {
          return (
            <>
              {record.itemsResult.name}
            </>
          );
        }} sorter />
        <Column title="产品价格" dataIndex="price" sorter/>
        <Column title="入库时间" dataIndex="storageTime" sorter/>
      </Table>
    </>
  );
};

export default StockDetailsList;
