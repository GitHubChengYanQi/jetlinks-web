/**
 * SPU分类列表页
 *
 * @author song
 * @Date 2021-10-25 17:52:03
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {spuClassificationDelete, spuClassificationList} from '../spuClassificationUrl';
import SpuClassificationEdit from '../spuClassificationEdit';
import * as SysField from '../spuClassificationField';
import Breadcrumb from '@/components/Breadcrumb';

const {Column} = AntTable;
const {FormItem} = Form;

const SpuClassificationList = () => {
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
        <FormItem label="名称" name="name" component={SysField.Name} />
      </>
    );
  };

  return (
    <div style={{padding:16}}>
      <Table
        title={<Breadcrumb title='物料分类' />}
        api={spuClassificationList}
        rowKey="spuClassificationId"
        searchForm={searchForm}
        contentHeight
        actions={actions()}
        ref={tableRef}
        onChange={(value)=>{
          
        }}
      >
        <Column key={1} title="名称" dataIndex="name" />
        <Column key={2} title="编码" width={200} dataIndex="codingClass" />
        <Column key={3} title='上级' dataIndex='pidName' />
        <Column key={4} title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.spuClassificationId);
              }} />
              <DelButton api={spuClassificationDelete} value={record.spuClassificationId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Drawer width={800} title="编辑" component={SpuClassificationEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </div>
  );
};

export default SpuClassificationList;
