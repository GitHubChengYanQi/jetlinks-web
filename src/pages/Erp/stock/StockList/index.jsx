/**
 * 仓库总表列表页
 *
 * @author
 * @Date 2021-07-15 11:13:02
 */

import React, {useRef, useState} from 'react';
import Table from '@/components/Table';
import {Button, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Form from '@/components/Form';
import {stockList} from '../StockUrl';
import * as SysField from '../StockField';
import Breadcrumb from '@/components/Breadcrumb';
import {customerBatchDelete} from '@/pages/Crm/customer/CustomerUrl';
import {MegaLayout} from '@formily/antd-components';
import {FormButtonGroup, Submit} from '@formily/antd';
import {SearchOutlined} from '@ant-design/icons';
import Icon from '@/components/Icon';
import {Inventory, Storehouse} from '../StockField';

const {Column} = AntTable;
const {FormItem} = Form;

const StockList = () => {
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
          <FormItem mega-props={{span: 1}} placeholder="产品名称" name="itemId" component={SysField.ItemId} />
          <FormItem mega-props={{span: 1}} placeholder="品牌" name="brandId" component={SysField.BrandId} />
          <FormItem mega-props={{span: 1}} placeholder="数量" name="inventory" component={SysField.Inventory} />
        </>
      );
    };


    return (
      <div style={{maxWidth:800}}>
        <MegaLayout responsive={{s: 1,m:2,lg:2}} labelAlign="left" layoutProps={{wrapperWidth:200}} grid={search} columns={4} full autoRow>
          <FormItem mega-props={{span: 1}} placeholder="仓库名称" name="palceId" component={SysField.Storehouse} />
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
            }}><Icon type={search ? 'icon-shanchuzijiedian' : 'icon-tianjiazijiedian'} /></Button>
            <MegaLayout inline>
              <FormItem hidden name="status" component={SysField.Name} />
              <FormItem hidden name="classification" component={SysField.Name} />
              <FormItem hidden name="customerLevelId" component={SysField.Name} />
            </MegaLayout>
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
        api={stockList}
        SearchButton={Search()}
        layout={search}
        rowKey="stockId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
        footer={footer }
        onChange={(keys)=>{
          setIds(keys);
        }}
      >
        <Column title="仓库名称" dataIndex="pname" sorter/>
        <Column title="产品名称" dataIndex="iname" sorter/>
        <Column title="品牌" dataIndex="bname" sorter/>
        <Column title="数量" dataIndex="inventory"/>
        <Column/>
      </Table>
    </>
  );
};

export default StockList;
