/**
 * 客户级别表列表页
 *
 * @author
 * @Date 2021-07-30 13:00:02
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {crmCustomerLevelDelete, crmCustomerLevelList} from '../crmCustomerLevelUrl';
import CrmCustomerLevelEdit from '../crmCustomerLevelEdit';
import * as SysField from '../crmCustomerLevelField';
import Breadcrumb from '@/components/Breadcrumb';

const {Column} = AntTable;
const {FormItem} = Form;

const CrmCustomerLevelList = () => {
  const ref = useRef(null);
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

  const searchForm = () => {
    return (
      <>
        <FormItem label="客户级别" name="customerLevelId" component={SysField.CustomerLevelId} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb title='客户级别管理' />}
        api={crmCustomerLevelList}
        rowKey="customerLevelId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="级别" dataIndex="level" />
        <Column title="数字级别" dataIndex="rank" />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.customerLevelId);
              }} />
              <DelButton api={crmCustomerLevelDelete} value={record.customerLevelId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Drawer width={800} title="客户级别" component={CrmCustomerLevelEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default CrmCustomerLevelList;
