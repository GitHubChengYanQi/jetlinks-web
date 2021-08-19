/**
 * 分类明细内容列表页
 *
 * @author siqiang
 * @Date 2021-08-18 15:57:52
 */

import React, {useEffect, useRef} from 'react';
import Table from '@/components/Table';
import {Image, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {classDifferenceDetailsDelete, classDifferenceDetailsList} from '../../classDifferenceDetailsUrl';
import ClassDifferenceDetailsEdit from '../../classDifferenceDetailsEdit';
import * as SysField from '../../classDifferenceDetailsField';
import Breadcrumb from '@/components/Breadcrumb';

const {Column} = AntTable;
const {FormItem} = Form;

const ClassDifferenceDatailsTable = (props) => {

  const {classDifferenceId} = props;

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

  useEffect(()=>{
    if (classDifferenceId){
      tableRef.current.formActions.setFieldValue('classDifferenceId', classDifferenceId);
      tableRef.current.submit();
    }
  },[classDifferenceId]);

  const searchForm = () => {
    return (
      <>
        <FormItem label="产品名" name="title" component={SysField.Title} />
        <FormItem label="链接" name="link" component={SysField.Link} />
        <FormItem hidden name="classDifferenceId" component={SysField.ClassDifference} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb title='内容' />}
        api={classDifferenceDetailsList}
        rowKey="detailId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="产品名" dataIndex="title" />
        <Column title="图片路径" dataIndex="imgUrl" render={(value, record) => {
          return (
            <>
              {value ? <Image width={100} height={50} src={value} /> : null}
            </>
          );
        }} />
        <Column title="排序" dataIndex="sort" />
        <Column title="链接" dataIndex="link" />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.detailId);
              }} />
              <DelButton api={classDifferenceDetailsDelete} value={record.detailId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Drawer width={800} title="编辑" component={ClassDifferenceDetailsEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} classDifferenceId={classDifferenceId} />
    </>
  );
};

export default ClassDifferenceDatailsTable;
