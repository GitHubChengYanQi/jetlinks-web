/**
 * 入库表列表页
 *
 * @author song
 * @Date 2021-07-17 10:46:08
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Button, Modal, notification, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import Breadcrumb from '@/components/Breadcrumb';
import Modal2 from '@/components/Modal';
import {useBoolean} from 'ahooks';
import {MegaLayout} from '@formily/antd-components';
import {FormButtonGroup, Submit} from '@formily/antd';
import {ExclamationCircleOutlined, SearchOutlined} from '@ant-design/icons';
import Icon from '@/components/Icon';
import InstockEdit from '../InstockEdit';
import {useRequest} from "@/util/Request";
import {instockDelete, instockEdit, instockList, itemIdSelect} from '../InstockUrl';
import * as SysField from '../InstockField';

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

  const {run} = useRequest(instockEdit, {
    manual: true, onSuccess: () => {
      openNotificationWithIcon('success');
      tableRef.current.refresh();
    }
  });

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: type === 'success' ? '入库成功！' : '已入库！',
    });
  };

  function confirmOk(record) {
    Modal.confirm({
      title: '入库',
      centered: true,
      content: `请确认是否执行入库操作!注意：入库之后不可删除。`,
      style: {margin: 'auto'},
      cancelText: '取消',
      onOk: async () => {
        record.state = 1;
        await run(
          {
            data: record
          }
        );
      }
    });
  }

  const searchForm = () => {

    const formItem = () => {
      return (
        <>
          <FormItem mega-props={{span: 1}} placeholder="产品名称" name="itemId" component={SysField.ItemIdSelect}/>
          <FormItem mega-props={{span: 1}} placeholder="品牌" name="brandId" component={SysField.BrandId}/>
        </>
      );
    };


    return (
      <div style={{maxWidth:800}} >
        <MegaLayout responsive={{s: 1,m:2,lg:2}} labelAlign="left" layoutProps={{wrapperWidth:200}} grid={search} columns={4} full autoRow>
          <FormItem mega-props={{span: 1}} placeholder="仓库名称" name="storehouseId" component={SysField.StoreHouseSelect}/>
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
        <Column title="仓库名称" fixed dataIndex="storehouseId" render={(text, record) => {
          return (
            <>
              {record.storehouseResult.name}
            </>
          );
        }} sorter/>
        <Column title="产品名称" dataIndex="itemId" render={(text, record) => {
          return (
            <>
              {record.itemsResult.name}
            </>
          );
        }} sorter/>
        <Column title="品牌" width={200} dataIndex="brandId" render={(text, record) => {
          return (
            <>
              {record.brandResult.brandName}
            </>
          );
        }} sorter/>
        <Column title="入库数量" width={120} align='center' dataIndex="number" sorter/>
        <Column title="价格" width={120} align='center' dataIndex="price" sorter/>
        <Column title="登记时间" width={200} dataIndex="registerTime" sorter/>
        <Column title="条形码" width={200} dataIndex="barcode" sorter/>
        <Column title="入库状态" width={200} dataIndex="state" render={(text, record) => {
          return (
            <>
              {record.state ? '已入库':'未入库'}
            </>
          );
        }} />
        <Column title="操作" fixed='right' align="right" width={200} render={(value, record) => {
          return (
            <>
              {record.state === 0 ? <Button style={{margin: '0 10px'}} onClick={() => {
                confirmOk(record);
              }}><Icon type="icon-ruku" />入库</Button>: null}
              {record.state === 0 ? <EditButton onClick={() => {
                ref.current.open(record.instockId);
              }}/>: null}
              {record.state === 0 ? <DelButton api={instockDelete} value={record.instockId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>: null}
            </>
          );
        }}/>
      </Table>
      <Modal2 width={800} title="产品入库" component={InstockEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default InstockList;
