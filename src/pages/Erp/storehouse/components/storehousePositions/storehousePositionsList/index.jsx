/**
 * 仓库库位表列表页
 *
 * @author song
 * @Date 2021-10-29 09:22:25
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {storehousePositionsDelete, storehousePositionsList} from '../storehousePositionsUrl';
import StorehousePositionsEdit from '../storehousePositionsEdit';
import * as SysField from '../storehousePositionsField';
import Breadcrumb from '@/components/Breadcrumb';
import {createFormActions} from '@formily/antd';
import Code from '@/pages/Erp/spu/components/Code';
import {ScanOutlined} from '@ant-design/icons';

const {Column} = AntTable;
const {FormItem} = Form;

const StorehousePositionsList = (props) => {
  const formActionsPublic = createFormActions();
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
        <FormItem hidden label="仓库" name="storehouseId" value={value} component={SysField.StorehouseId} />
        <FormItem label="库位名称" name="name" component={SysField.Name} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb title='仓库库位' />}
        api={storehousePositionsList}
        rowKey="storehousePositionsId"
        formActions={formActionsPublic}
        rowSelection
        contentHeight
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title={<ScanOutlined />} align='center' width={20} render={(value,record)=>{
          return (<Code source='storehousePositions' id={record.storehousePositionsId} />);
        }} />
        <Column title="库位名称" width={200} dataIndex="name" render={(value,record)=>{
          return (
            <>
              {value}
            </>
          );
        }} />
        <Column title="上级" dataIndex="pid" />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.storehousePositionsId);
              }} />
              <DelButton api={storehousePositionsDelete} value={record.storehousePositionsId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={100} />
      </Table>
      <Drawer width={800} title="编辑" component={StorehousePositionsEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} storehouse={value} />
    </>
  );
};

export default StorehousePositionsList;
