/**
 * 分类导航列表页
 *
 * @author siqiang
 * @Date 2021-08-18 16:13:41
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Button, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {daoxinPortalClassDelete, daoxinPortalClassList} from '../daoxinPortalClassUrl';
import DaoxinPortalClassEdit from '../daoxinPortalClassEdit';
import * as SysField from '../daoxinPortalClassField';
import Modal from '@/components/Modal';
import ClassDifferenceList from '@/pages/Shop/classDifference/classDifferenceList';
import {useHistory} from 'ice';
import Breadcrumb from '@/components/Breadcrumb';

const {Column} = AntTable;
const {FormItem} = Form;

const DaoxinPortalClassList = () => {
  const ref = useRef(null);
  const history = useHistory();
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
        <FormItem label="分类名称" name="className" component={SysField.ClassName} />
        <FormItem label="排序" name="sort" component={SysField.Sort} />
        <FormItem label="轮播图分类" name="classificationId" component={SysField.ClassificationId} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={daoxinPortalClassList}
        rowKey="classId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="分类名称" dataIndex="className" render={(value, record) => {
          return (
            <Button size="small" type="link" onClick={() => {
              history.push(`/shop/daoxinPortalClass/${record.classId}`);
            }}>{value}</Button>
          );
        }} />
        <Column title="排序" dataIndex="sort" />
        <Column title="轮播图分类" dataIndex="classificationId" />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.classId);
              }} />
              <DelButton api={daoxinPortalClassDelete} value={record.classId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Drawer width={800} title="编辑" component={DaoxinPortalClassEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default DaoxinPortalClassList;
