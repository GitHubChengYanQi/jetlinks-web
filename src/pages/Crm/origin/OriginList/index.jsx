/**
 * 来源表列表页
 *
 * @author
 * @Date 2021-07-19 17:59:08
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {originDelete, originEdit, originList, sourceDelete, sourceList} from '../OriginUrl';
import SourceEdit from '../OriginEdit';
import * as SysField from '../OriginField';
import Breadcrumb from '@/components/Breadcrumb';
import Modal2 from '@/components/Modal';
import OriginEdit from '../OriginEdit';

const {Column} = AntTable;
const {FormItem} = Form;

const OriginList = () => {
  const ref = useRef(null);
  const tableRef = useRef(null);
  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          ref.current.open(false);
        }}/>
      </>
    );
  };

 const searchForm = () => {
   return (
     <>
       <FormItem label="来源名称" name="name" component={SysField.Name}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={originList}
        rowKey="originId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="来源名称" dataIndex="name"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                console.log(record);
                ref.current.open(record.originId);
              }}/>
              <DelButton api={originDelete} value={record.originId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Modal2 width={800} title="编辑" component={OriginEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default OriginList;
