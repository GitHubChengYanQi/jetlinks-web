/**
 * 分类明细内容列表页
 *
 * @author siqiang
 * @Date 2021-08-18 15:57:52
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {classDifferenceDetailsDelete, classDifferenceDetailsList} from '../classDifferenceDetailsUrl';
import ClassDifferenceDetailsEdit from '../classDifferenceDetailsEdit';
import * as SysField from '../classDifferenceDetailsField';

const {Column} = AntTable;
const {FormItem} = Form;

const ClassDifferenceDetailsList = () => {
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
       <FormItem label="产品名" name="title" component={SysField.Title}/>
       <FormItem label="图片路径" name="imgUrl" component={SysField.ImgUrl}/>
       <FormItem label="链接" name="link" component={SysField.Link}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={classDifferenceDetailsList}
        rowKey="detailId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="产品名" dataIndex="title"/>
        <Column title="图片路径" dataIndex="imgUrl"/>
        <Column title="链接" dataIndex="link"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.detailId);
              }}/>
              <DelButton api={classDifferenceDetailsDelete} value={record.detailId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={ClassDifferenceDetailsEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default ClassDifferenceDetailsList;
