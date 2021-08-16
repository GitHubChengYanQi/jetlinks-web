/**
 * 出库表列表页
 *
 * @author song
 * @Date 2021-07-17 10:46:08
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Button, Modal, notification, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import Breadcrumb from '@/components/Breadcrumb';
import Modal2 from '@/components/Modal';
import OutstockEdit from '@/pages/Erp/outstock/OutstockEdit';
import {useBoolean} from 'ahooks';
import {MegaLayout} from '@formily/antd-components';
import {FormButtonGroup, Submit} from '@formily/antd';
import {SearchOutlined} from '@ant-design/icons';
import Icon from '@/components/Icon';
import {useRequest} from "@/util/Request";
import {outstockDelete, outstockEdit, outstockList} from '../OutstockUrl';
import * as SysField from '../OutstockField';
import Message from "@/components/Message";

const {Column} = AntTable;
const {FormItem} = Form;

const OutstockList = () => {
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

  const {run} = useRequest(outstockEdit, {
    manual: true, onSuccess: () => {
      openNotificationWithIcon('success');
      tableRef.current.refresh();
    },
    onError: (error) => {
      Message.error(error.message);
    }
  });

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: type === 'success' ? '出库成功！' : '已出库！',
    });
  };

  function confirmOk(record) {

    Modal.confirm({
      title: '出库',
      centered: true,
      content: `请确认是否执行出库操作!注意：出库之后不可恢复。`,
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
          <FormItem mega-props={{span: 1}} placeholder="品牌名称" name="brandId" component={SysField.BrandId}/>
        </>
      );
    };


    return (
      <div style={{maxWidth:800}} >
        <MegaLayout responsive={{s: 1,m:2,lg:2}} labelAlign="left" layoutProps={{wrapperWidth:200}} grid={search} columns={4} full autoRow>
          <FormItem mega-props={{span: 1}} placeholder="产品名称" name="itemId" component={SysField.ItemIdSelect}/>
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
        api={outstockList}
        rowKey="outstockId"
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
        }} />
        <Column title="产品名称" dataIndex="itemId" render={(text, record) => {
          return (
            <>
              {record.itemsResult.name}
            </>
          );
        }} />
        <Column title="出库时间" width={200}  dataIndex="deliveryTime" sorter/>
        <Column title="出库数量" width={120} align='center' dataIndex="number" sorter/>
        <Column title="出库价格"  width={120} align='center' dataIndex="price" sorter/>
        <Column title="品牌名称" width={200} dataIndex="brandName" render={(text, record) => {
          return (
            <>
              {record.brandResult.brandName}
            </>
          );
        }} />
        <Column title="出库状态" width={200} dataIndex="state" render={(text, record) => {
          return (
            <>
              {record.state ? '已出库':'未出库'}
            </>
          );
        }} />
        <Column title="操作" fixed='right' align="right" render={(value, record) => {
          return (
            <>
              {record.state === 0 ? <Button style={{margin: '0 10px'}} onClick={() => {
                confirmOk(record);
              }}><Icon type="icon-chuku" />出库</Button>: null}
              {record.state === 0 ?<EditButton onClick={() => {
                ref.current.open(record);
              }}/> : null}
              {record.state === 0 ? <DelButton api={outstockDelete} value={record.outstockId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>: null}
            </>
          );
        }} width={200}/>
      </Table>
      <Modal2 title="产品出库" component={OutstockEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default OutstockList;
