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
import MyModal from '@/components/Modal';
import {useBoolean} from 'ahooks';
import {MegaLayout} from '@formily/antd-components';
import {FormButtonGroup, Submit} from '@formily/antd';
import {ExclamationCircleOutlined, SearchOutlined} from '@ant-design/icons';
import Icon from '@/components/Icon';
import InstockEdit from '../InstockEdit';
import {useRequest} from "@/util/Request";
import {instockDelete, instockEdit, instockList, instockOrderList, itemIdSelect} from '../InstockUrl';
import * as SysField from '../InstockField';
import Instock from '@/pages/Erp/instock/InstockEdit/components/Instock';

const {Column} = AntTable;
const {FormItem} = Form;

const InstockList = () => {

  const ref = useRef(null);
  const tableRef = useRef(null);
  const instockRef = useRef(null);

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
            <Button type='link' title={search ? '收起高级搜索' : '展开高级搜索'} onClick={() => {
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
        api={instockOrderList}
        rowKey="instockOrderId"
        isModal={false}
        SearchButton={Search()}
        layout={search}
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
        rowSelection
      >
        <Column title='入库单' fixed dataIndex='instockOrderId' render={(text)=>{
          return (
            <a onClick={()=>{
              instockRef.current.open(text);
            }}>
              {text}
            </a>
          );
        }}/>
        <Column title="仓库名称" dataIndex="storeHouseId" render={(text, record) => {
          return (
            <>
              {record.storehouseResult && record.storehouseResult.name}
            </>
          );
        }} sorter/>
        <Column title="负责人" width={200} dataIndex="userId" sorter render={(text, record) => {
          return (
            <>
              {record.userResult && record.userResult.name}
            </>
          );
        }}/>
        <Column title="登记时间" width={200} dataIndex="time" sorter/>
      </Table>
      <MyModal width={1100} title="入库单" component={InstockEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>

      <MyModal width={1300} title="入库清单" component={Instock} onSuccess={() => {
        instockRef.current.close();
      }} ref={instockRef}/>
    </>
  );
};

export default InstockList;
