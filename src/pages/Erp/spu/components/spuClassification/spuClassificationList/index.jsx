/**
 * SPU分类列表页
 *
 * @author song
 * @Date 2021-10-25 17:52:03
 */

import React, {useRef, useState} from 'react';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {
  spuClassificationDelete,
  spuClassificationdeleteBatch,
  spuClassificationList,
  spuClassificationTreeVrew
} from '../spuClassificationUrl';
import SpuClassificationEdit from '../spuClassificationEdit';
import * as SysField from '../spuClassificationField';
import Breadcrumb from '@/components/Breadcrumb';
import Table from '@/components/Table';
import {useRequest} from '@/util/Request';
import {createFormActions} from '@formily/antd';

const {Column} = AntTable;
const {FormItem} = Form;

const formActionsPublic = createFormActions();

const SpuClassificationList = () => {
  const ref = useRef(null);
  const tableRef = useRef(null);

  const [ids, setIds] = useState([]);

  const {data} = useRequest(spuClassificationTreeVrew);

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

  const footer = () => {

    return <DelButton value={ids} disabled={ids.length === 0} api={spuClassificationdeleteBatch} onSuccess={() => {
      tableRef.current.submit();
    }}>批量删除</DelButton>;
  };

  return (
    <div style={{padding: 16}}>
      <Table
        title={<Breadcrumb title="物料分类" />}
        api={spuClassificationTreeVrew}
        rowKey="key"
        searchForm={searchForm}
        noSort
        contentHeight
        formActions={formActionsPublic}
        actions={actions()}
        ref={tableRef}
        onChange={(value) => {
          setIds(value);
        }}
        footer={footer}
      >
        <Column title="名称" dataIndex="label" render={(value,record)=>{
          if (record.children && record.children.length === 0) {
            record.children = null;
          }
          return (
            <>
              {
                value
              }
            </>
          );
        }} />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.key);
              }} />
              <DelButton api={spuClassificationDelete} value={record.key} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={100} />
      </Table>
      <Drawer width={800} title="编辑" component={SpuClassificationEdit} onSuccess={() => {
        // tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </div>
  );
};

export default SpuClassificationList;
