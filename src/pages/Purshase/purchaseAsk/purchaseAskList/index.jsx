/**
 * 采购申请列表页
 *
 * @author song
 * @Date 2021-12-15 09:35:37
 */

import React, {useEffect, useRef} from 'react';
import {Badge, Button, Table as AntTable} from 'antd';
import {getSearchParams, useHistory} from 'ice';
import Table from '@/components/Table';
import AddButton from '@/components/AddButton';
import Form from '@/components/Form';
import {purchaseAskList} from '../purchaseAskUrl';
import * as SysField from '../purchaseAskField';
import Breadcrumb from '@/components/Breadcrumb';
import Modal from '@/components/Modal';
import PurchaseListingList from '@/pages/Purshase/purchaseListing/purchaseListingList';

const {Column} = AntTable;
const {FormItem} = Form;

const PurchaseAskList = ({status, ...props}) => {
  const history = useHistory();
  const detailRef = useRef(null);
  const tableRef = useRef(null);

  const params = getSearchParams();

  useEffect(() => {
    if (params.id) {
      // detailRef.current.open(params.id);
    }
  }, []);

  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          history.push('/purchase/purchaseAsk/add');
        }} />
      </>
    );
  };

  const searchForm = () => {
    return (
      <>
        <FormItem label="采购编号" name="coding" component={SysField.SelectCoding} />
        <FormItem label="采购类型" name="type" component={SysField.Type} />
        <FormItem label="采购状态" name="status" value={status} component={SysField.Status} />
      </>
    );
  };

  return (
    <>
      <Table
        api={purchaseAskList}
        rowKey="purchaseAskId"
        noRowSelection
        tableKey="purchaseAsk"
        title={<Breadcrumb />}
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
        {...props}
      >
        <Column title="编号" key={1} dataIndex="coding" render={(value, record) => {
          return <Button type="link" onClick={() => {
            detailRef.current.open(record.purchaseAskId);
          }}>{value}</Button>;
        }} />
        <Column key={2} title="申请类型" dataIndex="type" render={(value) => {
          switch (value) {
            case '0':
              return '生产采购';
            case '1':
              return '库存采购';
            case '2':
              return '行政采购';
            case '3':
              return '销售采购';
            case '4':
              return '紧急采购';
            default:
              break;
          }
        }} />
        {!status && <Column key={3} title="申请状态" dataIndex="status" render={(value) => {
          switch (value) {
            case 0:
              return <Badge text="待审核" color="yellow" />;
            case 2:
              return <Badge text="已通过" color="green" />;
            case 1:
              return <Badge text="已通过" color="red" />;
            case 3:
              return <Badge text="已撤回" color="red" />;
            default:
              break;
          }
        }} />}
        <Column key={4} title="申请品类" width={100} align="center" dataIndex="applyType" />
        <Column key={5} title="申请数量" width={100} align="center" dataIndex="applyNumber" />
        {!status && <Column key={6} title="最后审批人" dataIndex="viewUpdate" render={(value) => {
          return <>{value && value.updateUser && value.updateUser.name}</>;
        }} />}
        {!status && <Column key={7} title="最后审批时间" dataIndex="viewUpdate" render={(value) => {
          return <>{value && value.updateTime}</>;
        }} />}
        <Column key={8} title="申请人" render={(value, record) => {
          return <>
            {record.createUserName}
          </>;
        }} />
        <Column key={9} title="申请时间" dataIndex="createTime" />
        <Column />
        {!status &&
        <Column key={10} title="操作" width={230} align="center" dataIndex="purchaseAskId" render={(value, record) => {
          return <>
            <Button type="link">撤回</Button>
            <Button type="link" onClick={() => {
              history.push(`/purchase/purchaseAsk/add?id=${value}`);
            }}>编辑</Button>
            <Button type="link" onClick={() => {
              detailRef.current.open(value);
            }}>查看</Button>
          </>;
        }} />}
      </Table>

      <Modal
        width={1300}
        headTitle="采购申请详情"
        component={PurchaseListingList}
        ref={detailRef}
      />
    </>
  );
};

export default PurchaseAskList;
