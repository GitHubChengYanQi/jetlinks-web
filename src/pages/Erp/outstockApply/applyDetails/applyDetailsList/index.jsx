/**
 * 列表页
 *
 * @author song
 * @Date 2021-09-15 09:42:47
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Breadcrumb, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {applyDetailsDelete, applyDetailsList} from '../applyDetailsUrl';
import ApplyDetailsEdit from '../applyDetailsEdit';
import * as SysField from '../applyDetailsField';

const {Column} = AntTable;
const {FormItem} = Form;

const ApplyDetailsList = (props) => {

  const {value} = props;

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
        <FormItem label="产品" name="itemId" component={SysField.ItemId} />
        <FormItem label="品牌" name="brandId" component={SysField.BrandId} />
        <FormItem hidden name="outstockApplyId" value={value || ' '} component={SysField.OutstockApplyId} />
      </>
    );
  };

  return (
    <>
      <Table
        title="发货申请明细"
        api={applyDetailsList}
        rowKey="outstockApplyDetailsId"
        searchForm={searchForm}
        // actions={actions()}
        ref={tableRef}
      >
        <Column title="产品" dataIndex="itemId" />
        <Column title="品牌" dataIndex="brandId" />
        <Column title="数量" dataIndex="number" />
        {/*<Column />*/}
        {/*   <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.outstockApplyDetailsId);
              }} />
              <DelButton api={applyDetailsDelete} value={record.outstockApplyDetailsId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />*/}
      </Table>
      <Drawer width={800} title="编辑" component={ApplyDetailsEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default ApplyDetailsList;
