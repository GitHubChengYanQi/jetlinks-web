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
import {
  storehousePositionsDelete,
  storehousePositionsList,
  storehousePositionsTreeView
} from '../storehousePositionsUrl';
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
        api={{
          url: `/storehousePositions/treeView?ids=${value}`,
          method: 'GET',
        }}
        rowKey="value"
        formActions={formActionsPublic}
        rowSelection
        noSort
        contentHeight
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="库位名称" width={200} dataIndex="label" render={(value,record)=>{
          if (record.children && record.children.length === 0){
            record.children = null;
          }
          return (
            <>
              <Code style={{width:24,height:24}} source='storehousePositions' id={record.value} />
              {value}
            </>
          );
        }} />
        <Column title="操作" align="right" render={(value, record) => {
          if (record.value !== '0'){
            return (
              <>
                <EditButton onClick={() => {
                  ref.current.open(record.value);
                }} />
                <DelButton api={storehousePositionsDelete} value={record.value} onSuccess={() => {
                  tableRef.current.refresh();
                }} />
              </>
            );
          }
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
