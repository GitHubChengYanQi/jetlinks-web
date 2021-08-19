/**
 * 分类明细列表页
 *
 * @author siqiang
 * @Date 2021-08-18 15:57:33
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {classDifferenceDelete, classDifferenceList} from '../classDifferenceUrl';
import ClassDifferenceEdit from '../classDifferenceEdit';
import * as SysField from '../classDifferenceField';
import Breadcrumb from '@/components/Breadcrumb';

const {Column} = AntTable;
const {FormItem} = Form;

const ClassDifferenceList = (props) => {

  const {value} = props;

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
        <FormItem label="分类名" name="title" component={SysField.Title} />
        <FormItem hidden value={value || null} name="classId" component={SysField.Title} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={classDifferenceList}
        rowKey="classDifferenceId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="分类名" dataIndex="title" />
        <Column title="排序" dataIndex="sort" />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.classDifferenceId);
              }} />
              <DelButton api={classDifferenceDelete} value={record.classDifferenceId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Drawer width={800} title="编辑" component={ClassDifferenceEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} classId={value} />
    </>
  );
};

export default ClassDifferenceList;
