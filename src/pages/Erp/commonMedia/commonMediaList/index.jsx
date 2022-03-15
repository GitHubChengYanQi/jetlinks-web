/**
 * 列表页
 *
 * @author Captain_Jazz
 * @Date 2022-03-15 08:54:48
 */

import React, {useRef} from 'react';
import {Table as AntTable} from 'antd';
import Table from '@/components/Table';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {commonMediaDelete, commonMediaList} from '../commonMediaUrl';
import CommonMediaEdit from '../commonMediaEdit';
import * as SysField from '../commonMediaField';

const {Column} = AntTable;
const {FormItem} = Form;

const CommonMediaList = () => {
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
        <FormItem label="文件路径" name="path" component={SysField.Path} />
        <FormItem label="OSS储存区" name="endpoint" component={SysField.Endpoint} />
        <FormItem label="OSS储存块" name="bucket" component={SysField.Bucket} />
        <FormItem label="上传状态" name="status" component={SysField.Status} />
        <FormItem label="用户ID" name="userId" component={SysField.UserId} />
        <FormItem label="" name="createTime" component={SysField.CreateTime} />
        <FormItem label="" name="createUser" component={SysField.CreateUser} />
        <FormItem label="" name="updateUser" component={SysField.UpdateUser} />
        <FormItem label="" name="updateTime" component={SysField.UpdateTime} />
      </>
    );
  };

  return (
    <>
      <Table
        contentHeight
        title={<h2>列表</h2>}
        api={commonMediaList}
        rowKey="mediaId"
        // searchForm={searchForm}
        // actions={actions()}
        ref={tableRef}
      >
        <Column title="文件路径" dataIndex="path" />
        <Column title="OSS储存区" dataIndex="endpoint" />
        <Column title="OSS储存块" dataIndex="bucket" />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.mediaId);
              }} />
              <DelButton api={commonMediaDelete} value={record.mediaId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Drawer width={800} title="编辑" component={CommonMediaEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default CommonMediaList;
