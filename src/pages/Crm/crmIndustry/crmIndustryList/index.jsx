/**
 * 行业表列表页
 *
 * @author 
 * @Date 2021-07-31 16:28:22
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {crmIndustryDelete, crmIndustryList} from '../crmIndustryUrl';
import CrmIndustryEdit from '../crmIndustryEdit';
import * as SysField from '../crmIndustryField';

const {Column} = AntTable;
const {FormItem} = Form;

const CrmIndustryList = () => {
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
       <FormItem label="行业名称" name="industryName" component={SysField.IndustryName}/>
       <FormItem label="上级" name="parentId" component={SysField.ParentId}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={crmIndustryList}
        rowKey="industryId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="行业名称" dataIndex="industryName"/>
        <Column title="上级" dataIndex="parentId"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.industryId);
              }}/>
              <DelButton api={crmIndustryDelete} value={record.industryId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={CrmIndustryEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default CrmIndustryList;
