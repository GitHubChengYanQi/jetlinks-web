/**
 * 出库申请列表页
 *
 * @author song
 * @Date 2021-09-14 16:49:41
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Button, message, Modal as AntModal, notification, Space, Table as AntTable} from 'antd';
import Modal from '@/components/Modal'
import DelButton from '@/components/DelButton';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {useRequest} from '@/util/Request';
import {outstockOrderDelete} from '@/pages/Erp/outstock/outstockOrder/outstockOrderUrl';
import Message from '@/components/Message';
import Icon from '@/components/Icon';
import Breadcrumb from '@/components/Breadcrumb';
import ApplyDetailsList from '@/pages/Erp/outstockApply/applyDetails/applyDetailsList';
import {useBoolean} from 'ahooks';
import {MegaLayout} from '@formily/antd-components';
import {FormButtonGroup, Submit} from '@formily/antd';
import {SearchOutlined} from '@ant-design/icons';
import OutstockApplyEdit from '../outstockApplyEdit';
import * as SysField from '../outstockApplyField';
import {OutBound, outstockApplyEdit, outstockApplyList} from '../outstockApplyUrl';
import OutStockApply from '@/pages/Erp/outstockApply/components/OutStockApply';
import CreateOutStockApply from '@/pages/Erp/outstockApply/outstockApplyEdit/components/CreateOutStockApply';

const {Column} = AntTable;
const {FormItem} = Form;

const OutstockApplyList = () => {
  const ref = useRef(null);
  const refDetail = useRef(null);
  const refApply = useRef(null);
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

  const [search, {toggle}] = useBoolean(false);

  const searchForm = () => {

    const formItem = () => {
      return (
        <>
          <FormItem mega-props={{span: 1}} placeholder="负责人" name="userId" component={SysField.UserId} />
          <FormItem mega-props={{span: 1}} placeholder="仓库" name="stockId" component={SysField.StoreHouse} />
          <FormItem mega-props={{span: 1}} placeholder="客户" name="customerId" component={SysField.CustomerId} />
        </>
      );
    };


    return (
      <div style={{maxWidth: 800}}>
        <MegaLayout
          responsive={{s: 1, m: 2, lg: 2}} labelAlign="left" layoutProps={{wrapperWidth: 200}} grid={search}
          columns={4} full autoRow>
          <FormItem mega-props={{span: 1}} placeholder="发货申请单号" name="outstockApplyId" component={SysField.ApplyState} />
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
            <Button type="link" title={search ? '收起高级搜索' : '展开高级搜索'} onClick={() => {
              toggle();
            }}>
              <Icon type={search ? 'icon-shouqi' : 'icon-gaojisousuo'} />{search ? '收起' : '高级'}</Button>
            <MegaLayout inline>
              {/*<FormItem hidden name="status" component={SysField.Name} />*/}
              {/*<FormItem hidden name="classification" component={SysField.Name} />*/}
              {/*<FormItem hidden name="customerLevelId" component={SysField.Name} />*/}
            </MegaLayout>
          </FormButtonGroup>
        </MegaLayout>
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
  const openNotificationWithIconOutBound = (type) => {
    notification[type]({
      message: type === 'success' ? '发货成功！' : '已发货！',
    });
  };

  const confirmOk = (record) => {
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
  };


  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={outstockApplyList}
        rowKey="outstockApplyId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
        SearchButton={Search()}
        layout={search}
      >
        <Column title="发货申请单号" width={120} dataIndex="outstockApplyId" render={(value,record)=>{
          return (
            <Button type='link' onClick={()=>{
              refDetail.current.open(record.outstockApplyId);
            }}>{value}</Button>
          );
        }} />
        <Column title="负责人" dataIndex="userId" render={(value,record)=>{
          return (
            <>
              {record.userResult && record.userResult.name}
            </>
          );
        }} />
        <Column title="客户" dataIndex="customerId" render={(value,record)=>{
          return (
            <>
              {record.customerResult && record.customerResult.customerName}
            </>
          );
        }}/>
        <Column title="地址" dataIndex="adressId" render={(value,record)=>{
          return (
            <>
              {record.adressResult && record.adressResult.location}
            </>
          );
        }}/>
        <Column title="联系人" dataIndex="contactsId" render={(value,record)=>{
          return (
            <>
              {record.contactsResult && record.contactsResult.contactsName}
            </>
          );
        }}/>
        <Column title="电话" dataIndex="phoneId" render={(value,record)=>{
          return (
            <>
              {record.phoneResult && record.phoneResult.phoneNumber}
            </>
          );
        }}/>
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              {record.applyState === 2 && <Button style={{margin: '0 10px'}} onClick={() => {
                refApply.current.open(record.outstockApplyId);
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

      <CreateOutStockApply width={1400} ref={ref} onSuccess={()=>{
        tableRef.current.refresh();
        ref.current.close();
      }} />

      <Modal width={800}  component={ApplyDetailsList} onSuccess={() => {
        tableRef.current.refresh();
        refDetail.current.close();
      }} ref={refDetail} />

      <Modal width={1400}  component={OutStockApply} onSuccess={() => {
        tableRef.current.refresh();
        refApply.current.close();
      }} ref={refApply} />
    </>
  );
};

export default OutstockApplyList;
