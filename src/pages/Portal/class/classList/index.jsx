/**
 * 分类导航列表页
 *
 * @author siqiang
 * @Date 2021-08-18 15:53:56
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {classDelete, classList} from '../classUrl';
import ClassEdit from '../classEdit';
import * as SysField from '../classField';

const {Column} = AntTable;
const {FormItem} = Form;

const ClassList = () => {
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
       <FormItem label="分类名称" name="className" component={SysField.ClassName}/>
       <FormItem label="排序" name="sort" component={SysField.Sort}/>
       <FormItem label="轮播图分类id" name="classificationId" component={SysField.ClassificationId}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={classList}
        rowKey="classId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="分类名称" dataIndex="className"/>
        <Column title="排序" dataIndex="sort"/>
        <Column title="轮播图分类id" dataIndex="classificationId"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.classId);
              }}/>
              <DelButton api={classDelete} value={record.classId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={ClassEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default ClassList;
