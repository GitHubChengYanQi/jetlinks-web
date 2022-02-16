/**
 * 工位表列表页
 *
 * @author Captain_Jazz
 * @Date 2022-02-15 10:03:24
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {productionStationDelete, productionStationList} from '../productionStationUrl';
import ProductionStationEdit from '../productionStationEdit';
import * as SysField from '../productionStationField';
import Breadcrumb from '@/components/Breadcrumb';

const {Column} = AntTable;
const {FormItem} = Form;

const ProductionStationList = () => {
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
        <FormItem label="工位名称" name="name" component={SysField.Name} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={productionStationList}
        rowKey="productionStationId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="工位名称" dataIndex="name" />
        <Column title="负责人" dataIndex="bindResults" render={(value)=>{
          return value.map((item)=>{
            return item.userResult.name;
          }).toString();
        }} />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.productionStationId);
              }} />
              <DelButton api={productionStationDelete} value={record.productionStationId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Drawer width={800} title="工位" component={ProductionStationEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default ProductionStationList;
