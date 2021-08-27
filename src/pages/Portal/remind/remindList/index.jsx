/**
 * 提醒表列表页
 *
 * @author cheng
 * @Date 2021-08-26 15:50:39
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable, Tag} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {remindDelete, remindList} from '../remindUrl';
import RemindEdit from '../remindEdit';
import * as SysField from '../remindField';
import {useRequest} from '@/util/Request';
import Breadcrumb from '@/components/Breadcrumb';

const {Column} = AntTable;
const {FormItem} = Form;

const RemindList = () => {
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
        <FormItem label="提醒类型" name="type" component={SysField.Type} />
      </>
    );
  };


  return (
    <>
      <Table
        title={<Breadcrumb title='消息提醒' />}
        api={remindList}
        rowKey="remindId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="提醒类型" dataIndex="type" />
        <Column title="提醒人" dataIndex="userId" render={(value,record)=>{
          return (
            <>
              {
                record.users && record.users.map((value,index)=>{
                  return (
                    <Tag
                      key={index}
                      color='green'
                      style={{ marginRight: 3 }}
                    >
                      {value.name}
                    </Tag>
                  );
                })
              }
            </>
          );
        }}/>
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record);
              }} />
              <DelButton api={remindDelete} value={record.remindId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Drawer width={800} title="编辑" component={RemindEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default RemindList;
