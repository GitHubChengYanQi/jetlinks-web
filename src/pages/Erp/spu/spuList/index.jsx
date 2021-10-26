/**
 * 列表页
 *
 * @author
 * @Date 2021-10-18 14:14:21
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Button, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {spuDelete, spuList} from '../spuUrl';
import SpuEdit from '../spuEdit';
import * as SysField from '../spuField';
import {useHistory} from 'ice';
import Modal from '@/components/Modal';
import Breadcrumb from '@/components/Breadcrumb';

const {Column} = AntTable;
const {FormItem} = Form;

const SpuList = () => {
  const ref = useRef(null);
  const tableRef = useRef(null);
  const history = useHistory();

  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          history.push('/ERP/spu/add');
        }} />
      </>
    );
  };

  const searchForm = () => {
    return (
      <>
        <FormItem label="物品名字" name="name" component={SysField.Name} />
        <FormItem label="类目" name="categoryId" component={SysField.CategoryId} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={spuList}
        rowKey="spuId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="物品名字" fixed dataIndex="name" render={(value,record)=>{
          return (
            <Button type='link' onClick={()=>{
              history.push(`/ERP/spu/parts/${record.spuId}`);
            }}>
              {value}
            </Button>
          );
        }} />

        <Column title="类目" dataIndex="categoryId" render={(value,record)=>{
          return (
            <>
              {record.category && record.category.categoryName}
            </>
          );
        }} />
        <Column title="单位" width={120} align='center' dataIndex="unitId" render={(value,record)=>{
          return (
            <>
              {record.unitResult && record.unitResult.unitName }
            </>
          );
        }} sorter/>
        <Column title="型号" width={120} dataIndex="model" sorter/>
        <Column title="生产类型" width={120} align='center' dataIndex="productionType" render={(value)=>{
          switch (value){
            case 0:
              return '自制件';
            case 1:
              return '委派件';
            case 2:
              return '外购件';
            default:
              break;
          }

        }} sorter/>
        <Column title="养护周期" width={120} align='center' dataIndex="curingCycle" render={(value)=>{
          return (
            <>
              {value && `${value}天`}
            </>
          );
        }} sorter/>
        <Column title="操作" fixed='right' align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                history.push(`/ERP/spu/add?id=${record.spuId}`);
              }} />
              <DelButton api={spuDelete} value={record.spuId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} />
      </Table>
      <Modal width={800} title="编辑" component={SpuEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default SpuList;
