/**
 * 采购单列表页
 *
 * @author song
 * @Date 2022-01-13 13:09:54
 */

import React, {useRef} from 'react';
import {Badge, Button, Table as AntTable} from 'antd';
import {useHistory} from 'ice';
import Table from '@/components/Table';
import Form from '@/components/Form';
import {procurementOrderAdd, procurementOrderList} from '../procurementOrderUrl';
import * as SysField from '../procurementOrderField';
import Breadcrumb from '@/components/Breadcrumb';
import Modal from '@/components/Modal';
import ProcurementOrderDetailList
  from '@/pages/Purshase/procurementOrder/components/procurementOrderDetail/procurementOrderDetailList';
import AddContractEdit from '@/pages/Crm/contract/ContractEdit';
import {useRequest} from '@/util/Request';

const {Column} = AntTable;
const {FormItem} = Form;

const ProcurementOrderList = () => {
  const history = useHistory(null);
  const tableRef = useRef(null);
  const addContract = useRef();
  const contactRef = useRef();

  const {run} = useRequest(procurementOrderAdd, {manual: true});

  const actions = () => {
    return (
      <>
        <Button onClick={() => {
          contactRef.current.open(false);
        }}>创建采购单</Button>
      </>
    );
  };

  const searchForm = () => {
    return (
      <>
        <FormItem name="status" component={SysField.Status} />
      </>
    );
  };

  return (
    <>
      <Table
        rowSelection
        title={<Breadcrumb />}
        api={procurementOrderList}
        rowKey="procurementOrderId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="采购单" dataIndex="procurementOrderId" render={(value) => {
          return <Button type="link" onClick={() => {
            history.push(`/purchase/procurementOrder/${value}`);
          }}>{value}</Button>;
        }} />
        <Column title="创建时间" dataIndex="createTime" />
        <Column title="状态" dataIndex="status" render={(value) => {
          switch (value) {
            case 0:
              return <Badge text="审批中" color="yellow" />;
            case 97:
              return <Badge text="已拒绝" color="red" />;
            case 99:
              return <Badge text="已同意" color="green" />;
            default:
              break;
          }
        }} />
        <Column />
      </Table>

      <Modal
        headTitle="创建采购单"
        width={1000}
        supplyB
        component={AddContractEdit}
        enterpriseA
        ref={contactRef}
        compoentRef={addContract}
        footer={<Button type="primary" onClick={() => {
          addContract.current.submit();
        }}>保存</Button>}
        response={(res) => {
          if (res.contractId){
            run({
              data: {
                contractId: res.contractId
              }
            });
          }
        }}
        onSuccess={() => {
          tableRef.current.submit();
          contactRef.current.close();
        }}
      />

    </>
  );
};

export default ProcurementOrderList;
