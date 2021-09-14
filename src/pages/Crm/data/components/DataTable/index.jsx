/**
 * 资料列表页
 *
 * @author song
 * @Date 2021-09-11 13:35:54
 */

import React, {useEffect, useRef} from 'react';
import Table from '@/components/Table';
import {Button, Table as AntTable, Tag} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import Breadcrumb from '@/components/Breadcrumb';
import DataEdit from '@/pages/Crm/data/dataEdit';
import {dataDelete, dataList} from '@/pages/Crm/data/dataUrl';
import {FormItem} from '@formily/antd';
import * as SysField from '../../dataField';
import Modal from '@/components/Modal';
import Conent from '@/pages/Crm/data/components/Conent';

const {Column} = AntTable;

const DataTable = (props) => {

  const {Class} = props;

  const refConent = useRef();

  useEffect(()=>{
    if (Class){
      tableRef.current.formActions.setFieldValue('dataClassificationId', Class.length > 0 ? Class[0] : '');
      tableRef.current.submit();
    }
  },[Class]);

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
        <FormItem hidden name="dataClassificationId" component={SysField.DataClassificationId} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={dataList}
        rowKey="dataId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="资料名称" dataIndex="name" render={(value,record)=>{
          return (
            <Button type='link' onClick={()=>{
              refConent.current.open(record.content);
            }}>{value}</Button>
          );
        }} />
        <Column title="内容" dataIndex="content" />
        <Column title="产品" render={(value, record) => {
          return (
            <>
              {
                record.itemId && record.itemId.length > 0 && record.itemId.map((items, index) => {
                  return (
                    <Tag key={index}>
                      {items.name}
                    </Tag>
                  );
                })
              }
            </>
          );
        }} />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.dataId);
              }} />
              <DelButton api={dataDelete} value={record.dataId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Drawer width={800} title="编辑" component={DataEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />

      <Modal component={Conent} onSuccess={()=>{
        refConent.current.close();
      }} ref={refConent} titles='详细内容' />
    </>
  );
};

export default DataTable;
