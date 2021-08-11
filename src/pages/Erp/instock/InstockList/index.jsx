/**
 * 入库表列表页
 *
 * @author song
 * @Date 2021-07-17 10:46:08
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Button, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import Breadcrumb from '@/components/Breadcrumb';
import Modal2 from '@/components/Modal';
import {instockDelete, instockList, itemIdSelect} from '../InstockUrl';
import InstockEdit from '../InstockEdit';
import * as SysField from '../InstockField';
import {useBoolean} from 'ahooks';
import {MegaLayout} from '@formily/antd-components';
import {FormButtonGroup, Submit} from '@formily/antd';
import {SearchOutlined} from '@ant-design/icons';
import Icon from '@/components/Icon';
import {BrandId, StoreHouseSelect} from '../InstockField';

const {Column} = AntTable;
const {FormItem} = Form;

const InstockList = () => {
  const ref = useRef(null);
  const tableRef = useRef(null);
  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          ref.current.open(false);
        }}/>
      </>
    );
  };

  const [search,{toggle}]  = useBoolean(false);

  const searchForm = () => {

    const formItem = () => {
      return (
        <>
          <FormItem mega-props={{span: 1}} placeholder="仓库名称" name="placeName" component={SysField.StoreHouseSelect}/>
          <FormItem mega-props={{span: 1}} placeholder="品牌" name="brandName" component={SysField.BrandId}/>
        </>
      );
    };


    return (
      <div style={{maxWidth:800}} >
        <MegaLayout responsive={{s: 1,m:2,lg:2}} labelAlign="left" layoutProps={{wrapperWidth:200}} grid={search} columns={4} full autoRow>
          <FormItem mega-props={{span: 1}} placeholder="产品名称" name="name" component={SysField.ItemIdSelect}/>
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
              toggle();
            }}>
              <Icon type={search ? 'icon-shouqi' : 'icon-gaojisousuo'} />{search?'收起':'高级'}</Button>
          </FormButtonGroup>
        </MegaLayout>
      </>
    );
  };


  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={instockList}
        rowKey="instockId"
        SearchButton={Search()}
        layout={search}
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="产品名称" dataIndex="name" sorter/>
        <Column title="仓库名称" dataIndex="placeName" sorter/>
        <Column title="登记时间" dataIndex="registerTime" sorter/>
        <Column title="入库数量" dataIndex="number" sorter/>
        <Column title="价格" dataIndex="price" sorter/>
        <Column title="品牌" dataIndex="brandName" sorter/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record);
              }}/>
              <DelButton api={instockDelete} value={record.instockId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Modal2 width={800} title="编辑" component={InstockEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default InstockList;
