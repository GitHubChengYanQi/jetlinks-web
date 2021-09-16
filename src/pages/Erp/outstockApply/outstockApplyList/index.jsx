/**
 * 出库申请列表页
 *
 * @author song
 * @Date 2021-09-14 16:49:41
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Button, Modal as AntModal, notification, Space, Table as AntTable} from 'antd';
import Modal from '@/components/Modal'
import DelButton from '@/components/DelButton';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {outstockApplyEdit, outstockApplyList} from '../outstockApplyUrl';
import OutstockApplyEdit from '../outstockApplyEdit';
import * as SysField from '../outstockApplyField';
import {useRequest} from '@/util/Request';
import {outstock, outstockOrderDelete} from '@/pages/Erp/outstock/outstockOrder/outstockOrderUrl';
import Message from '@/components/Message';
import Icon from '@/components/Icon';
import Breadcrumb from '@/components/Breadcrumb';
import ApplyDetailsList from '@/pages/Erp/outstockApply/applyDetails/applyDetailsList';

const {Column} = AntTable;
const {FormItem} = Form;

const OutstockApplyList = () => {
  const ref = useRef(null);
  const refDetail = useRef(null);
  const tableRef = useRef(null);

  const compoentRef = useRef(null);

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
        <FormItem label="申请状态" name="applyState" component={SysField.ApplyState} />
        <FormItem label="品牌id" name="brandId" component={SysField.BrandId} />
        <FormItem label="产品id" name="itemId" component={SysField.ItemId} />
      </>
    );
  };

  const {run} = useRequest(outstockApplyEdit, {
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
      message: type === 'success' ? '申请成功！' : '已申请！',
    });
  };

  function confirmOk(record) {
    AntModal.confirm({
      title: '发货申请',
      centered: true,
      content: `请确认是否同意发货申请操作!注意：同意之后不可恢复。`,
      style: {margin: 'auto'},
      cancelText: '取消',
      onOk: async () => {
        record.applyState = 2;
        await run(
          {
            data: record
          }
        );
      }
    });
  }

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={outstockApplyList}
        rowKey="outstockApplyId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="发货申请单号" width={120} dataIndex="outstockApplyId" render={(value,record)=>{
          return (
            <Button type='link' onClick={()=>{
              refDetail.current.open(record.outstockApplyId);
            }}>{value}</Button>
          );
        }} />
        <Column title="负责人" dataIndex="userId" />
        <Column title="客户" dataIndex="customerId" />
        <Column title="地址" dataIndex="adressId" />
        <Column title="联系人" dataIndex="contactsId" />
        <Column title="电话" dataIndex="phoneId" />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              {record.applyState === 2 && <Button style={{margin: '0 10px'}} onClick={() => {
                // confirmOk(record);
              }}><Icon type="icon-chuku" />一键发货</Button> }
              {record.applyState === 1 ? <Button style={{margin: '0 10px'}} onClick={() => {
                confirmOk(record);
              }}><Icon type="icon-chuku" />同意</Button> : null}
              {record.applyState === 1 ? <EditButton onClick={() => {
                ref.current.open(record.outstockApplyId);
              }} /> : null}
              {record.applyState === 1 ?
                <DelButton api={outstockOrderDelete} value={record.outstockApplyId} onSuccess={() => {
                  tableRef.current.refresh();
                }} /> : null}
            </>
          );
        }} width={300} />
      </Table>
      <Modal compoentRef={compoentRef} width={1400} padding={1} title="发货单" component={OutstockApplyEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} footer={
        <>
          <Space>
            <Button type="primary" onClick={() => {
              compoentRef.current.formRef.current.submit();
            }}>保存</Button>
            <Button onClick={() => {
              ref.current.close();
            }}>取消</Button>
          </Space>
        </>
      } />
      <Modal width={800}  component={ApplyDetailsList} onSuccess={() => {
        tableRef.current.refresh();
        refDetail.current.close();
      }} ref={refDetail} />
    </>
  );
};

export default OutstockApplyList;
