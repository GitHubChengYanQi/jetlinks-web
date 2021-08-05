/**
 * 商机跟踪表列表页
 *
 * @author 
 * @Date 2021-08-05 10:31:44
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {crmBusinessTrackDelete, crmBusinessTrackList} from '../crmBusinessTrackUrl';
import CrmBusinessTrackEdit from '../crmBusinessTrackEdit';
import * as SysField from '../crmBusinessTrackField';

const {Column} = AntTable;
const {FormItem} = Form;

const CrmBusinessTrackList = () => {
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
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={crmBusinessTrackList}
        rowKey="trackId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="备注id" dataIndex="noteId"/>
        <Column title="备注" dataIndex="note"/>
        <Column title="跟踪类型" dataIndex="type"/>
        <Column title="商机id" dataIndex="businessId"/>
        <Column title="负责人" dataIndex="userId"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.trackId);
              }}/>
              <DelButton api={crmBusinessTrackDelete} value={record.trackId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={CrmBusinessTrackEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default CrmBusinessTrackList;
