/**
 * 列表页
 *
 * @author
 * @Date 2021-08-20 13:14:51
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Button, Modal, notification, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {deliveryDetailsDelete, deliveryDetailsEdit, deliveryDetailsList} from '../deliveryDetailsUrl';
import DeliveryDetailsEdit from '../deliveryDetailsEdit';
import * as SysField from '../deliveryDetailsField';
import Breadcrumb from '@/components/Breadcrumb';
import {useParams} from 'ice';
import Icon from '@/components/Icon';
import {useRequest} from '@/util/Request';
import {instockEdit} from '@/pages/Erp/instock/InstockUrl';

const {Column} = AntTable;
const {FormItem} = Form;

const DeliveryDetailsList = () => {
  const ref = useRef(null);
  const params = useParams();
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

  const {run} = useRequest(deliveryDetailsEdit, {
    manual: true, onSuccess: () => {
      openNotificationWithIcon('success');
      tableRef.current.refresh();
    }
  });

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: type === 'success' ? '发货成功！' : '请输入详细信息！！！！',
    });
  };

  function confirmOk(record) {
    Modal.confirm({
      title: '发货',
      centered: true,
      content: `请确认是否执行发货操作!注意：发货之后不可修改。`,
      style: {margin: 'auto'},
      cancelText: '取消',
      onOk: async () => {
        if(record.customerId && record.adressId && record.contactsId && record.phoneId){
          record.stage = 1;
          await run(
            {
              data: record
            }
          );
        }else {
          openNotificationWithIcon('error');
        }

      }
    });
  }

  const searchForm = () => {
    return (
      <>
        <FormItem label="产品id" name="itemId" component={SysField.ItemId} />
        <FormItem label="客户id" name="customerId" component={SysField.CustomerId} />
        <FormItem label="地址id" name="adressId" component={SysField.AdressId} />
        <FormItem label="联系人id" name="contactsId" component={SysField.ContactsId} />
        <FormItem label="电话id" name="phoneId" component={SysField.PhoneId} />
        <FormItem label="出库明细id" name="stockItemId" component={SysField.StockItemId} />
        <FormItem hidden value={params ? params.cid : null} name="deliveryId" component={SysField.DeliveryId} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={deliveryDetailsList}
        rowKey="deliveryDetailsId"
        searchForm={searchForm}
        // actions={actions()}
        ref={tableRef}
      >
        <Column title="产品编号" dataIndex="stockItemId" />
        <Column title="产品" dataIndex="itemId" />
        <Column title="客户" dataIndex="customerId" />
        <Column title="地址" dataIndex="adressId" />
        <Column title="联系人" dataIndex="contactsId" />
        <Column title="电话" dataIndex="phoneId" />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              {record.stage === 0 ?
                <>
                  <Button
                    style={{margin: '0 10px'}}
                    onClick={() => {
                      confirmOk(record);
                    }}>
                    <Icon type="icon-ruku" />发货</Button>
                  <EditButton
                    onClick={() => {
                      ref.current.open(record.deliveryDetailsId);
                    }} />
                </> : null}
              {/*<DelButton api={deliveryDetailsDelete} value={record.deliveryDetailsId} onSuccess={() => {*/}
              {/*  tableRef.current.refresh();*/}
              {/*}} />*/}
            </>
          );
        }} width={300} />
      </Table>
      <Drawer width={800} title="编辑" component={DeliveryDetailsEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default DeliveryDetailsList;
